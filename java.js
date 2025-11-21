// ---------------- Background Handling ----------------

// Load stored background when page opens
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("background");

    if (!saved || saved === "none") {
        setBackgroundColorMode();
        return;
    }

    setBackgroundTheme(parseInt(saved));
});


// Set MP4 background theme
function setBackgroundTheme(num) {
    const video = document.getElementById("bg-video");
    const source = document.getElementById("bg-source");

    source.src = "background" + num + ".mp4";
    video.load();
    video.style.display = "block";

    document.body.style.background = "black";

    localStorage.setItem("background", num);
}


// Default dark theme (#2f2f2f)
function setBackgroundColorMode() {
    const video = document.getElementById("bg-video");
    video.style.display = "none";

    document.body.style.background = "#2f2f2f";

    localStorage.setItem("background", "none");
}


// Reset button
const resetBtn = document.getElementById("reset-theme");
if (resetBtn) {
    resetBtn.onclick = () => setBackgroundColorMode();
}


// ---------------- Hamburger Menu ----------------

function toggleMenu() {
    const menu = document.querySelector(".nav-links");
    menu.classList.toggle("active");
}
