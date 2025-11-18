_quickchat_embedded("init", "mo6r8ou35i", {
    theme: {
        type: "dark",
        primary: "#4acf95",           // minty green accent
        background: "#4acf95",        // chat background (inside iframe)
        text: "#ffffff",
        inputBackground: "#2a2a2a",
        inputText: "#ffffff",
        bubbleUser: "#2a2a2a",
        bubbleAi: "#4acf95",          // AI messages
        bubbleBorder: "#70e6b8",      // subtle border
        bubbleShadow: "0 2px 8px rgba(76,207,149,0.3)"
    }
});
const input = document.getElementById("secret-input");
const message = document.getElementById("secret-message");
const body = document.body;

// Secret code system
const input = document.getElementById("secret-input");
const message = document.getElementById("secret-message");
const body = document.body;

/* --- All themes list --- */
const themes = {
    "jarvis": "jarvis-theme",  // Iron Man
    "karen": "karen-theme",    // Spider-Man
    "talal": "talal-theme",    // Discord Light
    "nova": "nova-theme",
    "titan": "titan-theme"
};

/* Smooth animated transition */
function applyTheme(themeClass) {
    body.classList.add("theme-transition");

    setTimeout(() => {
        Object.values(themes).forEach(t => body.classList.remove(t));
        body.classList.add(themeClass);
        body.classList.remove("theme-transition");
    }, 300);
}

/* Load saved theme */
const savedTheme = localStorage.getItem("site-theme");
if (savedTheme && themes[savedTheme]) {
    body.classList.add(themes[savedTheme]);
}

/* Submit code */
document.getElementById("secret-submit").addEventListener("click", function () {
    const code = input.value.toLowerCase().trim();

    if (themes[code]) {
        applyTheme(themes[code]);
        message.textContent = `${code.toUpperCase()} theme activated!`;
        localStorage.setItem("site-theme", code);
    } else {
        message.textContent = "Incorrect code. Try again.";
    }
});

/* Reset theme */
document.getElementById("reset-theme").addEventListener("click", function () {
    Object.values(themes).forEach(t => body.classList.remove(t));
    localStorage.removeItem("site-theme");
    message.textContent = "Theme reset to default.";
});



