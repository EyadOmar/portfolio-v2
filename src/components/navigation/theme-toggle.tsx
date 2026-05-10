'use client';

import { Moon, Sun } from '@phosphor-icons/react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      whileHover={shouldReduceMotion ? undefined : { y: -2 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
      className="grid size-8 place-items-center border border-border text-foreground transition-colors hover:border-emerald-500 hover:text-emerald-500"
    >
      <span className="relative size-4" aria-hidden="true">
        <Sun
          className="absolute inset-0 size-4 scale-0 rotate-90 opacity-0 transition-all duration-200 dark:scale-100 dark:rotate-0 dark:opacity-100"
          weight="bold"
        />
        <Moon
          className="absolute inset-0 size-4 scale-100 rotate-0 opacity-100 transition-all duration-200 dark:scale-0 dark:-rotate-90 dark:opacity-0"
          weight="bold"
        />
      </span>
    </motion.button>
  );
}
