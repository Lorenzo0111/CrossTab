import type { FC } from "react";
import { useEffect } from "react";
import { browser } from "wxt/browser";
import Header from "./components/Header";
import SetupForm from "./components/SetupForm";
import SyncDashboard from "./components/SyncDashboard";
import { useSettings } from "./hooks/useSettings";
import { useTabSync } from "./hooks/useTabSync";

const App: FC = () => {
  const {
    apiUrl,
    authToken,
    deviceName,
    isConnected,
    error,
    isGenerating,

    setApiUrl,
    setAuthToken,
    setDeviceName,

    loadSettings,
    saveSettings,
    handleGenerateToken,
    clearSettings,
  } = useSettings();

  const {
    localTabsCount,
    remoteTabsCount,
    lastSyncTime,
    devices,

    updateStats,
    syncNow,
    openRemoteTabs,
    deleteAllTabs,
  } = useTabSync(apiUrl, authToken, deviceName);

  const handleSaveSettings = async () => {
    const success = await saveSettings();
    if (success) {
      await updateStats();
    }
  };

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    if (isConnected) {
      updateStats();
    }
  }, [isConnected, updateStats]);

  useEffect(() => {
    const handleMessage = (message: any) => {
      if (message.action === "syncCompleted") updateStats();
    };

    browser.runtime.onMessage.addListener(handleMessage);
    return () => browser.runtime.onMessage.removeListener(handleMessage);
  }, [updateStats]);

  return (
    <div
      style={{
        width: "350px",
        padding: "20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        margin: 0,
      }}
    >
      <Header isConnected={isConnected} />

      {!isConnected ? (
        <SetupForm
          apiUrl={apiUrl}
          authToken={authToken}
          deviceName={deviceName}
          error={error}
          isGenerating={isGenerating}
          onApiUrlChange={setApiUrl}
          onAuthTokenChange={setAuthToken}
          onDeviceNameChange={setDeviceName}
          onSaveSettings={handleSaveSettings}
          onGenerateToken={handleGenerateToken}
        />
      ) : (
        <SyncDashboard
          localTabsCount={localTabsCount}
          remoteTabsCount={remoteTabsCount}
          lastSyncTime={lastSyncTime}
          devices={devices}
          onSyncNow={syncNow}
          onOpenRemoteTabs={openRemoteTabs}
          onDeleteAllTabs={deleteAllTabs}
          onDisconnect={clearSettings}
        />
      )}
    </div>
  );
};

export default App;
