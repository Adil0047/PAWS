"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  ArrowRight,
  Bot,
  User,
  CheckCheck,
  WifiOff,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactInfo, brand } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  sender: "user" | "agent";
  content: string;
  timestamp: number;
};

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connected, setConnected] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [unread, setUnread] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setUnread(0);
  }, [isOpen]);

  const startSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setConnected(false);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start", name: name.trim(), email: email.trim() }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setSessionId(data.sessionId);
      setMessages(data.messages);
      setHasStarted(true);
      setConnected(true);
    } catch {
      setConnected(true);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content || !sessionId) return;

    // Optimistic: show user message immediately
    const optimisticMsg: ChatMessage = {
      id: `temp-${Date.now()}`,
      sender: "user",
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, optimisticMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "message", sessionId, content }),
      });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();

      // Replace optimistic message with the server version and add agent reply
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== optimisticMsg.id),
        data.userMessage,
        data.agentMessage,
      ]);
    } catch {
      // Remove the optimistic message on failure
      setMessages((prev) => prev.filter((m) => m.id !== optimisticMsg.id));
    } finally {
      setIsTyping(false);
    }
  };

  const sendQuickReply = (text: string) => {
    setInput(text);
    // Submit the form programmatically after setting input
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement | null;
      form?.requestSubmit();
    }, 50);
  };

  return (
    <>
      {/* Floating launcher button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-primary shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-xl"
        aria-label={isOpen ? "Close chat" : "Open live chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="text-primary-foreground"
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex h-full w-full items-center justify-center"
            >
              <Image
                src="/bot-avatar-small.png"
                alt="PAWS chat bot"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
            {unread}
          </span>
        )}
        {!isOpen && (
          <span className="absolute right-0 top-0 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-background bg-green-500" />
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 top-[72px] z-30 flex w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="relative flex items-center justify-between bg-gradient-to-r from-primary to-primary/85 p-4 text-primary-foreground">
              <div className="absolute inset-0 bg-academic-grid opacity-30" />
              <div className="relative flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white/15 backdrop-blur">
                    <Image src="/bot-avatar-small.png" alt="PAWS bot" width={40} height={40} className="h-full w-full object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-primary bg-green-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{brand.shortName} Support</div>
                  <div className="flex items-center gap-1 text-xs text-primary-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                    Online · Replies in minutes
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            {!hasStarted ? (
              <div className="custom-scroll flex flex-1 flex-col justify-center overflow-y-auto p-6">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageCircle className="h-8 w-8" />
                </div>
                <h3 className="text-center text-lg font-semibold text-foreground">
                  Chat with our support team
                </h3>
                <p className="mt-2 text-center text-sm text-muted-foreground">
                  Get instant answers about pricing, deadlines, and services. Available 24/7.
                </p>
                <form onSubmit={startSession} className="mt-5 space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="chat-name" className="text-xs font-semibold">
                      Your Name
                    </Label>
                    <Input
                      id="chat-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ahmed Raza"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="chat-email" className="text-xs font-semibold">
                      Email (optional)
                    </Label>
                    <Input
                      id="chat-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2" disabled={!name.trim() || !connected}>
                    {connected ? (
                      <>
                        Start Chat
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-4 w-4" />
                        Connecting...
                      </>
                    )}
                  </Button>
                </form>
                <div className="mt-4 text-center text-[11px] text-muted-foreground">
                  Or WhatsApp us:{" "}
                  <a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary">
                    {contactInfo.whatsapp}
                  </a>
                </div>
              </div>
            ) : (
              <>
                {/* Messages */}
                <div
                  ref={scrollRef}
                  className="custom-scroll flex-1 space-y-3 overflow-y-auto bg-secondary/30 p-4"
                >
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "flex items-end gap-2",
                        msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full text-white",
                          msg.sender === "agent"
                            ? ""
                            : "bg-gradient-to-br from-accent to-amber-600"
                        )}
                      >
                        {msg.sender === "agent" ? (
                          <Image src="/bot-avatar-small.png" alt="Bot" width={28} height={28} className="h-full w-full object-cover" />
                        ) : (
                          <User className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-3.5 py-2 text-sm shadow-sm",
                          msg.sender === "agent"
                            ? "rounded-bl-sm bg-card text-foreground"
                            : "rounded-br-sm bg-primary text-primary-foreground"
                        )}
                      >
                        <p className="leading-relaxed">{msg.content}</p>
                        <div
                          className={cn(
                            "mt-1 flex items-center gap-1 text-[10px]",
                            msg.sender === "user"
                              ? "justify-end text-primary-foreground/70"
                              : "text-muted-foreground"
                          )}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {msg.sender === "user" && <CheckCheck className="h-3 w-3" />}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-end gap-2">
                      <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full">
                        <Image src="/bot-avatar-small.png" alt="Bot" width={28} height={28} className="h-full w-full object-cover" />
                      </div>
                      <div className="rounded-2xl rounded-bl-sm bg-card px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick actions */}
                <div className="flex flex-wrap gap-1.5 border-t border-border bg-card px-3 py-2">
                  {["Services", "Pricing", "Turnitin"].map((q) => (
                    <button
                      key={q}
                      onClick={() => sendQuickReply(q)}
                      className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[11px] font-medium text-foreground/80 transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      {q}
                    </button>
                  ))}
                  <a
                    href="/order"
                    onClick={() => setIsOpen(false)}
                    className="ml-auto rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
                  >
                    Request Quote →
                  </a>
                </div>

                {/* Input */}
                <form
                  id="chat-form"
                  onSubmit={sendMessage}
                  className="flex items-center gap-2 border-t border-border bg-card p-3"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="shrink-0" disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
