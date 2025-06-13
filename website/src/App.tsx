import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DeveloperSection from "./components/DeveloperSection";
import FeaturesSection from "./components/FeaturesSection";
import FinalCTASection from "./components/FinalCTASection";
import FooterSection from "./components/FooterSection";
import HeroSection from "./components/HeroSection";
import HowItWorksSection from "./components/HowItWorksSection";
import WhyCrossTabSection from "./components/WhyCrossTabSection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DeveloperSection />
      <WhyCrossTabSection />
      <FinalCTASection />
      <FooterSection />
    </div>
  </QueryClientProvider>
);

export default App;
