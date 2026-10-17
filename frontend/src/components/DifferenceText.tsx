"use client";

import { motion, useReducedMotion } from "framer-motion";

const impacts = [
  { x: -180, y: -100, rotate: -35, delay: 0.05 },
  { x: 0, y: 140, rotate: 25, delay: 0.12 },
  { x: -130, y: 20, rotate: -20, delay: 0.19 },
  { x: 150, y: -100, rotate: 35, delay: 0.26 },
  { x: 0, y: 120, rotate: -25, delay: 0.33 },
  { x: 160, y: 30, rotate: 30, delay: 0.4 },
  { x: -100, y: -100, rotate: -30, delay: 0.47 },
  { x: 0, y: 130, rotate: 25, delay: 0.54 },
  { x: 150, y: -80, rotate: -35, delay: 0.61 },
  { x: 120, y: 80, rotate: 30, delay: 0.68 },
];

export default function DifferenceText() {
  const reducedMotion = useReducedMotion();

  const letterTransition = (index: number) =>
    reducedMotion
      ? { duration: 0 }
      : {
          type: "spring" as const,
          stiffness: 520,
          damping: 17,
          mass: 0.65,
          delay: impacts[index].delay,
        };

  return (
    <div
      className="relative mx-auto w-full max-w-[850px] min-w-0 overflow-visible"
      aria-label="Difference"
    >
      {/* Subtle animated red background glow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[55%] rounded-full bg-red-600 blur-[55px]"
        animate={
          reducedMotion
            ? { opacity: 0.45, scale: 1 }
            : {
                opacity: [0.3, 0.65, 0.3],
                scale: [0.9, 1.08, 0.9],
              }
        }
        transition={{
          duration: 5,
          repeat: reducedMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      <svg
        viewBox="0 0 1000 250"
        role="img"
        aria-labelledby="difference-title"
        className="relative z-10 block h-auto w-full min-w-0 overflow-visible"
      >
        <title id="difference-title">Difference</title>

        <defs>
          {/* Rough, printed ink texture */}
          <filter id="rough-ink" x="-15%" y="-15%" width="130%" height="130%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.045"
              numOctaves="2"
              seed="8"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="3.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          {/* Subtle paper grain */}
          <filter id="paper-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="2"
              seed="12"
              result="grain"
            />
            <feColorMatrix in="grain" type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.13" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" mode="screen" />
          </filter>

          <linearGradient id="ivory-ink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF7E8" />
            <stop offset="50%" stopColor="#E8DDC9" />
            <stop offset="100%" stopColor="#B8AFA5" />
          </linearGradient>

          <linearGradient id="orange-ink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF9A52" />
            <stop offset="45%" stopColor="#F45B35" />
            <stop offset="100%" stopColor="#C93220" />
          </linearGradient>

          <pattern
            id="scratches"
            width="17"
            height="19"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M2 1 L8 7 M12 11 L16 16 M3 15 L6 12"
              stroke="#241C27"
              strokeWidth="1.6"
              opacity=".48"
            />
          </pattern>

          <clipPath id="paper-cut">
            <path d="M250 53 L325 37 L341 187 L272 199 L242 166 Z" />
          </clipPath>
        </defs>

        {/* Fine hand-drawn lines behind the lettering */}
        <g
          fill="none"
          stroke="#F4E7D3"
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity=".9"
        >
          <motion.path
            d="M105 193 Q180 164 245 177 T395 158 L470 170"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.45, delay: 0.45 }}
          />
          <motion.path
            d="M580 165 C635 35 708 51 670 106 S624 196 715 197"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: reducedMotion ? 0 : 0.5, delay: 0.65 }}
          />
        </g>

        {/* Torn dark-paper layer behind the first F */}
        <motion.g
          initial={reducedMotion ? false : { opacity: 0, y: -25, rotate: -8 }}
          whileInView={{ opacity: 1, y: 0, rotate: -5 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.3, delay: 0.2 }}
        >
          <path
            d="M245 46 L321 28 L346 171 L278 195 L242 166 Z"
            fill="#29262B"
          />
          <path
            d="M245 46 L321 28 L346 171 L278 195 L242 166 Z"
            fill="url(#scratches)"
            opacity=".8"
          />
        </motion.g>

        {/* D — rough, expressive brush lettering */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: impacts[0].x,
                  y: impacts[0].y,
                  rotate: impacts[0].rotate,
                  scale: 1.5,
                }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: -3, scale: 1 }}
          transition={letterTransition(0)}
          style={{ transformOrigin: "155px 120px" }}
        >
          <text
            x="91"
            y="164"
            fontFamily="Georgia, serif"
            fontSize="157"
            fontWeight="900"
            fill="url(#ivory-ink)"
            stroke="#E8DDC9"
            strokeWidth="1"
            filter="url(#rough-ink)"
          >
            D
          </text>
          <path
            d="M87 68 L104 83 L119 91 L100 109 L96 143 L80 166 L93 183 L72 174 L87 152 L91 119 L76 100 Z"
            fill="#FFF7E8"
          />
          <path
            d="M88 67 L113 85 L125 94 M77 162 L95 153 L105 135"
            stroke="#FFF7E8"
            strokeWidth="4"
            fill="none"
          />
        </motion.g>

        {/* I — thin orange blade */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: impacts[1].x,
                  y: impacts[1].y,
                  rotate: impacts[1].rotate,
                  scaleY: 1.7,
                }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: -1, scale: 1 }}
          transition={letterTransition(1)}
          style={{ transformOrigin: "211px 120px" }}
        >
          <path
            d="M193 53 L208 42 L207 178 L192 188 Z"
            fill="url(#orange-ink)"
          />
          <path
            d="M195 67 L204 58 L201 169"
            stroke="#FFBE85"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M192 187 L200 181 L205 196"
            fill="none"
            stroke="#F45B35"
            strokeWidth="2"
          />
        </motion.g>

        {/* First F — rigid, architectural letter */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: impacts[2].x,
                  y: impacts[2].y,
                  rotate: impacts[2].rotate,
                  scale: 1.6,
                }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          transition={letterTransition(2)}
          style={{ transformOrigin: "275px 120px" }}
        >
          <path
            d="M224 62 L298 62 L298 84 L254 84 L254 115 L289 115 L289 136 L254 136 L254 181 L226 181 Z"
            fill="url(#ivory-ink)"
          />
          <path
            d="M230 68 L290 68 L290 76 L246 76 L246 120 L281 120"
            fill="none"
            stroke="#A49B91"
            strokeWidth="2"
          />
        </motion.g>

        {/* Second F — loud, torn orange paint */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: impacts[3].x,
                  y: impacts[3].y,
                  rotate: impacts[3].rotate,
                  scale: 1.6,
                }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: -4, scale: 1 }}
          transition={letterTransition(3)}
          style={{ transformOrigin: "364px 122px" }}
        >
          <path
            d="M320 78 L402 52 L382 78 L344 92 L379 91 L365 111 L339 120 L370 117 L353 139 L331 143 L350 156 L322 174 L334 148 L308 151 L327 128 L304 126 L323 104 L303 103 Z"
            fill="url(#orange-ink)"
            filter="url(#rough-ink)"
          />
          <path
            d="M316 98 L359 81 M324 121 L365 105 M322 144 L349 135"
            fill="none"
            stroke="#FFB17A"
            strokeWidth="2"
            opacity=".8"
          />
          <path
            d="M311 105 L302 112 L313 114 M350 162 L360 154"
            fill="none"
            stroke="#F45B35"
            strokeWidth="3"
          />
        </motion.g>

        {/* R — tall, elegant serif */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: impacts[4].x,
                  y: impacts[4].y,
                  rotate: impacts[4].rotate,
                  scaleY: 1.5,
                }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: -1, scale: 1 }}
          transition={letterTransition(4)}
          style={{ transformOrigin: "451px 120px" }}
        >
          <text
            x="379"
            y="164"
            fontFamily="Bodoni MT, Didot, Georgia, serif"
            fontSize="168"
            fontWeight="400"
            fill="url(#ivory-ink)"
          >
            R
          </text>
          <path
            d="M398 57 L417 51 L434 67 L449 53 L443 78"
            fill="none"
            stroke="#F5EADD"
            strokeWidth="1.5"
            opacity=".8"
          />
        </motion.g>

        {/* E — thin outlined editorial letter */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: impacts[5].x,
                  y: impacts[5].y,
                  rotate: impacts[5].rotate,
                  scale: 1.4,
                }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
          transition={letterTransition(5)}
          style={{ transformOrigin: "526px 120px" }}
        >
          <text
            x="462"
            y="159"
            fontFamily="Arial, sans-serif"
            fontSize="143"
            fontWeight="200"
            fill="none"
            stroke="#F4E7D3"
            strokeWidth="1.8"
          >
            E
          </text>
          <path
            d="M470 91 L509 91 M471 124 L499 124 M471 153 L512 153"
            stroke="#2B2330"
            strokeWidth="3"
            opacity=".8"
          />
        </motion.g>

        {/* N — textured slab */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: impacts[6].x,
                  y: impacts[6].y,
                  rotate: impacts[6].rotate,
                  scale: 1.5,
                }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: 2, scale: 1 }}
          transition={letterTransition(6)}
          style={{ transformOrigin: "596px 120px" }}
        >
          <text
            x="516"
            y="165"
            fontFamily="Impact, Haettenschweiler, sans-serif"
            fontSize="148"
            fontWeight="900"
            fill="#D5CEC2"
            filter="url(#rough-ink)"
          >
            N
          </text>
          <path
            d="M547 73 L563 87 L573 111 M602 75 L615 91 L627 111 M551 147 L564 159"
            fill="none"
            stroke="#817A78"
            strokeWidth="2"
          />
        </motion.g>

        {/* C — oversized, curved, expressive */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: impacts[7].x,
                  y: impacts[7].y,
                  rotate: impacts[7].rotate,
                  scale: 1.7,
                }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: -5, scale: 1 }}
          transition={letterTransition(7)}
          style={{ transformOrigin: "708px 120px" }}
        >
          <text
            x="620"
            y="169"
            fontFamily="Georgia, serif"
            fontSize="183"
            fontWeight="400"
            fill="url(#ivory-ink)"
            filter="url(#rough-ink)"
          >
            C
          </text>
          <path
            d="M726 61 C687 40 656 70 651 106 C645 137 662 160 686 171"
            stroke="#F45B35"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M732 67 L748 53 L740 75 M662 167 L650 181 L671 177"
            stroke="#F45B35"
            strokeWidth="3"
            fill="none"
          />
        </motion.g>

        {/* Final E — sharp painted exit */}
        <motion.g
          initial={
            reducedMotion
              ? false
              : {
                  opacity: 0,
                  x: impacts[8].x,
                  y: impacts[8].y,
                  rotate: impacts[8].rotate,
                  scale: 1.7,
                }
          }
          animate={{ opacity: 1, x: 0, y: 0, rotate: -4, scale: 1 }}
          transition={letterTransition(8)}
          style={{ transformOrigin: "819px 120px" }}
        >
          <path
            d="M752 80 L843 47 L824 71 L778 88 L820 86 L805 105 L775 116 L814 113 L796 134 L771 140 L789 153 L753 174 L770 145 L747 145 L766 124 L746 122 L766 101 L746 101 Z"
            fill="url(#orange-ink)"
            filter="url(#rough-ink)"
          />
          <path
            d="M761 97 L810 78 M758 121 L802 105 M758 143 L787 135"
            fill="none"
            stroke="#FFC08B"
            strokeWidth="2"
          />
        </motion.g>

        {/* Crown — thin chalk-like outline */}
        <motion.path
          d="M486 29 L484 6 L501 22 L517 0 L516 28 L536 14 L524 37 L488 36 Z"
          fill="none"
          stroke="#F4E7D3"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ opacity: 0, y: -15, rotate: -12 }}
          whileInView={{ opacity: 0.9, y: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reducedMotion ? 0 : 0.3,
            delay: reducedMotion ? 0 : 0.9,
          }}
        />

        {/* Finishing slash accents */}
        <motion.g
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: reducedMotion ? 0 : 0.25,
            delay: reducedMotion ? 0 : 1,
          }}
          style={{ transformOrigin: "center" }}
        >
          <path
            d="M107 205 L235 176 L292 184 L365 161"
            fill="none"
            stroke="#F4E7D3"
            strokeWidth="1.5"
          />
          <path
            d="M760 186 L850 157 L895 146"
            fill="none"
            stroke="#F45B35"
            strokeWidth="2"
          />
          <path
            d="M824 175 L870 161 L887 152"
            fill="none"
            stroke="#F4E7D3"
            strokeWidth="1"
          />
        </motion.g>
      </svg>
    </div>
  );
}
