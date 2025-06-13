import type { FC } from "react";
import { Device } from "../types";
import DeviceList from "./DeviceList";
import Stats from "./Stats";

interface SyncDashboardProps {
  localTabsCount: number;
  remoteTabsCount: number;
  lastSyncTime: string;
  devices: Device[];
  onSyncNow: () => void;
  onOpenRemoteTabs: () => void;
  onDeleteAllTabs: () => void;
  onDisconnect: () => void;
}

const SyncDashboard: FC<SyncDashboardProps> = ({
  localTabsCount,
  remoteTabsCount,
  lastSyncTime,
  devices,
  onSyncNow,
  onOpenRemoteTabs,
  onDeleteAllTabs,
  onDisconnect,
}) => {
  const handleDeleteAllTabs = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all remote tabs? This action cannot be undone."
      )
    ) {
      onDeleteAllTabs();
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "15px",
        }}
      >
        <Stats
          localTabsCount={localTabsCount}
          remoteTabsCount={remoteTabsCount}
          lastSyncTime={lastSyncTime}
        />

        <button
          onClick={onSyncNow}
          style={{
            backgroundColor: "#ff6b00",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          Sync Now
        </button>
        <button
          onClick={onOpenRemoteTabs}
          style={{
            backgroundColor: "#f5f5f5",
            color: "#333",
            border: "1px solid #ddd",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          Open Remote Tabs
        </button>
        <button
          onClick={handleDeleteAllTabs}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          Delete All Remote Tabs
        </button>
      </div>

      <DeviceList devices={devices} />

      <button
        onClick={onDisconnect}
        style={{
          backgroundColor: "#f5f5f5",
          color: "#333",
          border: "1px solid #ddd",
          padding: "10px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "500",
          width: "100%",
          marginTop: "15px",
        }}
      >
        Disconnect
      </button>
    </div>
  );
};

export default SyncDashboard;
