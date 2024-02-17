import {
  defineArrayMember,
  defineField,
  defineType,
} from "@sanity-typed/types";

export const sections = defineType({
  name: "sections",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      name: "articleSection",
      fields: [
        defineField({
          type: "string",
          name: "title",
        }),
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "imageSection",
      fields: [
        defineField({
          type: "image",
          name: "image",
        }),
      ],
    }),
  ],
});

export const pageWithSections = defineType({
  name: "pageWithSections",
  type: "document",
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    defineField({
      type: "slug",
      name: "slug",
    }),
    defineField({
      type: "reference",
      name: "category",
      to: [{ type: "category" as const }],
    }),
    defineField({
      type: "sections",
      name: "sections",
    }),
  ],
});
