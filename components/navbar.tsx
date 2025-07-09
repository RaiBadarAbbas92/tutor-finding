"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, MessageSquare, ChevronDown } from "lucide-react"
import { useAuthStore } from "@/lib/stores/auth-store"
import { cn } from "@/lib/utils"
import { ChatNotificationBadge } from "@/components/chat-notification-badge"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const routes = [
    { href: "/", label: "Home" },
    { href: "/tutors", label: "Find Tutors" },
    { href: "/howitworks", label: "How It Works" },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-white",
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-10">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Toggle Menu" className="text-primary">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 bg-white">
              <div className="px-7">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl" onClick={() => setIsOpen(false)}>
                  <span className="text-primary">Tutor</span>
                  <span className="text-primary font-light">Match</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "px-7 py-2 text-lg font-medium transition-colors hover:text-secondary",
                      pathname === route.href ? "text-secondary" : "text-primary",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
                {user && (
                  <Link
                    href="/chat"
                    className={cn(
                      "px-7 py-2 text-lg font-medium transition-colors hover:text-primary",
                      pathname?.startsWith("/chat") ? "text-primary" : "text-primary",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Messages
                    <ChatNotificationBadge />
                  </Link>
                )}
              </nav>
              <div className="mt-auto px-7 pb-8">
                {user ? (
                  <div className="flex flex-col gap-4">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      <Avatar className="h-8 w-8 border border-primary/30">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user.username.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>Dashboard</span>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout()
                        setIsOpen(false)
                      }}
                      className="luxury-button-outline"
                    >
                      Log out
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Button asChild className="luxury-button">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Log in
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="luxury-button-outline">
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        Sign up
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-1 font-bold text-xl">
            <span className="text-primary">Tutor</span>
            <span className="text-primary font-light">Match</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary/70 relative py-2",
                  pathname === route.href
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                    : "text-primary",
                )}
              >
                {route.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/chat"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary/70 flex items-center relative py-2",
                  pathname?.startsWith("/chat")
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                    : "text-primary",
                )}
              >
                Messages
                <ChatNotificationBadge />
              </Link>
            )}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="icon" className="relative text-primary hover:text-primary/70">
                <Link href="/chat">
                  <MessageSquare className="h-5 w-5" />
                  <ChatNotificationBadge />
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 pl-3 pr-2 flex items-center gap-2 text-primary hover:text-primary/70"
                  >
                    <Avatar className="h-8 w-8 border border-primary/30">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.username} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.username.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.username}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 luxury-card">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="luxury-divider my-2" />
                  <DropdownMenuItem asChild className="hover:text-primary/70 focus:text-primary/70">
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:text-primary/70 focus:text-primary/70">
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:text-primary/70 focus:text-primary/70">
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="luxury-divider my-2" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:text-primary/70 focus:text-primary/70"
                    onSelect={() => logout()}
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" className="text-primary hover:text-primary/70">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild className="luxury-button">
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
