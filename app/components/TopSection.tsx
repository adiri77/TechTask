'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * TopSection — The full-width light-blue banner is the background container.
 * Both the Intercom card and the Company Activation card sit INSIDE it,
 * side by side at the same height.
 * Company Activation card is tilted slightly counter-clockwise (~-4°).
 *
 * ┌──────────────────────────────────────────────────────────┐
 * │  Blue Banner Background                                  │
 * │                                                          │
 * │  "We automatically           ┌────────┐  ╔════════════╗ │
 * │   generate reports..."       │Intercom│  ║  Company   ║ │  ← tilted -4°
 * │                              │  card  │  ║ Activation ║ │
 * │                              └────────┘  ╚════════════╝ │
 * └──────────────────────────────────────────────────────────┘
 */
export default function TopSection() {
  const [visible, setVisible] = useState(false);
  const [barsAnimated, setBarsAnimated] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setBarsAnimated(true), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className={`w-full mb-4 ${visible ? 'anim-fade-slide' : 'opacity-0'}`}
      style={{ animationDelay: '0ms' }}
    >
      {/* ── Full-width Blue Primary Card ─────────────────────────── */}
      <div className="w-full bg-sky-100 border border-sky-200 rounded-2xl relative min-h-[auto] md:min-h-[220px] overflow-hidden md:overflow-visible">
        
        {/* Headline text - top left of the blue card */}
        <div className="p-6 md:absolute md:top-7 md:left-6 z-0">
          <p className="text-[17px] md:text-[17px] font-extrabold text-slate-800 leading-snug max-w-[240px] md:max-w-[200px]">
            We automatically generate reports for each of your customers
          </p>
        </div>

        {/* Gray Container - overlays the blue background on the right */}
        <div className="flex flex-col md:flex-row justify-end pr-0 pt-0">
          <div 
            className="bg-slate-50 border-t md:border-t-0 border-l-0 md:border-l border-slate-200 rounded-b-2xl md:rounded-2xl w-full md:w-[65%] mt-0 md:mt-12 mb-0 md:mb-[-1px] mr-0 md:mr-[-1px] px-4 md:px-8 py-8 md:py-10 shadow-sm flex flex-col md:flex-row items-center md:items-start justify-end gap-6 z-10"
          >
            {/* Intercom card */}
            <div className="flex-shrink-0 w-full max-w-[240px] card-hover">
              <IntercomCard />
            </div>

            {/* Company Activation card — tilted on desktop */}
            <div
              className="flex-shrink-0 w-full max-w-[240px] card-hover"
              style={{ transform: typeof window !== 'undefined' && window.innerWidth > 768 ? 'rotate(-4deg)' : 'none', transformOrigin: 'bottom center' }}
            >
              <CompanyActivationCard barsAnimated={barsAnimated} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── Intercom customer card ──────────────────────────────────── */
function IntercomCard() {
  const stats = [
    { icon: '⚡', label: 'Total seats',        value: '50',     green: false },
    { icon: '⚡', label: 'Active seats',       value: '22',     green: false },
    { icon: '⚡', label: 'Active last 7 days', value: 'True ✓', green: true  },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-md px-4 py-3.5 relative overflow-hidden">
      {/* Colorful top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-400 via-purple-400 to-orange-300 opacity-60" />
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-3 pt-1">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-slate-100 shadow-sm">
          <Image
            src="/intercom-icon-svgrepo-com.svg"
            alt="Intercom"
            width={40}
            height={40}
            className="w-full h-full object-contain p-1"
          />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-slate-900">Intercom</p>
          <p className="text-[12px] text-slate-400">Joined 9 Feb 2023</p>
        </div>
      </div>

      <div className="border-t border-slate-100 mb-2.5" />

      {/* Stats */}
      <div className="flex flex-col gap-2">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 text-[11px]">{s.icon}</span>
              <span className="text-[12px] text-slate-500">{s.label}</span>
            </div>
            <span className={`text-[12px] font-semibold ${s.green ? 'text-emerald-500' : 'text-slate-800'}`}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Company Activation progress card ───────────────────────── */
interface ProgressItem { label: string; percent: number; dotColor: string; }

const PROGRESS_ITEMS: ProgressItem[] = [
  { label: 'Signed up',  percent: 100, dotColor: 'bg-blue-400'   },
  { label: 'Setup',      percent: 80,  dotColor: 'bg-blue-400'   },
  { label: 'Aha moment', percent: 60,  dotColor: 'bg-yellow-400' },
  { label: 'Activated',  percent: 40,  dotColor: 'bg-yellow-400' },
  { label: 'Active',     percent: 80,  dotColor: 'bg-slate-400'  },
];

function CompanyActivationCard({ barsAnimated }: { barsAnimated: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md px-4 py-4 relative overflow-hidden">
      {/* Colorful top border accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 to-indigo-400 opacity-60" />

      {/* Title + big % */}
      <p className="text-[11px] font-medium text-slate-400 mb-0.5 pt-1">Company activation</p>
      <p className="text-[38px] font-extrabold text-slate-900 leading-none mb-4">40%</p>

      {/* Progress bars */}
      <div className="flex flex-col gap-2">
        {PROGRESS_ITEMS.map((item, i) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dotColor}`} />
            <span className="text-[10px] text-slate-500 w-[62px] flex-shrink-0 truncate">{item.label}</span>
            <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{
                  width: barsAnimated ? `${item.percent}%` : '0%',
                  transition: `width 0.85s cubic-bezier(0.4,0,0.2,1) ${i * 120}ms`,
                }}
              />
            </div>
            <span className="text-[10px] font-semibold text-blue-600 w-7 text-right flex-shrink-0">
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
