import type { FC } from "react";
import { Device } from "../types";

interface DeviceListProps {
  devices: Device[];
}

const DeviceList: FC<DeviceListProps> = ({ devices }) => {
  if (devices.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: "15px" }}>
      <strong>Devices:</strong>
      <div>
        {devices.map((device, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <div
              style={{
                fontWeight: "500",
                color: device.isCurrentDevice ? "#FF6B00" : "#333",
              }}
            >
              {device.name} {device.isCurrentDevice ? "(This Device)" : ""}
            </div>
            <div style={{ color: "#666", fontSize: "12px" }}>
              {device.tabs.length} tabs
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
