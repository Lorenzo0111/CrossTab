import { useCallback, useState } from "react";
import { browser } from "wxt/browser";
import { Device, Tab } from "../types";
import { deleteAllRemoteTabs, fetchRemoteTabs } from "../utils/api";
import { getStorageValue, setStorageValue } from "../utils/storage";

export const useTabSync = (
  apiUrl: string,
  authToken: string,
  deviceName: string
) => {
  const [localTabsCount, setLocalTabsCount] = useState(0);
  const [remoteTabsCount, setRemoteTabsCount] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState("--");
  const [devices, setDevices] = useState<Device[]>([]);

  const updateStats = useCallback(async () => {
    try {
      const tabs = await browser.tabs.query({});
      setLocalTabsCount(tabs.length);

      const remoteTabs = await fetchRemoteTabs(apiUrl, authToken);
      if (remoteTabs) {
        setRemoteTabsCount(remoteTabs.length);

        const deviceMap: Record<string, Tab[]> = {};
        remoteTabs.forEach((tab) => {
          if (!deviceMap[tab.deviceName]) {
            deviceMap[tab.deviceName] = [];
          }
          deviceMap[tab.deviceName].push(tab);
        });

        const devicesList: Device[] = Object.entries(deviceMap).map(
          ([name, tabs]) => ({
            name,
            tabs,
            isCurrentDevice: name === deviceName,
          })
        );

        setDevices(devicesList);
      }

      const lastSync = await getStorageValue("lastSyncTime", 0);
      if (lastSync) {
        const time = new Date(lastSync).toLocaleTimeString();
        setLastSyncTime(time);
      }
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  }, [apiUrl, authToken, deviceName]);

  const syncNow = useCallback(async () => {
    try {
      const response = await browser.runtime.sendMessage({
        action: "syncTabs",
      });
      if (response?.success) {
        await updateStats();
        await setStorageValue("lastSyncTime", Date.now());
        await updateStats();
      }
    } catch (error) {
      console.error("Error syncing tabs:", error);
    }
  }, [updateStats]);

  const openRemoteTabs = useCallback(async () => {
    try {
      const remoteTabs = await fetchRemoteTabs(apiUrl, authToken);
      if (!remoteTabs) return;

      const currentTabs = await browser.tabs.query({});
      const currentUrls = new Set(currentTabs.map((tab) => tab.url));

      const tabsToOpen = remoteTabs.filter(
        (tab) => tab.deviceName !== deviceName && !currentUrls.has(tab.url)
      );

      if (tabsToOpen.length === 0) {
        alert("No new remote tabs to open");
        return;
      }

      const maxTabs = 10;
      const tabsSlice = tabsToOpen.slice(0, maxTabs);

      for (const tab of tabsSlice) {
        try {
          await browser.tabs.create({ url: tab.url, active: false });
        } catch (error) {
          console.error("Error opening tab:", tab.url, error);
        }
      }

      if (tabsToOpen.length > maxTabs) {
        alert(
          `Opened ${maxTabs} tabs. ${
            tabsToOpen.length - maxTabs
          } more tabs available.`
        );
      } else {
        alert(`Opened ${tabsSlice.length} new tabs from other devices`);
      }

      await syncNow();
    } catch (error) {
      console.error("Error opening remote tabs:", error);
    }
  }, [apiUrl, authToken, deviceName, syncNow]);

  const deleteAllTabs = useCallback(async () => {
    try {
      const success = await deleteAllRemoteTabs(apiUrl, authToken);
      if (success) {
        await updateStats();
        alert("All remote tabs deleted successfully");
      } else {
        alert("Failed to delete remote tabs");
      }
    } catch (error) {
      console.error("Error deleting all remote tabs:", error);
      alert("Error deleting remote tabs");
    }
  }, [apiUrl, authToken, updateStats]);

  return {
    localTabsCount,
    remoteTabsCount,
    lastSyncTime,
    devices,

    updateStats,
    syncNow,
    openRemoteTabs,
    deleteAllTabs,
  };
};
