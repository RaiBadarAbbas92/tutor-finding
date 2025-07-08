// Mock authentication functions
// In a real app, this would use NextAuth.js or a similar auth library

export function getCurrentUser() {
  // In a real app, this would check authentication state
  // For demo purposes, we'll return a mock user
  if (typeof window !== "undefined") {
    const authStorage = localStorage.getItem("auth-storage")
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage)
        return state.user
      } catch (e) {
        return null
      }
    }
  }
  return null
}
