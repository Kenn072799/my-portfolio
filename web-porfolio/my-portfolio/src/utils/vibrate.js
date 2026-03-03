export const vibrate = (duration = 10) => {
  if (typeof navigator !== "undefined" && navigator.vibrate) {
    navigator.vibrate(duration);
  }
};