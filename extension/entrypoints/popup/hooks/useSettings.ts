import { useCallback, useState } from "react";
import { browser } from "wxt/browser";
import { generateToken, testConnection } from "../utils/api";
import { getStorageValue, setStorageValue } from "../utils/storage";

export const useSettings = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [deviceName, setDeviceName] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const loadSettings = useCallback(async () => {
    try {
      const browserName = await browser.runtime.getPlatformInfo();
      const [storedApiUrl, storedAuthToken, storedDeviceName] =
        await Promise.all([
          getStorageValue("apiUrl", "https://api.crosstab.lorenzo0111.me"),
          getStorageValue("authToken", ""),
          getStorageValue("deviceName", browserName.os),
        ]);

      setApiUrl(storedApiUrl);
      setAuthToken(storedAuthToken);
      setDeviceName(storedDeviceName);
      setIsConnected(!!storedApiUrl && !!storedAuthToken);
    } catch (err) {
      console.error("Error loading settings:", err);
    }
  }, []);

  const saveSettings = useCallback(async () => {
    try {
      if (!apiUrl || !authToken) {
        setError("Please fill in all required fields");
        return false;
      }

      const isValid = await testConnection(apiUrl, authToken);
      if (!isValid) {
        setError("Invalid API URL or token");
        return false;
      }

      const browserName = await browser.runtime.getPlatformInfo();

      await Promise.all([
        setStorageValue("apiUrl", apiUrl),
        setStorageValue("authToken", authToken),
        setStorageValue("deviceName", deviceName || browserName.os),
      ]);

      browser.runtime.sendMessage({ action: "settingsUpdated" });

      setIsConnected(true);
      setError("");
      return true;
    } catch (err) {
      console.error("Error saving settings:", err);
      setError("Error saving settings");
      return false;
    }
  }, [apiUrl, authToken, deviceName]);

  const handleGenerateToken = useCallback(async () => {
    try {
      if (!apiUrl) {
        setError("Please enter API URL first");
        return;
      }

      setIsGenerating(true);
      const token = await generateToken(apiUrl);
      setAuthToken(token);
      setError("");
    } catch (error: any) {
      console.error("Error generating token:", error);
      setError(
        error.message || "Error generating token. Check API URL and try again."
      );
    } finally {
      setIsGenerating(false);
    }
  }, [apiUrl]);

  const clearSettings = useCallback(async () => {
    if (confirm("Are you sure you want to disconnect this device?")) {
      try {
        await browser.storage.local.clear();
        browser.runtime.sendMessage({ action: "settingsCleared" });

        const browserName = await browser.runtime.getPlatformInfo();

        setApiUrl("https://api.crosstab.lorenzo0111.me");
        setAuthToken("");
        setDeviceName(browserName.os);
        setIsConnected(false);
        setError("");
      } catch (error) {
        console.error("Error clearing settings:", error);
      }
    }
  }, []);

  return {
    apiUrl,
    authToken,
    deviceName,
    isConnected,
    error,
    isGenerating,

    setApiUrl,
    setAuthToken,
    setDeviceName,
    setError,

    loadSettings,
    saveSettings,
    handleGenerateToken,
    clearSettings,
  };
};
