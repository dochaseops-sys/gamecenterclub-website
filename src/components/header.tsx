import { Button } from "antd"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all px-[5%] duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-[#f3f2f6]" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="" className="text-xl md:text-2xl font-bold text-foreground hover:opacity-80 transition-opacity">
            GameCenter
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/games" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Discover
            </Link>
            <Link to="" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Tasks
            </Link>
            <Link to="" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Rewards
            </Link>
            <Link to="" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3 md:gap-4">
            <button  className="text-sm">
              Sign In
            </button>
            <Link to="/sign-up">
            <button className="bg-[#0089ab] h-11 rounded-2xl px-4 text-[#c9faff] hover:bg-primary/90 text-sm md:text-base">
              Get Started
            </button>
            </Link>
          </div>
          <Button>
            <Link to="/games" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Discover
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
