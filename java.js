// ---------------- Background & Theme Manager ----------------
(function () {
  const BG_KEY = "background";   // stores: "none" or "1", "2", "3"...
  const THEME_KEY = "themeName"; // stores: "karen-theme", "jarvis-theme", etc.

  // Restore saved background/theme on page load
  document.addEventListener("DOMContentLoaded", () => {
    const savedBg = localStorage.getItem(BG_KEY);
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedBg && savedBg !== "none") {
      setBackgroundTheme(parseInt(savedBg, 10), false);
      return;
    }

    if (savedTheme) {
      applyThemeClass(savedTheme, false);
      return;
    }

    setBackgroundColorMode(false);
  });

  // Helper to access video elements
  function _els() {
    return {
      video: document.getElementById("bg-video"),
      source: document.getElementById("bg-source")
    };
  }

  // ---------------- Set MP4 Background ----------------
  window.setBackgroundTheme = function (id, save = true) {
    const { video, source } = _els();
    if (!video) return;

    const num = parseInt(id, 10);
    if (isNaN(num)) return;

    const filename = `background${num}.mp4`;

    // Update the source
    if (source) {
      source.src = filename;
      try { video.load(); } catch {}
    } else {
      video.src = filename;
      try { video.load(); } catch {}
    }

    video.style.display = "block";
    document.body.style.background = "black";

    // Remove color theme classes
    removeNamedThemes();
    removeBgThemeClasses();

    document.body.classList.add(`bg${num}-theme`);

    if (save) {
      localStorage.setItem(BG_KEY, String(num));
      localStorage.removeItem(THEME_KEY);
    }

    // Attempt to play (mobile may still block until user taps)
    const p = video.play();
    if (p?.catch) p.catch(() => {});
  };

  // ---------------- Remove video, use default dark background ----------------
  window.setBackgroundColorMode = function (save = true) {
    const { video, source } = _els();

    if (video) {
      if (source) {
        source.src = "";
        try { video.load(); } catch {}
      } else {
        try { video.removeAttribute("src"); } catch {}
      }
      video.pause?.();
      video.style.display = "none";
    }

    removeNamedThemes();
    removeBgThemeClasses();
    document.body.style.background = "#2f2f2f";

    if (save) {
      localStorage.setItem(BG_KEY, "none");
      localStorage.removeItem(THEME_KEY);
    }
  };

  // ---------------- Apply a color theme (non-video) ----------------
  window.applyThemeClass = function (name, save = true) {
    const { video, source } = _els();

    // Hide video if shown
    if (video) {
      if (source) {
        source.src = "";
        try { video.load(); } catch {}
      } else {
        try { video.removeAttribute("src"); } catch {}
      }
      video.pause?.();
      video.style.display = "none";
    }

    removeNamedThemes();
    removeBgThemeClasses();

    if (name) document.body.classList.add(name);

    // Automatic body background per theme
    switch (name) {
      case "talal-theme": document.body.style.background = "#F2F3F5"; break;
      case "jarvis-theme": document.body.style.background = "#0A0A0A"; break;
      case "karen-theme": document.body.style.background = "#0B0F2A"; break;
      default: document.body.style.background = "#2f2f2f";
    }

    if (save) {
      localStorage.setItem(THEME_KEY, name);
      localStorage.setItem(BG_KEY, "none");
    }
  };

  // ---------------- Helpers ----------------
  function removeNamedThemes() {
    ["karen-theme", "jarvis-theme", "talal-theme", "nova-theme", "titan-theme"]
      .forEach(c => document.body.classList.remove(c));
  }

  function removeBgThemeClasses() {
    ["bg1-theme", "bg2-theme", "bg3-theme", "bg4-theme"]
      .forEach(c => document.body.classList.remove(c));
  }

  // Reset both system
  window.resetThemeAndBackground = function () {
    setBackgroundColorMode();
    localStorage.removeItem(BG_KEY);
    localStorage.removeItem(THEME_KEY);
  };

  // Auto-hook reset button
  document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.getElementById("reset-theme");
    if (resetBtn) resetBtn.onclick = () => resetThemeAndBackground();
  });

})();

// ---------------- Hamburger Menu ----------------
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu?.classList.toggle("open");
}
#bg-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;      /* THIS! Makes it behind everything */
  pointer-events: none;
}

