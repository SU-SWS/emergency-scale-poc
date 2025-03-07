import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export async function POST() {
  // Invalidate the 'cards' cache tag
  revalidateTag("cards")

  return NextResponse.json({
    revalidated: true,
    message: "Cache invalidated successfully",
    timestamp: new Date().toISOString(),
  })
}

