import { type SchemaTypeDefinition } from 'sanity';
import { tattooType } from './tattoo';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tattooType],
};
