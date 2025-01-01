function initFreshChat() {
  try {
    const isMobile = window.matchMedia("(pointer:coarse)").matches || false;
    const script = document.createElement("script");

    script.src = isMobile
      ? "/scripts/floating-btn-touch.js"
      : "/scripts/floating-btn-desktop.js";

    script.async = true;
    script.onerror = () => {
      console.error("Failed to load FreshChat script.");
    };

    document.body.appendChild(script);
  } catch (error) {
    console.error("Error initializing FreshChat:", error);
  }
}

initFreshChat();
