"use client";
import React from "react";

import { useState } from "react";
import Image from "next/image";

// ─── Icons (inline SVG) ───────────────────────────────────────────────────────

const Icon = {
  dashboard: (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>,
  agents:    (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  prospects: (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  sequence:  (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>,
  integrations: (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  settings:  (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  help:      (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  search:    (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  filter:    (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  sort:      (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 6h18M7 12h10M11 18h2"/></svg>,
  export:    (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  bell:      (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  chevron:   (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="9 18 15 12 9 6"/></svg>,
  dot:       (cls = "") => <svg className={cls} viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="4"/></svg>,
  check:     (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>,
  menu:      (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  target:    (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  trending:  (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  mail:      (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  calendar:  (cls = "") => <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
};

// ─── Data ────────────────────────────────────────────────────────────────────

const AGENTS = [
  { id: "scout",     emoji: "🔍", name: "Scout",      role: "ICP Scoring & Discovery",      status: "active",  done: 47,  queue: 0,  desc: "Scores companies 0–100, assigns Tier 1/2/3, pulls Fortune 1000, Inc. 5000, Series B+ targets." },
  { id: "mapper",    emoji: "🗺️", name: "Mapper",     role: "Account Tree Builder",          status: "active",  done: 183, queue: 12, desc: "Identifies 3–7 contacts/company. Tags Decision Maker, Champion, Influencer, Budget Holder." },
  { id: "intel",     emoji: "🕵️", name: "Intel",      role: "Cross-Platform Research",       status: "running", done: 156, queue: 27, desc: "Parallel LinkedIn, Twitter/X, Instagram research. Surfaces personal signals — sports, hobbies, career wins." },
  { id: "profiler",  emoji: "🧠", name: "Profiler",   role: "Profile Card Generator",        status: "active",  done: 134, queue: 22, desc: "Synthesizes Intel into Profile Cards. Selects best SociallyIn case study per industry." },
  { id: "wordsmith", emoji: "✍️", name: "Wordsmith",  role: "Message Personalization",       status: "idle",    done: 89,  queue: 45, desc: "Generates custom first lines, 3 subject variants, LinkedIn messages, social DM openers, gift recs." },
  { id: "conductor", emoji: "🎬", name: "Conductor",  role: "Sequence Enrollment",           status: "active",  done: 62,  queue: 8,  desc: "Enrolls into HubSpot + LinkedIn sequences. Any reply at a company pauses all sequences instantly." },
  { id: "router",    emoji: "📬", name: "Router",     role: "Reply Classification",          status: "active",  done: 11,  queue: 2,  desc: "Classifies replies: Hot / Warm / Soft No / Hard No / Referral / OOO. Drafts replies for human review." },
  { id: "syncer",    emoji: "🔄", name: "Syncer",     role: "HubSpot Enterprise Sync",       status: "active",  done: 183, queue: 0,  desc: "Real-time HubSpot sync: icp_score, tree_role, personal_hook, gift_status, sequence_status." },
];

const PROSPECTS = [
  { company: "Marriott International", contact: "Sarah Chen",      title: "VP of Brand Marketing",       tier: 1, score: 96, stage: "Hot Reply",   channel: "Email",    days: 4  },
  { company: "Capital One",            contact: "Marcus Williams", title: "Director of Social Strategy",  tier: 1, score: 92, stage: "Hot Reply",   channel: "LinkedIn", days: 6  },
  { company: "Best Buy",               contact: "Jennifer Park",   title: "CMO",                          tier: 1, score: 89, stage: "Warm Reply",  channel: "Email",    days: 8  },
  { company: "Hilton Hotels",          contact: "Michelle James",  title: "SVP Brand Marketing",          tier: 1, score: 86, stage: "Meeting Set", channel: "LinkedIn", days: 11 },
  { company: "Target Corporation",     contact: "Derek Simmons",   title: "VP Brand Marketing",           tier: 1, score: 88, stage: "Day 5",       channel: "LinkedIn", days: 5  },
  { company: "Wingstop",               contact: "Carlos Rivera",   title: "Chief Marketing Officer",      tier: 2, score: 83, stage: "Meeting Set", channel: "Email",    days: 14 },
  { company: "General Mills",          contact: "David Torres",    title: "Sr. Director, Digital & Social",tier: 1, score: 85, stage: "Warm Reply",  channel: "Email",    days: 9  },
  { company: "Peloton",                contact: "Nicole Grant",    title: "CMO",                          tier: 1, score: 84, stage: "Day 2",       channel: "Email",    days: 2  },
];

const SEQUENCES = [
  { day: 1,  label: "Email 1 — Personalized Opener",      type: "email",    desc: "Hyper-personalized first line from Profile Card + SociallyIn case study relevant to their industry." },
  { day: 3,  label: "LinkedIn Connection Request",         type: "linkedin", desc: "Connection note tied to their most recent post, career win, or mutual connection." },
  { day: 5,  label: "Email 2 — Competitive Angle",         type: "email",    desc: "Follow-up using a competitor gap or trending tactic in their specific vertical." },
  { day: 8,  label: "LinkedIn Message",                    type: "linkedin", desc: "First LinkedIn DM — value-first insight, zero sales pressure, under 5 lines." },
  { day: 10, label: "Email 3 — Reddit / SEO Angle",        type: "email",    desc: "Unique insight their team likely hasn't seen. Dark social + organic angle." },
  { day: 13, label: "Loom Video",                          type: "video",    desc: "60-second personal Loom recorded for this specific contact. Biggest pattern interrupt in the sequence." },
  { day: 18, label: '"Did I get this wrong?"',             type: "email",    desc: "The reply-getter. Honest, short, non-pushy. Invites feedback instead of demanding attention." },
  { day: 22, label: "Gift Drop",                           type: "gift",     desc: "Personalized gift based on profile signals: team gear, golf, restaurant credit, or cause donation." },
  { day: 28, label: "Break-Up Email",                      type: "email",    desc: "Most-replied-to email in any sequence. Closure framing. Short. Honest." },
];

const INTEGRATIONS = [
  { name: "HubSpot Enterprise", category: "CRM",         status: "active",  note: "Sequences + contacts" },
  { name: "Apollo.io",          category: "Prospecting",  status: "phase2",  note: "Prospect discovery" },
  { name: "XPL e.com API",      category: "Enrichment",   status: "phase2",  note: "Contact enrichment" },
  { name: "Proxycurl",          category: "LinkedIn",     status: "phase2",  note: "LinkedIn data" },
  { name: "Heyreach",           category: "LinkedIn Seq", status: "phase2",  note: "LinkedIn automation" },
  { name: "Instantly.ai",       category: "Email",        status: "phase2",  note: "Email sequences" },
  { name: "Sendoso",            category: "Gifts",        status: "phase2",  note: "Gift fulfillment" },
];

// ─── Badge helpers ────────────────────────────────────────────────────────────

const agentStatusBadge = (s: string) => {
  if (s === "active")  return { bg: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", label: "Active" };
  if (s === "running") return { bg: "bg-blue-50 text-blue-700 border-blue-200",          dot: "bg-blue-500",    label: "Running" };
  if (s === "idle")    return { bg: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-400",   label: "Idle" };
  return                        { bg: "bg-gray-100 text-gray-500 border-gray-200",       dot: "bg-gray-400",    label: "Offline" };
};

const stageBadge = (s: string) => {
  if (s === "Hot Reply")   return "bg-red-50 text-red-700 border-red-200";
  if (s === "Meeting Set") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (s === "Warm Reply")  return "bg-amber-50 text-amber-700 border-amber-200";
  if (s === "Day 2" || s === "Day 5") return "bg-purple-50 text-purple-700 border-purple-200";
  return "bg-gray-100 text-gray-600 border-gray-200";
};

const seqColors: Record<string, { bar: string; bg: string; label: string }> = {
  email:    { bar: "bg-orange-400",  bg: "bg-orange-50 border-orange-200",  label: "Email" },
  linkedin: { bar: "bg-blue-400",    bg: "bg-blue-50 border-blue-200",      label: "LinkedIn" },
  video:    { bar: "bg-purple-400",  bg: "bg-purple-50 border-purple-200",  label: "Video" },
  gift:     { bar: "bg-pink-400",    bg: "bg-pink-50 border-pink-200",      label: "Gift" },
};

const METRICS = [
  { label: "Companies Targeted", value: "47",   sub: "+12 this week",    color: "text-orange-500", icon: Icon.target  },
  { label: "Contacts Mapped",    value: "183",  sub: "+38 this week",    color: "text-blue-500",   icon: Icon.agents  },
  { label: "In Sequence",        value: "62",   sub: "34% of pipeline",  color: "text-emerald-500",icon: Icon.trending },
  { label: "Replies Received",   value: "11",   sub: "17.7% reply rate", color: "text-purple-500", icon: Icon.mail    },
  { label: "Meetings Booked",    value: "3",    sub: "Avg $105K deal",   color: "text-emerald-500",icon: Icon.calendar },
  { label: "Est. Pipeline",      value: "$315K",sub: "Phase 1 data",     color: "text-orange-500", icon: Icon.trending },
];

// ─── Nav ──────────────────────────────────────────────────────────────────────

type Tab = "agents" | "prospects" | "sequence" | "integrations";

const NAV: { id: Tab; label: string; icon: (cls: string) => React.ReactElement }[] = [
  { id: "agents",       label: "Agent Pipeline",   icon: Icon.agents },
  { id: "prospects",    label: "Live Prospects",    icon: Icon.prospects },
  { id: "sequence",     label: "Sequence Logic",    icon: Icon.sequence },
  { id: "integrations", label: "Integrations",      icon: Icon.integrations },
];

// ─── Subcomponents ────────────────────────────────────────────────────────────

function Pill({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}>
      {children}
    </span>
  );
}

function StatusDot({ color }: { color: string }) {
  return <span className={`w-1.5 h-1.5 rounded-full ${color} inline-block`} />;
}

// ─── Views ────────────────────────────────────────────────────────────────────

function AgentsView() {
  const summary = [
    { label: "Total Agents",   value: "8",   sub: "All deployed",      sub_color: "text-emerald-600" },
    { label: "Active",         value: "6",   sub: "+1 this session",   sub_color: "text-emerald-600" },
    { label: "Idle",           value: "1",   sub: "Wordsmith queued",  sub_color: "text-amber-600"  },
    { label: "Tasks Completed",value: "682", sub: "+136 today",        sub_color: "text-emerald-600" },
  ];

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {summary.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            <p className={`text-xs mt-1.5 font-medium ${s.sub_color}`}>↑ {s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table controls */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{Icon.search("w-4 h-4")}</span>
          <input
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white w-60 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300"
            placeholder="Search agents..."
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">
            {Icon.filter("w-4 h-4")} Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">
            {Icon.sort("w-4 h-4")} Sort
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">
            {Icon.export("w-4 h-4")} Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3 w-8">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              {["Agent", "Role", "Status", "Tasks Done", "Queue", "Description"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {AGENTS.map((a, i) => {
              const st = agentStatusBadge(a.status);
              return (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{a.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{a.name}</p>
                        <p className="text-xs text-gray-400">Agent #{i + 1}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500">{a.role}</td>
                  <td className="px-4 py-3.5">
                    <Pill className={st.bg}>
                      <StatusDot color={st.dot} />
                      {st.label}
                    </Pill>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-gray-800">{a.done}</td>
                  <td className="px-4 py-3.5">
                    <span className={`text-sm font-semibold ${a.queue > 0 ? "text-orange-500" : "text-gray-400"}`}>{a.queue}</span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 max-w-xs">{a.desc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <p className="text-xs text-gray-400">Showing 8 of 8 agents</p>
          <div className="flex items-center gap-1">
            {[1].map((p) => (
              <button key={p} className="w-7 h-7 rounded text-xs font-medium bg-orange-500 text-white">{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProspectsView() {
  return (
    <div className="space-y-5">
      {/* Metric cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Hot Replies",   value: "2",  sub: "Needs review",     color: "text-red-500",     sub_color: "text-red-500" },
          { label: "Meetings Set",  value: "3",  sub: "Avg $105K deal",   color: "text-emerald-600", sub_color: "text-emerald-600" },
          { label: "Warm Replies",  value: "2",  sub: "Follow-up ready",  color: "text-amber-500",   sub_color: "text-amber-600" },
          { label: "In Sequence",   value: "62", sub: "17.7% reply rate", color: "text-blue-500",    sub_color: "text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{s.label}</p>
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className={`text-xs mt-1.5 font-medium ${s.sub_color}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Table controls */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{Icon.search("w-4 h-4")}</span>
          <input
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white w-64 focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-300"
            placeholder="Search prospects..."
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">
            {Icon.filter("w-4 h-4")} Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">
            {Icon.sort("w-4 h-4")} Sort
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50">
            {Icon.export("w-4 h-4")} Export CSV
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600">
            + Add Prospect
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="w-8 px-5 py-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              {["Company", "Contact", "Title", "Tier", "ICP Score", "Stage", "Channel", "Day"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {PROSPECTS.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5">
                  <input type="checkbox" className="rounded border-gray-300" />
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm font-semibold text-gray-900">{p.company}</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="text-sm font-medium text-gray-700">{p.contact}</p>
                </td>
                <td className="px-4 py-3.5 text-xs text-gray-500 max-w-[180px]">{p.title}</td>
                <td className="px-4 py-3.5">
                  <Pill className={p.tier === 1 ? "bg-orange-50 text-orange-700 border-orange-200" : "bg-purple-50 text-purple-700 border-purple-200"}>
                    Tier {p.tier}
                  </Pill>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-400 rounded-full" style={{ width: `${p.score}%` }} />
                    </div>
                    <span className="text-sm font-bold text-gray-800">{p.score}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <Pill className={stageBadge(p.stage)}>{p.stage}</Pill>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-500">{p.channel}</td>
                <td className="px-4 py-3.5 text-xs text-gray-400">Day {p.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select className="text-xs border border-gray-200 rounded px-2 py-1 bg-white text-gray-600">
              <option>10 records</option>
              <option>25 records</option>
            </select>
            <span className="text-xs text-gray-400">8 – 183 contacts shown</span>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, "...", 19].map((p, i) => (
              <button key={i} className={`w-7 h-7 rounded text-xs font-medium ${p === 1 ? "bg-orange-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SequenceView() {
  return (
    <div className="space-y-5">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-1">
          <p className="font-semibold text-gray-900">28-Day Multi-Channel Sequence</p>
          <div className="flex items-center gap-2">
            <Pill className="bg-orange-50 text-orange-700 border-orange-200">📧 6 Emails</Pill>
            <Pill className="bg-blue-50 text-blue-700 border-blue-200">💼 2 LinkedIn</Pill>
            <Pill className="bg-purple-50 text-purple-700 border-purple-200">🎬 1 Video</Pill>
            <Pill className="bg-pink-50 text-pink-700 border-pink-200">🎁 1 Gift</Pill>
          </div>
        </div>
        <p className="text-xs text-gray-500">Account-level pause: one reply anywhere → all sequences at that company stop instantly. Wordsmith generates every message from the contact&apos;s Profile Card.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Day", "Step", "Type", "Description"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {SEQUENCES.map((step, i) => {
              const sc = seqColors[step.type];
              return (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="w-10 h-10 rounded-full bg-orange-50 border-2 border-orange-200 flex items-center justify-center">
                      <span className="text-orange-600 text-xs font-black">D{step.day}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900">{step.label}</td>
                  <td className="px-5 py-4">
                    <Pill className={`${sc.bg}`}>{sc.label}</Pill>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 max-w-sm">{step.desc}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function IntegrationsView() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Connected",   value: "1",  sub: "HubSpot Enterprise",  sub_color: "text-emerald-600" },
          { label: "Phase 2",     value: "6",  sub: "APIs ready to wire",   sub_color: "text-blue-500" },
          { label: "Est. Cost",   value: "$1.3K", sub: "per month Phase 2", sub_color: "text-gray-500" },
          { label: "ROI Break-even","value":"1", sub:"deal pays 6–12 months",sub_color:"text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm text-gray-500 mb-1">{s.label}</p>
            <p className="text-3xl font-bold text-gray-900">{s.value}</p>
            <p className={`text-xs mt-1.5 font-medium ${s.sub_color}`}>{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Integration", "Category", "Purpose", "Status"].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-5 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {INTEGRATIONS.map((integ, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-sm font-semibold text-gray-900">{integ.name}</td>
                <td className="px-5 py-4">
                  <Pill className="bg-gray-100 text-gray-600 border-gray-200">{integ.category}</Pill>
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">{integ.note}</td>
                <td className="px-5 py-4">
                  {integ.status === "active"
                    ? <Pill className="bg-emerald-50 text-emerald-700 border-emerald-200"><StatusDot color="bg-emerald-500" />Active</Pill>
                    : <Pill className="bg-gray-50 text-gray-500 border-gray-200"><StatusDot color="bg-gray-300" />Phase 2</Pill>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const [tab, setTab] = useState<Tab>("agents");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const titles: Record<Tab, { title: string; sub: string }> = {
    agents:       { title: "Agent Pipeline",   sub: "8 AI agents running the full outbound process end-to-end" },
    prospects:    { title: "Live Prospects",   sub: "183 contacts · 47 Fortune 1000 companies · Phase 1 demo data" },
    sequence:     { title: "Sequence Logic",   sub: "28-day multi-channel sequence generated by Wordsmith per contact" },
    integrations: { title: "Integrations",     sub: "HubSpot Enterprise live · 6 integrations ready for Phase 2" },
  };

  const current = titles[tab];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? "w-56" : "w-16"} flex-shrink-0 bg-white border-r border-gray-200 flex flex-col transition-all duration-200`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-100 justify-between">
          {sidebarOpen && (
            <Image src="/sociallyin-logo.png" alt="SociallyIn" width={110} height={28} className="object-contain" />
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-gray-600 p-1 rounded">
            {Icon.menu("w-5 h-5")}
          </button>
        </div>

        {/* Search */}
        {sidebarOpen && (
          <div className="px-3 pt-3 pb-1">
            <div className="relative">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400">{Icon.search("w-3.5 h-3.5")}</span>
              <input className="w-full pl-7 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-orange-300" placeholder="Search  ⌘F" />
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {/* Dashboard link */}
          <a href="#" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-gray-800 text-sm">
            {Icon.dashboard("w-4 h-4 flex-shrink-0")}
            {sidebarOpen && <span>Overview</span>}
          </a>

          {/* Active nav items */}
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                tab === n.id
                  ? "bg-orange-50 text-orange-600 border-l-[3px] border-orange-500"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              {n.icon("w-4 h-4 flex-shrink-0")}
              {sidebarOpen && <span>{n.label}</span>}
            </button>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-100 my-2" />

          <a href="#" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 text-sm">
            {Icon.settings("w-4 h-4 flex-shrink-0")}
            {sidebarOpen && <span>Settings</span>}
          </a>
          <a href="#" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 text-sm">
            {Icon.help("w-4 h-4 flex-shrink-0")}
            {sidebarOpen && <span>Help & Support</span>}
          </a>
        </nav>

        {/* Bottom workspace card */}
        {sidebarOpen && (
          <div className="p-3 border-t border-gray-100">
            <div className="flex items-center gap-2.5 bg-gray-50 rounded-lg p-2.5 border border-gray-200">
              <div className="w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-[10px] font-black">SI</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">SociallyIn</p>
                <p className="text-[10px] text-gray-400">47 accounts · Phase 1</p>
              </div>
              {Icon.chevron("w-3.5 h-3.5 text-gray-400 flex-shrink-0")}
            </div>
          </div>
        )}
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
          <div>
            <h1 className="text-lg font-bold text-gray-900">{current.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Metric pills */}
            {METRICS.slice(0, 4).map((m) => (
              <div key={m.label} className="hidden lg:flex flex-col items-end">
                <span className={`text-sm font-bold ${m.color}`}>{m.value}</span>
                <span className="text-[10px] text-gray-400 leading-none">{m.label}</span>
              </div>
            ))}
            <div className="w-px h-6 bg-gray-200 mx-1" />
            <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-700">
              {Icon.bell("w-5 h-5")}
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-orange-600 text-xs font-bold">KK</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-gray-800">Keith Kakadia</p>
                <p className="text-[10px] text-gray-400">SociallyIn</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page sub-header */}
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex-shrink-0">
          <p className="text-sm text-gray-500">{current.sub}</p>
        </div>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {tab === "agents"       && <AgentsView />}
          {tab === "prospects"    && <ProspectsView />}
          {tab === "sequence"     && <SequenceView />}
          {tab === "integrations" && <IntegrationsView />}
        </main>
      </div>

    </div>
  );
}
