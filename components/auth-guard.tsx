"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/stores/auth-store'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, token, fetchUserProfile } = useAuthStore()

  useEffect(() => {
    if (!isAuthenticated || !token) {
      router.push('/login')
      return
    }

    // Try to fetch/refresh user profile
    fetchUserProfile().catch(() => {
      // If fetching profile fails, user might be unauthorized
      router.push('/login')
    })
  }, [isAuthenticated, token, router, fetchUserProfile])

  // Show nothing while checking auth
  if (!isAuthenticated || !token) {
    return null
  }

  return <>{children}</>
} 