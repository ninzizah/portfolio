import React from 'react';
import { 
  Globe, 
  Database, 
  Zap,
  Sparkles
} from 'lucide-react';
import { Project, Skill } from './types';

/**
 * INITIAL_PROJECTS is currently empty.
 * Data is managed via the Admin Portal and persisted in the database.
 */
export const INITIAL_PROJECTS: Project[] = [];

export const DETAILED_SKILLS = [
  {
    category: 'Education',
    items: [
      'Mount Kenya University (MKU)',
      'Bachelor of Science in Information Technology',
      'Focus: Business Information Systems & Software Engineering',
      'Continuous Learning & Research'
    ]
  },
  {
    category: 'Software Development',
    items: [
      'Web & Mobile Applications',
      'Languages: Java, Kotlin, JavaScript, Python, PHP',
      'Frontend: HTML5, CSS3, JavaScript (React)',
      'Mobile: Android (Kotlin), Ionic Framework',
      'Backend: RESTful APIs, Node.js'
    ]
  },
  {
    category: 'Databases & AI',
    items: [
      'MySQL, Firebase, Basic SQL Design',
      'AI-assisted systems & basic model integration',
      'Data-driven application architecture',
      'Data Collection and Analysis'
    ]
  },
  {
    category: 'Tools & Technologies',
    items: [
      'Android Studio, VS Code, GitHub',
      'cPanel, Firebase Console',
      'Version Control: Git',
      'Operating Systems: Linux (Ubuntu)'
    ]
  },
  {
    category: 'Research & Documentation',
    items: [
      'Technical Writing & Applied Research',
      'Problem Definition & Requirements Analysis',
      'System Design & Documentation',
      'Prototyping and Testing'
    ]
  },
  {
    category: 'Personal Attributes',
    items: [
      'Analytical Thinking & Adaptability',
      'Attention to Detail & Detail Oriented',
      'Professional Ethics & Responsibility',
      'Self-Motivation & Continuous Learning'
    ]
  }
];

export const SKILLS: Skill[] = [
  { name: 'Kotlin', level: 95, category: 'Frontend' },
  { name: 'JavaScript', level: 92, category: 'Frontend' },
  { name: 'Java', level: 90, category: 'Backend' },
  { name: 'Python', level: 88, category: 'Backend' },
  { name: 'MySQL', level: 90, category: 'Backend' },
  { name: 'Firebase', level: 94, category: 'Tools' },
  { name: 'Git', level: 96, category: 'Tools' },
];

export const TECH_ICONS = {
  Frontend: <Globe className="w-5 h-5" />,
  Backend: <Database className="w-5 h-5" />,
  Tools: <Zap className="w-5 h-5" />,
  'AI/ML': <Sparkles className="w-5 h-5" />,
};