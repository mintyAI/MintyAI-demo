console.log("java.js loaded successfully");

// ================================
//  ELEMENTS (safe on all pages)
// ================================
const input = document.getElementById("secret-input");
const submitBtn = document.getElementById("secret-submit");
const resetBtn = document.getElementById("reset-theme");
const message = document.getElementById("secret-message");


// ================================
//  APPLY SAVED THEME
// ================================
function applySavedTheme() {
    const saved = localStorage.getItem("minty-theme");

    if (!saved) return;

    document.body.classList.add(saved);
    console.log("Loaded saved theme:", saved);

    updateQuickChatTheme(saved);
}

applySavedTheme();


// ================================
//  CLEAR ALL THEMES
// ================================
function clearThemes() {
    document.body.classList.remove(
        "karen-theme",
        "jarvis-theme",
        "talal-theme",
        "nova-theme",
        "titan-theme"
    );
}


// ================================
//  APPLY NEW THEME
// ================================
function applyTheme(themeName) {
    clearThemes();

    document.body.classList.add("theme-transition");

    setTimeout(() => {
        document.body.classList.remove("theme-transition");
    }, 600);

    document.body.classList.add(themeName);

    localStorage.setItem("minty-theme", themeName);
    console.log("Applied theme:", themeName);

    updateQuickChatTheme(themeName);
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
    else if (code === "titan") {
        applyTheme("talal-theme");
        message.textContent = "✨ Talal (Discord Light) theme activated!";
    }
    else {
        message.textContent = "❌ Incorrect code. Try again.";
    }
}


// ================================
//  EVENT LISTENERS (safe)
// ================================
if (submitBtn && input) {
    submitBtn.addEventListener("click", handleSecret);
}

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        clearThemes();
        localStorage.removeItem("minty-theme");
        message.textContent = "Theme reset!";
        console.log("Theme reset");

        updateQuickChatTheme(null);
    });
}


// ================================
//  QUICKCHAT THEME UPDATE (optional)
//  Runs ONLY if QuickChat exists
// ================================
function updateQuickChatTheme(theme) {
    if (typeof _quickchat_embedded !== "function") {
        return; // QuickChat not on this page
    }

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
        // default Minty theme
        quickTheme = {
            type: "dark",
            primary: "#70e6b8",
            background: "#135a3c",
            text: "#ffffff"
        };
    }

    _quickchat_embedded("init", "mo6r8ou35i", { theme: quickTheme });
}

