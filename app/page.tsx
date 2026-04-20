'use client';

import TopSection         from './components/TopSection';
import CelebrateMilestones from './components/CelebrateMilestones';
import AutomaticEnrichment from './components/AutomaticEnrichment';
import CRMIntegration     from './components/CRMIntegration';
import AnnotationOverlay  from './components/AnnotationOverlay';

/**
 * Main Dashboard Page
 *
 * Layout (desktop):
 * ┌──────────────────────────────────────────┬──────────┐
 * │  Blue Banner  │ Intercom card (overlaps) │ Activation│  ← TopSection
 * ├──────────────────┬───────────────────────┴──────────┤
 * │  Celebrate       │  AutomaticEnrichment             │
 * │  Milestones      ├──────────────────────────────────┤
 * │                  │  CRMIntegration                  │
 * ├──────────────────┴──────────────────────────────────┤
 * │              AnnotationOverlay (bottom)             │
 * └─────────────────────────────────────────────────────┘
 */
export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-10">
      {/* macOS-style outer frame (Light Theme) */}
      <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-3xl shadow-xl p-4 md:p-6 text-slate-900">

        {/* ── Top: overlapping banner + Intercom card + Activation ── */}
        <TopSection />

        {/* ── Dashboard Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column: Milestones + Annotations */}
          <div className="flex flex-col gap-6">
            <CelebrateMilestones />
            <AnnotationOverlay />
          </div>

          {/* Right Column: Enrichment + CRM */}
          <div className="flex flex-col gap-6">
            <AutomaticEnrichment />
            <CRMIntegration />
          </div>

        </div>

      </div>
    </main>
  );
}
