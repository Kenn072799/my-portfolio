export interface Project {
  id: string; name: string; description?: string; technologies?: string[];
  repositoryUrl?: string; demoUrl?: string; imageUrl?: string;
}
export interface Experience {
  id: string; title: string; company: string; startDate?: string; endDate?: string; current?: boolean; location?: string; description?: string; technologies?: string[];
}
export interface SkillGroup { title: string; context?: string; items: string[] }
export interface Certification {
  id: string; name: string; issuer: string; description?: string; issueDate?: string; credentialUrl?: string; kind?: string;
}
