import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Install the extension",
      description:
        "Download and install the CrossTab extension from the Chrome Web Store or the GitHub repository.",
      icon: "🔧",
    },
    {
      number: "02",
      title: "Configure your endpoint",
      description:
        "Enter your custom Cloudflare endpoint and authentication token.",
      icon: "⚙️",
    },
    {
      number: "03",
      title: "Start syncing",
      description:
        "Your tabs are now synced in real time on all your devices and browsers.",
      icon: "🚀",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">
              Easy to configure
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-primary">it works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to start syncing your tabs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary to-secondary opacity-30 transform -translate-y-1/2"></div>
            <div className="hidden md:block absolute top-1/2 left-2/3 w-1/3 h-0.5 bg-gradient-to-r from-secondary to-primary opacity-30 transform -translate-y-1/2"></div>

            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-xl">
                    {step.number}
                  </div>

                  <div className="text-4xl mb-4">{step.icon}</div>

                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
