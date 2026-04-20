'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/** Top banner: auto-report message + Intercom customer card */
export default function TopBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // trigger fade-in after hydration
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        w-full rounded-2xl bg-sky-100 border border-sky-200 p-5 md:p-7
        card-hover
        ${visible ? 'anim-fade-slide' : 'opacity-0'}
      `}
      style={{ animationDelay: '0ms' }}
    >
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-stretch">

        {/* Left – headline text */}
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <p className="text-[15px] md:text-[16px] font-bold text-slate-800 leading-snug max-w-[260px]">
            We automatically generate reports for each of your customers
          </p>
        </div>

        {/* Right – Intercom customer card */}
        <div className="flex-shrink-0 w-full md:w-auto">
          <IntercomCard />
        </div>
      </div>
    </div>
  );
}

/** Small Intercom info card inside the banner */
function IntercomCard() {
  const stats: { icon: string; label: string; value: string | number | boolean }[] = [
    { icon: '⚡', label: 'Total seats',       value: 50 },
    { icon: '⚡', label: 'Active seats',      value: 22 },
    { icon: '⚡', label: 'Active last 7 days', value: 'True' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm px-4 py-3 w-full md:w-[280px]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {/* Intercom logo placeholder – styled square */}
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src="/intercom-icon-svgrepo-com.svg"
            alt="Intercom"
            width={40}
            height={40}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-slate-900">Intercom</p>
          <p className="text-[12px] text-slate-400">Joined 9 Feb 2023</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 mb-2" />

      {/* Stats */}
      <div className="flex flex-col gap-1.5">
        {stats.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-500 text-[11px]">{s.icon}</span>
              <span className="text-[12px] text-slate-500">{s.label}</span>
            </div>
            <span className={`text-[12px] font-semibold ${s.value === 'True' ? 'text-emerald-500' : 'text-slate-800'}`}>
              {s.value === 'True'
                ? <span className="flex items-center gap-1">True <span className="text-emerald-500">✓</span></span>
                : s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
