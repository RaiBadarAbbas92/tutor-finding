import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary/20">
      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-1 font-bold text-2xl">
              <span className="text-white">Tutor</span>
              <span className="text-white font-light">Match</span>
            </Link>
            <p className="text-sm text-primary-foreground/80">
              Connecting discerning students with distinguished educators for transformative learning experiences.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Facebook"
                className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/5"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Twitter"
                className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/5"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Instagram"
                className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/5"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="YouTube"
                className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/5"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/help" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/safety" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Safety Center
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Stay Informed</h3>
            <p className="text-sm text-primary-foreground/80">
              Subscribe to our newsletter for exclusive updates and educational insights.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="max-w-[220px] bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground focus-visible:ring-secondary"
              />
              <Button className="bg-white text-primary hover:bg-white/90">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mt-16 pt-8 border-t border-primary-foreground/10 text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} TutorMatch. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/terms" className="hover:text-secondary transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-secondary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
