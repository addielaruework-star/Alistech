export interface Project {
  id?: string;
  title: string;
  slug: string;
  category: string;
  clientType: string;
  technologies: string[];
  shortDescription: string;
  fullDescription: string;
  galleryImages: string[];
  coverImage: string;
  featured: boolean;
  published: boolean;
  createdAt?: any;
  updatedAt?: any;
}
