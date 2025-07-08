import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HeroSection() {
  return (
    <section className="w-full py-16 md:py-28 bg-luxury-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-3xl"></div>

      <div className="luxury-container relative z-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="luxury-heading">
                Discover <span className="teal-accent">Excellence</span> in Education
              </h1>
              <p className="luxury-text text-lg md:text-xl max-w-[600px]">
                Connect with elite tutors in any subject. Experience personalized learning that transforms your academic
                journey.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="What would you like to master?"
                  className="luxury-input pl-10 w-full h-12"
                />
              </div>
              <Link href="/tutors">
                <Button size="lg" className="luxury-button h-12 px-6">
                  Find Your Tutor
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-muted-foreground">
              <span className="font-medium">Popular Subjects:</span>
              <div className="flex flex-wrap gap-3">
                <Link href="/tutors?subject=math" className="luxury-link">
                  Mathematics
                </Link>
                <span className="text-primary">•</span>
                <Link href="/tutors?subject=science" className="luxury-link">
                  Science
                </Link>
                <span className="text-primary">•</span>
                <Link href="/tutors?subject=english" className="luxury-link">
                  English
                </Link>
                <span className="text-primary">•</span>
                <Link href="/tutors?subject=programming" className="luxury-link">
                  Programming
                </Link>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[550px] aspect-video rounded-lg overflow-hidden shadow-luxury-card">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Student learning with a tutor"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="luxury-subheading">Trusted by Elite Institutions</h2>
            <div className="flex flex-wrap justify-center gap-12 mt-6">
              <img
                src="https://images.unsplash.com/photo-1629652487043-fb2825838f8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                alt="University logo"
                className="h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
              <img
                src="https://images.unsplash.com/photo-1629652487043-fb2825838f8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                alt="School logo"
                className="h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
              <img
                src="https://images.unsplash.com/photo-1629652487043-fb2825838f8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                alt="Education partner logo"
                className="h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
              <img
                src="https://images.unsplash.com/photo-1629652487043-fb2825838f8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                alt="Learning center logo"
                className="h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
