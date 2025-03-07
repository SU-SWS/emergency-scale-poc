"use server"

import { revalidateTag } from "next/cache"

export async function invalidateCardsCache() {
  // Invalidate the 'cards' cache tag
  revalidateTag("cards")
  return { success: true, timestamp: new Date().toISOString() }
}

