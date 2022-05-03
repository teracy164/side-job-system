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
}