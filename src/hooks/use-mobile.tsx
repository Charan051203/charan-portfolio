
import { useState, useEffect, useCallback } from "react"

// Update the mobile breakpoint for better responsiveness
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  // Use useCallback for better performance
  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
  }, [])

  useEffect(() => {
    // Use both matchMedia and window.innerWidth for more reliable detection
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Initial check
    checkMobile()
    
    // Add event listener
    const handleResize = () => {
      // Debounce the resize handler for better performance
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => checkMobile())
      } else {
        setTimeout(checkMobile, 66) // Fallback for older browsers
      }
    }
    
    window.addEventListener("resize", handleResize)
    
    // Modern browsers - use addEventListener
    try {
      mql.addEventListener("change", checkMobile)
      return () => {
        mql.removeEventListener("change", checkMobile)
        window.removeEventListener("resize", handleResize)
      }
    } catch (e) {
      // Fallback for older browsers
      mql.addListener(checkMobile)
      return () => {
        mql.removeListener(checkMobile)
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [checkMobile])

  return !!isMobile
}
