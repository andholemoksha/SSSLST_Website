/**
 * Sri Sathya Sai Leadership — Design Palette
 * ------------------------------------------
 * Single reference of every brand color, gradient, and glow from the
 * design palette board. This file is the raw source of truth for palette
 * values only — it does NOT replace the semantic theme tokens.
 *
 * Rule (see docs/DESIGN_SYSTEM.md): components must consume semantic tokens
 * (text-foreground, bg-primary, font-heading, …). Use this palette to WIRE
 * those tokens in index.css / build gradients — never hardcode these hex
 * values directly inside components.
 *
 * Structure mirrors the palette board sections:
 *   colors → textColors → textGradients → backgroundGradients →
 *   glowColors → glowGradients → gradientStops
 */

// 1. COLORS ---------------------------------------------------------------
export const colors = {
  // Primary — Royal Purple family (dark → light)
  primary: ["#4B1F82", "#5B2CBF", "#6D2EA7", "#7B36A8", "#8D46C2"],

  // Secondary — Magenta → Warm Orange accents
  secondary: ["#A54D97", "#B24B8C", "#C96A65", "#D66B3A", "#D87334"],

  // Neutral — surfaces + text greys
  neutral: ["#FFFFFF", "#F8F5FC", "#F5F2FF", "#EEE6FF", "#E9E6F2", "#5F5F6B", "#8B8B99"],

  // Soft Background Colors — tint washes for sections/cards
  softBackground: [
    "#ECE7FF", "#F8F5FF", "#FFF7F4", "#FFF2E8", "#FFF9F5",
    "#FFF2E9", "#FFFDF8", "#FFF8EF", "#F8EAFB", "#FFF2F7",
    "#EEF2FF", "#F5F0FF", "#FEEFF8",
  ],
};

// 2. TEXT COLORS ----------------------------------------------------------
export const textColors = {
  primaryHeading: "#4B1F82",
  secondaryHeading: "#7B36A8",
  bodyText: "#5F5F6B",
  mutedText: "#8B8B99",
};

// 3. TEXT GRADIENTS (color stops, left → right) ---------------------------
export const textGradients = {
  leadership: ["#5B2CBF", "#7B36A8", "#A54D97", "#C96A65", "#D87334"],
  purple: ["#4B1F82", "#6D2EA7", "#8D46C2"],
  purpleToPink: ["#4B1F82", "#7B36A8", "#B24B8C"],
  purpleToOrange: ["#4B1F82", "#7B36A8", "#B24B8C", "#D66B3A"],
};

// 4. BACKGROUND GRADIENTS (color stops) -----------------------------------
export const backgroundGradients = {
  mainHero: ["#ECE7FF", "#F8F5FF", "#FFF7F4", "#FFF2E8"],
  alternateHero: ["#F5F2FF", "#EEE6FF", "#FFEFF8", "#FFF2F7"],
  purpleHero: ["#F5F2FF", "#EEE6FF", "#F8EAFB", "#FFF2F7"],
  rightBackground: ["#FFFFFF", "#FFF9F5", "#FFF2E9"],
  lavenderMist: ["#EEF2FF", "#F5F0FF", "#FFFFFF"],
  spiritualCream: ["#FFFDF8", "#FFF8EF", "#FFF3EA"],
  purpleCta: ["#4B1F82", "#6D2EA7", "#8D46C2"],
  brand: ["#4B1F82", "#7B36A8", "#B24B8C", "#D66B3A"],
  glass: ["rgba(255,255,255,0.85)", "rgba(247,241,255,0.72)", "rgba(255,246,239,0.65)"],
};

// 5. GLOW COLORS (solid rgba) ---------------------------------------------
export const glowColors = {
  purple: "rgba(168,120,255,0.16)",
  lavender: "rgba(200,175,255,0.18)",
  peach: "rgba(255,180,130,0.14)",
  pink: "rgba(210,120,165,0.14)",
  warmCream: "rgba(255,236,210,0.18)",
};

// 6. GLOW GRADIENTS (ready-to-use radial-gradient strings) ----------------
export const glowGradients = {
  purple: "radial-gradient(circle, rgba(168,120,255,0.16), transparent 70%)",
  lavender: "radial-gradient(circle, rgba(200,175,255,0.18), transparent 65%)",
  peach: "radial-gradient(circle, rgba(255,180,130,0.14), transparent 70%)",
  purplePeach:
    "radial-gradient(circle at 20% 30%, rgba(168,120,255,0.16), transparent 45%), " +
    "radial-gradient(circle at 85% 70%, rgba(255,180,130,0.14), transparent 45%)",
  purpleLavender:
    "radial-gradient(circle at 25% 25%, rgba(168,120,255,0.16), transparent 45%), " +
    "radial-gradient(circle at 85% 75%, rgba(200,175,255,0.18), transparent 45%)",
  ethereal:
    "radial-gradient(circle at 15% 20%, rgba(168,120,255,0.12), transparent 40%), " +
    "radial-gradient(circle at 85% 25%, rgba(255,180,150,0.10), transparent 40%), " +
    "radial-gradient(circle at 50% 80%, rgba(200,175,255,0.10), transparent 45%)",
};

// 7. GRADIENT STOP REFERENCES (all stops, soft washes → brand hues) -------
export const gradientStops = [
  "#ECE7FF", "#F8F5FF", "#FFF7F4", "#FFF2E8", "#F5F2FF", "#EEE6FF",
  "#FFEFF8", "#F8EAFB", "#FFF2F7", "#EEF2FF", "#F5F0FF",
  "#4B1F82", "#5B2CBF", "#6D2EA7", "#7B36A8", "#8D46C2",
  "#A54D97", "#B24B8C", "#C96A65", "#D66B3A", "#D87334",
];

// Aggregate export — import { palette } for the whole board.
export const palette = {
  colors,
  textColors,
  textGradients,
  backgroundGradients,
  glowColors,
  glowGradients,
  gradientStops,
};

export default palette;
