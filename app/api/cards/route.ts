import { NextResponse } from "next/server";
import { getCards } from "./getCards";

let count = 0;

export async function GET() {
  console.log("Fetching cards...", count++);
  const cards = await getCards();
  // Tell Netlify to cache the response in the CDN for 1 hour
  return NextResponse.json(cards, {
    headers: {
        "Netlify-CDN-Cache-Control": "public, durable, max-age=3600, stale-while-revalidate=86400",
        "CDN-Cache-Control": "public, durable, max-age=3600, stale-while-revalidate=86400",
        "Cache-Tag": 'cards',
        "Netlify-Cache-Tag": 'cards',
      },
    }
  );
}

