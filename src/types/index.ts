export interface User {
  id: number;
  pseudo: string;
  email: string;
  avatar: string;
}

export interface Post {
  id: number;
  title: string;
  body: string;
  author: User;
  updatedAt: string;
  createdAt: string;
}

export interface PouchPost {
  _id: string;
  id: number;
  title: string;
  body: string;
  author: User;
  updatedAt: string;
  createdAt: string;
}

export interface InfiniteScrollOptions {
  done: (data: unknown[]) => boolean;
  offset: number;
}
