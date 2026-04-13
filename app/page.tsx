"use client";

import { useState } from "react";

const AGENTS = [
  {
    id: "scout",
    emoji: "🔍",
    name: "Scout",
    role: "ICP Scoring & Discovery",
    desc: "Scores every company 0–100. Assigns Tier 1/2/3. Pulls Fortune 1000, Inc. 5000, and Series B+ targets.",
    status: "active",
    tasksComplete: 47,
    queue: 0,
    color: "#FF6B35",
  },
  {
    id: "mapper",
    emoji: "🗺️",
    name: "Mapper",
    role: "Account Tree Builder",
    desc: "Identifies 3–7 contacts per company. Tags each as Decision Maker, Champion, Influencer, or Budget Holder.",
    status: "active",
    tasksComplete: 183,
    queue: 12,
    color: "#FF6B35",
  },
  {
    id: "intel",
    emoji: "🕵️",
    name: "Intel",
    role: "Cross-Platform Research",
    desc: "Runs parallel research on LinkedIn, Twitter/X, and Instagram. Surfaces personal signals — sports, hobbies, causes, career wins.",
    status: "running",
    tasksComplete: 156,
    queue: 27,
    color: "#00C2CB",
  },
  {
    id: "profiler",
    emoji: "🧠",
    name: "Profiler",
    role: "Profile Card Generator",
    desc: "Synthesizes Intel data into structured Profile Cards. Selects the best SociallyIn case study per industry. Rates personalization confidence.",
    status: "active",
    tasksComplete: 134,
    queue: 22,
    color: "#FF6B35",
  },
  {
    id: "wordsmith",
    emoji: "✍️",
    name: "Wordsmith",
    role: "Message Personalization",
    desc: "Generates custom first lines, 3 subject variants, LinkedIn messages, social DM openers, and gift recommendations. Rejects generic outputs.",
    status: "pending",
    tasksComplete: 89,
    queue: 45,
    color: "#F59E0B",
  },
  {
    id: "conductor",
    emoji: "🎬",
    name: "Conductor",
    role: "Sequence Enrollment",
    desc: "Enrolls into HubSpot + LinkedIn sequences. Enforces send limits. When anyone at a company responds — all sequences at that account pause instantly.",
    status: "active",
    tasksComplete: 62,
    queue: 8,
    color: "#FF6B35",
  },
  {
    id: "router",
    emoji: "📬",
    name: "Router",
    role: "Reply Classification",
    desc: "Classifies every reply: Hot / Warm / Soft No / Hard No / Referral / OOO. Drafts replies for human review. Never auto-sends.",
    status: "active",
    tasksComplete: 11,
    queue: 2,
    color: "#FF6B35",
  },
  {
    id: "syncer",
    emoji: "🔄",
    name: "Syncer",
    role: "HubSpot Enterprise Sync",
    desc: "Real-time sync to HubSpot. Creates custom properties: ICP score, tree role, personal hook, gift status, sequence status, opportunity trigger.",
    status: "active",
    tasksComplete: 183,
    queue: 0,
    color: "#FF6B35",
  },
];

const METRICS = [
  { label: "Companies Identified", value: "47", sub: "ICP-qualified" },
  { label: "Contacts Mapped", value: "183", sub: "3–7 per company" },
  { label: "In Active Sequence", value: "62", sub: "Email + LinkedIn" },
  { label: "Replies Received", value: "11", sub: "17.7% reply rate" },
  { label: "Meetings Booked", value: "3", sub: "Avg $105K deal" },
  { label: "Est. Pipeline", value: "$315K", sub: "$7K–$15K+/mo contracts" },
];

const PROSPECTS = [
  { company: "Marriott International", contact: "Sarah Chen", title: "VP of Brand Marketing", tier: 1, score: 96, stage: "🔥 Hot Reply", channel: "Email" },
  { company: "Capital One", contact: "Marcus Williams", title: "Director of Social Strategy", tier: 1, score: 92, stage: "🔥 Hot Reply", channel: "LinkedIn" },
  { company: "Best Buy", contact: "Jennifer Park", title: "CMO", tier: 1, score: 89, stage: "♻️ Warm Reply", channel: "Email" },
  { company: "Hilton Hotels", contact: "Michelle James", title: "SVP Brand Marketing", tier: 1, score: 86, stage: "✅ Meeting Set", channel: "LinkedIn" },
  { company: "Target Corporation", contact: "Derek Simmons", title: "VP Brand Marketing", tier: 1, score: 88, stage: "🔗 Connected", channel: "LinkedIn" },
  { company: "Wingstop", contact: "Carlos Rivera", title: "Chief Marketing Officer", tier: 2, score: 83, stage: "✅ Meeting Set", channel: "Email" },
  { company: "General Mills", contact: "David Torres", title: "Sr. Director, Digital & Social", tier: 1, score: 85, stage: "♻️ Warm Reply", channel: "Email" },
  { company: "Peloton", contact: "Nicole Grant", title: "CMO", tier: 1, score: 84, stage: "📧 Day 2", channel: "Email" },
];

const SEQUENCES = [
  { day: 1, label: "Email 1", desc: "Hyper-personalized first line from Profile Card + relevant case study link", type: "email" },
  { day: 3, label: "LinkedIn Connection", desc: "Connect request with customized note tied to their recent post or career win", type: "linkedin" },
  { day: 5, label: "Email 2", desc: "Follow-up: competitor angle or trending tactic in their industry", type: "email" },
  { day: 8, label: "LinkedIn Message", desc: "First LinkedIn message — value-first, zero sales pressure", type: "linkedin" },
  { day: 10, label: "Email 3", desc: "Reddit / SEO angle or unique insight their team likely hasn't considered", type: "email" },
  { day: 13, label: "Loom Video", desc: "60-second personal Loom recorded for this specific contact — biggest pattern interrupt in the sequence", type: "video" },
  { day: 18, label: '"Did I get this wrong?"', desc: "The reply-getter. Honest, short, non-pushy. Invites feedback instead of demanding attention.", type: "email" },
  { day: 22, label: "Gift Drop", desc: "Pattern interrupt: personalized gift based on their interests (Lakers gear, golf, restaurant credit, or donation to their cause)", type: "gift" },
  { day: 28, label: "Break-Up Email", desc: "The most-replied-to email in any sequence. Closure framing. Short. Honest.", type: "email" },
];

const statusColor = (s: string) => {
  if (s === "active") return "bg-green-500";
  if (s === "running") return "bg-teal-400";
  if (s === "pending") return "bg-yellow-500";
  return "bg-gray-500";
};

const statusLabel = (s: string) => {
  if (s === "active") return "Active";
  if (s === "running") return "Running";
  if (s === "pending") return "Pending";
  return "Idle";
};

const tierBadge = (t: number) => {
  if (t === 1) return "bg-red-900/50 text-red-300 border border-red-700/50";
  if (t === 2) return "bg-yellow-900/50 text-yellow-300 border border-yellow-700/50";
  return "bg-blue-900/50 text-blue-300 border border-blue-700/50";
};

const stageBadge = (s: string) => {
  if (s.includes("Hot")) return "bg-red-900/60 text-red-200";
  if (s.includes("Meeting")) return "bg-green-900/60 text-green-200";
  if (s.includes("Warm")) return "bg-yellow-900/60 text-yellow-200";
  if (s.includes("Connected")) return "bg-teal-900/60 text-teal-200";
  return "bg-[#1B2B4B] text-blue-200";
};

const channelIcon = (c: string) => {
  if (c === "Email") return "📧";
  if (c === "LinkedIn") return "💼";
  if (c === "Twitter/X") return "𝕏";
  if (c === "Instagram") return "📸";
  return "📱";
};

const seqTypeColor = (t: string) => {
  if (t === "email") return "bg-[#FF6B35]/20 border-[#FF6B35]/40 text-orange-300";
  if (t === "linkedin") return "bg-blue-900/30 border-blue-700/40 text-blue-300";
  if (t === "video") return "bg-purple-900/30 border-purple-700/40 text-purple-300";
  if (t === "gift") return "bg-pink-900/30 border-pink-700/40 text-pink-300";
  return "bg-[#1B2B4B] border-[#243A5E] text-gray-300";
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<"agents" | "prospects" | "sequence">("agents");

  return (
    <div className="min-h-screen bg-[#0F1624]">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#0F1624]/95 backdrop-blur border-b border-[#243A5E]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://sociallyin.com/wp-content/uploads/2021/03/SociallyIn-Logo-White.png"
              alt="SociallyIn"
              className="h-8 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            <span className="text-white font-bold text-lg tracking-tight">SociallyIn</span>
            <span className="text-[#243A5E]">|</span>
            <span className="text-[#FF6B35] font-semibold text-sm">AI Outbound System</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-green-900/40 border border-green-700/40 text-green-300 text-xs px-3 py-1.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              8 Agents Running
            </span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] text-sm px-4 py-2 rounded-full mb-6 font-medium">
            <span>⚡</span> Built on HubSpot Enterprise · Layered AI Intelligence
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-5 leading-tight">
            Outbound that <span className="text-[#FF6B35]">thinks</span><br />
            for itself
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            8 AI agents working in a continuous pipeline — discovering Fortune 1000 targets, building
            account trees, researching personal signals across every platform, and running
            hyper-personalized sequences at scale.
          </p>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="bg-[#1B2B4B]/60 border border-[#243A5E] rounded-xl p-4 text-center hover:border-[#FF6B35]/30 transition-colors"
            >
              <div className="text-3xl font-black text-[#FF6B35] mb-1">{m.value}</div>
              <div className="text-white text-sm font-semibold mb-0.5">{m.label}</div>
              <div className="text-gray-500 text-xs">{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TABS */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex gap-1 bg-[#1B2B4B]/40 border border-[#243A5E] rounded-xl p-1 mb-8 w-fit">
          {(["agents", "prospects", "sequence"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all capitalize ${
                activeTab === tab
                  ? "bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab === "agents" ? "Agent Pipeline" : tab === "prospects" ? "Live Prospects" : "Sequence Logic"}
            </button>
          ))}
        </div>

        {/* AGENTS TAB */}
        {activeTab === "agents" && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-[#FF6B35]/50 to-transparent" />
              <span className="text-gray-500 text-sm">Scout → Mapper → Intel → Profiler → Wordsmith → Conductor → Router → Syncer</span>
              <div className="flex-1 h-px bg-gradient-to-l from-[#FF6B35]/50 to-transparent" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {AGENTS.map((agent, i) => (
                <div
                  key={agent.id}
                  className="agent-card bg-[#1B2B4B]/60 border border-[#243A5E] rounded-xl p-5 hover:border-[#FF6B35]/40 transition-all cursor-default"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-2xl">{agent.emoji}</div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full animate-pulse-dot ${statusColor(agent.status)}`} />
                      <span className={`text-xs font-medium ${
                        agent.status === "active" ? "text-green-400" :
                        agent.status === "running" ? "text-teal-400" :
                        "text-yellow-400"
                      }`}>{statusLabel(agent.status)}</span>
                    </div>
                  </div>
                  <div className="mb-1">
                    <span className="text-white font-bold text-base">{agent.name}</span>
                    <span className="text-[#FF6B35] text-xs ml-2 font-medium">#{i + 1}</span>
                  </div>
                  <div className="text-gray-400 text-xs font-medium mb-2">{agent.role}</div>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{agent.desc}</p>
                  <div className="flex justify-between text-xs">
                    <div>
                      <span className="text-gray-500">Done </span>
                      <span className="text-white font-bold">{agent.tasksComplete.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Queue </span>
                      <span className={`font-bold ${agent.queue > 0 ? "text-[#FF6B35]" : "text-green-400"}`}>{agent.queue}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pipeline flow visualization */}
            <div className="mt-8 bg-[#1B2B4B]/40 border border-[#243A5E] rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4 text-sm">Agent Pipeline Flow</h3>
              <div className="flex items-center gap-1 overflow-x-auto pb-2">
                {AGENTS.map((agent, i) => (
                  <div key={agent.id} className="flex items-center gap-1 flex-shrink-0">
                    <div className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-lg border text-center ${
                      agent.status === "running"
                        ? "border-teal-500/50 bg-teal-900/20"
                        : agent.status === "pending"
                        ? "border-yellow-700/40 bg-yellow-900/10"
                        : "border-[#FF6B35]/30 bg-[#FF6B35]/5"
                    }`}>
                      <span className="text-lg">{agent.emoji}</span>
                      <span className="text-white text-xs font-semibold">{agent.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusColor(agent.status)}`} />
                    </div>
                    {i < AGENTS.length - 1 && (
                      <div className="text-[#FF6B35]/40 text-sm px-0.5">→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROSPECTS TAB */}
        {activeTab === "prospects" && (
          <div>
            <div className="bg-[#1B2B4B]/40 border border-[#243A5E] rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-[#243A5E] flex items-center justify-between">
                <span className="text-white font-semibold text-sm">Active Prospect Pipeline</span>
                <span className="text-gray-500 text-xs">183 contacts across 47 companies · Showing top prospects</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#243A5E]">
                      {["Company", "Contact", "Title", "Tier", "ICP Score", "Stage", "Channel"].map((h) => (
                        <th key={h} className="text-left text-gray-500 text-xs font-medium px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {PROSPECTS.map((p, i) => (
                      <tr key={i} className="border-b border-[#243A5E]/50 hover:bg-[#243A5E]/30 transition-colors">
                        <td className="px-5 py-3.5 text-white font-semibold">{p.company}</td>
                        <td className="px-5 py-3.5 text-gray-300">{p.contact}</td>
                        <td className="px-5 py-3.5 text-gray-400 text-xs">{p.title}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tierBadge(p.tier)}`}>
                            Tier {p.tier}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-1.5 bg-[#243A5E] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#FF6B35] rounded-full"
                                style={{ width: `${p.score}%` }}
                              />
                            </div>
                            <span className="text-white text-xs font-bold">{p.score}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${stageBadge(p.stage)}`}>
                            {p.stage}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-gray-400 text-xs">
                          <span className="flex items-center gap-1.5">
                            <span>{channelIcon(p.channel)}</span>
                            {p.channel}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-[#243A5E] flex items-center justify-between">
                <span className="text-gray-500 text-xs">Showing 8 of 183 contacts</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" />Hot Reply (2)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500" />Meeting Set (3)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500" />Warm Reply (2)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SEQUENCE TAB */}
        {activeTab === "sequence" && (
          <div>
            <div className="mb-4">
              <p className="text-gray-400 text-sm">
                28-day multi-channel sequence. Every touch is generated by Wordsmith from the contact&apos;s Profile Card.
                Account-level pause logic: one reply anywhere = all sequences at that company stop instantly.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-[22px] top-0 bottom-0 w-px bg-gradient-to-b from-[#FF6B35]/50 via-[#1B2B4B] to-transparent" />
              <div className="space-y-4">
                {SEQUENCES.map((step) => (
                  <div key={step.day} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#1B2B4B] border-2 border-[#FF6B35]/40 flex items-center justify-center z-10">
                      <span className="text-[#FF6B35] text-xs font-bold">D{step.day}</span>
                    </div>
                    <div className={`flex-1 border rounded-xl p-4 ${seqTypeColor(step.type)}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{step.label}</span>
                        <span className="text-xs opacity-70 capitalize">{step.type}</span>
                      </div>
                      <p className="text-xs opacity-80 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* INTEGRATION SECTION */}
      <section className="border-t border-[#243A5E] bg-[#1B2B4B]/20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-3">Built on what you already have</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              The agent layer adds intelligence on top of SociallyIn&apos;s existing HubSpot Enterprise
              infrastructure — no rip-and-replace, just upgrade.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "HubSpot Enterprise", status: "✅ Active", note: "CRM + sequences" },
              { name: "Apollo.io", status: "🔜 Next", note: "Prospect discovery" },
              { name: "XPL e.com API", status: "🔜 Next", note: "Enrichment layer" },
              { name: "Proxycurl", status: "🔜 Next", note: "LinkedIn data" },
              { name: "Heyreach", status: "🔜 Next", note: "LinkedIn automation" },
              { name: "Instantly.ai", status: "🔜 Next", note: "Email engine" },
            ].map((integ) => (
              <div key={integ.name} className="bg-[#1B2B4B]/60 border border-[#243A5E] rounded-xl p-4 text-center">
                <div className="text-sm font-semibold text-white mb-1">{integ.name}</div>
                <div className="text-xs text-gray-400 mb-2">{integ.note}</div>
                <div className="text-xs font-medium">{integ.status}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#243A5E] py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span className="text-[#FF6B35] font-bold">SociallyIn</span>
            <span>·</span>
            <span>AI Outbound Intelligence System</span>
            <span>·</span>
            <span>Confidential Demo</span>
          </div>
          <div className="text-gray-600 text-xs">
            Built for Keith · Phase 1 of 3 · APIs connect in Phase 2
          </div>
        </div>
      </footer>
    </div>
  );
}
