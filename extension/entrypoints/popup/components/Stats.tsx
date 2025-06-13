import type { FC } from "react";

interface StatsProps {
  localTabsCount: number;
  remoteTabsCount: number;
  lastSyncTime: string;
}

const Stats: FC<StatsProps> = ({
  localTabsCount,
  remoteTabsCount,
  lastSyncTime,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "10px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#ff6b00",
          }}
        >
          {localTabsCount}
        </div>
        <div style={{ fontSize: "12px", color: "#666" }}>Local Tabs</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#ff6b00",
          }}
        >
          {remoteTabsCount}
        </div>
        <div style={{ fontSize: "12px", color: "#666" }}>Remote Tabs</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#ff6b00",
          }}
        >
          {lastSyncTime}
        </div>
        <div style={{ fontSize: "12px", color: "#666" }}>Last Sync</div>
      </div>
    </div>
  );
};

export default Stats;
