import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8">
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-effect shadow-lg text-sm font-medium text-[#0093b0] transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#0093b0]" />
            <span>Trusted by 10,000+ members</span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-[#015f78] bg-gradient-to-r from-foreground via-primary to-foreground leading-tight text-balance transition-all duration-700 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Earn rewards for everyday tasks
          </h1>

          <p
            className={`text-lg md:text-xl text-[#798183] max-w-3xl mx-auto text-balance leading-relaxed transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Complete surveys, install apps, and perform simple tasks to earn points. Redeem for cash or gift cards.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <button
              className="gradient-primary rounded-2xl h-11 flex items-center text-white hover:opacity-90 shadow-lg hover:shadow-xl transition-all group px-8"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              className="border-2 border-[#0093b0] h-11 rounded-2xl text-primary hover:bg-primary hover:text-[#0093b0] transition-all px-8 bg-transparent"
            >
              How it works
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
