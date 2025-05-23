import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { purgeCache } from "@netlify/functions";

export async function GET() {
  // Invalidate NextJS's the 'cards' cache tag
  revalidateTag("cards");

  // Invalidate Netlify's cache
  if (process.env.NETLIFY) {
    await purgeCache({
      tags: ['cards'],
    });
  }

  return NextResponse.json({
    revalidated: true,
    message: "Cache invalidated successfully",
    timestamp: new Date().toISOString(),
  })
}

export async function POST() {
  // Invalidate NextJS's the 'cards' cache tag
  revalidateTag("cards");

  // Invalidate NextJS's page cache
  revalidatePath("/");

  // Invalidate Netlify's Durable cache
  if (process.env.NETLIFY) {
    await purgeCache({
      tags: ['cards'],
    });
  }

  return NextResponse.json({
    revalidated: true,
    message: "Cache invalidated successfully",
    timestamp: new Date().toISOString(),
  })
}

