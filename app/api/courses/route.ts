import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title } = await req.json();

    if (!userId || !title) {
      return new NextResponse('Unauthorized ', { status: 401 });
    }

    console.log('here is the user id:', userId);

    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log('[Courses]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
