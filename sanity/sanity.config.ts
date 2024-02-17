import {
  InferSchemaValues,
  defineConfig,
  defineType,
  defineField,
} from '@sanity-typed/types';

const page = defineType({
  type: 'document',
  name: 'page',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' as const }],
    }),
  ],
});

const category = defineType({
  type: 'document',
  name: 'category',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
  ],
});

const config = defineConfig({
  dataset: 'dataset',
  projectId: 'projectId',
  schema: {
    types: [category, page],
  },
});

export default config;

export type SanityValues = InferSchemaValues<typeof config>;
