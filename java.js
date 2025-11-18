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

/* ========== Secret Theme System ========== */

const input = document.getElementById("secret-input");
const message = document.getElementById("secret-message");
const body = document.body;

const themes = {
    jarvis: "jarvis-theme",
    karen: "karen-theme",
    talal: "talal-theme"
};

function applyTheme(themeClass) {
    body.classList.add("theme-transition");

    setTimeout(() => {
        Object.values(themes).forEach(t => body.classList.remove(t));
        body.classList.add(themeClass);
    }, 50);

    setTimeout(() => {
        body.classList.remove("theme-transition");
    }, 650);
}

const savedTheme = localStorage.getItem("site-theme");
if (savedTheme && themes[savedTheme]) {
    body.classList.add(themes[savedTheme]);
}

document.getElementById("secret-submit").addEventListener("click", () => {
    const code = input.value.toLowerCase().trim();

    if (themes[code]) {
        applyTheme(themes[code]);
        message.textContent = `${code.toUpperCase()} theme activated!`;
        localStorage.setItem("site-theme", code);
    } else {
        message.textContent = "Wrong code.";
    }
});

document.getElementById("reset-theme").addEventListener("click", () => {
    Object.values(themes).forEach(t => body.classList.remove(t));
    localStorage.removeItem("site-theme");
    message.textContent = "Theme reset.";
});


