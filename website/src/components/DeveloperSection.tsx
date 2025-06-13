import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

const DeveloperSection = () => {
  const stats = useQuery({
    queryKey: ["stats"],
    queryFn: () =>
      fetch("https://api.github.com/repos/Lorenzo0111/CrossTab").then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }

        return res.json();
      }),
  });

  const release = useQuery({
    queryKey: ["release"],
    queryFn: () =>
      fetch(
        "https://api.github.com/repos/Lorenzo0111/CrossTab/releases/latest"
      ).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch release");
        }

        return res.json();
      }),
  });

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-card/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12">
                  <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:text-white">
                    👨‍💻 For Developers
                  </Badge>

                  <h2 className="text-3xl font-bold mb-4">
                    <span className="text-primary">Open Source</span> and easy
                    to customize
                  </h2>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    CrossTab is completely open source and designed to be easily
                    extendable. Customize, contribute and integrate with your
                    favorite tools.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">
                        MIT License - Free for commercial use
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <span className="text-sm">API RESTful</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">
                        Self-hosted on Cloudflare Workers
                      </span>
                    </div>
                  </div>

                  <Button
                    className="bg-primary hover:bg-primary/90 text-white"
                    asChild
                  >
                    <a href="https://github.com/Lorenzo0111/CrossTab">
                      🌟 View on GitHub
                    </a>
                  </Button>
                </div>

                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 md:p-12 flex items-center">
                  <div className="w-full">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          ⭐ {stats.data?.stargazers_count}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Stars
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary mb-2">
                          🍴 {stats.data?.forks}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Forks
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          🐛 {stats.data?.open_issues_count}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Issues
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          📦 v{release.data?.tag_name ?? "0.0.0"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Release
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-card/50 rounded-lg border">
                      <code className="text-sm text-muted-foreground">
                        git clone https://github.com/Lorenzo0111/CrossTab
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
