import { Button } from "@/components/ui/button";

const FooterSection = () => {
  const links = [
    {
      name: "GitHub",
      href: "https://github.com/Lorenzo0111/CrossTab",
      icon: "🐙",
    },
    { name: "Discord", href: "https://to.lorenzo0111.me/discord", icon: "💬" },
    {
      name: "MIT License",
      href: "https://github.com/Lorenzo0111/CrossTab/blob/main/LICENSE",
      icon: "⚖️",
    },
  ];

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <h3 className="text-2xl font-bold">
                  Cross<span className="text-primary">Tab</span>
                </h3>
              </div>

              <p className="text-muted-foreground mb-6 max-w-md">
                Sincronizza le tue schede ovunque, in tempo reale. Open source,
                sicuro e completamente sotto il tuo controllo.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {links.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start h-12 text-left hover:bg-primary/10 hover:text-primary"
                  asChild
                >
                  <a href={link.href}>
                    <span className="mr-3 text-lg">{link.icon}</span>
                    {link.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 CrossTab. All rights reserved.
              <span className="mx-2">•</span>
              Built with ❤️ by the open source community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
