import type { FC } from "react";

interface SetupFormProps {
  apiUrl: string;
  authToken: string;
  deviceName: string;
  error: string;
  isGenerating: boolean;
  onApiUrlChange: (value: string) => void;
  onAuthTokenChange: (value: string) => void;
  onDeviceNameChange: (value: string) => void;
  onSaveSettings: () => void;
  onGenerateToken: () => void;
}

const SetupForm: FC<SetupFormProps> = ({
  apiUrl,
  authToken,
  deviceName,
  error,
  isGenerating,
  onApiUrlChange,
  onAuthTokenChange,
  onDeviceNameChange,
  onSaveSettings,
  onGenerateToken,
}) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          API URL:
        </label>
        <input
          type="url"
          value={apiUrl}
          onChange={(e) => onApiUrlChange(e.target.value)}
          placeholder="https://api.crosstab.lorenzo0111.me"
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          Auth Token:
        </label>
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <input
            type="text"
            value={authToken}
            onChange={(e) => onAuthTokenChange(e.target.value)}
            placeholder="Enter your auth token"
            style={{
              flex: 1,
              padding: "8px 12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
          <button
            onClick={onGenerateToken}
            disabled={isGenerating}
            style={{
              backgroundColor: "#ff6b00",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              width: "auto",
              margin: 0,
            }}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
        <div style={{ fontSize: "12px", color: "#666", lineHeight: "1.4" }}>
          Click "Generate" to create a new token, or enter an existing one
          manually
        </div>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "500",
            color: "#333",
          }}
        >
          Device Name:
        </label>
        <input
          type="text"
          value={deviceName}
          onChange={(e) => onDeviceNameChange(e.target.value)}
          placeholder="My Browser"
          style={{
            width: "100%",
            padding: "8px 12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            fontSize: "14px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <button
        onClick={onSaveSettings}
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
        Save Settings
      </button>

      {error && (
        <div style={{ color: "#c62828", fontSize: "12px", marginTop: "5px" }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default SetupForm;
