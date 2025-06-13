import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Cloud, Moon, Smartphone, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";

  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";

  return "light";
};

const HeroSection = () => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                🚀 Open Source & Self-Hosted
              </Badge>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Sync your <span className="text-primary">tabs</span> everywhere.{" "}
                <span className="text-secondary">In real time.</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                CrossTab allows you to access your tabs from any device and
                browser, with the maximum speed and security. No account
                required.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                >
                  <Smartphone className="mr-2 h-5 w-5" />
                  Add to Chrome
                </Button>
              </div>

              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Free and Open Source
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Multi-Device
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Self-Hosted
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative max-w-lg mx-auto">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center sync-pulse">
                    <Cloud className="h-10 w-10 text-white" />
                  </div>
                </div>

                <div className="relative">
                  <div
                    className="absolute -top-8 left-0 float-animation"
                    style={{ animationDelay: "0s" }}
                  >
                    <div className="w-24 h-16 bg-card border-2 border-border rounded-lg shadow-lg flex items-center justify-center">
                      <div className="w-16 h-10 bg-primary/20 rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute top-12 -right-4 float-animation"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div className="w-20 h-12 bg-card border-2 border-border rounded-lg shadow-lg flex items-center justify-center">
                      <div className="w-12 h-6 bg-secondary/20 rounded flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-0 left-8 float-animation"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="w-12 h-20 bg-card border-2 border-border rounded-xl shadow-lg flex items-center justify-center">
                      <div className="w-8 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute bottom-8 right-0 float-animation"
                    style={{ animationDelay: "1.5s" }}
                  >
                    <div className="w-16 h-20 bg-card border-2 border-border rounded-lg shadow-lg flex items-center justify-center">
                      <div className="w-12 h-16 bg-secondary/20 rounded flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ zIndex: 1 }}
                >
                  <defs>
                    <linearGradient
                      id="gradient1"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        stopColor="rgb(255, 107, 0)"
                        stopOpacity="0.3"
                      />
                      <stop
                        offset="100%"
                        stopColor="rgb(255, 174, 0)"
                        stopOpacity="0.3"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M60 60 L160 120"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M200 80 L160 120"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M120 180 L160 120"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                  <path
                    d="M180 160 L160 120"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-6 right-6 z-20">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle dark mode"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
