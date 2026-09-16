"use client";

import { useMemo, useState } from "react";
import type { Message } from "@/types";

export default function ChatClient({
  matchId,
  initialMessages,
}: {
  matchId: string;
  initialMessages: Message[];
}) {
  const [messages, setMessages] = useState(
    initialMessages.map((message) => ({
      sender: message.sender_id === "demo-alice" ? "me" : "them",
      text: message.body,
    })),
  );
  const [draft, setDraft] = useState("");

  const displayName = useMemo(() => {
    if (matchId.includes("demo-match-1")) return "Bob Singh";
    if (matchId.includes("demo-match-2")) return "Charlie Nair";
    return "Partner";
  }, [matchId]);

  const sendMessage = () => {
    if (!draft.trim()) return;
    setMessages((current) => [...current, { sender: "me", text: draft.trim() }]);
    setDraft("");
  };

  return (
    <div className="mx-auto max-w-3xl rounded-[32px] border border-[var(--color-border)] bg-[var(--color-card)] p-5 sm:p-7">
      <div className="mb-6 flex items-center justify-between border-b border-[var(--color-border)] pb-5">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">Match</div>
          <h1 className="mt-2 text-3xl font-semibold text-white">{displayName}</h1>
        </div>
        <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-300">
          Mutual match
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message, index) => (
          <div key={`${message.sender}-${index}`} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.sender === "me"
                  ? "bg-[linear-gradient(135deg,#8b5cf6,#a855f7)] text-white"
                  : "border border-[var(--color-border)] bg-[var(--color-elevated)] text-[var(--color-primary)]"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3 border-t border-[var(--color-border)] pt-5">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Message your match..."
          className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-elevated)] px-4 py-3 text-white outline-none focus:border-[var(--color-accent)]"
        />
        <button
          type="button"
          onClick={sendMessage}
          className="rounded-xl bg-[linear-gradient(135deg,#8b5cf6,#a855f7)] px-5 py-3 font-semibold text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
