export type CookieConsent = "accepted" | "rejected";

const STORAGE_KEY = "wfe-cookie-consent";
const CLARITY_ID = "xv3me9x0ek";

export function getStoredConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function storeConsent(value: CookieConsent): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    return;
  }
}

export function clearConsent(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}

type ClarityFn = ((...args: unknown[]) => void) & { q?: unknown[][] };

let clarityLoaded = false;

export function loadClarity(): void {
  if (clarityLoaded || typeof window === "undefined") return;
  clarityLoaded = true;

  const w = window as typeof window & { clarity?: ClarityFn };
  if (!w.clarity) {
    const stub: ClarityFn = (...args) => {
      stub.q = stub.q ?? [];
      stub.q.push(args);
    };
    w.clarity = stub;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
  document.head.appendChild(script);
}
