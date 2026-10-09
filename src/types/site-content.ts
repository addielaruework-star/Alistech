/**
 * Site Content & CMS Type Definitions
 * ─────────────────────────────────────────────────────────────────────────────
 * Schema definitions for dynamic site sections, drafts, published snapshots,
 * and version history tracking.
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSectionContent {
  eyebrow: string;
  title: string;
  highlight?: string;
  subtitle: string;
  items: FAQItem[];
  visible: boolean;
}

export type SectionDataMap = {
  faq: FAQSectionContent;
  [key: string]: any;
};

export interface SiteContentDraft<T = any> {
  section: string;
  content: T;
  updatedAt?: any;
  updatedBy?: string;
}

export interface SiteContentHistoryEntry<T = any> {
  id: string;
  section: string;
  content: T;
  publishedAt: any;
  publishedBy?: string;
  versionLabel?: string;
}

export type FieldType =
  | "text"
  | "textarea"
  | "image"
  | "link"
  | "boolean"
  | "card-list";

export interface FieldDefinition {
  key: string;
  label: string;
  type: FieldType;
  description?: string;
  placeholder?: string;
  itemSchema?: {
    fields: {
      key: string;
      label: string;
      type: "text" | "textarea" | "image" | "link";
      placeholder?: string;
    }[];
  };
}

export interface SectionSchema {
  sectionKey: string;
  title: string;
  description: string;
  fields: FieldDefinition[];
}
