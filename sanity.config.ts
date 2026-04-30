import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dummy-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schema.types,
  },
});
