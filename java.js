// ---------------- Background & Theme Manager (clean) ----------------
(function () {
  const BG_KEY = "background";   // "none" or "1"/"2"/...
  const THEME_KEY = "themeName";

  document.addEventListener("DOMContentLoaded", () => {
    const savedBg = localStorage.getItem(BG_KEY);
    const savedTheme = localStorage.getItem(THEME_KEY);

    // if a video background is stored -> use it (priority)
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

  function _els() {
    return {
      video: document.getElementById("bg-video"),
      source: document.getElementById("bg-source")
    };
  }

  window.setBackgroundTheme = function (id, save = true) {
    const { video, source } = _els();
    if (!video) {
      console.warn("No #bg-video present on page.");
      return;
    }

    const n = parseInt(id, 10);
    if (isNaN(n)) return;

    const filename = `background${n}.mp4`;

    if (source) {
      source.src = filename;
      try { video.load(); } catch (e) {}
    } else {
      video.src = filename;
      try { video.load(); } catch (e) {}
    }

    video.style.display = "block";
    document.body.style.background = "black";

    removeNamedThemes();
    removeBgThemeClasses();
    document.body.classList.add(`bg${n}-theme`);

    if (save) {
      localStorage.setItem(BG_KEY, String(n));
      localStorage.removeItem(THEME_KEY);
    }

    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(()=>{ /* may be blocked on mobile until interaction */});
  };

  window.setBackgroundColorMode = function (save = true) {
    const { video, source } = _els();
    if (video) {
      if (source) {
        source.src = "";
        try { video.load(); } catch (e) {}
      } else {
        try { video.removeAttribute("src"); } catch(e){}
      }
      try { video.pause(); } catch(e){}
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

  window.applyThemeClass = function (name, save = true) {
    const { video, source } = _els();
    if (video) {
      if (source) {
        source.src = "";
        try { video.load(); } catch (e) {}
      } else {
        try { video.removeAttribute("src"); } catch(e){}
      }
      try { video.pause(); } catch(e){}
      video.style.display = "none";
    }

    removeNamedThemes();
    removeBgThemeClasses();

    if (name) document.body.classList.add(name);

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

  function removeNamedThemes(){
    ["karen-theme","jarvis-theme","talal-theme","nova-theme","titan-theme"].forEach(c=>document.body.classList.remove(c));
  }
  function removeBgThemeClasses(){
    ["bg1-theme","bg2-theme","bg3-theme","bg4-theme"].forEach(c=>document.body.classList.remove(c));
  }

  window.resetThemeAndBackground = function () {
    setBackgroundColorMode();
    localStorage.removeItem(BG_KEY);
    localStorage.removeItem(THEME_KEY);
  };

  // hook reset button if present
  document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = document.getElementById("reset-theme");
    if (resetBtn) resetBtn.onclick = () => resetThemeAndBackground();
  });

})();

// ---------------- Hamburger Menu (robust) ----------------
function toggleMenu() {
  // prefer element with id mobileMenu, otherwise fallback to first .nav-links
  const menu = document.getElementById("mobileMenu") || document.querySelector(".nav-links");
  if (!menu) return;
  menu.classList.toggle("open");
}
