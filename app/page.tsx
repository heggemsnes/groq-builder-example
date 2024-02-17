import type { SanityValues, referenced } from "../sanity-schema";
import {
  ExtractDocumentTypes,
  InferResultType,
  createGroqBuilder,
} from "groq-builder";
//            ☝️ Note:
// Please see the "Schema Configuration" docs
// for an overview of this SchemaConfig type

export const q = createGroqBuilder<{
  documentTypes: ExtractDocumentTypes<SanityValues>;
  referenceSymbol: typeof referenced;
}>();

// @ts-expect-error Causes error "Argument of type '[]' is not assignable to parameter of type 'never'."
const pageQuery = q.star.filterByType("page").slice(0).project({
  title: true,
});

const sectionsFragment = q
  .fragment<SanityValues["sections"]>()
  .project((q) => ({
    ...q.conditionalByType({
      articleSection: {
        title: true,
        // Using page here for simplicity, but this would be a reference to a article.
        // @ts-expect-error Causes same error.
        articles: q.star.filterByType("page").slice(0, 3).project({
          title: true,
          slug: "slug.current",
        }),
      },
      imageSection: {
        image: true,
      },
    }),
  }));

// @ts-expect-error Causes error "Argument of type '[]' is not assignable to parameter of type 'never'."
const pageWithSectionsQuery = q.star
  .filterByType("pageWithSections")
  .slice(0)
  .project({
    title: true,

    /* This doesn't work and makes sense because it is not directoy on the pageWithSections type.*/
    //...sectionsFragment,

    /* This creates the correct query and actually fetches the data, but the type is inferred as never. */
    // sections: q.field("sections[]").project(sectionsFragment),
  });

type PageQuery = InferResultType<typeof pageWithSectionsQuery>;

// This causes the entire types to be messed up to be inferred as undefined
// @ts-expect-error Causes error "Argument of type '[]' is not assignable to parameter of type 'never'."
const pageWithSectionsQueryAndInnerProjection = q.star
  .filterByType("pageWithSections")
  .slice(0)
  .project((q) => ({
    title: true,
  }));

type PageQueryWithInnerProjection = InferResultType<
  typeof pageWithSectionsQueryAndInnerProjection
>;

export default function Home() {
  return <p>Hi</p>;
}
