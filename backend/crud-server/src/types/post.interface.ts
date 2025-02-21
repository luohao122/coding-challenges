export interface IPostDocument {
  id: number;
  title: string;
  slug: string;
  content: string;
  coverImage: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INewPostDocument {
  title: string;
  content: string;
  slug?: string;
  coverImage?: string;
}
