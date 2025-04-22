/* eslint-disable @typescript-eslint/no-explicit-any */
import { RevalidateButton, RevalidateButton2 } from "@/components/RevalidateButton";

type PathsType = {
  slug: string[];
};

type ParamsType = {
  params: Promise<PathsType>;
};

export const dynamicParams = false;

export async function generateStaticParams(): Promise<PathsType[]> {
  console.debug('Generating static params for Storyblok');
  const paths = [
    { slug: [''] }, // Home page
    { slug: ['resources'] }, // About page
    { slug: ['test', 'test-page'] }, // Two level test page
  ];
  return paths;
}

export default async function Page({ params }: ParamsType) {
  // const cards = await getCardsCached();
  // console.log('Page got cards:', cards);

  const { slug } = await params;
  const slugPath = slug ? slug.join('/') : 'home';
  console.debug('slugPath:', slugPath);
  const now = new Date();
  console.debug('Current date:', now.toISOString());
  const resp = await fetch('https://api.sampleapis.com/baseball/hitsSingleSeason', { next: { revalidate: 316857, tags: [ 'cards'] } });
  const data = await resp.json();
  // Get a random ten items from the data
  const randomTen = data.sort(() => Math.random() - Math.random()).slice(0, 10);
  console.debug('Random ten:', randomTen);

  return (
    <main className="container mx-auto py-8 px-4 max-w-screen-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Latest Updates</h1>
      <p>This page was created at <b>{now.toLocaleTimeString()}</b></p>
      <p>Slug path: {slugPath}</p>
      <p>Data fetched from API:</p>
      <RevalidateButton /> {' '}
      <RevalidateButton2 />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mx-auto max-w-screen-lg">
        {randomTen.map((item: any, index: number) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold">{item.player}</h2>
            <p>Rank: {item.Rank || 'unknown'}</p>
            <p>Player: {item.Player}</p>
            <p>AgeThatYear: {item.AgeThatYear}</p>
            <p>Hits: {item.Hits}</p>
            <p>Year: {item.Year}</p>
            <p>Bats: {item.Bats}</p>
          </div>
        ))}
      </div>
    </main>
  )
}