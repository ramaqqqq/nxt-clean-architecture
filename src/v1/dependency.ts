import { UserRepository } from '@/repo/user/user_impl';
import { UserServiceImpl } from '@/v1/services/user';

// Inisialisasi Repository
const userRepo = new UserRepository();

// Inisialisasi UserService with UserRepository
const userService = new UserServiceImpl(userRepo);

export const dependencies = {
  repositories: {
    userRepo,
  },
  services: {
    userService,
  },
};
