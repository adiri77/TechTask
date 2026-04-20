'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface EnrichedField {
  icon: string;
  label: string;
  value: string;
  isGreen?: boolean;
}

const ENRICHED: EnrichedField[] = [
  { icon: '🌐', label: 'Website',   value: 'intercom.io' },
  { icon: '📍', label: 'Location',  value: 'Dublin, Ireland' },
  { icon: '👥', label: 'Employees', value: '800' },
  { icon: '🐦', label: 'Twitter',   value: '@intercom' },
  { icon: '💰', label: 'Funding',   value: '$241M' },
  { icon: '✓',  label: 'Qualified', value: 'true', isGreen: true },
];

/** Automatic Enrichment panel – beige/amber background */
export default function AutomaticEnrichment() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        rounded-3xl bg-amber-50 border border-amber-200 pt-10 px-8 md:px-10 md:min-h-[480px]
        card-hover relative overflow-hidden flex flex-col justify-between
        ${visible ? 'anim-fade-slide' : 'opacity-0'}
      `}
      style={{ animationDelay: '200ms' }}
    >
      {/* Floating Colliding Icons – top right overlapping the edge */}
      <div className="absolute top-[35%] right-[-15px] flex items-center z-40">
        {/* Left Icon: Map/Location snippet (Behind) */}
        <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 shadow-md overflow-hidden z-0 translate-x-2">
          <Image
            src="/globe.svg"
            alt="Location Map"
            width={48}
            height={48}
            className="w-full h-full object-cover scale-[200%]"
          />
        </div>
        {/* Right Icon: Intercom Logo (On Top) */}
        <div className="w-13 h-13 rounded-full bg-white border-2 border-white shadow-lg flex items-center justify-center -ml-3 z-10">
          <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center p-2.5">
            <Image
              src="/intercom-icon-svgrepo-com.svg"
              alt="Intercom"
              width={28}
              height={28}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Heading Section */}
      <div className="mb-0">
        <h2 className="text-[22px] md:text-[24px] font-black text-[#5c2d1b] mb-3">
          Automatic enrichment
        </h2>
        <p className="text-[14px] md:text-[15px] text-[#7d5b4d] font-medium leading-[1.6] max-w-[420px]">
          Automatically enrich your customers profiles and their users powered by GPT
        </p>
      </div>

      {/* Inner White Enrichment Table Card - Flushed to bottom */}
      <div className="bg-white rounded-t-2xl border-x border-t border-amber-100 shadow-sm p-8 mt-12 mb-0">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[14px]">✨</span>
          <span className="text-[14px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Enriched with AI
          </span>
        </div>

        {/* Enrichment Grid */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {ENRICHED.map((field, i) => (
            <EnrichedRow key={field.label} field={field} delay={i * 80} />
          ))}
        </div>
      </div>
    </div>
  );
}

function EnrichedRow({ field, delay }: { field: EnrichedField; delay: number }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 600 + delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className="flex items-center gap-2"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateX(0)' : 'translateX(10px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Icon */}
      <span className="text-slate-400 text-[13px] w-5 h-5 flex items-center justify-center border border-slate-100 rounded-full">
        {field.icon}
      </span>
      {/* Label */}
      <span className="text-[13px] text-slate-400 font-medium">
        {field.label}
      </span>
      {/* Value */}
      <span
        className={`text-[13px] font-semibold flex-1 text-right md:text-left ${
          field.isGreen ? 'text-emerald-500' : 'text-slate-700'
        }`}
      >
        {field.value}
      </span>
    </div>
  );
}
