import { browser } from "wxt/browser";

export const getStorageValue = async (key: string, fallback: any) => {
  try {
    const result = await browser.storage.local.get(key);
    return result[key] !== undefined ? result[key] : fallback;
  } catch (error) {
    console.error(`Error getting storage value for ${key}:`, error);
    return fallback;
  }
};

export const setStorageValue = async (key: string, value: any) => {
  try {
    await browser.storage.local.set({ [key]: value });
  } catch (error) {
    console.error(`Error setting storage value for ${key}:`, error);
  }
};
