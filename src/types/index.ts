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
  updatedAt: number;
  createdAt: number;
}
