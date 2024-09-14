import { NextResponse, NextRequest } from 'next/server'; 
import { buildAndValidateRegistrationRequest } from '@/v1/contract/registration';
import { dependencies } from '@/v1/dependency';

export async function POST(request: NextRequest) {
  try {    
    const { username, email, password, role } = await buildAndValidateRegistrationRequest(request); 
    const userService = dependencies.services.userService;
    const user = await userService.register({ username, email, password, role });
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
