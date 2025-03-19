
import { useState, useEffect, useCallback } from "react"

// Update the mobile breakpoint for better responsiveness
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  // Use useCallback for better performance
  const checkMobile = useCallback(() => {
    if (typeof window === 'undefined') return false; // SSR check
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
  }, [])

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Use both matchMedia and window.innerWidth for more reliable detection
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Initial check
    checkMobile()
    
    // Add event listener with debouncing for better performance
    let debounceTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(checkMobile, 100);
    }
    
    window.addEventListener("resize", handleResize, { passive: true })
    
    // Modern browsers - use addEventListener
    try {
      mql.addEventListener("change", checkMobile)
      return () => {
        mql.removeEventListener("change", checkMobile)
        window.removeEventListener("resize", handleResize)
        clearTimeout(debounceTimer)
      }
    } catch (e) {
      // Fallback for older browsers
      mql.addListener(checkMobile)
      return () => {
        mql.removeListener(checkMobile)
        window.removeEventListener("resize", handleResize)
        clearTimeout(debounceTimer)
      }
    }
  }, [checkMobile])

  return isMobile
}
