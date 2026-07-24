import { motion } from "framer-motion";

import { applyNow } from "@/content/applynow";

const lotusPath = "M160 9C145 39 125 40 108 16C94 43 103 68 126 81C94 59 70 61 49 79C65 106 89 112 116 101C83 115 59 140 53 169C81 180 106 170 126 149C110 182 115 211 134 234C142 208 151 185 160 170C169 185 178 208 186 234C205 211 210 182 194 149C214 170 239 180 267 169C261 140 237 115 204 101C231 112 255 106 271 79C250 61 226 59 194 81C217 68 226 43 212 16C195 40 175 39 160 9Z";

function LotusMark({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 64 48"
    >
      <path d="M32 43C19 38 12 27 12 16c9 1 15 7 20 15V5c8 7 10 16 0 26 5-8 11-14 20-15 0 11-7 22-20 27Z" fill="currentColor" />
      <path d="M32 43C19 38 4 37 1 27c11-2 20 3 31 16ZM32 43c13-5 28-6 31-16-11-2-20 3-31 16Z" fill="currentColor" />
      <path d="M32 43V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LotusOutline() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 320 340"
    >
      <defs>
        <radialGradient id="lotus-surface" cx="50%" cy="92%" r="85%">
          <stop offset="0%" stopColor="#8D3C89" />
          <stop offset="45%" stopColor="#5B2CA5" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#351468" stopOpacity="0.94" />
        </radialGradient>
        <linearGradient id="lotus-gold" x1="42" y1="22" x2="276" y2="318" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F6D365" />
          <stop offset="0.46" stopColor="#FFF0A3" />
          <stop offset="1" stopColor="#F9A826" />
        </linearGradient>
        <linearGradient id="lotus-orange" x1="160" y1="188" x2="160" y2="330" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB923C" stopOpacity="0" />
          <stop offset="1" stopColor="#F97316" stopOpacity="0.52" />
        </linearGradient>
        <filter id="lotus-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path
        d={lotusPath}
        fill="url(#lotus-surface)"
        stroke="url(#lotus-gold)"
        strokeWidth="2"
        filter="url(#lotus-glow)"
      />
      <motion.path
        d={lotusPath}
        fill="none"
        stroke="#FFF0A3"
        strokeDasharray="18 310"
        strokeLinecap="round"
        strokeWidth="1.2"
        animate={{ strokeDashoffset: [0, -328] }}
        transition={{ duration: 9, ease: "linear", repeat: Infinity }}
      />
      <path
        d="M53 169C81 180 106 170 126 149C110 182 115 211 134 234C142 208 151 185 160 170C169 185 178 208 186 234C205 211 210 182 194 149C214 170 239 180 267 169L267 310L53 310Z"
        fill="url(#lotus-orange)"
        opacity="0.85"
      />
    </svg>
  );
}

export function AdmissionsLotusCard() {
  return (
    <motion.aside
      aria-label="Admissions are open"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      className="fixed bottom-2 right-2 z-50 h-[300px] w-[250px] sm:bottom-5 sm:right-5 sm:h-[320px] sm:w-[280px] lg:h-[330px] lg:w-[300px]"
    >
      <a
        href={applyNow.formLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full w-full items-center justify-center text-center backdrop-blur-[14px] transition duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6D365] focus-visible:ring-offset-2"
      >
        <LotusOutline />

        <span className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-[#F6D365] opacity-[0.08]">
          <LotusMark className="h-28 w-36" />
        </span>
        <span className="absolute bottom-[18%] left-[25%] h-1.5 w-1.5 rounded-full bg-[#F6D365] shadow-[0_0_10px_3px_rgba(249,168,38,0.55)]" />
        <span className="absolute bottom-[24%] right-[23%] h-1 w-1 rounded-full bg-orange-200 shadow-[0_0_10px_3px_rgba(249,115,22,0.6)]" />
        <span className="absolute bottom-[13%] right-[34%] h-1 w-1 rounded-full bg-[#F6D365] shadow-[0_0_9px_3px_rgba(246,211,101,0.45)]" />

        <span className="relative z-10 flex w-[72%] flex-col items-center pt-1">
          <LotusMark className="mb-2 h-7 w-9 text-[#F6D365]" />
          <span className="rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C] px-3 py-1 text-[9px] font-bold tracking-[0.24em] text-white shadow-[0_3px_12px_rgba(249,115,22,0.35)]">
            ADMISSIONS OPEN
          </span>
          <span className="my-3 h-px w-16 bg-gradient-to-r from-transparent via-[#F6D365] to-transparent" />
          <span className="max-w-[205px] text-sm font-medium leading-6 text-white sm:text-[15px]">
            {applyNow.title}
          </span>
          <span className="mt-5 rounded-full bg-gradient-to-r from-[#F97316] to-[#FB923C] px-5 py-2.5 text-xs font-bold tracking-wide text-white shadow-[0_5px_16px_rgba(249,115,22,0.32)] transition duration-300 group-hover:scale-[1.03] group-hover:from-[#FB923C] group-hover:to-[#FDBA3A] group-hover:shadow-[0_7px_22px_rgba(249,115,22,0.58)]">
            APPLY NOW <span aria-hidden="true">→</span>
          </span>
        </span>
      </a>
    </motion.aside>
  );
}
