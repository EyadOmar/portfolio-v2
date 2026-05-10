'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type SectionNavItem = {
  href: string;
  label: string;
};

type SectionNavProps = {
  items: SectionNavItem[];
};

export default function SectionNav({ items }: SectionNavProps) {
  const [activeHref, setActiveHref] = useState(items[0]?.href ?? '');

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    let animationFrame = 0;

    const updateActiveSection = () => {
      const offset = 160;
      let activeItem = items[0];

      for (const item of items) {
        const section = document.querySelector(item.href);
        if (!(section instanceof HTMLElement)) {
          continue;
        }

        if (section.getBoundingClientRect().top <= offset) {
          activeItem = item;
        }
      }

      setActiveHref(activeItem.href);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.setTimeout(updateActiveSection, 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    window.addEventListener('hashchange', handleScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, [items]);

  return (
    <nav aria-label="Section navigation" className="mt-10 hidden lg:block">
      <ul className="space-y-3.5 text-sm font-medium text-muted-foreground">
        {items.map((item, index) => {
          const isActive = item.href === activeHref;
          const number = (index + 1).toString().padStart(2, '0');

          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setActiveHref(item.href)}
                className={cn(
                  'group inline-flex items-center gap-3.5 transition-colors hover:text-foreground',
                  isActive && 'text-foreground',
                )}
              >
                <span
                  className={cn(
                    'h-px w-9 bg-border transition-all group-hover:w-14 group-hover:bg-emerald-500',
                    isActive && 'w-14 bg-emerald-500',
                  )}
                />
                <span className="tabular-nums">{number}</span>
                <span aria-hidden="true">-</span>
                <span>{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
