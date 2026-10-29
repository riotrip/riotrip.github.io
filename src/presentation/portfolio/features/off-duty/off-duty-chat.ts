import { $ } from "../../shared/browser-dom";
import type { Conversation } from "../../../../application/off-duty/conversation";

function initChat(conversation: Conversation): void {
  const form = $<HTMLFormElement>("#chat-form");
  const input = $<HTMLInputElement>("#chat-input");
  const messages = $("#chat-messages");
  const chips = $("#chat-chips");
  const send = form?.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!form || !input || !messages || !send) return;

  if (!import.meta.env.PUBLIC_OPENROUTER_KEY) {
    input.disabled = true;
    send.disabled = true;
    if (chips) chips.hidden = true;
    const offline = document.createElement("p");
    offline.className = "lounge-chat__msg lounge-chat__msg--ai";
    offline.textContent = "[ off ] chat is offline.";
    messages.append(offline);
    return;
  }

  const appendMessage = (role: "user" | "assistant", content: string) => {
    const message = document.createElement("p");
    message.className = `lounge-chat__msg lounge-chat__msg--${role === "user" ? "user" : "ai"}`;
    message.textContent = content;
    messages.append(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const content = input.value.trim();
    if (!content || send.disabled) return;

    chips?.setAttribute("hidden", "");
    appendMessage("user", content);
    input.value = "";
    input.disabled = true;
    send.disabled = true;

    try {
      const reply = await conversation.send(content);
      appendMessage("assistant", reply);
    } catch {
      appendMessage(
        "assistant",
        "Chat is unavailable. Reach me by email instead.",
      );
    } finally {
      input.disabled = false;
      send.disabled = false;
      input.focus();
    }
  });

  // Starter questions fill the input and send it.
  chips?.querySelectorAll("button").forEach((chip) => {
    chip.addEventListener("click", () => {
      input.value = chip.textContent ?? "";
      form.requestSubmit();
    });
  });
}

/** Play the boot-style log once, when the chat first scrolls into view. */
function initReveal(): void {
  const chat = $("#lounge-chat");
  if (!chat) return;
  if (!("IntersectionObserver" in window)) {
    chat.classList.add("is-live");
    return;
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      chat.classList.add("is-live");
    },
    { threshold: 0.4 },
  );
  observer.observe(chat);
}

export function initOffDuty(conversation: Conversation): void {
  initReveal();
  initChat(conversation);
}
