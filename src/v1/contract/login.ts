import { z } from 'zod';
import { NextRequest } from 'next/server';
import { ValidationError } from '@/lib/errors/errors';

const LoginRequest = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export type LoginRequest = z.infer<typeof LoginRequest>;

export async function buildAndValidateLoginRequest(request: NextRequest): Promise<LoginRequest> {
  const requestBody = await request.json();
  const parsed = LoginRequest.safeParse(requestBody);

  if (!parsed.success) {
    const errors = parsed.error.format();
    throw new ValidationError('Invalid request payload', errors);
  }

  return parsed.data;
}
