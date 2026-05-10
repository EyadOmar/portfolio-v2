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
};

const SKILLS: Skill[] = [
  {
    id: 'sk-01',
    name: 'TypeScript',
    icon: TypeScriptLogo,
  },
  {
    id: 'sk-02',
    name: 'Next.js',
    icon: NextJsLogo,
  },
  {
    id: 'sk-03',
    name: 'React Vite',
    icon: ViteLogo,
  },
  {
    id: 'sk-04',
    name: 'React Native Expo',
    icon: ExpoLogo,
  },
  {
    id: 'sk-05',
    name: 'TailwindCSS',
    icon: TailwindCssLogo,
  },
  {
    id: 'sk-06',
    name: 'ShadCN UI',
    icon: ShadncnLogo,
  },
  {
    id: 'sk-07',
    name: 'Material UI',
    icon: MaterialUiLogo,
  },
  {
    id: 'sk-08',
    name: 'NestJS',
    icon: NestJsLogo,
  },
  {
    id: 'sk-09',
    name: 'Node.js / Express.js',
    icon: NodeJsLogo,
  },
  {
    id: 'sk-10',
    name: 'MongoDB / PostgreSQL',
    icon: PostgresqlLogo,
  },
  {
    id: 'sk-11',
    name: 'Shopify',
    icon: ShopifyLogo,
  },
  {
    id: 'sk-12',
    name: 'Git / GitHub',
    icon: GithubLogo,
  },
];

export default SKILLS;
