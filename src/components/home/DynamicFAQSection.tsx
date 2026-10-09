import { getSiteContent } from "@/lib/site-content";
import { FAQ_ITEMS } from "@/lib/constants";
import { type FAQSectionContent } from "@/types/site-content";
import DynamicFAQClient from "./DynamicFAQClient";

const DEFAULT_FAQ_CONTENT: FAQSectionContent = {
  visible: true,
  eyebrow: "FAQ",
  title: "Frequently Asked ",
  highlight: "Questions",
  subtitle: "Answers to common questions about working with AlisTech.",
  items: FAQ_ITEMS,
};

/**
 * Server Component wrapper for the FAQ Section.
 * Retrieves live published content via cached getSiteContent() with fallback
 * to the hardcoded constants.ts defaults, and passes data to DynamicFAQClient.
 */
export default async function DynamicFAQSection() {
  const content = await getSiteContent<FAQSectionContent>(
    "faq",
    DEFAULT_FAQ_CONTENT
  );

  return <DynamicFAQClient {...content} />;
}
