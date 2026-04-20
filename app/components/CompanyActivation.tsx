'use client';

import { useEffect, useState } from 'react';

/** One row of the progress list */
interface ProgressItem {
  label: string;
  percent: number;
  dotColor: string;
}

const ITEMS: ProgressItem[] = [
  { label: 'Signed up',   percent: 100, dotColor: 'bg-blue-400' },
  { label: 'Setup',       percent: 80,  dotColor: 'bg-blue-400' },
  { label: 'Aha moment',  percent: 60,  dotColor: 'bg-yellow-400' },
  { label: 'Activated',   percent: 40,  dotColor: 'bg-yellow-400' },
  { label: 'Active',      percent: 80,  dotColor: 'bg-slate-400' },
];

/** Company Activation card – top-right white card */
export default function CompanyActivation() {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    // Start progress bar animation slightly after card appears
    const t2 = setTimeout(() => setAnimate(true), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div
      className={`
        bg-white rounded-2xl border border-slate-200 shadow-sm px-5 py-5 h-full
        card-hover
        ${visible ? 'anim-fade-slide' : 'opacity-0'}
      `}
      style={{ animationDelay: '100ms' }}
    >
      {/* Title row */}
      <div className="flex items-center justify-between mb-1">
        <p className="text-[13px] font-medium text-slate-500">Company activation</p>
      </div>

      {/* Big percentage */}
      <p className="text-[42px] font-extrabold text-slate-900 leading-none mb-5">40%</p>

      {/* Progress bars */}
      <div className="flex flex-col gap-3">
        {ITEMS.map((item, i) => (
          <ProgressRow key={item.label} item={item} animate={animate} index={i} />
        ))}
      </div>
    </div>
  );
}

function ProgressRow({
  item,
  animate,
  index,
}: {
  item: ProgressItem;
  animate: boolean;
  index: number;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Dot */}
      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${item.dotColor}`} />

      {/* Label */}
      <span className="text-[12px] text-slate-500 w-[80px] flex-shrink-0">{item.label}</span>

      {/* Track */}
      <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full progress-animated"
          style={{
            width: animate ? `${item.percent}%` : '0%',
            transition: `width 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 120}ms`,
          }}
        />
      </div>

      {/* Percentage label */}
      <span className="text-[12px] font-semibold text-blue-600 w-9 text-right flex-shrink-0">
        {item.percent}%
      </span>
    </div>
  );
}
