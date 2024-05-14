import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { emit } from 'process';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const useremail = searchParams.get('userEmail');
  const uname = searchParams.get('uName');
  const username = searchParams.get('userName');

  console.log(useremail, uname, username);
  try {
    if (!useremail || !uname || !username)
      throw new Error('Pet and owner names required');
    await sql`INSERT INTO users (email, name, username) VALUES (${useremail},${uname},${username})`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const users = await sql`SELECT * FROM users;`;
  return NextResponse.json({ users }, { status: 200 });
}
