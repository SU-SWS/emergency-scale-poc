import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { purgeCache } from "@netlify/functions";

export async function GET() {
  // Invalidate NextJS's the 'cards' cache tag
  revalidateTag("cards");

  // Invalidate Netlify's cache
  await purgeCache({
    tags: ['cards'],
  });

  return NextResponse.json({
    revalidated: true,
    message: "Cache invalidated successfully",
    timestamp: new Date().toISOString(),
  })
}

