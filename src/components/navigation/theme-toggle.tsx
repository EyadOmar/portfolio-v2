'use client';

import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="grid size-8 place-items-center border border-border text-foreground transition-colors hover:border-emerald-500 hover:text-emerald-500"
      suppressHydrationWarning
    >
      {isDark ? (
        <Sun className="size-4" weight="bold" aria-hidden="true" />
      ) : (
        <Moon className="size-4" weight="bold" aria-hidden="true" />
      )}
    </button>
  );
}
