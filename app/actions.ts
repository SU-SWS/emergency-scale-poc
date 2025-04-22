"use server"

import { revalidateTag } from "next/cache"

export async function invalidateCardsCache() {
  // Invalidate the 'cards' cache tag
  revalidateTag("cards")
  return { success: true, timestamp: new Date().toISOString() }
}

/**
 * Build the site using the Netlify build hook.
 * @returns { success: boolean, timestamp: string }
 */
export async function rebuild() {
  const resp = await fetch(process.env.BUILD_URL!, {
    method: 'POST',
    body: JSON.stringify({}),
  });
  if (!resp.ok) {
    console.error('Error rebuilding site:', resp.statusText);
    return;
  }
  const data = await resp.json();
  console.log('Rebuild response:', data);
  return { success: true, timestamp: new Date().toISOString() }
}