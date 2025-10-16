import { useEffect, useState, useRef } from "react"
import { Wallet, Gift } from "lucide-react"

const rewardOptions = [
  {
    title: "Withdrawals",
    description: "Minimum ₦10,000 withdrawal",
    icon: Wallet,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Gift Cards",
    description: "100+ brands available",
    icon: Gift,
    color: "from-purple-500 to-pink-500",
  },
]

export function RewardsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 gradient-soft">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`relative order-2 lg:order-1 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-1 gradient-accent rounded-2xl blur opacity-25" />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 p-8 md:p-12 flex items-center justify-center shadow-2xl border-4 border-white">
                <img src="https://images.unsplash.com/photo-1674620213535-9b2a2553ef40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwY2FyZHMlMjByZXdhcmRzfGVufDF8fHx8MTc2MDAwMDQyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="" />
              </div>
            </div>
          </div>

          <div
            className={`space-y-6 order-1 lg:order-2 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary text-balance">
              Flexible rewards
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Choose how you want to get paid. Cash out to your bank account or select from hundreds of popular gift
              cards including Amazon, Target, and Starbucks.
            </p>
            <div className="space-y-4">
              {rewardOptions.map((option, index) => {
                const Icon = option.icon
                return (
                  <div
                    key={option.title}
                    className={`group relative p-6 rounded-xl bg-white border-2 border-[#e6e5ec] hover:border-primary/50 hover:shadow-xl transition-all duration-300 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: `${(index + 3) * 100}ms` }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
                    />
                    <div className="relative flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center shadow-md flex-shrink-0`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-1">{option.title}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
