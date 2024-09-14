import { ValidationError } from '@/lib/errors/errors';
import { User } from '@/models/user';
import { NextRequest } from 'next/server';
import { z } from 'zod';

export const RegistrationRequest = z.object({
  username: z.string().min(3),  
  email: z.string().email(),
  password: z.string().min(3),  
  role: z.string().min(1),      
});

export type RegistrationRequest = z.infer<typeof RegistrationRequest>;

export async function buildAndValidateRegistrationRequest(request: NextRequest): Promise<RegistrationRequest> {
  const requestBody = await request.json();
  const parsed = RegistrationRequest.safeParse(requestBody);

  if (!parsed.success) {
    const errors = parsed.error.format();
    throw new ValidationError('Invalid request payload', errors);
  }

  return parsed.data;
}

export function excludePassword(user: User): Omit<User, 'password'> {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}