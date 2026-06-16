## 2024-06-16 - Lazy Loading Global Search Provider

**Learning:** Global layout providers (like `SearchProvider`) that perform eager data fetching on mount (`useEffect`) can cause unnecessary performance bottlenecks and unneeded backend load, especially when the component (Command Palette) is not immediately visible to the user.

**Action:** Delay data fetching in UI-triggered components by moving `useEffect` triggers from mount `[]` to an open state dependency `[isOpen]`, combined with a `useRef` to prevent multiple subsequent fetches.
