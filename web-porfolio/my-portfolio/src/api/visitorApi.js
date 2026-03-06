import axios from "./axios";

// Module-level flag prevents duplicate calls within the same JS session,
// even if trackVisitor() is invoked before the first request resolves
// (e.g. React 18 Strict Mode double-mount or fast re-renders).
let tracking = false;

export const trackVisitor = async () => {
  if (tracking || sessionStorage.getItem("visitorTracked")) return;
  tracking = true;

  try {
    await axios.post("/api/visitors", {
      userAgent: navigator.userAgent,
    });

    sessionStorage.setItem("visitorTracked", "true");
  } catch (error) {
    console.error("Visitor tracking failed:", error);
    tracking = false; // allow retry on network error
  }
};
