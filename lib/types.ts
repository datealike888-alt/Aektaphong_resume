export type Project = {
  slug: string; title: string; category: string; description: string; role: string;
  tags: string[]; details: { heading: string; paragraphs: string[]; items: string[] }[];
  coverLabel: string; coverNumber: string; coverSubtitle: string; documentPath: string; sortOrder: number;
};
export type Certificate = {
  certificateId: string; title: string; issuer: string; issuedOn: string;
  pdfPath: string; imagePath: string; featured: boolean; sortOrder: number;
};
