'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/** Celebrate Milestones panel – purple card */
export default function CelebrateMilestones() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`
        rounded-2xl bg-purple-50 border border-purple-200 p-6 md:p-8 md:min-h-[580px]
        card-hover shadow-sm w-full flex flex-col
        ${visible ? 'anim-fade-slide' : 'opacity-0'}
      `}
      style={{ animationDelay: '150ms' }}
    >
      {/* Heading Section */}
      <div className="mb-6">
        <h2 className="text-[17px] font-bold text-slate-900 mb-1">
          Celebrate milestones
        </h2>
        <p className="text-[13px] text-slate-500 leading-relaxed max-w-[300px]">
          Instant alerts and weekly digests to keep your team aligned and celebrate wins
        </p>
      </div>

      {/* Inner event card - pushed to center/top area with space below */}
      <div className="flex-1">
        <EventCard />
      </div>
    </div>
  );
}

/** The inner notification-style event card */
function EventCard() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3.5 text-[12px]">
      {/* Header row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          {/* Attio logo */}
          <Image src="/Attio.svg" alt="Attio" width={20} height={20} className="w-5 h-5 rounded-full" />
          <span className="font-semibold text-slate-700 text-[12px]">June</span>
          <span className="text-slate-400 text-[11px]">AM · 10:36 AM</span>
        </div>
        {/* Slack icon from public */}
        <Image src="/Slack.svg" alt="Slack" width={20} height={20} className="w-5 h-5" />
      </div>

      {/* Event type */}
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-yellow-400">⭐</span>
        <span className="font-semibold text-slate-800">Qualified signup</span>
      </div>

      {/* User */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-blue-400">👤</span>
        <span className="text-slate-700 font-medium">Eoghan McCabe</span>
        <a href="#" className="text-blue-500 hover:underline">eoghan@intercom.io</a>
      </div>

      {/* Details table */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-slate-100 pt-2.5 text-[11px]">
        <DetailCell label="Company name" value="Intercom" />
        <DetailCell label="Location" value="Dublin, Ireland" />
        <DetailCell label="Role" value="CTO & Co-Founder" />
        <DetailCell label="Company website" valueLink="intercom.io" />
        <DetailCell label="Company size" value="800" />
        <DetailCell label="LinkedIn" valueLink="View profile" />
        <DetailCell label="Funding amount" value="$3M" />
        <DetailCell label="Crunchbase" valueLink="View company" />
      </div>
    </div>
  );
}

function DetailCell({
  label,
  value,
  valueLink,
}: {
  label: string;
  value?: string;
  valueLink?: string;
}) {
  return (
    <div>
      <p className="text-slate-400 mb-0.5">{label}:</p>
      {valueLink ? (
        <a href="#" className="text-blue-500 hover:underline font-medium">{valueLink}</a>
      ) : (
        <p className="text-slate-700 font-medium">{value}</p>
      )}
    </div>
  );
}


