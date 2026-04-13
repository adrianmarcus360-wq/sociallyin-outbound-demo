"use client";

import { useState } from "react";
import Image from "next/image";

// ─── Data ────────────────────────────────────────────────────────────────────

const AGENTS = [
  {
    id: "scout",
    emoji: "🔍",
    name: "Scout",
    role: "ICP Scoring & Discovery",
    desc: "Scores every company 0–100, assigns Tier 1/2/3, pulls Fortune 1000, Inc. 5000, and Series B+ targets.",
    status: "active",
    done: 47,
    queue: 0,
  },
  {
    id: "mapper",
    emoji: "🗺️",
    name: "Mapper",
    role: "Account Tree Builder",
    desc: "Identifies 3–7 contacts per company. Tags each as Decision Maker, Champion, Influencer, or Budget Holder.",
    status: "active",
    done: 183,
    queue: 12,
  },
  {
    id: "intel",
    emoji: "🕵️",
    name: "Intel",
    role: "Cross-Platform Research",
    desc: "Parallel research on LinkedIn, Twitter/X, and Instagram. Surfaces personal signals — sports, hobbies, causes, career wins.",
    status: "running",
    done: 156,
    queue: 27,
  },
  {
    id: "profiler",
    emoji: "🧠",
    name: "Profiler",
    role: "Profile Card Generator",
    desc: "Synthesizes Intel data into Profile Cards. Selects the best SociallyIn case study per industry. Rates personalization confidence.",
    status: "active",
    done: 134,
    queue: 22,
  },
  {
    id: "wordsmith",
    emoji: "✍️",
    name: "Wordsmith",
    role: "Message Personalization",
    desc: "Generates custom first lines, 3 subject variants, LinkedIn messages, social DM openers, and gift recommendations.",
    status: "idle",
    done: 89,
    queue: 45,
  },
  {
    id: "conductor",
    emoji: "🎬",
    name: "Conductor",
    role: "Sequence Enrollment",
    desc: "Enrolls into HubSpot + LinkedIn sequences. When anyone at a company responds, all sequences at that account pause instantly.",
    status: "active",
    done: 62,
    queue: 8,
  },
  {
    id: "router",
    emoji: "📬",
    name: "Router",
    role: "Reply Classification",
    desc: "Classifies every reply: Hot / Warm / Soft No / Hard No / Referral / OOO. Drafts replies for human review. Never auto-sends.",
    status: "active",
    done: 11,
    queue: 2,
  },
  {
    id: "syncer",
    emoji: "🔄",
    name: "Syncer",
    role: "HubSpot Enterprise Sync",
    desc: "Real-time sync to HubSpot with custom properties: ICP score, tree role, personal hook, gift status, sequence status.",
    status: "active",
    done: 183,
    queue: 0,
  },
];

const METRICS = [
  { label: "Companies Identified", value: "47", trend: "+12 this week", up: true },
  { label: "Contacts Mapped", value: "183", trend: "+38 this week", up: true },
  { label: "In Active Sequence", value: "62", trend: "34% of pipeline", up: true },
  { label: "Replies Received", value: "11", trend: "17.7% reply rate", up: true },
  { label: "Meetings Booked", value: "3", trend: "Avg $105K deal", up: true },
  { label: "Est. Pipeline", value: "$315K", trend: "Phase 1 demo data", up: null },
];

const PROSPECTS = [
  { company: "Marriott International", contact: "Sarah Chen", title: "VP of Brand Marketing", tier: 1, score: 96, stage: "Hot Reply", channel: "Email" },
  { company: "Capital One", contact: "Marcus Williams", title: "Director of Social Strategy", tier: 1, score: 92, stage: "Hot Reply", channel: "LinkedIn" },
  { company: "Best Buy", contact: "Jennifer Park", title: "CMO", tier: 1, score: 89, stage: "Warm Reply", channel: "Email" },
  { company: "Hilton Hotels", contact: "Michelle James", title: "SVP Brand Marketing", tier: 1, score: 86, stage: "Meeting Set", channel: "LinkedIn" },
  { company: "Target Corporation", contact: "Derek Simmons", title: "VP Brand Marketing", tier: 1, score: 88, stage: "Connected", channel: "LinkedIn" },
  { company: "Wingstop", contact: "Carlos Rivera", title: "Chief Marketing Officer", tier: 2, score: 83, stage: "Meeting Set", channel: "Email" },
  { company: "General Mills", contact: "David Torres", title: "Sr. Director, Digital & Social", tier: 1, score: 85, stage: "Warm Reply", channel: "Email" },
  { company: "Peloton", contact: "Nicole Grant", title: "CMO", tier: 1, score: 84, stage: "Day 2", channel: "Email" },
];

const SEQUENCES = [
  { day: 1, label: "Email 1", desc: "Hyper-personalized first line from Profile Card + relevant SociallyIn case study link.", type: "email" },
  { day: 3, label: "LinkedIn Connection", desc: "Connect request with customized note tied to their recent post or career win.", type: "linkedin" },
  { day: 5, label: "Email 2", desc: "Follow-up: competitor angle or trending tactic in their industry.", type: "email" },
  { day: 8, label: "LinkedIn Message", desc: "First LinkedIn message — value-first, zero sales pressure.", type: "linkedin" },
  { day: 10, label: "Email 3", desc: "Reddit / SEO angle or unique insight their team likely hasn't considered.", type: "email" },
  { day: 13, label: "Loom Video", desc: "60-second personal Loom recorded for this specific contact — biggest pattern interrupt in the sequence.", type: "video" },
  { day: 18, label: '"Did I get this wrong?"', desc: "The reply-getter. Honest, short, non-pushy. Invites feedback instead of demanding attention.", type: "email" },
  { day: 22, label: "Gift Drop", desc: "Pattern interrupt: personalized gift based on their interests (Lakers gear, golf, restaurant credit, or cause donation).", type: "gift" },
  { day: 28, label: "Break-Up Email", desc: "The most-replied-to email in any sequence. Closure framing. Short. Honest.", type: "email" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const statusConfig = (s: string) => {
  switch (s) {
    case "active": return { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200", label: "Active" };
    case "running": return { dot: "bg-blue-500", text: "text-blue-700", bg: "bg-blue-50 border-blue-200", label: "Running" };
    case "idle": return { dot: "bg-amber-400", text: "text-amber-700", bg: "bg-amber-50 border-amber-200", label: "Idle" };
    default: return { dot: "bg-gray-400", text: "text-gray-600", bg: "bg-gray-50 border-gray-200", label: "Offline" };
  }
};

const stageConfig = (s: string) => {
  if (s === "Hot Reply") return "bg-red-50 text-red-700 border border-red-200";
  if (s === "Meeting Set") return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  if (s === "Warm Reply") return "bg-amber-50 text-amber-700 border border-amber-200";
  if (s === "Connected") return "bg-blue-50 text-blue-700 border border-blue-200";
  return "bg-gray-100 text-gray-600 border border-gray-200";
};

const stageIcon = (s: string) => {
  if (s === "Hot Reply") return "🔥";
  if (s === "Meeting Set") return "✅";
  if (s === "Warm Reply") return "♻️";
  if (s === "Connected") return "🔗";
  return "📧";
};

const tierConfig = (t: number) => {
  if (t === 1) return "bg-orange-50 text-orange-700 border border-orange-200";
  if (t === 2) return "bg-purple-50 text-purple-700 border border-purple-200";
  return "bg-gray-100 text-gray-600 border border-gray-200";
};

const seqTypeConfig = (t: string) => {
  if (t === "email") return { bg: "bg-orange-50 border-orange-200", icon: "📧", label: "Email" };
  if (t === "linkedin") return { bg: "bg-blue-50 border-blue-200", icon: "💼", label: "LinkedIn" };
  if (t === "video") return { bg: "bg-purple-50 border-purple-200", icon: "🎬", label: "Video" };
  if (t === "gift") return { bg: "bg-pink-50 border-pink-200", icon: "🎁", label: "Gift" };
  return { bg: "bg-gray-50 border-gray-200", icon: "📩", label: "Other" };
};

const channelIcon = (c: string) => c === "LinkedIn" ? "💼" : "📧";

// ─── Component ───────────────────────────────────────────────────────────────

export default function Home() {
  const [tab, setTab] = useState<"agents" | "prospects" | "sequence">("agents");

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/sociallyin-logo.png" alt="SociallyIn" width={140} height={36} className="object-contain" />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500 text-sm font-medium">AI Outbound Intelligence</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-medium">Phase 1 · Demo</span>
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse-dot" />
              8 Agents Live
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Page title ── */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Outbound Pipeline</h1>
          <p className="text-gray-500 text-sm mt-1">
            Fortune 1000 targeting · Account-based multi-contact sequences · HubSpot Enterprise sync
          </p>
        </div>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <p className="text-xs text-gray-500 font-medium mb-1">{m.label}</p>
              <p className="text-2xl font-bold text-gray-900">{m.value}</p>
              <p className={`text-xs mt-1 font-medium ${
                m.up === true ? "text-emerald-600" : m.up === false ? "text-red-500" : "text-gray-400"
              }`}>
                {m.up === true && "↑ "}{m.trend}
              </p>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit mb-6">
          {(["agents", "prospects", "sequence"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all capitalize ${
                tab === t
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "agents" ? "Agent Pipeline" : t === "prospects" ? "Live Prospects" : "Sequence Logic"}
            </button>
          ))}
        </div>

        {/* ── AGENTS ── */}
        {tab === "agents" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {AGENTS.map((agent, i) => {
                const sc = statusConfig(agent.status);
                return (
                  <div
                    key={agent.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:-translate-y-0.5 transition-transform"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{agent.emoji}</span>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${sc.bg} ${sc.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse-dot ${sc.dot}`} />
                        {sc.label}
                      </span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">
                      {agent.name}
                      <span className="text-orange-500 text-xs ml-1.5 font-semibold">#{i + 1}</span>
                    </p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5 mb-2">{agent.role}</p>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">{agent.desc}</p>
                    <div className="flex justify-between pt-3 border-t border-gray-100 text-xs">
                      <span className="text-gray-400">Completed <span className="text-gray-800 font-semibold">{agent.done}</span></span>
                      <span className="text-gray-400">Queue <span className={`font-semibold ${agent.queue > 0 ? "text-orange-500" : "text-emerald-600"}`}>{agent.queue}</span></span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pipeline flow */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <p className="text-sm font-semibold text-gray-700 mb-4">Pipeline Flow</p>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {AGENTS.map((agent, i) => {
                  const sc = statusConfig(agent.status);
                  return (
                    <div key={agent.id} className="flex items-center gap-1.5 flex-shrink-0">
                      <div className={`flex flex-col items-center gap-1 px-3 py-2.5 rounded-lg border text-center ${sc.bg}`}>
                        <span className="text-base">{agent.emoji}</span>
                        <span className="text-xs font-semibold text-gray-700">{agent.name}</span>
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      </div>
                      {i < AGENTS.length - 1 && (
                        <span className="text-gray-300 text-sm">→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── PROSPECTS ── */}
        {tab === "prospects" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 text-sm">Active Prospect Pipeline</p>
                <p className="text-xs text-gray-400 mt-0.5">183 contacts · 47 companies · Fortune 1000 targets</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">🔥 Hot (2)</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">✅ Meeting (3)</span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">♻️ Warm (2)</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Company", "Contact", "Title", "Tier", "ICP Score", "Stage", "Channel"].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {PROSPECTS.map((p, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">{p.company}</td>
                      <td className="px-5 py-3.5 text-sm text-gray-700">{p.contact}</td>
                      <td className="px-5 py-3.5 text-xs text-gray-500">{p.title}</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${tierConfig(p.tier)}`}>Tier {p.tier}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-orange-400 rounded-full"
                              style={{ width: `${p.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-800">{p.score}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${stageConfig(p.stage)}`}>
                          {stageIcon(p.stage)} {p.stage}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          {channelIcon(p.channel)} {p.channel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-400">Showing 8 of 183 contacts · Phase 1 demo data</p>
            </div>
          </div>
        )}

        {/* ── SEQUENCE ── */}
        {tab === "sequence" && (
          <div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-5">
              <p className="font-semibold text-gray-900 text-sm mb-1">28-Day Multi-Channel Sequence</p>
              <p className="text-xs text-gray-500">
                Every touch is generated by Wordsmith from the contact&apos;s Profile Card.
                Account-level pause: one reply anywhere → all sequences at that company stop instantly.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gray-200" />
              <div className="space-y-3">
                {SEQUENCES.map((step) => {
                  const sc = seqTypeConfig(step.type);
                  return (
                    <div key={step.day} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white border-2 border-gray-200 shadow-sm flex flex-col items-center justify-center z-10">
                        <span className="text-orange-500 text-[10px] font-black leading-none">D{step.day}</span>
                      </div>
                      <div className={`flex-1 border rounded-xl p-4 ${sc.bg}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-900 text-sm">{step.label}</span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white border border-gray-200 text-gray-500 text-xs">
                            {sc.icon} {sc.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ── Integration Footer ── */}
      <section className="max-w-7xl mx-auto px-6 py-8 mt-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <p className="text-sm font-semibold text-gray-700 mb-1">Integration Stack</p>
          <p className="text-xs text-gray-400 mb-4">Layered on top of SociallyIn&apos;s existing HubSpot Enterprise. Real connections in Phase 2.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "HubSpot Enterprise", note: "CRM + sequences", status: "✅ Active" },
              { name: "Apollo.io", note: "Prospect discovery", status: "Phase 2" },
              { name: "XPL e.com API", note: "Enrichment layer", status: "Phase 2" },
              { name: "Proxycurl", note: "LinkedIn data", status: "Phase 2" },
              { name: "Heyreach", note: "LinkedIn automation", status: "Phase 2" },
              { name: "Instantly.ai", note: "Email engine", status: "Phase 2" },
            ].map((integ) => (
              <div key={integ.name} className="border border-gray-100 rounded-lg p-3 text-center bg-gray-50">
                <p className="text-xs font-semibold text-gray-700 mb-1">{integ.name}</p>
                <p className="text-xs text-gray-400 mb-2">{integ.note}</p>
                <p className={`text-xs font-medium ${integ.status === "✅ Active" ? "text-emerald-600" : "text-gray-400"}`}>{integ.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 bg-white mt-4">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/sociallyin-logo.png" alt="SociallyIn" width={90} height={24} className="object-contain opacity-60" />
            <span className="text-gray-300 text-xs">·</span>
            <span className="text-xs text-gray-400">AI Outbound Intelligence System · Confidential Demo</span>
          </div>
          <p className="text-xs text-gray-400">Built for Keith · APIs in Phase 2</p>
        </div>
      </footer>

    </div>
  );
}
