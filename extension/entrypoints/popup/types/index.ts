export interface Tab {
  url: string;
  deviceName: string;
}

export interface ApiResponse {
  tabs: Tab[];
}

export interface Device {
  name: string;
  tabs: Tab[];
  isCurrentDevice: boolean;
}
