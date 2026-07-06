#!/usr/bin/env node
/*
 * PR Review Agent — local self-check before raising a PR.
 * -------------------------------------------------------
 * Runs a set of automated checks on YOUR branch's changes (vs a base branch,
 * default: develop) so you catch common problems before a reviewer does.
 *
 * Usage (from the repo root):
 *   node pr-review-agent/review.mjs                # check vs develop
 *   node pr-review-agent/review.mjs main           # check vs a different base
 *   node pr-review-agent/review.mjs --skip-build   # skip the production build (faster)
 *   node pr-review-agent/review.mjs --skip-lint    # skip ESLint
 *
 * Exit code 0 = clean (or warnings only), 1 = errors found. Zero dependencies.
 */

import { execSync } from "node:child_process";
import { statSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const BASE = args.find((a) => !a.startsWith("--")) || process.env.PR_BASE || "develop";
const SKIP_BUILD = args.includes("--skip-build");
const SKIP_LINT = args.includes("--skip-lint");

// ---- tiny ANSI helpers ---------------------------------------------------
const c = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  grn: (s) => `\x1b[32m${s}\x1b[0m`,
  yel: (s) => `\x1b[33m${s}\x1b[0m`,
  cyn: (s) => `\x1b[36m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

function sh(cmd, opts = {}) {
  return execSync(cmd, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
    maxBuffer: 64 * 1024 * 1024,
    ...opts,
  });
}
function tryCmd(cmd, opts = {}) {
  try {
    return { ok: true, out: sh(cmd, opts) };
  } catch (e) {
    return { ok: false, out: `${e.stdout || ""}${e.stderr || ""}` };
  }
}

const ROOT = sh("git rev-parse --show-toplevel").trim();
const FRONTEND = path.join(ROOT, "frontend");

// prefer origin/<base> (most up to date) over a possibly-stale local branch
function resolveBase(b) {
  if (/^origin\//.test(b)) return b;
  if (tryCmd(`git rev-parse --verify origin/${b}`, { cwd: ROOT }).ok) return `origin/${b}`;
  if (tryCmd(`git rev-parse --verify ${b}`, { cwd: ROOT }).ok) return b;
  return b;
}
const base = resolveBase(BASE);

// a tool is usable only if its binary is actually installed in frontend/node_modules
const hasBin = (name) =>
  existsSync(path.join(FRONTEND, "node_modules", ".bin", name)) ||
  existsSync(path.join(FRONTEND, "node_modules", ".bin", `${name}.cmd`));
const canLint = hasBin("eslint");
const canBuild = hasBin("vite");

// ---- collect changed files (committed since merge-base + staged + unstaged)
function changedFiles() {
  const set = new Set();
  const add = (out) =>
    out.split("\n").map((s) => s.trim()).filter(Boolean).forEach((f) => set.add(f));
  const mb = tryCmd(`git merge-base ${base} HEAD`, { cwd: ROOT });
  if (mb.ok) add(tryCmd(`git diff --name-only --diff-filter=d ${mb.out.trim()} HEAD`, { cwd: ROOT }).out);
  add(tryCmd(`git diff --name-only --diff-filter=d HEAD`, { cwd: ROOT }).out);
  add(tryCmd(`git diff --name-only --diff-filter=d --cached`, { cwd: ROOT }).out);
  add(tryCmd(`git ls-files --others --exclude-standard`, { cwd: ROOT }).out); // untracked new files
  return [...set];
}

// ---- findings ------------------------------------------------------------
const findings = [];
const add = (level, check, file, msg, line) => findings.push({ level, check, file, msg, line });

const files = changedFiles();

const SRC_RE = /\.(jsx?|tsx?|css|html)$/;
const MEDIA_RE = /\.(mp4|mov|avi|webm|mkv|mp3|wav|zip|psd|ai|sketch)$/i;

for (const f of files) {
  const abs = path.join(ROOT, f);
  let size = 0;
  try {
    size = statSync(abs).size;
  } catch {
    continue; // deleted file
  }

  // large binaries committed to git
  if (size > 3 * 1024 * 1024)
    add("error", "large-file", f, `${(size / 1048576).toFixed(1)} MB committed to git — host large media externally / use Git LFS`);
  else if (size > 1024 * 1024 || (MEDIA_RE.test(f) && size > 300 * 1024))
    add("warn", "large-file", f, `${(size / 1048576).toFixed(2)} MB — large asset; compress or host externally`);

  if (!SRC_RE.test(f)) continue;

  let text;
  try {
    text = readFileSync(abs, "utf8");
  } catch {
    continue;
  }

  text.split(/\r?\n/).forEach((ln, i) => {
    const n = i + 1;

    if (/^(<{7}|={7}|>{7})/.test(ln))
      add("error", "conflict-marker", f, "unresolved merge conflict marker", n);

    const stale = ln.match(/\b(?:bg|text|ring|border|from|to|via)-brand-[a-z]+\b|\btext-text-h\b|\btext-text\b/);
    if (stale)
      add("error", "stale-token", f, `stale token "${stale[0]}" — use design-system tokens (text-foreground, text-muted-foreground, text-accent, text-primary, bg-primary…)`, n);

    const pal = ln.match(/\b(?:bg|text|border|ring|from|to|via)-(?:red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|gray|slate|zinc|neutral|stone)-\d{2,3}\b/);
    if (pal)
      add("warn", "hardcoded-color", f, `hardcoded palette color "${pal[0]}" — prefer semantic tokens`, n);

    if (/(?:className|style)=[^\n]*#[0-9a-fA-F]{3,8}\b/.test(ln))
      add("warn", "hardcoded-hex", f, "hardcoded hex color — prefer theme tokens", n);

    if (/\bdebugger\b/.test(ln)) add("error", "debugger", f, "debugger statement left in code", n);
    if (/console\.(log|debug)\s*\(/.test(ln)) add("warn", "console", f, "console.log/debug left in code", n);

    if (/from\s+["']\.\.\/\.\.\//.test(ln))
      add("warn", "relative-import", f, 'deep relative import — use the "@/…" alias (AGENT.md)', n);

    if (/from\s+["']axios["']/.test(ln) && !/services?\//.test(f))
      add("warn", "axios-outside-service", f, "axios imported outside a service — only services should use axios (AGENT.md)", n);
  });
}

// package-lock churn (lock changed but package.json didn't)
if (files.some((f) => /package-lock\.json$/.test(f)) && !files.some((f) => /(^|\/)package\.json$/.test(f)))
  add("warn", "lockfile-churn", "frontend/package-lock.json", "package-lock changed without package.json — likely accidental churn; consider reverting");

// ---- ESLint on changed frontend source files -----------------------------
let lint = { status: "skipped", out: "" };
const srcFiles = files.filter((f) => /^frontend\/src\/.*\.(jsx?|tsx?)$/.test(f));
if (SKIP_LINT) {
  lint = { status: "skipped", out: "" };
} else if (!canLint) {
  lint = { status: "skipped (npm install)", out: "" };
} else if (!srcFiles.length) {
  lint = { status: "no-files", out: "" };
} else {
  const rel = srcFiles.map((f) => JSON.stringify(path.relative(FRONTEND, path.join(ROOT, f)))).join(" ");
  const r = tryCmd(`npx --no-install eslint ${rel}`, { cwd: FRONTEND });
  lint = { status: r.ok ? "pass" : "fail", out: r.out };
  if (!r.ok) add("error", "eslint", "(lint)", "ESLint reported problems");
}

// ---- Production build -----------------------------------------------------
let build = { status: "skipped", out: "" };
if (SKIP_BUILD) {
  build = { status: "skipped", out: "" };
} else if (!canBuild) {
  build = { status: "skipped (npm install)", out: "" };
} else {
  const r = tryCmd("npm run build", { cwd: FRONTEND });
  build = { status: r.ok ? "pass" : "fail", out: r.out };
  if (!r.ok) add("error", "build", "(build)", "production build failed");
}

// ---- report --------------------------------------------------------------
console.log(`\n${c.bold("🔎 PR Review Agent")} ${c.dim(`(base: ${base})`)}`);
console.log(c.dim(`Changed files: ${files.length}\n`));

const errors = findings.filter((f) => f.level === "error");
const warns = findings.filter((f) => f.level === "warn");

const line = (fd) => {
  const icon = fd.level === "error" ? c.red("✗") : c.yel("!");
  const loc = fd.line ? `${fd.file}:${fd.line}` : fd.file;
  return `  ${icon} ${c.dim(`[${fd.check}]`)} ${c.cyn(loc)}\n      ${fd.msg}`;
};

if (errors.length) {
  console.log(c.bold(c.red(`ERRORS (${errors.length})`)));
  errors.forEach((f) => console.log(line(f)));
  console.log("");
}
if (warns.length) {
  console.log(c.bold(c.yel(`WARNINGS (${warns.length})`)));
  warns.forEach((f) => console.log(line(f)));
  console.log("");
}

const badge = (s) =>
  s === "pass" ? c.grn("pass") : s === "fail" ? c.red("fail") : c.dim(s);
console.log(`${c.bold("Checks")}: eslint ${badge(lint.status)}  •  build ${badge(build.status)}`);
if (!SKIP_LINT && !canLint) console.log(c.dim("  (lint/build need deps — run `cd frontend && npm install`, or run this via Docker)"));
console.log("");

if (lint.status === "fail") {
  console.log(c.dim("── ESLint output ──"));
  console.log(lint.out.trim().split("\n").slice(-40).join("\n"), "\n");
}
if (build.status === "fail") {
  console.log(c.dim("── Build output (tail) ──"));
  console.log(build.out.trim().split("\n").slice(-25).join("\n"), "\n");
}

if (errors.length) {
  console.log(c.red(c.bold(`✗ ${errors.length} error(s) — fix before raising the PR.`)));
  process.exit(1);
} else if (warns.length) {
  console.log(c.yel(c.bold(`✓ No errors, ${warns.length} warning(s) — review, then you're good to raise the PR.`)));
} else {
  console.log(c.grn(c.bold("✓ All checks passed — ready to raise the PR.")));
}
