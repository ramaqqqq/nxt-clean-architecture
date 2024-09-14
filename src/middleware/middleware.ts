import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'eeq_______'; 

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const noAuthPaths = ['/api/auth/login', '/api/auth/register'];

  if (noAuthPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return new NextResponse('No token provided', { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    (req as any).user = decoded;
    return NextResponse.next();
  } catch (error) {
    return new NextResponse('Invalid token', { status: 401 });
  }
}

export const config = {
  matcher: ['/api/:path*'],
};
