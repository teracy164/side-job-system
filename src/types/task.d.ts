import { User } from './user';

export interface Task {
  id: number;
  title: string;
  description: string;
  client: string;
  price: number;
  expireDate: string;
  recruitmentNumber: number;
  assigners: User[];
  tags: string[];
  note: string;
  createdAt: string;
  createUserId: number;
  updatedAt: string;
  updateUserId: number;
}
