import { createClient } from 'next-sanity';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Fetch helper for tattoos
export async function getTattoos() {
  // Only attempt fetch if a real Project ID is provided
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'dummy-id') {
    return [];
  }

  const query = `*[_type == "tattoo"] | order(publishedAt desc)`;
  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return [];
  }
}
