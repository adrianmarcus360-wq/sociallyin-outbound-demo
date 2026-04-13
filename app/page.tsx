"use client";
import React, { useState } from "react";
import Image from "next/image";

// ─── Types & Data ─────────────────────────────────────────────────────────────

type Tab = "agents" | "prospects" | "sequence" | "integrations";

const AGENTS = [
  { name: "Scout", role: "ICP Scoring & Discovery", status: "active", done: 47, queue: 0, desc: "Scores every company 0–100, assigns Tier 1/2/3, pulls Fortune 1000, Inc. 5000, and Series B+ targets." },
  { name: "Mapper", role: "Account Tree Builder", status: "active", done: 183, queue: 12, desc: "Identifies 3–7 contacts per company. Tags each as Decision Maker, Champion, Influencer, or Budget Holder." },
  { name: "Intel", role: "Cross-Platform Research", status: "running", done: 156, queue: 27, desc: "Parallel research on LinkedIn, Twitter/X, and Instagram. Surfaces personal signals — sports, hobbies, causes, career wins." },
  { name: "Profiler", role: "Profile Card Generator", status: "active", done: 134, queue: 22, desc: "Synthesizes Intel data into Profile Cards. Selects best SociallyIn case study per industry." },
  { name: "Wordsmith", role: "Message Personalization", status: "idle", done: 89, queue: 45, desc: "Generates custom first lines, 3 subject variants, LinkedIn messages, social DM openers, and gift recommendations." },
  { name: "Conductor", role: "Sequence Enrollment", status: "active", done: 62, queue: 8, desc: "Enrolls into HubSpot + LinkedIn sequences. Account-level pause on any reply, anywhere." },
  { name: "Router", role: "Reply Classification", status: "active", done: 11, queue: 2, desc: "Classifies every reply: Hot / Warm / Soft No / Hard No / Referral / OOO. Drafts replies for human review." },
  { name: "Syncer", role: "HubSpot Enterprise Sync", status: "active", done: 183, queue: 0, desc: "Real-time sync with custom HubSpot properties: icp_score, tree_role, personal_hook, gift_status, sequence_status." },
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
  { day: 1, label: "Email 1 — Personalized Hook", type: "email", desc: "Hyper-personalized first line from Profile Card + relevant SociallyIn case study link." },
  { day: 3, label: "LinkedIn Connection", type: "linkedin", desc: "Connect request with customized note tied to their recent post or career win." },
  { day: 5, label: "Email 2 — Competitor Angle", type: "email", desc: "Follow-up: competitor angle or trending tactic in their industry." },
  { day: 8, label: "LinkedIn Message 1", type: "linkedin", desc: "First LinkedIn message — value-first, zero sales pressure." },
  { day: 10, label: "Email 3 — Unique Insight", type: "email", desc: "Reddit / SEO angle or unique insight their team likely hasn't considered." },
  { day: 13, label: "Loom Video", type: "video", desc: "60-second personal Loom recorded for this specific contact — biggest pattern interrupt in the sequence." },
  { day: 18, label: '"Did I get this wrong?"', type: "email", desc: "The reply-getter. Honest, short, non-pushy. Invites feedback instead of demanding attention." },
  { day: 22, label: "Gift Drop", type: "gift", desc: "Personalized gift based on their interests: Lakers gear, golf, restaurant credit, or cause donation." },
  { day: 28, label: "Break-Up Email", type: "email", desc: "The most-replied-to email in any sequence. Closure framing. Short. Honest." },
];

const INTEGRATIONS = [
  { name: "HubSpot Enterprise", note: "CRM + sequences + custom properties", status: "active" },
  { name: "Apollo.io", note: "Prospect discovery & enrichment", status: "phase2" },
  { name: "XPL e.com API", note: "Deep enrichment layer", status: "phase2" },
  { name: "Proxycurl", note: "LinkedIn profile data", status: "phase2" },
  { name: "Heyreach", note: "LinkedIn automation & sequences", status: "phase2" },
  { name: "Instantly.ai", note: "Email sequence engine", status: "phase2" },
  { name: "Apify", note: "Social media scraping", status: "phase2" },
  { name: "Sendoso", note: "Gift fulfillment", status: "phase2" },
];

// ─── Mini SVG icons (inline, no library needed) ────────────────────────────

const Icons = {
  agents: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 001.357 2.059l.904.452a2.25 2.25 0 001.957-.092L21 12.25M4.5 15.75l4.5-4.5M21 12.25v8a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V12.25" />
    </svg>
  ),
  prospects: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  sequence: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
    </svg>
  ),
  integrations: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  filter: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
  ),
  sort: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
  ),
  export: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  search: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  bell: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  ),
  check: (
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statusBadge(s: string) {
  if (s === "active") return <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200"><span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />Active</span>;
  if (s === "running") return <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />Running</span>;
  if (s === "idle") return <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />Idle</span>;
  return null;
}

function stageBadge(s: string) {
  if (s === "Hot Reply") return <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">🔥 Hot Reply</span>;
  if (s === "Meeting Set") return <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">✅ Meeting Set</span>;
  if (s === "Warm Reply") return <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">♻️ Warm Reply</span>;
  if (s === "Connected") return <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">🔗 Connected</span>;
  return <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">{s}</span>;
}

function tierBadge(t: number) {
  if (t === 1) return <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">Tier 1</span>;
  return <span className="inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">Tier 2</span>;
}

const seqColors: Record<string, string> = {
  email: "bg-orange-500",
  linkedin: "bg-blue-500",
  video: "bg-purple-500",
  gift: "bg-pink-500",
};

const seqLabels: Record<string, string> = {
  email: "Email",
  linkedin: "LinkedIn",
  video: "Video",
  gift: "Gift",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [tab, setTab] = useState<Tab>("agents");

  const navItems: { id: Tab; label: string; icon: React.ReactElement }[] = [
    { id: "agents", label: "Agent Pipeline", icon: Icons.agents },
    { id: "prospects", label: "Live Prospects", icon: Icons.prospects },
    { id: "sequence", label: "Sequence Logic", icon: Icons.sequence },
    { id: "integrations", label: "Integrations", icon: Icons.integrations },
  ];

  const activeAgents = AGENTS.filter(a => a.status === "active" || a.status === "running").length;
  const totalDone = AGENTS.reduce((s, a) => s + a.done, 0);
  const totalQueue = AGENTS.reduce((s, a) => s + a.queue, 0);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className="w-56 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-100">
          <Image src="/sociallyin-logo.png" alt="SociallyIn" width={120} height={30} className="object-contain" />
        </div>

        {/* Search */}
        <div className="px-3 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <span className="text-gray-400">{Icons.search}</span>
            <span className="text-xs text-gray-400">Search...</span>
            <span className="ml-auto text-[10px] text-gray-300 font-mono bg-gray-100 px-1 rounded">⌘K</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Pipeline</p>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                tab === item.id
                  ? "bg-orange-50 text-orange-600 border border-orange-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <span className={tab === item.id ? "text-orange-500" : "text-gray-400"}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Workspace card */}
        <div className="px-3 py-3 border-t border-gray-100">
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">K</span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">Keith Kakadia</p>
              <p className="text-[10px] text-gray-400">SociallyIn · Phase 1</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-gray-900">
              {tab === "agents" && "Agent Pipeline"}
              {tab === "prospects" && "Live Prospects"}
              {tab === "sequence" && "Sequence Logic"}
              {tab === "integrations" && "Integrations"}
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {tab === "agents" && "8 AI agents · Fortune 1000 outbound system"}
              {tab === "prospects" && "183 contacts · 47 companies · Phase 1 demo data"}
              {tab === "sequence" && "28-day multi-channel sequence · Email + LinkedIn + Gift"}
              {tab === "integrations" && "HubSpot Enterprise active · APIs connect in Phase 2"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              8 Agents Live
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
              {Icons.bell}
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">K</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">

          {/* ── AGENTS ── */}
          {tab === "agents" && (
            <div className="space-y-5">
              {/* Summary cards */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Total Agents", value: "8", sub: "Full pipeline coverage" },
                  { label: "Active / Running", value: `${activeAgents}`, sub: "+2 vs idle baseline", up: true },
                  { label: "Tasks Completed", value: totalDone.toString(), sub: "+38 this week", up: true },
                  { label: "Queue Remaining", value: totalQueue.toString(), sub: "Across all agents" },
                ].map(c => (
                  <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-gray-500 font-medium">{c.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{c.value}</p>
                    <p className={`text-xs mt-1 font-medium ${c.up ? "text-green-600" : "text-gray-400"}`}>
                      {c.up ? "↑ " : ""}{c.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Table toolbar */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-64">
                    <span className="text-gray-400">{Icons.search}</span>
                    <input className="bg-transparent text-sm text-gray-600 outline-none placeholder-gray-400 w-full" placeholder="Search agents..." />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50">
                      {Icons.filter} Filter
                    </button>
                    <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50">
                      {Icons.sort} Sort
                    </button>
                    <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50">
                      {Icons.export} Export
                    </button>
                  </div>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="w-10 px-5 py-3"><input type="checkbox" className="rounded border-gray-300" /></th>
                      {["Agent", "Role", "Status", "Tasks Done", "Queue", "Description"].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {AGENTS.map((a, i) => (
                      <tr key={a.name} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5"><input type="checkbox" className="rounded border-gray-300" /></td>
                        <td className="px-4 py-3.5">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                            <p className="text-xs text-gray-400">Agent #{i + 1}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-sm text-gray-600">{a.role}</td>
                        <td className="px-4 py-3.5">{statusBadge(a.status)}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-400 rounded-full" style={{ width: `${Math.min(100, (a.done / 200) * 100)}%` }} />
                            </div>
                            <span className="text-sm font-semibold text-gray-800">{a.done}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`text-sm font-semibold ${a.queue > 0 ? "text-orange-600" : "text-green-600"}`}>{a.queue}</span>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-gray-500 max-w-xs">{a.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <select className="text-xs text-gray-600 bg-white border border-gray-200 rounded px-2 py-1">
                      <option>10 records</option>
                      <option>25 records</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1].map(n => (
                      <button key={n} className="w-7 h-7 text-xs font-medium rounded bg-orange-500 text-white">{n}</button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">Showing 1 – 8 of 8</p>
                </div>
              </div>
            </div>
          )}

          {/* ── PROSPECTS ── */}
          {tab === "prospects" && (
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Companies Targeted", value: "47", sub: "+12 this week", up: true },
                  { label: "Contacts Mapped", value: "183", sub: "+38 this week", up: true },
                  { label: "In Active Sequence", value: "62", sub: "34% of pipeline", up: true },
                  { label: "Meetings Booked", value: "3", sub: "17.7% reply rate", up: true },
                ].map(c => (
                  <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-gray-500 font-medium">{c.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{c.value}</p>
                    <p className="text-xs mt-1 font-medium text-green-600">↑ {c.sub}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-64">
                    <span className="text-gray-400">{Icons.search}</span>
                    <input className="bg-transparent text-sm text-gray-600 outline-none placeholder-gray-400 w-full" placeholder="Search prospects..." />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50">{Icons.filter} Filter</button>
                    <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50">{Icons.sort} Sort</button>
                    <button className="inline-flex items-center gap-2 text-sm font-medium text-white bg-orange-500 border border-orange-500 px-3 py-2 rounded-lg hover:bg-orange-600">{Icons.export} Export CSV</button>
                  </div>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="w-10 px-5 py-3"><input type="checkbox" className="rounded border-gray-300" /></th>
                      {["Company", "Contact", "Job Title", "Tier", "ICP Score", "Stage", "Channel"].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {PROSPECTS.map((p, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5"><input type="checkbox" className="rounded border-gray-300" /></td>
                        <td className="px-4 py-3.5">
                          <p className="text-sm font-semibold text-gray-900">{p.company}</p>
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-bold">{p.contact.split(" ").map(n => n[0]).join("")}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">{p.contact}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-gray-500">{p.title}</td>
                        <td className="px-4 py-3.5">{tierBadge(p.tier)}</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-400 rounded-full" style={{ width: `${p.score}%` }} />
                            </div>
                            <span className="text-sm font-bold text-gray-800">{p.score}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">{stageBadge(p.stage)}</td>
                        <td className="px-4 py-3.5 text-sm text-gray-500">{p.channel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <select className="text-xs text-gray-600 bg-white border border-gray-200 rounded px-2 py-1"><option>10 records</option></select>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="w-7 h-7 text-xs rounded bg-orange-500 text-white font-medium">1</button>
                    <button className="w-7 h-7 text-xs rounded text-gray-600 hover:bg-gray-100">2</button>
                    <button className="w-7 h-7 text-xs rounded text-gray-600 hover:bg-gray-100">...</button>
                    <button className="w-7 h-7 text-xs rounded text-gray-600 hover:bg-gray-100">19</button>
                  </div>
                  <p className="text-xs text-gray-400">Showing 1 – 8 of 183</p>
                </div>
              </div>
            </div>
          )}

          {/* ── SEQUENCE ── */}
          {tab === "sequence" && (
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Sequence Length", value: "28", sub: "days total" },
                  { label: "Total Touchpoints", value: "9", sub: "email + LinkedIn + gift" },
                  { label: "Avg Reply Rate", value: "17.7%", sub: "Industry avg: 3-5%", up: true },
                  { label: "Meetings / 100", value: "1.6", sub: "+0.8 vs cold email only", up: true },
                ].map(c => (
                  <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-gray-500 font-medium">{c.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{c.value}</p>
                    <p className={`text-xs mt-1 font-medium ${c.up ? "text-green-600" : "text-gray-400"}`}>{c.up ? "↑ " : ""}{c.sub}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50">
                  <p className="text-sm font-semibold text-gray-700">28-Day Sequence Timeline</p>
                  <p className="text-xs text-gray-400 mt-0.5">Account-level pause: one reply anywhere → all sequences at that company stop instantly</p>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {["Day", "Step", "Type", "Description"].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {SEQUENCES.map((s) => (
                      <tr key={s.day} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border-2 border-orange-200 text-orange-600 text-xs font-bold bg-orange-50">D{s.day}</span>
                        </td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">{s.label}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full text-white ${seqColors[s.type]}`}>
                            {seqLabels[s.type]}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-gray-500 max-w-md">{s.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── INTEGRATIONS ── */}
          {tab === "integrations" && (
            <div className="space-y-5">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Active Integrations", value: "1", sub: "HubSpot Enterprise" },
                  { label: "Planned — Phase 2", value: "7", sub: "APIs ready to connect" },
                  { label: "Est. Monthly Cost", value: "$950–$1.6K", sub: "One deal pays 6–12 months", up: true },
                  { label: "HubSpot Contacts", value: "183", sub: "Synced in real-time", up: true },
                ].map(c => (
                  <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                    <p className="text-xs text-gray-500 font-medium">{c.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{c.value}</p>
                    <p className={`text-xs mt-1 font-medium ${c.up ? "text-green-600" : "text-gray-400"}`}>{c.up ? "↑ " : ""}{c.sub}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 border-b border-gray-100 bg-gray-50">
                  <p className="text-sm font-semibold text-gray-700">Integration Stack</p>
                  <p className="text-xs text-gray-400 mt-0.5">Layered on top of SociallyIn&apos;s existing HubSpot Enterprise. Real connections activate in Phase 2.</p>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {["Platform", "Purpose", "Status"].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {INTEGRATIONS.map(integ => (
                      <tr key={integ.name} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5 text-sm font-semibold text-gray-900">{integ.name}</td>
                        <td className="px-5 py-3.5 text-sm text-gray-500">{integ.note}</td>
                        <td className="px-5 py-3.5">
                          {integ.status === "active"
                            ? <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200"><span className="text-green-500">{Icons.check}</span> Active</span>
                            : <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">Phase 2</span>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
