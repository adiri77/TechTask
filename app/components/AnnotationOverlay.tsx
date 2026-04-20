'use client';

import { useEffect, useState } from 'react';

/**
 * AnnotationOverlay – renders the "Also done for you" handwritten label
 * plus two highlighted badges ("Last seen today" and "Activated true")
 * with a self-drawing curved SVG arrow pointing toward the CRM panel.
 */
export default function AnnotationOverlay() {
  const [visible, setVisible] = useState(false);
  const [badgePop, setBadgePop] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 400);
    // badges pop in after the panel fades
    const t2 = setTimeout(() => setBadgePop(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className={`
        relative flex flex-col gap-3 pt-2
        ${visible ? 'anim-fade-slide' : 'opacity-0'}
      `}
      style={{ animationDelay: '400ms' }}
    >
      {/* ── "Last seen today" badge ─────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Arrow connector line */}
        <div className="flex-1 h-px bg-slate-300" />

        <div
          className={`
            flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm
            transition-all duration-500
            ${badgePop ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
        >
          <span className="text-emerald-500 text-[11px] font-medium relative">
            <span className="relative flex h-2 w-2 mr-1 inline-block align-middle">
              <span className="anim-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            ⚡ Last seen
          </span>
          <span className="bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-md">
            today
          </span>
        </div>
      </div>

      {/* ── Handwritten annotation + curved arrow ───────────── */}
      <div className="flex items-end gap-3 ml-4">
        <div className="flex flex-col items-start">
          <span className="font-handwritten text-[22px] text-slate-700 leading-tight select-none">
            Also done for you
          </span>
          {/* Self-drawing curved SVG arrow */}
          <svg
            viewBox="0 0 90 50"
            className="w-20 h-10 mt-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Curved path representing a hand-drawn arrow */}
            <path
              d="M 5 10 C 10 35, 40 45, 75 32"
              stroke="#475569"
              strokeWidth="2"
              strokeLinecap="round"
              className="anim-draw-arrow"
            />
            {/* Arrowhead */}
            <path
              d="M 70 27 L 76 32 L 68 36"
              stroke="#475569"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="anim-draw-arrow"
            />
          </svg>
        </div>
      </div>

      {/* ── "Activated true" badge ──────────────────────────── */}
      <div className="flex items-center gap-2 ml-4">
        <div className="flex-1 h-px bg-slate-300 max-w-[80px]" />
        <div
          className={`
            flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm
            transition-all duration-500
            ${badgePop ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          `}
          style={{ transitionDelay: '150ms' }}
        >
          <span className="text-[11px] text-slate-500 font-medium">⚡ Activated</span>
          <span
            className={`
              bg-emerald-100 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded-md
              ${badgePop ? 'anim-pop' : ''}
            `}
          >
            true
          </span>
        </div>
      </div>
    </div>
  );
}
