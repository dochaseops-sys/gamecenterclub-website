import { useEffect, useState, useRef } from "react"
import { TrendingUp, Users, CheckCircle } from "lucide-react"

const stats = [
  { value: "₦5M+", label: "Paid Out", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
  { value: "10K+", label: "Active Members", icon: Users, color: "from-blue-500 to-cyan-500" },
  { value: "100K+", label: "Tasks Completed", icon: CheckCircle, color: "from-purple-500 to-pink-500" },
]

export function StatsSection() {
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
    <section ref={sectionRef} className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 gradient-soft">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`relative group transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#e6e5ec] overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
