export interface Review {
  id?: string;
  name: string;
  company: string;
  role: string;
  review: string;
  rating: number; // 1–5
  image: string;  // Firebase Storage URL or empty string
  featured: boolean;
  approved: boolean;
  createdAt?: any;
}
