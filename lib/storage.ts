const isBrowser = () => typeof window !== "undefined" && typeof localStorage !== "undefined";

export const storage = {
  getItem: (key: string): string | null => {
    if (!isBrowser()) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.error("storage.getItem error:", error);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.error("storage.setItem error:", error);
    }
  },

  removeItem: (key: string): void => {
    if (!isBrowser()) return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("storage.removeItem error:", error);
    }
  },
};
