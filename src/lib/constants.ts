// Animation durations (in seconds)
export const DURATION = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.2,
} as const;

// Stagger delay between items
export const STAGGER = 0.02;

// Viewport trigger amount for scroll animations
export const VIEWPORT_AMOUNT = 0.1;

// Reusable Tailwind classes
export const styles = {
  // Layout
  section: "py-16 px-4 md:py-20",
  container: "max-w-6xl mx-auto",

  // Typography
  heading1: "text-4xl md:text-5xl font-bold text-white tracking-tight",
  heading2: "text-2xl md:text-3xl font-bold text-white tracking-tight",
  heading3: "text-lg font-bold text-white uppercase tracking-wider",
  label: "text-xs text-gray-500 uppercase tracking-wider",
  body: "text-gray-400",

  // Components
  card: "bg-black border border-white/20 hover:border-white/40 transition-colors",
  input: "w-full px-4 py-3 bg-black border border-white/20 text-white placeholder-gray-600 focus:border-white focus:outline-none transition-colors",
  tag: "px-2 py-1 text-xs bg-white/5 text-white/80 border border-white/10 uppercase tracking-wider",

  // Buttons
  btnBase: "inline-flex items-center justify-center font-medium uppercase tracking-wider transition-colors",
  btnPrimary: "bg-white text-black hover:bg-gray-200",
  btnOutline: "border border-white text-white hover:bg-white hover:text-black",
  btnSizes: {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-2.5 text-xs",
    lg: "px-6 py-3 text-sm",
  },
} as const;

// Icon size mapping
export const iconSizes = {
  sm: 14,
  md: 18,
  lg: 24,
} as const;
