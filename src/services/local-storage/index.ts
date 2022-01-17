export const LocalStorage = {
  get(key: string): string | null | undefined {
    try {
      const serialItem = localStorage.getItem(key);
      if (!serialItem) return undefined;
      return JSON.parse(serialItem);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  },
  set(key: string, value: string) {
    try {
      const serialItem = JSON.stringify(value);
      localStorage.setItem(key, serialItem);
    } catch (e) {
      console.log(e);
    }
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
