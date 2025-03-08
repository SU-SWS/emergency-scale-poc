import CardList from "@/components/CardList";
import { getCards } from "./api/cards/route";

export const revalidate = 3600;

export default async function Home() {
  const cards = await getCards();

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Updates</h1>
      <CardList data={cards} />
    </main>
  )
}