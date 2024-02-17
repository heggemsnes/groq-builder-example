import {
  InferSchemaValues,
  defineConfig,
  defineType,
  defineField,
} from "@sanity-typed/types";
import { pageWithSections, sections } from "./sections";

const page = defineType({
  type: "document",
  name: "page",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" as const }],
    }),
  ],
});

const category = defineType({
  type: "document",
  name: "category",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
  ],
});

const config = defineConfig({
  dataset: "dataset",
  projectId: "projectId",
  schema: {
    types: [category, page, sections, pageWithSections],
  },
});

export default config;

export type SanityValues = InferSchemaValues<typeof config>;
