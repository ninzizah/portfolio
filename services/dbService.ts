import { Project, SiteConfig, Research } from '../types';

const API_URL = '/api';

export const dbService = {
  // --- Projects ---
  async getProjects(): Promise<Project[]> {
    try {
      const res = await fetch(`${API_URL}/projects`);
      return await res.json();
    } catch (e) {
      console.error(e);
      return [];
    }
  },

  async saveProject(project: Partial<Project>): Promise<void> {
    if (project.id) {
      // Update
      await fetch(`${API_URL}/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
    } else {
      // Create
      await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
    }
  },

  async deleteProject(id: string): Promise<void> {
    await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
  },

  // --- Research ---
  async getResearch(): Promise<Research[]> {
    try {
      const res = await fetch(`${API_URL}/research`);
      return await res.json();
    } catch (e) { return [] }
  },

  async saveResearch(item: Partial<Research>): Promise<void> {
    // Only create logic simple for now as per minimal reqs, but assume Create for new
    await fetch(`${API_URL}/research`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
  },

  async deleteResearch(id: string): Promise<void> {
    await fetch(`${API_URL}/research/${id}`, { method: 'DELETE' });
  },

  // --- Config ---
  async getConfig(): Promise<SiteConfig | null> {
    try {
      const res = await fetch(`${API_URL}/config`);
      return await res.json();
    } catch (e) { return null }
  },

  async saveConfig(config: SiteConfig): Promise<void> {
    await fetch(`${API_URL}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
  },

  // --- Skills ---
  async getSkills(): Promise<any[]> {
    try {
      const res = await fetch(`${API_URL}/skills`);
      return await res.json();
    } catch (e) { return [] }
  },

  async saveSkill(skill: any): Promise<void> {
    await fetch(`${API_URL}/skills`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(skill)
    });
  },

  async deleteSkill(id: string): Promise<void> {
    await fetch(`${API_URL}/skills/${id}`, { method: 'DELETE' });
  },

  // --- Messages ---
  async getMessages(): Promise<any[]> {
    try {
      const res = await fetch(`${API_URL}/messages`);
      return await res.json();
    } catch (e) { return [] }
  },

  async deleteMessage(id: string): Promise<void> {
    await fetch(`${API_URL}/messages/${id}`, { method: 'DELETE' });
  }
};
