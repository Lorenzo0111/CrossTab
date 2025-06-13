interface Tab {
  url: string;
  timestamp: number;
  deviceName: string;
}

type AppContext = {
  Bindings: CloudflareBindings;
  Variables: {
    token: string;
    tabs: Tab[];
  };
};
