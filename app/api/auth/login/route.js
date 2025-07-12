import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    
    // Load users data
    const jsonDirectory = path.join(process.cwd(), 'data');
    const fileContents = await fs.readFile(jsonDirectory + '/users.json', 'utf8');
    const data = JSON.parse(fileContents);
    
    // Demo users with passwords (in real app, passwords would be hashed)
    const users = [
      {
        ...data.users[0], // admin user
        password: 'admin123'
      },
      {
        ...data.users[1], // jsmith user
        password: 'password123'
      },
      {
        ...data.users[2], // mjohnson user
        password: 'password123'
      }
    ];
    
    // Find user by email or username
    const user = users.find(u => 
      (u.username === email || u.email === email) && u.password === password
    );
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    // In a real app, you would generate a proper JWT token
    const token = 'mock-jwt-token-' + Date.now();
    
    return NextResponse.json({
      user: userWithoutPassword,
      accessToken: token,
      message: 'Login successful'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}