'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowRight, X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

const WHATSAPP_NUMBER = '201002379226';

const SERVICE_KEYS = ['fullProject', 'frontend', 'backend', 'hire'] as const;
type ServiceKey = (typeof SERVICE_KEYS)[number];

type StepCopy = {
  step: string;
  label: string;
  placeholder?: string;
  hint?: string;
  hintEmail?: string;
  hintPhone?: string;
  hintIdle?: string;
};

export type ContactFormLabels = {
  open: string;
  close: string;
  title: string;
  subtitle: string;
  headline: string;
  escapeHint: string;
  fields: {
    name: StepCopy;
    contact: StepCopy;
    services: StepCopy;
  };
  services: Record<ServiceKey, { label: string; description: string }>;
  submit: string;
  sending: string;
  errors: { name: string; contact: string; services: string };
  message: { header: string; name: string; contact: string; services: string };
};

type ContactCtaProps = {
  triggerLabel: string;
  labels: ContactFormLabels;
  locale: string;
};

type ContactKind = 'email' | 'phone' | null;

function detectContactKind(value: string): ContactKind {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.includes('@')) return 'email';
  if (/^[\d\s+\-().]+$/.test(trimmed)) {
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length >= 3) return 'phone';
  }
  return null;
}

function isContactValid(value: string, kind: ContactKind) {
  if (kind === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }
  if (kind === 'phone') {
    return value.replace(/\D/g, '').length >= 7;
  }
  return false;
}

export default function ContactCta({
  triggerLabel,
  labels,
  locale,
}: ContactCtaProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group/cta mt-8 inline-flex h-12 items-center gap-3 border border-emerald-500 bg-emerald-500 px-5 text-xs font-semibold tracking-[0.22em] text-emerald-950 uppercase transition-all hover:-translate-y-px hover:border-emerald-400 hover:bg-emerald-400 active:translate-y-0"
      >
        <span
          aria-hidden="true"
          dir="ltr"
          className="font-mono text-[0.95rem] leading-none"
        >
          {'>_'}
        </span>
        {triggerLabel}
        <ArrowRight
          weight="bold"
          aria-hidden="true"
          className="size-4 transition-transform group-hover/cta:translate-x-1 rtl:rotate-180 rtl:group-hover/cta:-translate-x-1"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <ContactOverlay
            labels={labels}
            locale={locale}
            onClose={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function ContactOverlay({
  labels,
  locale,
  onClose,
}: {
  labels: ContactFormLabels;
  locale: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [services, setServices] = useState<ServiceKey[]>([]);
  const [errors, setErrors] = useState<{
    name?: string;
    contact?: string;
    services?: string;
  }>({});

  const isArabic = locale === 'ar';
  const contactKind = detectContactKind(contact);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    const t = window.setTimeout(() => {
      formRef.current
        ?.querySelector<HTMLInputElement>('input[name="contact-name"]')
        ?.focus();
    }, 240);
    return () => window.clearTimeout(t);
  }, []);

  const toggleService = (key: ServiceKey) => {
    setServices((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = labels.errors.name;
    if (!contactKind || !isContactValid(contact, contactKind)) {
      next.contact = labels.errors.contact;
    }
    if (services.length === 0) next.services = labels.errors.services;
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const orderedServices = SERVICE_KEYS.filter((k) => services.includes(k));
    const serviceLabels = orderedServices
      .map((k) => labels.services[k].label)
      .join(isArabic ? '، ' : ', ');

    const body = [
      labels.message.header,
      '',
      `${labels.message.name}: ${name.trim()}`,
      `${labels.message.contact}: ${contact.trim()}`,
      `${labels.message.services}: ${serviceLabels}`,
    ].join('\n');

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.22,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.05,
        delayChildren: 0.08,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.16, ease: 'easeIn' } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[80] bg-background"
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, var(--foreground) 0 1px, transparent 1px 28px), repeating-linear-gradient(90deg, var(--foreground) 0 1px, transparent 1px 28px)',
        }}
      />

      <form
        ref={formRef}
        onSubmit={onSubmit}
        noValidate
        className="relative grid h-full w-full grid-rows-[auto_1fr_auto]"
      >
        <motion.div
          variants={shouldReduceMotion ? undefined : itemVariants}
          className="flex items-center justify-between gap-4 border-b-2 border-foreground bg-foreground px-4 py-2.5 text-background sm:px-8"
        >
          <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.3em] uppercase">
            <span
              aria-hidden="true"
              className="inline-block size-2 animate-pulse bg-emerald-400"
            />
            <span dir="ltr" className="font-medium">
              {labels.title}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="group/close inline-flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase transition-colors hover:text-emerald-300"
          >
            <span dir="ltr">esc</span>
            <X
              weight="bold"
              className="size-4 transition-transform group-hover/close:rotate-90"
            />
          </button>
        </motion.div>

        <div className="overflow-y-auto">
          <div className="mx-auto flex min-h-full max-w-6xl flex-col gap-6 px-5 py-5 sm:gap-7 sm:px-10 sm:py-7 lg:gap-8 lg:py-8">
            <motion.header
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="space-y-3"
            >
              <div
                className="flex items-center gap-3 text-[0.65rem] tracking-[0.3em] text-emerald-500 uppercase"
                dir="ltr"
              >
                <span>&gt;_ session.open</span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-emerald-500/40"
                />
                <span className="hidden sm:inline">{labels.escapeHint}</span>
              </div>
              <h2
                id={titleId}
                className="max-w-3xl text-3xl leading-[0.95] font-extrabold tracking-tight uppercase sm:text-4xl lg:text-5xl"
              >
                {labels.headline}
              </h2>
              <p className="max-w-xl text-xs leading-6 text-muted-foreground sm:text-sm sm:leading-7">
                {labels.subtitle}
              </p>
            </motion.header>

            <motion.div
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-10"
            >
              <div>
                <StepHead
                  step={labels.fields.name.step}
                  label={labels.fields.name.label}
                />
                <div
                  className={cn(
                    'mt-3 flex items-center gap-3 border-b-2 py-2.5 transition-colors',
                    errors.name
                      ? 'border-destructive'
                      : 'border-foreground/15 focus-within:border-emerald-500',
                  )}
                >
                  <span
                    dir="ltr"
                    aria-hidden="true"
                    className="font-mono text-lg text-emerald-500"
                  >
                    &gt;
                  </span>
                  <input
                    name="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        setErrors((p) => ({ ...p, name: undefined }));
                      }
                    }}
                    placeholder={labels.fields.name.placeholder}
                    autoComplete="name"
                    className="flex-1 bg-transparent text-lg font-medium tracking-tight caret-emerald-500 outline-none placeholder:text-muted-foreground/40 sm:text-xl"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? `${titleId}-name-err` : undefined
                    }
                  />
                  <BlinkingCursor reduceMotion={Boolean(shouldReduceMotion)} />
                </div>
                {errors.name ? (
                  <p
                    id={`${titleId}-name-err`}
                    className="mt-2 text-xs text-destructive"
                    dir="ltr"
                  >
                    ! {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <StepHead
                  step={labels.fields.contact.step}
                  label={labels.fields.contact.label}
                  suffix={
                    <ContactKindChip
                      kind={contactKind}
                      idle={labels.fields.contact.hintIdle ?? ''}
                      email={labels.fields.contact.hintEmail ?? ''}
                      phone={labels.fields.contact.hintPhone ?? ''}
                    />
                  }
                />
                <div
                  className={cn(
                    'mt-3 flex items-center gap-3 border-b-2 py-2.5 transition-colors',
                    errors.contact
                      ? 'border-destructive'
                      : 'border-foreground/15 focus-within:border-emerald-500',
                  )}
                >
                  <span
                    dir="ltr"
                    aria-hidden="true"
                    className="font-mono text-lg text-emerald-500"
                  >
                    &gt;
                  </span>
                  <input
                    name="contact"
                    type="text"
                    inputMode={contactKind === 'phone' ? 'tel' : 'email'}
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      if (errors.contact) {
                        setErrors((p) => ({ ...p, contact: undefined }));
                      }
                    }}
                    placeholder={labels.fields.contact.placeholder}
                    dir="auto"
                    className="flex-1 bg-transparent text-lg font-medium tracking-tight caret-emerald-500 outline-none placeholder:text-muted-foreground/40 sm:text-xl"
                    aria-invalid={Boolean(errors.contact)}
                    aria-describedby={
                      errors.contact ? `${titleId}-contact-err` : undefined
                    }
                  />
                  <BlinkingCursor reduceMotion={Boolean(shouldReduceMotion)} />
                </div>
                {errors.contact ? (
                  <p
                    id={`${titleId}-contact-err`}
                    className="mt-2 text-xs text-destructive"
                    dir="ltr"
                  >
                    ! {errors.contact}
                  </p>
                ) : null}
              </div>
            </motion.div>

            <motion.div
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="flex flex-col gap-3"
            >
              <StepHead
                step={labels.fields.services.step}
                label={labels.fields.services.label}
                suffix={
                  <span
                    className="text-[0.625rem] tracking-[0.28em] text-muted-foreground uppercase"
                    dir="ltr"
                  >
                    {labels.fields.services.hint}
                  </span>
                }
              />
              <ul
                role="group"
                aria-label={labels.fields.services.label}
                className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4"
              >
                {SERVICE_KEYS.map((key, index) => {
                  const isSelected = services.includes(key);
                  const svc = labels.services[key];

                  return (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => {
                          toggleService(key);
                          if (errors.services) {
                            setErrors((p) => ({ ...p, services: undefined }));
                          }
                        }}
                        aria-pressed={isSelected}
                        className={cn(
                          'group/card relative flex h-full w-full flex-col items-start gap-2 border-2 p-3 text-start transition-all duration-200 active:translate-y-0 sm:gap-2.5 sm:p-3.5 lg:min-h-[6.75rem]',
                          isSelected
                            ? 'border-emerald-500 bg-emerald-500/10 text-foreground'
                            : 'border-border bg-card/60 text-muted-foreground hover:-translate-y-0.5 hover:border-emerald-500/60 hover:text-foreground',
                        )}
                      >
                        <div className="flex w-full items-center justify-between">
                          <span
                            dir="ltr"
                            className={cn(
                              'text-[0.65rem] font-medium tracking-[0.28em] uppercase',
                              isSelected
                                ? 'text-emerald-500'
                                : 'text-muted-foreground/70',
                            )}
                          >
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span
                            aria-hidden="true"
                            className={cn(
                              'inline-block size-3 border-2 transition-colors',
                              isSelected
                                ? 'border-emerald-500 bg-emerald-500'
                                : 'border-foreground/30 bg-background group-hover/card:border-emerald-500',
                            )}
                          />
                        </div>
                        <span className="mt-auto text-xs leading-tight font-bold tracking-wide uppercase sm:text-sm">
                          {svc.label}
                        </span>
                        <span className="hidden text-[0.7rem] leading-5 text-muted-foreground sm:block">
                          {svc.description}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {errors.services ? (
                <p className="text-xs text-destructive" dir="ltr">
                  ! {errors.services}
                </p>
              ) : null}
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={shouldReduceMotion ? undefined : itemVariants}
          className="border-t-2 border-foreground bg-background"
        >
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-10 sm:py-4">
            <p
              className="hidden text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase sm:block"
              dir="ltr"
            >
              ↳ wa.me/{WHATSAPP_NUMBER}
            </p>
            <button
              type="submit"
              className="group/submit relative ms-auto flex items-center gap-3 border-2 border-emerald-500 bg-emerald-500 px-5 py-3.5 text-xs font-bold tracking-[0.22em] text-emerald-950 uppercase transition-all hover:border-emerald-400 hover:bg-emerald-400 active:translate-y-px sm:gap-4 sm:px-7 sm:py-4 sm:text-sm"
            >
              <span
                aria-hidden="true"
                dir="ltr"
                className="hidden font-mono sm:inline"
              >
                [&nbsp;exec&nbsp;]
              </span>
              {labels.submit}
              <ArrowRight
                weight="bold"
                aria-hidden="true"
                className="size-4 transition-transform group-hover/submit:translate-x-1.5 rtl:rotate-180 rtl:group-hover/submit:-translate-x-1.5 sm:size-5"
              />
            </button>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

function StepHead({
  step,
  label,
  suffix,
}: {
  step: string;
  label: string;
  suffix?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
      <div className="flex items-center gap-3">
        <span
          className="text-[0.65rem] tracking-[0.28em] text-emerald-500 uppercase"
          dir="ltr"
        >
          &gt; {step}
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-emerald-500/40" />
        <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-foreground uppercase">
          {label}
        </p>
      </div>
      {suffix}
    </div>
  );
}

function BlinkingCursor({ reduceMotion }: { reduceMotion: boolean }) {
  if (reduceMotion) {
    return (
      <span aria-hidden="true" className="block h-5 w-2 bg-emerald-500" />
    );
  }
  return (
    <motion.span
      aria-hidden="true"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        times: [0, 0.5, 0.5, 1],
        ease: 'linear',
      }}
      className="block h-5 w-2 bg-emerald-500"
    />
  );
}

function ContactKindChip({
  kind,
  idle,
  email,
  phone,
}: {
  kind: ContactKind;
  idle: string;
  email: string;
  phone: string;
}) {
  const label = kind === 'email' ? email : kind === 'phone' ? phone : idle;
  const active = kind !== null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={kind ?? 'idle'}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className={cn(
          'inline-flex items-center gap-2 border px-2 py-1 text-[0.6rem] tracking-[0.28em] uppercase',
          active
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500'
            : 'border-border bg-muted/40 text-muted-foreground',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'inline-block size-1.5',
            active ? 'animate-pulse bg-emerald-500' : 'bg-muted-foreground',
          )}
        />
        {label}
      </motion.span>
    </AnimatePresence>
  );
}
