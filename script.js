
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const messages = document.getElementById("messages");
const welcome = document.getElementById("welcome");
const chatArea = document.getElementById("chatArea");
const sendBtn = document.getElementById("sendBtn");
const sidebar = document.getElementById("sidebar");
const chatHistory = document.getElementById("chatHistory");
const toast = document.getElementById("toast");

let firstMessage = true;
let toastTimer;

// Show a small notification
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}

// Add a message to the chat
function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = "message";

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";

    const content = document.createElement("div");
    content.className = "message-content";

    const name = document.createElement("div");
    name.className = "message-name";

    if (sender === "user") {
        avatar.classList.add("user-avatar");
        avatar.textContent = "VK";
        name.textContent = "You";
    } else {
        avatar.classList.add("bot-avatar");
        avatar.textContent = "GPT";
        name.textContent = "ChatGPT";
        message.classList.add("bot-message");
    }

    // textContent displays text safely without interpreting HTML
    content.appendChild(name);

    const messageText = document.createElement("div");
    messageText.textContent = text;
    content.appendChild(messageText);

    message.appendChild(avatar);
    message.appendChild(content);
    messages.appendChild(message);

    chatArea.scrollTop = chatArea.scrollHeight;
}

// Generate a predefined demo response
function getResponse(message) {
    const text = message.toLowerCase();

    if (text.includes("hello") || text.includes("hi")) {
        return "Hey! 👋 Welcome to this ChatGPT frontend demo. What would you like to explore today?";
    }

    if (text.includes("c++") || text.includes("programming")) {
        return "Great! C++ is an excellent language for learning programming and DSA.\n\nStart with these topics:\n1. Variables and data types\n2. If-else and switch\n3. Loops\n4. Functions\n5. Arrays and strings\n\nPractice small problems after every topic!";
    }

    if (text.includes("website") || text.includes("html") ||
        text.includes("css") || text.includes("javascript")) {
        return "Here is a beginner-friendly web development roadmap:\n\n1. HTML — page structure\n2. CSS — styling and layout\n3. JavaScript — interaction and logic\n4. DOM — changing page elements\n5. Git and GitHub — managing and sharing code\n\nBuild small projects as you learn!";
    }

    if (text.includes("study") || text.includes("plan")) {
        return "Here is a simple study routine you can try:\n\n• 45 minutes: Learn a new concept\n• 45 minutes: Solve practice questions\n• 15 minutes: Revise your notes\n• 15 minutes: Review mistakes\n\nKeep the routine realistic and consistent. Adjust it according to your classes.";
    }

    if (text.includes("space") || text.includes("universe")) {
        return "Here's something interesting! 🌌 A day on Venus is longer than its year. Venus takes longer to rotate once on its axis than to complete one orbit around the Sun.";
    }

    if (text.includes("who are you") || text.includes("your name")) {
        return "I'm a demo assistant inside this ChatGPT-inspired website. My replies are predefined using JavaScript, so I am not connected to a real AI model.";
    }

    if (text.includes("help")) {
        return "Sure! I can demonstrate a few topics:\n\n• C++ and programming\n• HTML, CSS and JavaScript\n• Study planning\n• Interesting facts\n\nTry asking me about one of these topics!";
    }

    return "Thanks for your message! 😊\n\nThis frontend is working, but its responses are predefined. To receive intelligent answers to any question, you would need to connect this interface to an AI API through a backend.";
}

// Create a new chat-history entry
function addHistory(title) {
    const item = document.createElement("button");
    item.className = "history-item";

    const icon = document.createElement("span");
    icon.textContent = "💬";

    const label = document.createElement("span");
    label.textContent = title;

    item.appendChild(icon);
    item.appendChild(label);

    // Selecting an old chat is not implemented in this demo
    item.addEventListener("click", function () {
        showToast("Chat history selection is a demo feature.");
    });

    chatHistory.prepend(item);
}

// Send the message
function sendMessage(text) {
    text = text.trim();

    if (text === "") {
        return;
    }

    if (firstMessage) {
        welcome.style.display = "none";
        addHistory(text.substring(0, 25));
        firstMessage = false;
    }

    addMessage(text, "user");
    userInput.value = "";
    userInput.style.height = "auto";
    sendBtn.disabled = true;

    // Display a typing indicator
    const typing = document.createElement("div");
    typing.className = "message typing";
    typing.textContent = "ChatGPT is thinking...";
    messages.appendChild(typing);

    chatArea.scrollTop = chatArea.scrollHeight;

    // Simulate a short response delay
    setTimeout(function () {
        typing.remove();

        const reply = getResponse(text);
        addMessage(reply, "bot");

        sendBtn.disabled = false;
        userInput.focus();
    }, 650);
}

// Handle form submission
chatForm.addEventListener("submit", function (event) {
    event.preventDefault();
    sendMessage(userInput.value);
});

// Allow Enter to send and Shift + Enter for a new line
userInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        chatForm.requestSubmit();
    }
});

// Automatically adjust the input height
userInput.addEventListener("input", function () {
    userInput.style.height = "auto";
    userInput.style.height =
        Math.min(userInput.scrollHeight, 180) + "px";
});

// Suggested prompts
document.querySelectorAll(".suggestion").forEach(function (button) {
    button.addEventListener("click", function () {
        sendMessage(button.dataset.prompt);
    });
});

// Start a new chat
document.getElementById("newChat").addEventListener("click", function () {
    messages.innerHTML = "";
    welcome.style.display = "block";
    firstMessage = true;
    userInput.value = "";
    userInput.style.height = "auto";
    sidebar.classList.add("hidden");
    userInput.focus();
});

// Open and close the sidebar
document.getElementById("menuBtn").addEventListener("click", function () {
    sidebar.classList.remove("hidden");
});

document.getElementById("closeSidebar").addEventListener("click", function () {
    sidebar.classList.add("hidden");
});

// Demo buttons
document.getElementById("attachBtn").addEventListener("click", function () {
    showToast("File attachments are not enabled in this demo.");
});

document.getElementById("voiceBtn").addEventListener("click", function () {
    showToast("Voice input is not enabled in this demo.");
});

// Share the page
document.getElementById("shareBtn").addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Page link copied!");
    } catch (error) {
        showToast("Open this page in a browser to share its link.");
    }
});

// Keyboard shortcut: Ctrl + K or Cmd + K for a new chat
document.addEventListener("keydown", function (event) {
    if ((event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k") {
        event.preventDefault();
        document.getElementById("newChat").click();
    }
});
