/* ========================================================= */
/* QuickChat init — DO NOT TOUCH                             */
/* ========================================================= */
_quickchat_embedded("init", "mo6r8ou35i", {
    theme: {
        type: "dark",
        primary: "#4acf95",
        background: "#4acf95",
        text: "#ffffff",
        inputBackground: "#2a2a2a",
        inputText: "#ffffff",
        bubbleUser: "#2a2a2a",
        bubbleAi: "#4acf95",
        bubbleBorder: "#70e6b8",
        bubbleShadow: "0 2px 8px rgba(76,207,149,0.3)"
    }
});

console.log("java.js loaded!"); // debug check

// === Elements (some pages don't have secret section, so we check) ===
const input = document.getElementById("secret-input");
const submitBtn = document.getElementById("secret-submit");
const resetBtn = document.getElementById("reset-theme");
const message = document.getElementById("secret-message");


// === Apply theme from localStorage on page load ===
function applySavedTheme() {
    const savedTheme = localStorage.getItem("minty-theme");

    if (savedTheme) {
        document.body.classList.add(savedTheme);
        console.log("Applied saved theme:", savedTheme);
    }
}
applySavedTheme();


// === Remove all theme classes ===
function clearThemes() {
    document.body.classList.remove(
        "karen-theme",
        "jarvis-theme",
        "talal-theme"
    );
}


// === Apply new theme ===
function applyTheme(themeName) {
    clearThemes();
    document.body.classList.add("theme-transition");
    
    setTimeout(() => {
        document.body.classList.remove("theme-transition");
    }, 600);

    document.body.classList.add(themeName);

    localStorage.setItem("minty-theme", themeName);
    console.log("Theme applied:", themeName);
}


// === Handle secret code submission ===
function handleSecret() {
    const code = input.value.trim().toLowerCase();

    if (code === "karen") {
        applyTheme("karen-theme");
        message.textContent = "🕷️ Karen theme activated!";
    } 
    else if (code === "jarvis") {
        applyTheme("jarvis-theme");
        message.textContent = "🤖 Jarvis theme activated!";
    }
    else if (code === "talal") {
        applyTheme("talal-theme");
        message.textContent = "✨ Talal (Discord Light) theme activated!";
    }
    else {
        message.textContent = "❌ Wrong code!";
    }
}


// === Add event listeners ONLY if elements exist ===
if (submitBtn && input) {
    submitBtn.addEventListener("click", handleSecret);
}

if (resetBtn) {
    resetBtn.addEventListener("click", () => {
        clearThemes();
        localStorage.removeItem("minty-theme");
        message.textContent = "Theme reset!";
    });
}




