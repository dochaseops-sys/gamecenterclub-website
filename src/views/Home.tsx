import { CTASection } from "../components/cta-section"
import { EarnSection } from "../components/earn-section"
import { Header } from "../components/header"
import { HeroSection } from "../components/hero-section"
import { HowItWorksSection } from "../components/how-it-works-section"
import { RewardsSection } from "../components/rewards-section"
import { StatsSection } from "../components/stats-section"


const Home = () => {
  return (
<div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <EarnSection />
        <RewardsSection />
        <HowItWorksSection />
        <CTASection />
      </main>
    </div>
  )
}

export default Home
