console.log("java.js loaded successfully");
window.addEventListener("DOMContentLoaded", () => {
    const mode = localStorage.getItem("theme-mode");
    const value = localStorage.getItem("theme-value");

    if (mode === "video") {
        setBackgroundTheme(value, false);
    }
});

// ================================
//  ELEMENTS
// ================================
const input = document.getElementById("secret-input");
const submitBtn = document.getElementById("secret-submit");
const resetBtn = document.getElementById("reset-theme");
const message = document.getElementById("secret-message");

const video = document.getElementById("bg-video");
const source = document.getElementById("bg-source");

// ================================
//  THEME SYSTEM
// ================================
function clearThemes() {
    document.body.classList.remove(
        "karen-theme",
        "jarvis-theme",
        "talal-theme",
        "nova-theme",
        "titan-theme",
        "bg1-theme",
        "bg2-theme",
        "bg3-theme",
        "bg4-theme"
    );
}

// Save theme mode + value
function saveTheme(mode, value) {
    localStorage.setItem("theme-mode", mode);   // "video" or "color"
    localStorage.setItem("theme-value", value); // # or theme name
}

// Load saved theme on page load
function applySavedTheme() {
    const mode = localStorage.getItem("theme-mode");
    const value = localStorage.getItem("theme-value");

    if (!mode || !value) return;

    if (mode === "video") {
        setBackgroundTheme(value, false); // don't re-save
    } else if (mode === "color") {
        applyTheme(value, false);
    }
}

applySavedTheme();

// ================================
//  APPLY NEW NORMAL THEME
// ================================
function applyTheme(themeName, save = true) {
    clearThemes();
    video.style.display = "none";

    document.body.classList.add(themeName);

    if (save) {
        saveTheme("color", themeName);
    }

    updateQuickChatTheme(themeName);
}

// ================================
//  BACKGROUND VIDEO THEMES
// ================================
function setBackgroundTheme(num, save = true) {
    clearThemes();

    source.src = `background${num}.mp4`;

    video.style.display = "block";
    video.load();
    video.play();

    document.body.classList.add(`bg${num}-theme`);

    if (save) {
        saveTheme("video", num);
    }
}

// ================================
//  SECRET CODE HANDLER
// ================================
function handleSecret() {
    const code = input.value.trim().toLowerCase();

    if (code === "karen") {
        applyTheme("karen-theme");
        message.textContent = "🕷️ Karen (Spider-Man) theme activated!";
    }
    else if (code === "jarvis") {
        applyTheme("jarvis-theme");
        message.textContent = "🤖 Jarvis (Iron Man) theme activated!";
    }
    else if (code === "talal") {
        applyTheme("talal-theme");
        message.textContent = "✨ Talal theme activated!";
    }
    else {
        message.textContent = "❌ Incorrect code. Try again.";
    }
}

// ================================
//  EVENT LISTENERS
// ================================
if (submitBtn) submitBtn.addEventListener("click", handleSecret);

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        clearThemes();
        localStorage.removeItem("theme-mode");
        localStorage.removeItem("theme-value");
        message.textContent = "Theme reset!";
        video.style.display = "none";
    });
}

// ================================
//  QUICKCHAT THEME UPDATE (same as yours)
// ================================
function updateQuickChatTheme(theme) {
    if (typeof _quickchat_embedded !== "function") return;

    console.log("Updating QuickChat theme:", theme);

    let quickTheme = {};

    if (theme === "karen-theme") {
        quickTheme = {
            type: "dark",
            primary: "#1976D2",
            background: "#0B0F2A",
            text: "#ffffff",
            bubbleAi: "#C1121F",
            bubbleUser: "#0a0a0a",
        };
    }
    else if (theme === "jarvis-theme") {
        quickTheme = {
            type: "dark",
            primary: "#FFC400",
            background: "#0A0A0A",
            text: "#00E5FF",
            bubbleAi: "#B30000",
            bubbleUser: "#111111",
        };
    }
    else if (theme === "talal-theme") {
        quickTheme = {
            type: "light",
            primary: "#5865F2",
            background: "#F2F3F5",
            text: "#2E3338",
            bubbleAi: "#5865F2",
            bubbleUser: "#e1e1e1",
        };
    }
    else {
        quickTheme = {
            type: "dark",
            primary: "#70e6b8",
            background: "#135a3c",
            text: "#ffffff",
        };
    }

    _quickchat_embedded("init", "mo6r8ou35i", { theme: quickTheme });
}
// Mobile navbar
function toggleMenu() {
    const nav = document.querySelector("nav ul");
    nav.classList.toggle("open");
}


