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

/* ========================================================= */
/* Secret Theme System                                        */
/* ========================================================= */

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
    }, 20);

    setTimeout(() => {
        body.classList.remove("theme-transition");
    }, 600);
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
