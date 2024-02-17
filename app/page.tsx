import type { SanityValues, referenced } from '../sanity-schema';
import { ExtractDocumentTypes, createGroqBuilder } from 'groq-builder';
//            ☝️ Note:
// Please see the "Schema Configuration" docs
// for an overview of this SchemaConfig type

export const q = createGroqBuilder<{
  documentTypes: ExtractDocumentTypes<SanityValues>;
  referenceSymbol: typeof referenced;
}>();

const pageQuery = q.star.filterByType('page').slice(0).project({
  title: true,
});

export default function Home() {
  return <p>Hi</p>;
}
