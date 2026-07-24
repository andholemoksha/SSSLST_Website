import { motion } from "framer-motion";

import { applyNow } from "@/content/applynow";

const medallionOutline = "M300 18C462 18 584 122 584 280C584 438 462 542 300 542C138 542 16 438 16 280C16 122 138 18 300 18Z";

function LotusIcon({ className = "" }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 80 58">
      <path d="M40 51C26 46 18 36 18 23c10 2 17 9 22 19V7c10 9 11 22 0 35 5-10 12-17 22-19 0 13-8 23-22 28Z" stroke="currentColor" strokeWidth="2.4" />
      <path d="M40 51C25 51 10 45 4 35c13-4 25 1 36 16ZM40 51c15 0 30-6 36-16-13-4-25 1-36 16Z" stroke="currentColor" strokeWidth="2.4" />
      <path d="M40 51V31" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function LotusSurface() {
  return (
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 600 560">
      <defs>
        <radialGradient id="admissions-purple" cx="50%" cy="88%" r="78%">
          <stop offset="0" stopColor="#A04F91" />
          <stop offset="0.3" stopColor="#69317F" />
          <stop offset="0.7" stopColor="#3B175F" />
          <stop offset="1" stopColor="#24103D" />
        </radialGradient>
        <linearGradient id="admissions-gold" x1="112" y1="73" x2="474" y2="524" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF0A3" />
          <stop offset="0.38" stopColor="#F6D365" />
          <stop offset="1" stopColor="#F9A826" />
        </linearGradient>
        <radialGradient id="admissions-bottom-glow" cx="50%" cy="100%" r="48%">
          <stop stopColor="#FFD66A" stopOpacity="0.95" />
          <stop offset="0.28" stopColor="#F97316" stopOpacity="0.56" />
          <stop offset="1" stopColor="#F97316" stopOpacity="0" />
        </radialGradient>
        <filter id="admissions-soft-glow" x="-12%" y="-12%" width="124%" height="124%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <path d={medallionOutline} fill="url(#admissions-purple)" fillOpacity="0.94" stroke="url(#admissions-gold)" strokeWidth="4" filter="url(#admissions-soft-glow)" />
      <path d={medallionOutline} fill="none" stroke="#FFF5B8" strokeOpacity="0.26" strokeWidth="1" transform="translate(0 5) scale(1 .98)" />
      <path d="M117 431C170 420 219 453 251 513C211 486 172 476 138 481C148 442 135 421 117 431ZM483 431C430 420 381 453 349 513C389 486 428 476 462 481C452 442 465 421 483 431ZM196 454C234 446 271 474 300 538C329 474 366 446 404 454C387 486 388 510 402 529C359 522 328 535 300 558C272 535 241 522 198 529C212 510 213 486 196 454Z" fill="url(#admissions-bottom-glow)" opacity="0.9" />
      <g fill="none" stroke="#F6D365" strokeOpacity="0.22" strokeWidth="2">
        <path d="M300 545C252 516 230 476 234 428C267 440 287 467 300 503C313 467 333 440 366 428C370 476 348 516 300 545Z" />
        <path d="M300 545C242 536 194 506 178 456C226 458 269 486 300 530C331 486 374 458 422 456C406 506 358 536 300 545Z" />
      </g>
      <motion.path d={medallionOutline} fill="none" stroke="#FFF0A3" strokeDasharray="26 620" strokeLinecap="round" strokeWidth="2" animate={{ strokeDashoffset: [0, -646] }} transition={{ duration: 10, ease: "linear", repeat: Infinity }} />
    </svg>
  );
}

export function AdmissionsLotusCard() {
  const isFormPlaceholder = applyNow.formLink.includes("your-google-form");

  return (
    <motion.aside
      aria-label="Admissions are open"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      className="fixed bottom-2 right-2 z-50 h-[158px] w-[170px] sm:bottom-5 sm:right-5"
    >
      <a
        href={isFormPlaceholder ? "#" : applyNow.formLink}
        target={isFormPlaceholder ? undefined : "_blank"}
        rel={isFormPlaceholder ? undefined : "noopener noreferrer"}
        aria-disabled={isFormPlaceholder}
        title={isFormPlaceholder ? "Application form coming soon" : undefined}
        onClick={isFormPlaceholder ? (event) => event.preventDefault() : undefined}
        className="group relative block h-full w-full transition duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F6D365] focus-visible:ring-offset-2"
      >
        <LotusSurface />

        <span className="absolute bottom-[16%] left-[22%] h-1 w-1 rounded-full bg-[#F6D365] shadow-[0_0_10px_3px_rgba(249,168,38,0.65)]" />
        <span className="absolute bottom-[23%] right-[21%] h-1.5 w-1.5 rounded-full bg-orange-200 shadow-[0_0_10px_3px_rgba(249,115,22,0.65)]" />
        <span className="absolute bottom-[13%] right-[34%] h-1 w-1 rounded-full bg-[#F6D365] shadow-[0_0_9px_3px_rgba(246,211,101,0.55)]" />

        <span className="absolute inset-x-[17%] top-[17%] z-10 flex flex-col items-center text-center">
          <LotusIcon className="mb-0.5 h-5 w-7 text-[#F6D365]" />
          <span className="text-[7px] font-bold tracking-[0.2em] text-[#FB923C]">ADMISSIONS OPEN</span>
          <span className="my-1 flex w-full items-center gap-1 text-[#F6D365] before:h-px before:flex-1 before:bg-current after:h-px after:flex-1 after:bg-current">
            <LotusIcon className="h-3 w-4 shrink-0" />
          </span>
          <span className="max-w-[150px] text-[11px] font-medium leading-4 text-white">
            {applyNow.title}
          </span>
          <span className="mt-2.5 rounded-full border border-[#F6D365] bg-gradient-to-r from-[#E96820] to-[#F28B2A] px-3 py-1.5 text-[8px] font-bold tracking-[0.16em] text-white shadow-[0_5px_16px_rgba(249,115,22,0.35)] transition duration-300 group-hover:scale-[1.03] group-hover:from-[#FB923C] group-hover:to-[#FDBA3A] group-hover:shadow-[0_7px_22px_rgba(249,115,22,0.62)]">
            APPLY NOW <span aria-hidden="true">→</span>
          </span>
        </span>
      </a>
    </motion.aside>
  );
}
