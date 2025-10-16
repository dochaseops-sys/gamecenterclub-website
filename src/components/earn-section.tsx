import { Check } from "lucide-react"
import { useEffect, useState, useRef } from "react"

const earnMethods = [
  "Answer surveys and share your opinions",
  "Install and try new apps",
  "Register at partner websites",
  "Watch videos and engaging content",
]

export function EarnSection() {
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
    <section ref={sectionRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary text-balance">
              Multiple ways to earn
            </h2>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Choose from a variety of tasks that fit your schedule and interests. Whether you have 1 minute or 30
              minutes, there's always an opportunity to earn.
            </p>
            <ul className="space-y-4">
              {earnMethods.map((method, index) => (
                <li
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full gradient-accent flex items-center justify-center mt-0.5 shadow-md">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base text-foreground font-medium">{method}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`relative transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="relative">
              <div className="absolute -inset-1 gradient-primary rounded-2xl blur opacity-25" />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHBzfGVufDF8fHx8MTc2MDAwNDMzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
