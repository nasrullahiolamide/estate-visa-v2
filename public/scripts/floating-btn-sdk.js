function initFreshChat() {
  const isMobile = window?.matchMedia("(pointer:coarse)").matches || false;
  const script = document.createElement("script");
  script.src = isMobile
    ? "/scripts/floating-btn-touch.js"
    : "/scripts/floating-btn-desktop.js";
  script.async = true;

  document.body.appendChild(script);
}

window.onload = initFreshChat;
