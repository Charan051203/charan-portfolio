
import { useState, useEffect, useCallback } from "react"

// Update the mobile breakpoint for better responsiveness
const MOBILE_BREAKPOINT = 768
const TINY_SCREEN_BREAKPOINT = 360

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [isTinyScreen, setIsTinyScreen] = useState<boolean>(false)

  // Use useCallback for better performance
  const checkMobile = useCallback(() => {
    if (typeof window === 'undefined') return false; // SSR check
    
    const width = window.innerWidth;
    setIsMobile(width < MOBILE_BREAKPOINT)
    setIsTinyScreen(width < TINY_SCREEN_BREAKPOINT)
    
    // If it's a very small screen, add a special class to the body
    if (width < TINY_SCREEN_BREAKPOINT) {
      document.body.classList.add('tiny-screen');
    } else {
      document.body.classList.remove('tiny-screen');
    }
  }, [])

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;
    
    // Use both matchMedia and window.innerWidth for more reliable detection
    const mqlMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const mqlTiny = window.matchMedia(`(max-width: ${TINY_SCREEN_BREAKPOINT - 1}px)`)
    
    // Initial check
    checkMobile()
    
    // Add event listener with debouncing for better performance
    let debounceTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(checkMobile, 100);
    }
    
    // Optimize event listener by using passive option
    window.addEventListener("resize", handleResize, { passive: true })
    
    // Modern browsers - use addEventListener
    try {
      mqlMobile.addEventListener("change", checkMobile)
      mqlTiny.addEventListener("change", checkMobile)
      return () => {
        mqlMobile.removeEventListener("change", checkMobile)
        mqlTiny.removeEventListener("change", checkMobile)
        window.removeEventListener("resize", handleResize)
        clearTimeout(debounceTimer)
      }
    } catch (e) {
      // Fallback for older browsers
      mqlMobile.addListener(checkMobile)
      mqlTiny.addListener(checkMobile)
      return () => {
        mqlMobile.removeListener(checkMobile)
        mqlTiny.removeListener(checkMobile)
        window.removeEventListener("resize", handleResize)
        clearTimeout(debounceTimer)
      }
    }
  }, [checkMobile])

  return isMobile
}

// Add a function to detect very small screens
export function useTinyScreen() {
  const [isTinyScreen, setIsTinyScreen] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkTinyScreen = () => {
      setIsTinyScreen(window.innerWidth < TINY_SCREEN_BREAKPOINT)
    }
    
    // Initial check
    checkTinyScreen()
    
    // Add event listener
    const mql = window.matchMedia(`(max-width: ${TINY_SCREEN_BREAKPOINT - 1}px)`)
    
    try {
      mql.addEventListener("change", checkTinyScreen)
      return () => mql.removeEventListener("change", checkTinyScreen)
    } catch (e) {
      // Fallback for older browsers
      mql.addListener(checkTinyScreen)
      return () => mql.removeListener(checkTinyScreen)
    }
  }, [])

  return isTinyScreen
}
