export interface PostDataType {
  current_page: number;
  data: Post[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export type Post = {
  id: number
  created_at: Date
  updated_at: Date
  title: string
  content: string
  category_id: number
  img_url: string
  category: Category
}

export type NewPost = {
  title: string
  content: string
  category_id: number
  image: File
  image_name: string
}

export interface Category {
  id: number;
  name: Name;
  created_at: null;
  updated_at: null;
}

export enum Name {
  Lokaal = "Lokaal",
  Nieuws = "Nieuws",
  Sports = "Sports",
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
