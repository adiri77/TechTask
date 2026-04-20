'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface CrmRow {
  name: string;
  color: string;
  activeSeats: number;
  change: number;
}

const CRM_DATA: CrmRow[] = [
  { name: 'Intercom', color: 'bg-slate-800', activeSeats: 22, change: 3 },
  { name: 'Annie',    color: 'bg-pink-400',  activeSeats: 20, change: -2 },
];

/** Integrated with your CRM panel – green background */
export default function CRMIntegration() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        rounded-2xl bg-emerald-50 border border-emerald-200 p-5 md:p-6 h-full
        card-hover
        ${visible ? 'anim-fade-slide' : 'opacity-0'}
      `}
      style={{ animationDelay: '250ms' }}
    >
      {/* Heading */}
      <h2 className="text-[17px] font-bold text-slate-900 mb-1">
        Integrated with your CRM
      </h2>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-4 max-w-[280px]">
        Connect June to your CRM and sync product usage data with your CS and sales teams
      </p>

      {/* CRM Table Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">CRM</span>
          <div className="flex items-center gap-2">
            {/* Attio logo from /public */}
            <Image src="/Attio.svg" alt="Attio" width={24} height={24} className="w-6 h-6 rounded-md" />
            {/* HubSpot logo from /public */}
            <Image src="/hubspot-1.svg" alt="HubSpot" width={24} height={24} className="w-6 h-6" />
          </div>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-2 px-3 py-1.5 bg-slate-50 border-b border-slate-100">
          <span className="text-[11px] font-medium text-slate-400">Company</span>
          <span className="text-[11px] font-medium text-slate-400 text-right">Active seats</span>
        </div>

        {/* Rows */}
        {CRM_DATA.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-2 px-3 py-2.5 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              {/* Show intercom icon for first row, colored dot for others */}
              {row.name === 'Intercom' ? (
                <Image src="/intercom-icon-svgrepo-com.svg" alt="Intercom" width={14} height={14} className="w-3.5 h-3.5" />
              ) : (
                <span className={`w-3 h-3 rounded-sm flex-shrink-0 ${row.color}`} />
              )}
              <span className="text-[13px] font-medium text-slate-700">{row.name}</span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <span className="text-[13px] font-semibold text-slate-800">{row.activeSeats}</span>
              <span
                className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full ${
                  row.change > 0
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-red-500 bg-red-50'
                }`}
              >
                {row.change > 0 ? `+${row.change}` : row.change}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


