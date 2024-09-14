import { User } from "@/models/user";

export interface UserRepository {
    create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    update(id: number, userData: Partial<User>): Promise<User>;
    delete(id: number): Promise<User>;
}