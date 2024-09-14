import { User } from '@/models/user';
import { UserRepository } from '../../repo/user/user';
import { UserService } from "./init";
import bcrypt from 'bcrypt';
import { excludePassword } from '../contract/registration';

export class UserServiceImpl implements UserService {
  private userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  async register(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<Omit<User, 'password'>> {
    const passwordHash = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepo.create({
      ...userData,
      password: passwordHash,
    });
    return excludePassword(user);
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return this.userRepo.update(id, userData);
  }

  async deleteUser(id: number): Promise<User> {
    return this.userRepo.delete(id);
  }
}
