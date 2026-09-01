import { useState, useEffect, useRef } from "react";
import { COLORS, sectionStyle, labelStyle } from "../constants";

const PROXY_URL = "https://rui-api.riotrip.workers.dev";
const MODEL = "openai/gpt-oss-120b:free";

const PORTFOLIO_CONTEXT = `
You are RUI, an AI assistant for Rio Tri Prayogo's portfolio website.
Your name is RUI. If anyone asks your name, answer "RUI".

About Rio:
- Full name: Rio Tri Prayogo
- Student of Informatics Engineering at State Polytechnic of Malang (Polinema)
- Passionate about backend development and system logic
- Active in campus organizations, developing leadership and collaborative skills
- Contact: riotriprayogo31@gmail.com
- GitHub: https://github.com/riotrip
- LinkedIn: https://www.linkedin.com/in/rio-tri-prayogo/
- Instagram: https://www.instagram.com/rio_t.p/

Tech Stack & Core Competencies:
- Backend & Web Development (Laravel, Flask, Tailwind CSS)
- Mobile Development (Flutter)
- Database Management (Relational & NoSQL databases like MySQL and MongoDB)
- Emerging Technologies (Machine Learning, Internet of Things)

Guidelines:
- Answer in the same language as the visitor (Indonesian or English)
- Be friendly, concise, and professional
- Do NOT use markdown formatting like **bold**, *italic*, or ### headers
- Do NOT use HTML tags
- Use plain text only, use newlines and dashes (-) for lists
- If you don't know something specific, suggest contacting Rio directly at riotriprayogo31@gmail.com
`;

const HINTS = [
  "What tech stack does Rio use?",
  "Tell me about Rio's projects",
  "How can I contact Rio?",
  "What is Rio's background?",
];

export default function AskAI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! I'm RUI, Rio's AI assistant. Ask me anything about his skills, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const resizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 80)}px`;
  };

  const send = async (explicitText) => {
    const text = (explicitText ?? input).trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 500,
          messages: [
            { role: "system", content: PORTFOLIO_CONTEXT },
            ...history,
          ],
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data?.error?.message || "Gagal memproses permintaan.");
      }

      const reply = data?.choices?.[0]?.message?.content;

      if (!reply) {
        throw new Error("Format balasan dari server tidak sesuai.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Ups, gagal memuat AI. ${err.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <section id="ask-ai" style={sectionStyle}>
      <span style={labelStyle}>Ask AI</span>
      <div style={{ width: "100%" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            color: COLORS.muted,
            margin: "0 0 16px",
            lineHeight: "1.7",
          }}
        >
          An AI trained on Rio's background. Ask about his projects, skills,
          internship experience, or anything else.
        </p>
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            margin: "0 0 16px",
          }}
        >
          {HINTS.map((hint) => (
            <button
              key={hint}
              onClick={() => send(hint)}
              disabled={loading}
              style={{
                border: `1px solid ${COLORS.border}`,
                background: "transparent",
                color: COLORS.muted,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                padding: "6px 10px",
                cursor: loading ? "default" : "pointer",
              }}
            >
              {hint}
            </button>
          ))}
        </div>
        <div
          style={{
            border: `1px solid ${COLORS.border}`,
            height: "320px",
            overflowY: "auto",
            padding: "16px",
            marginBottom: "0",
            background: COLORS.surface,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {messages.map((m, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  color: m.role === "assistant" ? COLORS.accent : COLORS.muted,
                  paddingTop: "3px",
                  flexShrink: 0,
                  width: "28px",
                }}
              >
                {m.role === "assistant" ? "AI" : "YOU"}
              </span>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  color: m.role === "assistant" ? COLORS.text : COLORS.muted,
                  margin: "0",
                  lineHeight: "1.7",
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </p>
            </div>
          ))}
          {loading && (
            <div
              style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  color: COLORS.accent,
                  flexShrink: 0,
                  width: "28px",
                }}
              >
                AI
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "14px",
                  color: COLORS.muted,
                }}
              >
                ···
              </span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div
          style={{
            display: "flex",
            border: `1px solid ${COLORS.border}`,
            borderTop: "none",
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              resizeTextarea();
            }}
            onKeyDown={onKey}
            placeholder="Ask something about Rio…"
            rows={1}
            style={{
              flex: 1,
              background: "transparent",
              border: `1px solid ${COLORS.border}`,
              borderTop: "none",
              borderRight: "none",
              padding: "14px 16px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              color: COLORS.text,
              resize: "none",
              outline: "none",
              lineHeight: "1.5",
            }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              background:
                input.trim() && !loading ? COLORS.accent : "transparent",
              border: `1px solid ${COLORS.border}`,
              borderTop: "none",
              borderLeft: "none",
              padding: "0 20px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: input.trim() && !loading ? COLORS.bg : COLORS.muted,
              cursor: input.trim() && !loading ? "pointer" : "default",
              transition: "all 0.15s",
              letterSpacing: "0.08em",
            }}
          >
            SEND
          </button>
        </div>
      </div>
    </section>
  );
}
