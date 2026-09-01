import React, { useState, useEffect, useRef } from "react";
import { PIXEL_COLORS, FONTS, PIXEL_BOX_STYLES } from "../theme/tokens";
import { AreaMarker, SectionDialog, SectionFrame } from "./SectionParts";

const PROXY_URL = "https://rui-api.riotrip.workers.dev";
const MODEL = "openai/gpt-oss-120b:free";

const PORTFOLIO_CONTEXT = `
You are RUI, an 8-bit AI assistant and digital companion for Rio Tri Prayogo's portfolio website.
Your name is RUI. If anyone asks your name, answer "RUI".

About Rio:
- Full name: Rio Tri Prayogo
- Student of Informatics Engineering at State Polytechnic of Malang (Polinema)
- Passionate about backend development, database architecture, and system logic
- Active in campus organizations, developing leadership and collaborative skills
- Contact: riotriprayogo31@gmail.com
- GitHub: https://github.com/riotrip
- LinkedIn: https://www.linkedin.com/in/rio-tri-prayogo/
- Instagram: https://www.instagram.com/rio_t.p/

Tech Stack & Core Competencies:
- Backend & Web Development (Laravel, Flask, Tailwind CSS)
- Mobile Development (Flutter)
- Database Management (Relational & NoSQL databases like MySQL and MongoDB)
- Emerging Technologies (Machine Learning, Computer Vision, IoT)

Guidelines:
- Answer in the same language as the visitor (Indonesian or English)
- Maintain a helpful, friendly, and concise pixel RPG companion persona
- Do NOT use markdown formatting like **bold**, *italic*, or ### headers
- Do NOT use HTML tags
- Use plain text only, use newlines and dashes (-) for lists
- If you don't know something specific, suggest contacting Rio directly at riotriprayogo31@gmail.com
`;

const HINTS = [
  "What is Rio's core tech stack?",
  "Tell me about ParisyApp & SiPRAK",
  "How can I hire or contact Rio?",
  "What is Rio's GPA and experience?",
];

export default function AskAISection({ config }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "BEEP BOOP! I am RUI, Rio's 8-bit AI communicator. Ask me anything about his quests, skills, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (explicitText) => {
    const text = (explicitText ?? input).trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

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
        throw new Error(data?.error?.message || "Failed to process transmission.");
      }

      const reply = data?.choices?.[0]?.message?.content;

      if (!reply) {
        throw new Error("Invalid transmission response.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `[SIGNAL LOST] Could not connect to AI terminal: ${err.message}`,
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
    <SectionFrame id="ask-ai">
      <AreaMarker
        mapArea={config?.mapArea || "AREA 07: POKECOM AI COMMUNICATOR"}
        spriteMarker={config?.spriteMarker || "north"}
        rightLabel="TRANSMITTER ACTIVE"
      />

      <SectionDialog padding="24px">
        <div
          style={{
            borderBottom: `2px solid ${PIXEL_COLORS.border}`,
            paddingBottom: "16px",
            marginBottom: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                backgroundColor: PIXEL_COLORS.accentCyan,
                display: "inline-block",
                animation: "pixelPulse 1.2s infinite",
              }}
            />
            <h2
              style={{
                fontFamily: FONTS.pixelDisplay,
                fontSize: "13px",
                color: PIXEL_COLORS.accent,
                letterSpacing: "1px",
                margin: 0,
              }}
            >
              NPC RUI // POKECOM INTERFACE
            </h2>
          </div>
          <p
            style={{
              fontFamily: FONTS.companionMono,
              fontSize: "11px",
              color: PIXEL_COLORS.textDim,
              margin: 0,
            }}
          >
            Instant conversational queries regarding technical abilities, campus leadership, and projects.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          {HINTS.map((hint) => (
            <button
              key={hint}
              onClick={() => send(hint)}
              disabled={loading}
              style={{
                ...PIXEL_BOX_STYLES.button,
                fontSize: "7px",
                padding: "6px 8px",
                color: PIXEL_COLORS.textDim,
              }}
            >
              ▶ {hint}
            </button>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "#070a12",
            border: `2px solid ${PIXEL_COLORS.border}`,
            height: "320px",
            overflowY: "auto",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  fontFamily: FONTS.pixelDisplay,
                  fontSize: "8px",
                  color: m.role === "assistant" ? PIXEL_COLORS.accentCyan : PIXEL_COLORS.accent,
                  backgroundColor: "#121826",
                  border: `1px solid ${PIXEL_COLORS.border}`,
                  padding: "3px 6px",
                  flexShrink: 0,
                }}
              >
                {m.role === "assistant" ? "RUI" : "YOU"}
              </span>
              <p
                style={{
                  fontFamily: FONTS.companionMono,
                  fontSize: "12px",
                  color: m.role === "assistant" ? PIXEL_COLORS.text : PIXEL_COLORS.textDim,
                  lineHeight: "1.7",
                  margin: 0,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </p>
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: FONTS.pixelDisplay,
                  fontSize: "8px",
                  color: PIXEL_COLORS.accentCyan,
                  backgroundColor: "#121826",
                  padding: "3px 6px",
                }}
              >
                RUI
              </span>
              <span
                style={{
                  fontFamily: FONTS.pixelDisplay,
                  fontSize: "10px",
                  color: PIXEL_COLORS.accent,
                }}
              >
                PROCESSING TRANSMISSION...
              </span>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div
          style={{
            display: "flex",
            border: `2px solid ${PIXEL_COLORS.border}`,
            borderTop: "none",
            backgroundColor: "#0a0f1c",
          }}
        >
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder="Type query transmission here..."
            rows={1}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              padding: "14px 16px",
              fontFamily: FONTS.companionMono,
              fontSize: "12px",
              color: PIXEL_COLORS.text,
              resize: "none",
              outline: "none",
            }}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            style={{
              ...PIXEL_BOX_STYLES.button,
              border: "none",
              borderLeft: `2px solid ${PIXEL_COLORS.border}`,
              backgroundColor: input.trim() && !loading ? PIXEL_COLORS.accent : "transparent",
              color: input.trim() && !loading ? "#080c14" : PIXEL_COLORS.textMuted,
              fontWeight: "bold",
              padding: "0 24px",
            }}
          >
            TRANSMIT
          </button>
        </div>
      </SectionDialog>
    </SectionFrame>
  );
}