import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Zap } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-12 text-center">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Zap className="h-4 w-4" />
                  Ready in 5 minutes
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Try it <span className="text-primary">for free</span>
                </h2>

                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Start syncing your tabs on all your devices and browsers. No
                  account required, setup in minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg"
                >
                  <Smartphone className="mr-2 h-5 w-5" />
                  Install the extension
                </Button>
              </div>

              <div className="grid sm:grid-cols-3 gap-6 pt-8 border-t">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Setup in 5 minutes
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Free and Open Source
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Community support
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
