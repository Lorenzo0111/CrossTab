class CrossTabBackground {
  apiUrl: string;
  authToken: string;
  deviceName: string;
  lastTabsHash: string;
  debounceTimer?: NodeJS.Timeout;

  constructor() {
    this.apiUrl = "";
    this.authToken = "";
    this.deviceName = "";
    this.lastTabsHash = "";
    this.init();
  }

  async init() {
    await this.loadSettings();
    this.setupEventListeners();
  }

  async loadSettings() {
    try {
      const result = await browser.storage.local.get([
        "apiUrl",
        "authToken",
        "deviceName",
      ]);
      this.apiUrl = result.apiUrl || "https://api.crosstab.lorenzo0111.me";
      this.authToken = result.authToken || "";
      this.deviceName =
        result.deviceName || (await browser.runtime.getPlatformInfo()).os;
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  }

  setupEventListeners() {
    browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
      this.handleMessage(message, sender, sendResponse);
      return true;
    });

    browser.tabs.onCreated.addListener(() => {
      this.debounceSync();
    });

    browser.tabs.onRemoved.addListener(() => {
      this.debounceSync();
    });

    browser.tabs.onUpdated.addListener((_tabId, changeInfo) => {
      if (changeInfo.url) this.debounceSync();
    });

    browser.storage.onChanged.addListener((_changes, namespace) => {
      if (namespace === "local") this.loadSettings();
    });
  }

  async handleMessage(message: any, _sender: any, sendResponse: any) {
    try {
      switch (message.action) {
        case "settingsUpdated":
          await this.loadSettings();
          sendResponse({ success: true });
          break;

        case "settingsCleared":
          this.apiUrl = "";
          this.authToken = "";
          this.deviceName = "";
          sendResponse({ success: true });
          break;

        case "syncTabs":
          const result = await this.syncTabs();
          sendResponse({ success: result });
          break;

        default:
          sendResponse({ success: false, error: "Unknown action" });
      }
    } catch (error) {
      console.error("Error handling message:", error);
      sendResponse({ success: false, error: (error as Error).message });
    }
  }

  debounceSync() {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      if (this.authToken) this.syncTabs();
    }, 2000);
  }

  async getCurrentTabs() {
    try {
      const tabs = await browser.tabs.query({});

      const validTabs = tabs
        .filter((tab) => {
          const url = tab.url;
          return (
            url &&
            !url.startsWith("chrome://") &&
            !url.startsWith("chrome-extension://") &&
            !url.startsWith("moz-extension://") &&
            !url.startsWith("about:") &&
            !url.startsWith("edge://") &&
            !url.startsWith("brave://") &&
            url !== "about:blank"
          );
        })
        .map((tab) => ({
          url: tab.url,
        }));

      return validTabs;
    } catch (error) {
      console.error("Error getting current tabs:", error);
      return [];
    }
  }

  async syncTabs() {
    if (!this.authToken || !this.apiUrl) return false;

    try {
      const currentTabs = await this.getCurrentTabs();

      const currentTabsHash = this.hashTabs(currentTabs);
      if (currentTabsHash === this.lastTabsHash) return true;

      const response = await fetch(`${this.apiUrl}/tabs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tabs: currentTabs,
          deviceName: this.deviceName,
        }),
      });

      if (response.ok) {
        this.lastTabsHash = currentTabsHash;

        await browser.storage.local.set({ lastSyncTime: Date.now() });

        try {
          browser.runtime.sendMessage({ action: "syncCompleted" });
        } catch (e) {}

        console.log(`Synced ${currentTabs.length} tabs successfully`);
        return true;
      } else {
        const errorText = await response.text();
        console.error("Sync failed:", response.status, errorText);
        return false;
      }
    } catch (error) {
      console.error("Error syncing tabs:", error);
      return false;
    }
  }

  hashTabs(tabs: any) {
    const urls = tabs
      .map((tab: any) => tab.url)
      .sort()
      .join("|");
    return btoa(urls).substring(0, 20);
  }
}

export default defineBackground(() => {
  const crossTab = new CrossTabBackground();

  browser.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      browser.tabs.create({
        url: browser.runtime.getURL("/popup.html"),
      });
    } else if (details.reason === "update") {
      console.log("CrossTab extension updated");
    }
  });

  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "syncTabs") crossTab.syncTabs();
  });

  browser.alarms.create("syncTabs", {
    periodInMinutes: 1,
  });
});
