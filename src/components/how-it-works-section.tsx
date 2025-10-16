import { useEffect, useState, useRef } from "react"
import { UserPlus, ListChecks, Banknote } from "lucide-react"

const steps = [
  {
    number: "1",
    title: "Sign up",
    description: "Create a free account in under a minute. No credit card required.",
    icon: UserPlus,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "2",
    title: "Complete tasks",
    description: "Choose from surveys, app installations, registrations, and more.",
    icon: ListChecks,
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "3",
    title: "Get paid",
    description: "Redeem points by withdrawing the cash into your bank account or choose from gift cards.",
    icon: Banknote,
    color: "from-emerald-500 to-teal-500",
  },
]

export function HowItWorksSection() {
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
    <section ref={sectionRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">Three simple steps to start earning</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className={`relative group transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index + 2) * 150}ms` }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#e6e5ec] h-full">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                  />

                  <div className="relative z-10 text-center space-y-4">
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} text-white text-2xl font-bold mb-4 shadow-lg`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-base text-muted-foreground text-pretty leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-12 h-0.5 bg-gradient-to-r from-border to-transparent -translate-x-6" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
