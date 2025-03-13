import { CardItem } from "@/components/CardList";
import { unstable_cache } from "next/cache";
import Storyblok from "storyblok-js-client";

export type Card = {
  id: string;
  uuid: string;
  published_at: string;
  content: {
    title: string;
    description: string;
    date: string;
    type: string;
  };
};

export const getCards = async (): Promise<CardItem[]> => {

  const StoryblokClient = new Storyblok({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    region: "ca",
  });

  try {
    // Fetch all the published cards from Storyblok using the Storyblok API/JS SDK
    const data = await StoryblokClient.getAll("cdn/stories", {
      version: "published",
      starts_with: "cards/",
      cv: Date.now(),
    });

    // Extract the relevant data from the Storyblok response
    const cards = data.map((story:Card) => ({
      id: story.id,
      title: story.content.title,
      description: story.content.description,
      date: story.published_at,
      type: story.content.type,
    }));

    return cards;
  } catch (error) {
    console.error("Failed to fetch cards from Storyblok:", error);
    return [];
  }
}

export const getCardsCached = unstable_cache(getCards, [], { tags: ["cards"] });