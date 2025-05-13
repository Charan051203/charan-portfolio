
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to check if an element is in viewport
export function isElementInViewport(elementId: string): boolean {
  const element = document.getElementById(elementId);
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // Consider an element in view if its top is in the bottom 80% of the screen
  // or if its bottom is in the top 20% of the screen
  return (
    (rect.top <= windowHeight * 0.8 && rect.bottom >= windowHeight * 0.2) ||
    // Special case for sections that might be shorter than the viewport
    (rect.top >= 0 && rect.bottom <= windowHeight)
  );
}
