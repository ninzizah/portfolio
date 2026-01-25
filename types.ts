
export interface Project {
  _id?: string;
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  github?: string;
  year: string;
  videoUrl?: string; // Base64 or URL
}

export interface Research {
  _id?: string;
  id: string;
  title: string;
  abstract: string;
  date: string;
  publisher?: string;
  link?: string;
  pdfUrl?: string;
  imageUrl?: string;
  role?: string; // New field for specifying contribution role
  tags: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface SiteConfig {
  _id?: string;
  id?: string | number; // Added to match Postgres ID
  heroImage: string;
  heroName: string;
  heroSub: string;
  whatsapp: string;
  phone: string;
  email: string;
  cvUrl: string;
  linkedin: string;
  githubUrl: string;
  aboutText1: string;
  aboutText2: string;
  skillsCategories: SkillCategory[];
  backgroundMusicUrl?: string;
  copyrightText?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
