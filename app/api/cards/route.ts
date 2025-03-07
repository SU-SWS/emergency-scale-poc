import { NextResponse } from "next/server";
import Storyblok from "storyblok-js-client";

export type Card = {
  id: number;
  uuid: string;
  content: {
    title: string;
    description: string;
    date: string;
    type: string;
  };
};

const getCards = async () => {

  const StoryblokClient = new Storyblok({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    region: "ca",
  });

  try {
    // Fetch all the published cards from Storyblok using the Storyblok API/JS SDK
    const data = await StoryblokClient.getAll("cdn/stories", {
      version: "published",
      starts_with: "cards/",
    });

    // Extract the relevant data from the Storyblok response
    const cards = data.map((story:Card) => ({
      id: story.id,
      title: story.content.title,
      description: story.content.description,
      date: story.content.date,
      type: story.content.type,
    }));

    return cards;
  } catch (error) {
    console.error("Failed to fetch cards from Storyblok:", error);
    return [];
  }
}

export async function GET() {
  console.log("Fetching cards...");
  const cards = await getCards();
  // Tell Netlify to cache the response in the CDN for 1 hour
  return NextResponse.json(cards, { headers: { "CDN-Cache-Control": "public, durable", "Cache-Tag": 'cards' } });
}

