function initChat() {
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

    var msgsEl = document.getElementById("chat-messages");
    var inputEl = document.getElementById("chat-input");
    var sendBtn = document.getElementById("chat-send");

    if (!msgsEl || !inputEl || !sendBtn) {
        console.error("[AI Chat] Elemen tidak ditemukan, initChat() dipanggil terlalu awal.");
        return;
    }

    var messages = [];
    var isLoading = false;

    function appendMsg(role, content) {
        var row = document.createElement("div");
        row.className = "chat-msg " + (role === "user" ? "user" : "ai");
        var bubble = document.createElement("div");
        bubble.className = "msg-bubble";
        bubble.textContent = content;
        row.appendChild(bubble);
        msgsEl.appendChild(row);
        msgsEl.scrollTop = msgsEl.scrollHeight;
    }

    function showTyping() {
        var row = document.createElement("div");
        row.className = "chat-msg ai";
        row.id = "typing-indicator";
        row.innerHTML = '<div class="msg-bubble chat-typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>';
        msgsEl.appendChild(row);
        msgsEl.scrollTop = msgsEl.scrollHeight;
    }

    function hideTyping() {
        var t = document.getElementById("typing-indicator");
        if (t) t.remove();
    }

    function updateBtn() {
        sendBtn.disabled = !inputEl.value.trim() || isLoading;
    }

    function send(text) {
        if (!text || isLoading) return;
        messages.push({ role: "user", content: text });
        appendMsg("user", text);
        isLoading = true;
        updateBtn();
        showTyping();

        fetch(PROXY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: MODEL,
                max_tokens: 500,
                messages: [{ role: "system", content: PORTFOLIO_CONTEXT }].concat(messages)
            })
        })
        .then(function (res) {
            return res.json().then(function (data) {
                return { ok: res.ok, data: data };
            });
        })
        .then(function (result) {
            if (result.data.error) {
                throw new Error("Penolakan dari OpenRouter: " + result.data.error.message);
            }
            
            if (!result.data.choices || !result.data.choices[0]) {
                console.error("Data utuh dari server:", result.data);
                throw new Error("Format balasan dari server tidak sesuai.");
            }

            var reply = result.data.choices[0].message.content;
            messages.push({ role: "assistant", content: reply });
            hideTyping();
            appendMsg("ai", reply);
        })
        .catch(function (err) {
            hideTyping();
            appendMsg("ai", "Ups, gagal memuat AI. " + err.message);
            console.error("[Chat Error]", err);
        })
        .finally(function () {
            isLoading = false;
            updateBtn();
        });
    }

    inputEl.addEventListener("input", function () {
        inputEl.style.height = "auto";
        inputEl.style.height = Math.min(inputEl.scrollHeight, 80) + "px";
        updateBtn();
    });

    inputEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            var text = inputEl.value.trim();
            inputEl.value = "";
            inputEl.style.height = "auto";
            send(text);
        }
    });

    sendBtn.addEventListener("click", function () {
        var text = inputEl.value.trim();
        inputEl.value = "";
        inputEl.style.height = "auto";
        send(text);
    });

    window.sendHint = function (text) { send(text); };
}