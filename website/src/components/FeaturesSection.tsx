import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cloud, Globe, RefreshCw, Shield, Target, Zap } from "lucide-react";

const features = [
  {
    icon: RefreshCw,
    title: "Cross-Device Tab Sync",
    description:
      "Seamlessly sync tabs between different browsers and keep your workflow uninterrupted.",
  },
  {
    icon: Globe,
    title: "Multi-Browser Support",
    description:
      "Access your tabs from any browser - Chrome, Firefox, Safari, Edge, etc. Your tabs follow you everywhere.",
  },
  {
    icon: Zap,
    title: "Real-time Synchronization",
    description:
      "Instant tab updates across all connected devices. See changes as they happen.",
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description:
      "Token-based authentication ensures your data stays private and secure.",
  },
  {
    icon: Cloud,
    title: "Serverless Architecture",
    description:
      "Powered by Cloudflare Workers for lightning-fast global performance.",
  },
  {
    icon: Target,
    title: "Smart Deduplication",
    description:
      "Intelligent system prevents duplicate tabs from cluttering your browser.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why choose <span className="text-primary">CrossTab</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A complete solution for tab synchronization, designed for developers
            and demanding users.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
