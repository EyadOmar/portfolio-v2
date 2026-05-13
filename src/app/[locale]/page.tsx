import EXPERIENCE from '@/lib/data/experience';
import PROJECTS from '@/lib/data/projects';
import SKILLS, { type Skill } from '@/lib/data/skills';
import { routing } from '@/i18n/routing';
import SectionNav, {
  type SectionNavItem,
} from '@/components/navigation/section-nav';
import {
  EnvelopeSimple,
  GithubLogo,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type HomeProps = {
  params: Promise<{ locale: string }>;
};

type Stat = {
  value: string;
  label: string;
};

const WHATSAPP_LINK = 'https://wa.me/201002379226';

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/EyadOmar',
    icon: GithubLogo,
    external: true,
  },
  {
    label: 'Email',
    href: 'mailto:eiad.omar88@gmail.com',
    icon: EnvelopeSimple,
    external: false,
  },
  {
    label: 'WhatsApp',
    href: WHATSAPP_LINK,
    icon: WhatsappLogo,
    external: true,
  },
] as const;

function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function getSkillNames(ids: string[], skillById: Map<string, Skill>) {
  return ids
    .map((id) => skillById.get(id)?.name)
    .filter((skill): skill is string => Boolean(skill));
}

export { generateStaticParams };

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'home' });
  const nav = await getTranslations({ locale, namespace: 'navigation' });
  const isArabic = locale === 'ar';
  const stats = t.raw('stats') as Stat[];
  const skillById = new Map(SKILLS.map((skill) => [skill.id, skill]));

  const sideNav: SectionNavItem[] = [
    { href: '#about', label: nav('about') },
    { href: '#experience', label: nav('experience') },
    { href: '#projects', label: nav('projects') },
    { href: '#contact', label: nav('contact') },
  ];

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-16 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20 lg:pt-32 lg:pb-28">
      <aside className="lg:sticky lg:top-28 lg:h-[calc(100vh-8rem)]">
        <div>
          <p className="mb-5 text-sm font-medium text-emerald-500">
            {t('eyebrow')}
          </p>
          <h1 className="max-w-xl text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
            {t('headline')}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground">
            {t('intro')}
          </p>
        </div>

        <SectionNav items={sideNav} />

        <footer className="mt-8 hidden lg:block">
          <h2 className="sr-only">Social links</h2>
          <ul className="flex items-center gap-3.5">
            {SOCIAL_LINKS.map((link) => {
              const Icon = link.icon;

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    title={link.label}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noreferrer' : undefined}
                    className="grid size-10 place-items-center border border-border text-muted-foreground transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:text-emerald-500 active:translate-y-0"
                  >
                    <Icon className="size-5" weight="bold" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </footer>
      </aside>

      <div className="space-y-24">
        <section id="about" className="scroll-mt-24">
          <SectionHeading title={t('aboutTitle')} />
          <p className="max-w-2xl text-base leading-8 text-muted-foreground">
            {t('aboutBody')}
          </p>

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={`${stat.value}-${stat.label}`}
                className="border border-border bg-card/70 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/60"
              >
                <dt className="text-2xl font-semibold text-foreground">
                  {stat.value}
                </dt>
                <dd className="mt-2 text-xs leading-5 text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="skills" className="scroll-mt-24">
          <SectionHeading title={t('skillsTitle')} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {SKILLS.map((skill) => {
              const Icon = skill.icon;

              return (
                <li
                  key={skill.id}
                  className="flex min-h-16 items-center gap-3 border border-border bg-card/70 p-3 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/60"
                >
                  <span className="grid size-10 shrink-0 place-items-center bg-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {skill.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="experience" className="scroll-mt-24">
          <SectionHeading title={t('experienceTitle')} />
          <ol className="relative border-border border-s ps-7 sm:ps-10">
            {EXPERIENCE.map((item, index) => {
              const skillNames = getSkillNames(item.skills, skillById);
              const role = isArabic ? item.roleAr : item.roleEn;
              const company = isArabic ? item.companyAr : item.companyEn;
              const period = isArabic ? item.periodAr : item.periodEn;
              const summary = isArabic ? item.summaryAr : item.summaryEn;
              const isLast = index === EXPERIENCE.length - 1;

              return (
                <li
                  key={item.id}
                  className={`group relative ${isLast ? '' : 'pb-12 sm:pb-14'}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-[0.55rem] -start-[2.0625rem] sm:-start-[2.8125rem] size-2.5 rotate-45 border transition-colors duration-200 ${
                      item.current
                        ? 'border-emerald-500 bg-emerald-500'
                        : 'border-border bg-background group-hover:border-emerald-500'
                    }`}
                  />

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-muted-foreground/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px w-4 bg-border"
                    />
                    <span className="text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
                      {period}
                    </span>
                    {item.current ? (
                      <span className="inline-flex items-center gap-1.5 border border-emerald-500/40 bg-emerald-500/10 px-1.5 py-0.5 text-[0.625rem] font-medium tracking-[0.2em] text-emerald-600 uppercase dark:text-emerald-300">
                        <span
                          aria-hidden="true"
                          className="size-1.5 animate-pulse rounded-full bg-emerald-500"
                        />
                        {isArabic ? 'الآن' : 'Now'}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-3 text-lg leading-tight font-semibold text-foreground sm:text-xl">
                    {role}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    {company}
                  </p>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                    {summary}
                  </p>

                  <TagList items={skillNames} />
                </li>
              );
            })}
          </ol>
        </section>

        <section id="projects" className="scroll-mt-24">
          <SectionHeading title={t('projectsTitle')} />
          <div className="grid gap-5">
            {PROJECTS.map((project, index) => {
              const skillNames = getSkillNames(project.skills, skillById);
              const description = isArabic
                ? project.descriptionAr
                : project.descriptionEn;

              return (
                <article
                  key={project.id}
                  className="border border-border bg-card/60 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/60"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center border border-border bg-background text-sm font-semibold text-cyan-500">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {project.name}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {description}
                      </p>
                    </div>
                  </div>
                  <TagList items={skillNames} />
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="scroll-mt-24 pb-4">
          <SectionHeading title={t('contactTitle')} />
          <p className="max-w-2xl text-base leading-8 text-muted-foreground">
            {t('contactBody')}
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-10 items-center gap-2 border border-primary bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t('contactCta')}
            <span aria-hidden="true">-&gt;</span>
          </a>
        </section>
      </div>
    </main>
  );
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h2 className="mb-6 flex items-center gap-4 text-sm font-semibold text-foreground">
      <span className="h-px w-10 bg-emerald-500" />
      {title}
    </h2>
  );
}

function TagList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
