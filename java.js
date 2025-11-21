// ---------------- Background & Theme Manager ----------------
(function () {
  const BG_KEY = "background"; // "none" or "1"/"2"/...
  const THEME_KEY = "themeName"; // e.g. "karen-theme"

  // DOM ready -> restore saved state
  document.addEventListener("DOMContentLoaded", () => {
    const bg = localStorage.getItem(BG_KEY);
    const theme = localStorage.getItem(THEME_KEY);

    // if a video background is stored -> use it (priority)
    if (bg && bg !== "none") {
      setBackgroundTheme(parseInt(bg, 10), false);
      return;
    }

    // else if a named theme saved -> apply it
    if (theme) {
      applyThemeClass(theme, false);
      return;
    }

    // default
    setBackgroundColorMode(false);
  });

  // -- Helpers to get DOM elements --
  function _els() {
    return {
      video: document.getElementById("bg-video"),
      source: document.getElementById("bg-source")
    };
  }

  // Set video background (1..n). save = whether to persist to localStorage
  window.setBackgroundTheme = function setBackgroundTheme(id, save = true) {
    const { video, source } = _els();
    if (!video) {
      console.warn("No #bg-video on page.");
      return;
    }

    const n = parseInt(id, 10);
    if (isNaN(n)) return;

    const filename = `background${n}.mp4`; // adjust if your filenames differ
    if (source) {
      source.src = filename;
      try { video.load(); } catch (e) {}
    } else {
      try { video.pause(); } catch {}
      video.src = filename;
      try { video.load(); } catch {}
    }

    video.style.display = "block";
    // fallback background behind video
    document.body.style.background = "black";

    // remove any named theme classes so color themes don't conflict
    removeNamedThemes();

    if (save) localStorage.setItem(BG_KEY, String(n));
    if (save) localStorage.removeItem(THEME_KEY);

    // try to play (may be blocked until user interacts)
    const p = video.play();
    if (p && typeof p.then === "function") {
      p.catch(() => { /* ignored */ });
    }
  };

  // Switch back to plain color mode
  window.setBackgroundColorMode = function setBackgroundColorMode(save = true) {
    const { video, source } = _els();
    if (video) {
      if (source) {
        source.src = "";
        try { video.load(); } catch {}
      } else {
        try { video.pause(); } catch {}
        try { video.removeAttribute("src"); } catch {}
      }
      try { video.pause(); } catch {}
      video.style.display = "none";
    }

    document.body.style.background = "#2f2f2f";
    if (save) localStorage.setItem(BG_KEY, "none");
    if (save) localStorage.removeItem(THEME_KEY);
    removeNamedThemes();
  };

  // Apply a named (color) theme: e.g. "karen-theme"
  window.applyThemeClass = function applyThemeClass(name, save = true) {
    // hide video if any
    const { video, source } = _els();
    if (video) {
      if (source) {
        source.src = "";
        try { video.load(); } catch {}
      } else {
        try { video.pause(); } catch {}
        try { video.removeAttribute("src"); } catch {}
      }
      video.style.display = "none";
    }

    // remove previous named themes and bg-theme classes
    removeNamedThemes();
    removeBgThemeClasses();

    if (name) document.body.classList.add(name);

    // set sensible page background: some themes are light/dark
    if (name === "talal-theme") document.body.style.background = "#F2F3F5";
    else if (name === "jarvis-theme") document.body.style.background = "#0A0A0A";
    else if (name === "karen-theme") document.body.style.background = "#0B0F2A";
    else document.body.style.background = "#2f2f2f";

    if (save) {
      localStorage.setItem(THEME_KEY, name);
      localStorage.setItem(BG_KEY, "none");
    }
  };

  function removeNamedThemes() {
    ["karen-theme", "jarvis-theme", "talal-theme", "nova-theme", "titan-theme"].forEach(c => {
      document.body.classList.remove(c);
    });
  }

  function removeBgThemeClasses() {
    ["bg1-theme", "bg2-theme", "bg3-theme", "bg4-theme"].forEach(c => {
      document.body.classList.remove(c);
    });
  }

  // Utility: reset both
  window.resetThemeAndBackground = function resetThemeAndBackground() {
    setBackgroundColorMode();
    localStorage.removeItem(THEME_KEY);
    localStorage.removeItem(BG_KEY);
  };

  // Hook reset button if present
  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("reset-theme");
    if (btn) btn.addEventListener("click", () => resetThemeAndBackground());
  });

})();

// ---------------- Hamburger Menu (keeps minimal footprint) ----------------
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (menu) menu.classList.toggle("open");
}
