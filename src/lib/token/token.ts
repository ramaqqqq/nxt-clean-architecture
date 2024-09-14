import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; 

export function createToken(uid: string, username: string, email: string, role: string) {
  const expTime = Math.floor(Date.now() / 1000) + (60 * 50); 

  const accessToken = jwt.sign(
    {
      id: uid,
      username,
      email,
      role,
      exp: expTime,
    },
    JWT_SECRET,
    { algorithm: 'HS256' }
  );

  const refreshToken = jwt.sign(
    {
      id: uid,
      username,
      email,
      role,
      exp: expTime,
    },
    JWT_SECRET,
    { algorithm: 'HS256' }
  );

  return {
    accessToken,
    refreshToken,
  };
}
