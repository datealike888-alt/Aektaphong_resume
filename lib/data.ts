import projects from '@/data/projects.json';
import certificates from '@/data/certificates.json';
import type { Project, Certificate } from './types';

export function getProjects(): Project[] {
  return [...projects].sort((a, b) => a.sortOrder - b.sortOrder || a.slug.localeCompare(b.slug));
}
export function getCertificates({ featured }: { featured?: boolean } = {}): Certificate[] {
  return certificates.filter(c => featured === undefined || c.featured === featured)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.certificateId.localeCompare(b.certificateId));
}
