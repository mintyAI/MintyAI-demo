// ---------------- Background Handling ----------------

// Load saved background when page opens
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("background");

    if (!saved || saved === "none") {
        setBackgroundColorMode();
    } else {
        setBackgroundTheme(parseInt(saved));
    }
});


// Apply MP4 background theme
function setBackgroundTheme(num) {
    const video = document.getElementById("bg-video");

    // Hide if element missing
    if (!video) return;

    video.style.display = "block";
    video.src = `background${num}.mp4`;  // MUST match filenames
    video.load();
    video.play().catch(() => {});

    // fallback color behind video
    document.body.style.background = "black";

    localStorage.setItem("background", num);
}


// Apply default dark mode background
function setBackgroundColorMode() {
    const video = document.getElementById("bg-video");

    if (video) {
        video.pause();
        video.src = "";
        video.style.display = "none";
    }

    document.body.style.background = "#2f2f2f";

    localStorage.setItem("background", "none");
}


// ---------------- Reset Button ----------------

const resetBtn = document.getElementById("reset-theme");
if (resetBtn) {
    resetBtn.onclick = () => setBackgroundColorMode();
}


// ---------------- Hamburger Menu ----------------

function toggleMenu() {
    const menu = document.querySelector('.nav-links');
    if (menu) {
        menu.classList.toggle('open');
    }
}
