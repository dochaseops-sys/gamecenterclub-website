import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { Link } from "react-router-dom"

export function CTASection() {
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
    <section ref={sectionRef} className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 gradient-primary opacity-95" />

      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <div
          className={`text-center space-y-6 transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium text-white mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Start earning today</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-balance">
            Ready to start earning?
          </h2>
          <p className="text-lg md:text-xl text-white/90 text-balance max-w-2xl mx-auto">
            Join thousands of members earning rewards every day
          </p>
          <div
            className={`pt-4 transition-all duration-700 delay-200 flex justify-center ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Link to="/sign-up">
                        <button
              className="flex items-center rounded-2xl h-11 text-[#2491ab] bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all group px-8 text-base font-semibold"
            >
              Create free account
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
