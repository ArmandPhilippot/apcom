export const LocalStorage = {
  get<T>(key: string): T | undefined {
    try {
      const serialItem = localStorage.getItem(key);
      if (!serialItem) return undefined;
      return JSON.parse(serialItem) as T;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  },
  set<T>(key: string, value: T) {
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
