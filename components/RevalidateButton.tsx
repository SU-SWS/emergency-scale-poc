'use client';
import { invalidateCardsCache } from "@/app/actions";

const pingAPI = async () => {
  const resp = await fetch('/api/invalidate-cache');
  if (!resp.ok) {
    console.error('Error pinging API:', resp.statusText);
    return;
  }
  const data = await resp.json();
  console.log('Ping response:', data);
}

export const RevalidateButton = () => {
  return (
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => { invalidateCardsCache(); window.location.reload() }} type='button'>Revalidate Cache Action</button>
  )
}

export const RevalidateButton2 = () => {
  return (
    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => pingAPI() } type='button'>Revalidate Cache API Route</button>
  )
}