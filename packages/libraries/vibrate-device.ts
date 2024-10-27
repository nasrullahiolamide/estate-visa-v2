const vibrateDevice = () => {
  if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 200]);
  }
};

export default vibrateDevice;
