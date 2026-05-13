import ExpoLogo from '@/assets/logos/expo';
import GithubLogo from '@/assets/logos/github';
import MaterialUiLogo from '@/assets/logos/materialUI';
import NestJsLogo from '@/assets/logos/nestjs';
import NextJsLogo from '@/assets/logos/nextjs';
import NodeJsLogo from '@/assets/logos/nodejs';
import PostgresqlLogo from '@/assets/logos/postgresql';
import ShadncnLogo from '@/assets/logos/shadcn';
import ShopifyLogo from '@/assets/logos/shopify';
import TailwindCssLogo from '@/assets/logos/tailwindcss';
import TypeScriptLogo from '@/assets/logos/typescript';
import ViteLogo from '@/assets/logos/vite';
import type { ComponentType, SVGProps } from 'react';

export type Skill = {
  id: string;
  name: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  accent: string;
};

const SKILLS: Skill[] = [
  {
    id: 'sk-01',
    name: 'TypeScript',
    icon: TypeScriptLogo,
    accent: '#3178c6',
  },
  {
    id: 'sk-02',
    name: 'Next.js',
    icon: NextJsLogo,
    accent: '#0a0a0a',
  },
  {
    id: 'sk-03',
    name: 'React Vite',
    icon: ViteLogo,
    accent: '#1a1a2e',
  },
  {
    id: 'sk-04',
    name: 'React Native Expo',
    icon: ExpoLogo,
    accent: '#020c1b',
  },
  {
    id: 'sk-05',
    name: 'TailwindCSS',
    icon: TailwindCssLogo,
    accent: '#0f172a',
  },
  {
    id: 'sk-06',
    name: 'ShadCN UI',
    icon: ShadncnLogo,
    accent: '#000000',
  },
  {
    id: 'sk-07',
    name: 'Material UI',
    icon: MaterialUiLogo,
    accent: '#f5f5f7',
  },
  {
    id: 'sk-08',
    name: 'NestJS',
    icon: NestJsLogo,
    accent: '#f5f5f7',
  },
  {
    id: 'sk-09',
    name: 'Node.js / Express.js',
    icon: NodeJsLogo,
    accent: '#1a1a1a',
  },
  {
    id: 'sk-10',
    name: 'MongoDB / PostgreSQL',
    icon: PostgresqlLogo,
    accent: '#f5f5f7',
  },
  {
    id: 'sk-11',
    name: 'Shopify',
    icon: ShopifyLogo,
    accent: '#5e8e3e',
  },
  {
    id: 'sk-12',
    name: 'Git / GitHub',
    icon: GithubLogo,
    accent: '#0d1117',
  },
];

export default SKILLS;
