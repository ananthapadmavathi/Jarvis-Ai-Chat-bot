const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const newChatBtn = document.getElementById("newChat");
const conversationList = document.querySelector(".conversation-list");

const API_URL = "http://localhost:5000/api";

let currentConversationId = null;

// -----------------------------
// Load conversations on startup
// -----------------------------
window.onload = async () => {
    await loadConversations();

    if (!currentConversationId) {
        await createConversation();
    }
};

// -----------------------------
// Send Button
// -----------------------------
sendBtn.addEventListener("click", sendMessage);

// -----------------------------
// Enter Key
// -----------------------------
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// -----------------------------
// New Chat
// -----------------------------
newChatBtn.addEventListener("click", async () => {
    await createConversation();
});

// -----------------------------
// Create Conversation
// -----------------------------
async function createConversation() {

    try {

        const res = await fetch(`${API_URL}/conversations`, {
            method: "POST"
        });

        const data = await res.json();

        currentConversationId = data.conversation._id;

        chatBox.innerHTML = `
            <div class="message bot">
                👋 Hello! I am <strong>Jarvis</strong>.<br>
                How can I help you today?
            </div>
        `;

        await loadConversations();

    } catch (err) {

        console.error(err);

    }

}

// -----------------------------
// Send Message
// -----------------------------
async function sendMessage() {

    const message = userInput.value.trim();

    if (!message) return;

    addMessage(message, "user");

    userInput.value = "";

    showTyping();

    try {

        const res = await fetch(`${API_URL}/chat`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                conversationId: currentConversationId,
                message

            })

        });

        const data = await res.json();

        removeTyping();

        addMessage(data.reply, "bot");

        await loadConversations();

    } catch (err) {

        removeTyping();

        addMessage("❌ Error connecting to server.", "bot");

        console.error(err);

    }

}

// -----------------------------
// Add Message
// -----------------------------
function addMessage(text, sender) {

    const div = document.createElement("div");

    div.className = `message ${sender}`;

    div.innerHTML = text;

    chatBox.appendChild(div);

    scrollBottom();

}

// -----------------------------
// Typing Indicator
// -----------------------------
function showTyping() {

    const div = document.createElement("div");

    div.className = "message bot";

    div.id = "typing";

    div.innerHTML = "Jarvis is typing...";

    chatBox.appendChild(div);

    scrollBottom();

}

function removeTyping() {

    const typing = document.getElementById("typing");

    if (typing) typing.remove();

}

// -----------------------------
// Scroll
// -----------------------------
function scrollBottom() {

    chatBox.scrollTop = chatBox.scrollHeight;

}

// -----------------------------
// Load Conversations
// -----------------------------
async function loadConversations() {

    try {

        const res = await fetch(`${API_URL}/conversations`);

        const data = await res.json();

        conversationList.innerHTML = "";

        data.conversations.forEach(chat => {

            const div = document.createElement("div");

            div.className = "conversation";

            div.innerHTML = `
                ${chat.title}
                <span style="float:right;color:red;cursor:pointer;">🗑</span>
            `;

            div.onclick = () => loadConversation(chat._id);

            div.querySelector("span").onclick = async (e) => {

                e.stopPropagation();

                await deleteConversation(chat._id);

            };

            conversationList.appendChild(div);

        });

    } catch (err) {

        console.error(err);

    }

}

// -----------------------------
// Load Single Conversation
// -----------------------------
async function loadConversation(id) {

    try {

        currentConversationId = id;

        const res = await fetch(`${API_URL}/conversations/${id}`);

        const data = await res.json();

        chatBox.innerHTML = "";

        data.conversation.messages.forEach(msg => {

            addMessage(msg.content, msg.role);

        });

    } catch (err) {

        console.error(err);

    }

}

// -----------------------------
// Delete Conversation
// -----------------------------
async function deleteConversation(id) {

    try {

        await fetch(`${API_URL}/conversations/${id}`, {

            method: "DELETE"

        });

        await loadConversations();

        if (id === currentConversationId) {

            createConversation();

        }

    } catch (err) {

        console.error(err);

    }

}