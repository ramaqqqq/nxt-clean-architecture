import { UserRepository } from '@/repo/user/user_impl';
import { User } from '../../models/user';
import { UserServiceImpl } from './user';

export interface UserService {
  register(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Omit<User, 'password'>>
  login(email: string, password: string): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  deleteUser(id: number): Promise<User>;
}

