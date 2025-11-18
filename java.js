console.log("java.js loaded successfully");
function applySavedTheme() {
const saved = localStorage.getItem("minty-theme");
if (!saved) return;
document.body.classList.add(saved);
updateQuickChatTheme(saved);
}
applySavedTheme();


function clearThemes() {
document.body.classList.remove("karen-theme","jarvis-theme","talal-theme","nova-theme","titan-theme");
}


function applyTheme(themeName) {
clearThemes();
document.body.classList.add(themeName);
localStorage.setItem("minty-theme", themeName);
updateQuickChatTheme(themeName);
}


function handleSecret() {
const code = input.value.trim().toLowerCase();


if (code === "karen") {
applyTheme("karen-theme");
message.textContent = "🕷️ Karen theme activated!";
} else if (code === "jarvis") {
applyTheme("jarvis-theme");
message.textContent = "🤖 Jarvis theme activated!";
} else if (code === "talal") {
applyTheme("talal-theme");
message.textContent = "✨ Talal theme activated!";
} else {
message.textContent = "❌ Incorrect code.";
}
}


if (submitBtn) submitBtn.addEventListener("click", handleSecret);


if (resetBtn) {
resetBtn.addEventListener("click", () => {
clearThemes();
localStorage.removeItem("minty-theme");
message.textContent = "Theme reset!";
updateQuickChatTheme(null);
});
}


function updateQuickChatTheme(theme) {
if (typeof _quickchat_embedded !== "function") return;


let quickTheme = {};


if (theme === "karen-theme") quickTheme = { type:"dark", primary:"#1976D2", background:"#0B0F2A", text:"#ffffff", bubbleAi:"#C1121F", bubbleUser:"#0a0a0a" };
else if (theme === "jarvis-theme") quickTheme = { type:"dark", primary:"#FFC400", background:"#0A0A0A", text:"#00E5FF", bubbleAi:"#B30000", bubbleUser:"#111111" };
else if (theme === "talal-theme") quickTheme = { type:"light", primary:"#5865F2", background:"#F2F3F5", text:"#2E3338", bubbleAi:"#5865F2", bubbleUser:"#e1e1e1" };
else quickTheme = { type:"dark", primary:"#70e6b8", background:"#135a3c", text:"#ffffff" };


_quickchat_embedded("init", "mo6r8ou35i", { theme: quickTheme });
}




<!-- ===================== -->
<!-- 📄 styles.css -->
<!-- ===================== -->
/* FIXED Background Layer */
#bg-effects {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: -1;
pointer-events: none;
}


/* Entire original CSS preserved */
/* ... (rest of your styles remain unchanged) ... */
