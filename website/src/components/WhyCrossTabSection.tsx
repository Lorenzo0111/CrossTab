import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const WhyCrossTabSection = () => {
  const comparisons = [
    {
      feature: "Account required",
      crosstab: "❌ No",
      others: "✅ Yes",
      crossTabColor: "text-green-600",
      othersColor: "text-red-500",
    },
    {
      feature: "Open Source",
      crosstab: "✅ Completely",
      others: "❌ Proprietary",
      crossTabColor: "text-green-600",
      othersColor: "text-red-500",
    },
    {
      feature: "Self-hosted",
      crosstab: "✅ Total control",
      others: "❌ Cloud constrained",
      crossTabColor: "text-green-600",
      othersColor: "text-red-500",
    },
    {
      feature: "Multi-browser",
      crosstab: "✅ All browsers",
      others: "⚠️ Limited",
      crossTabColor: "text-green-600",
      othersColor: "text-yellow-600",
    },
    {
      feature: "Customizable",
      crosstab: "✅ Open API",
      others: "❌ Limited",
      crossTabColor: "text-green-600",
      othersColor: "text-red-500",
    },
    {
      feature: "Privacy",
      crosstab: "✅ Your data, your server",
      others: "⚠️ Third party servers",
      crossTabColor: "text-green-600",
      othersColor: "text-yellow-600",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              🆚 Comparison
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why <span className="text-primary">CrossTab</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Unlike traditional cloud solutions, CrossTab offers you total
              control, privacy and flexibility without compromises.
            </p>
          </div>

          <Card className="border-0 shadow-xl bg-card/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-6 font-semibold">
                        Feature
                      </th>
                      <th className="text-center p-6 font-semibold">
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-primary">CrossTab</span>
                          <Badge className="bg-primary/10 text-primary text-xs">
                            Recommended
                          </Badge>
                        </div>
                      </th>
                      <th className="text-center p-6 font-semibold text-muted-foreground">
                        Google Sync & Others
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b hover:bg-muted/20 transition-colors"
                      >
                        <td className="p-6 font-medium">{item.feature}</td>
                        <td
                          className={`p-6 text-center font-medium ${item.crossTabColor}`}
                        >
                          {item.crosstab}
                        </td>
                        <td
                          className={`p-6 text-center font-medium ${item.othersColor}`}
                        >
                          {item.others}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-t">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    🔒 <strong>Privacy first:</strong> Your data stays on your
                    server
                  </p>
                  <p className="text-sm text-muted-foreground">
                    🛠️ <strong>Extensible:</strong> Open API for custom
                    integrations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyCrossTabSection;
