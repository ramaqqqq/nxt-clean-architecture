import { NextRequest, NextResponse } from 'next/server';
import { createToken } from '@/lib/token/token';
import { buildAndValidateLoginRequest } from '@/v1/contract/login';
import { dependencies } from '@/v1/dependency';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await buildAndValidateLoginRequest(request);
    const userService = dependencies.services.userService;
    const user = await userService.login(email, password);
    if (user) {
      const tokens = createToken(user.id.toString(), user.username, user.email, user.role);
      return NextResponse.json(tokens, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
