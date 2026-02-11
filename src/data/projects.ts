import type { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'JobPulse',
    description: 'AI-powered job search platform that aggregates listings, analyzes trends, and provides intelligent recommendations using NLP and machine learning.',
    techStack: ['Python', 'Machine Learning', 'NLP', 'Data Analysis', 'Web Scraping'],
    thumbnail: '/images/projects/jobpulse.svg',
    githubUrl: 'https://github.com/sriramsachit-git/JobPulse',
    category: 'AI / ML',
  },
  {
    id: '2',
    title: 'CLaRaBench - RAG for SEC Filings',
    description: 'Comparative study of Unified vs Traditional RAG systems for SEC filings analysis, implementing advanced retrieval-augmented generation techniques.',
    techStack: ['Python', 'RAG', 'LLMs', 'Vector DB', 'SEC Filings'],
    thumbnail: '/images/projects/clarabench.svg',
    githubUrl: 'https://github.com/sadhvikreddym/CLaRaBench-Unified-vs-Traditional-RAG-for-SEC-Filings',
    category: 'AI / ML',
  },
  {
    id: '3',
    title: 'Alpaca Trading Bot',
    description: 'Automated trading bot using Alpaca API with ML-based predictions, real-time market analysis, and risk management strategies.',
    techStack: ['Python', 'Trading Algorithms', 'API Integration', 'ML Models', 'Finance'],
    thumbnail: '/images/projects/alpaca.svg',
    githubUrl: 'https://github.com/sriramsachit-git/Alpaca-Trading-Bot',
    category: 'Finance / ML',
  },
];

export const featuredProjectIds = ['1', '2', '3'];
