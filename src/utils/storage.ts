export const session = {
  read(key: string) {
    try {
      const data = sessionStorage.getItem(key);
      return data !== null ? JSON.parse(data) : null;
    } catch (err) {
      console.error(`Error reading session storage for key "${key}":`, err);
      return null;
    }
  },

  write(key: string, data: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error(`Error writing to session storage for key "${key}":`, err);
    }
  },

  destroy(key: string) {
    try {
      sessionStorage.removeItem(key);
    } catch (err) {
      console.error(
        `Error removing from session storage for key "${key}":`,
        err,
      );
    }
  },
};

export const local = {
  read(key: string) {
    try {
      const data = localStorage.getItem(key);
      return data !== null ? JSON.parse(data) : null;
    } catch (err) {
      console.error(`Error reading local storage for key "${key}":`, err);
      return null;
    }
  },

  write(key: string, data: any) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error(`Error writing to local storage for key "${key}":`, err);
    }
  },

  destroy(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Error removing from local storage for key "${key}":`, err);
    }
  },
};
