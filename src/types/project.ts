export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  thumbnail: string;
  demoUrl?: string;
  githubUrl?: string;
  category: string;
  metrics?: string;
}
