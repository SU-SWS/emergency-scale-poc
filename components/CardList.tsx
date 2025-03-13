"use client";

import { useState, useEffect } from 'react';
import Card from './Card';
import { invalidateCardsCache } from "@/app/actions";

// Define the card type
export type CardItem = {
  id: string
  title: string
  description: string
  date: string
}

type CardListProps = {
  data: CardItem[]
}

const CardList = ({ data }: CardListProps) => {
  const [cards, setCards] = useState<CardItem[]>(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch cards from the API
  const fetchCards = async () => {
    try {
      // In a real app, this would be your actual API endpoint
      const response = await fetch("/api/cards")

      if (!response.ok) {
        throw new Error("Failed to fetch cards")
      }

      const data = await response.json()

      // Sort cards by date in reverse chronological order
      const sortedCards = data.sort(
        (a: CardItem, b: CardItem) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setCards(sortedCards)
      setLoading(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setLoading(true)
    await invalidateCardsCache()
    await fetchCards()
    setLoading(false)
  }

  // Set up polling
  useEffect(() => {
    // Fetch cards immediately on mount
    fetchCards();

    // Set up polling interval (every 3 seconds)
    const intervalId = setInterval(fetchCards, 3000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [])

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 max-w-screen-md mx-auto">
        <button
          onClick={refreshData}
          className="ml-auto bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh Now"}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 max-w-screen-md mx-auto">
        {cards.map((card) => (
            <Card key={card.id} {...card} />
        ))}
      </div>
    </>
  )
}
export default CardList;