import CardList from "@/components/CardList";
import { getCardsCached } from "@/app/api/cards/getCards";

export default async function Home() {
  const cards = await getCardsCached();
  console.log('Page got cards:', cards);

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Updates</h1>
      <CardList data={cards} />
    </main>
  )
}