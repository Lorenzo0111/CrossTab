import type { FC } from "react";

interface HeaderProps {
  isConnected: boolean;
}

const Header: FC<HeaderProps> = ({ isConnected }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#ff6b00",
          marginBottom: "5px",
        }}
      >
        CrossTab
      </div>
      <div
        style={{
          padding: "10px",
          borderRadius: "8px",
          marginBottom: "15px",
          textAlign: "center",
          fontWeight: "500",
          backgroundColor: isConnected ? "#e8f5e8" : "#ffebee",
          color: isConnected ? "#2e7d32" : "#c62828",
          border: isConnected ? "1px solid #c8e6c9" : "1px solid #ffcdd2",
        }}
      >
        {isConnected ? "Connected" : "Not Connected"}
      </div>
    </div>
  );
};

export default Header;
