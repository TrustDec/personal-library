import rawAllCodeIsSlop from "./all-code-is-slop.json";
import type { Article, Block } from "./types";

export type { Article, Block, HeadingBlock } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Article field "${key}" must be a non-empty string`);
  }
  return value;
}

function parseBlock(value: unknown, index: number): Block {
  if (!isRecord(value) || typeof value.type !== "string") {
    throw new Error(`blocks[${index}] is invalid`);
  }
  if (value.type === "heading") {
    return {
      type: "heading",
      id: requiredString(value, "id"),
      en: requiredString(value, "en"),
      zh: requiredString(value, "zh"),
    };
  }
  if (value.type === "slide") {
    return {
      type: "slide",
      file: requiredString(value, "file"),
      alt: requiredString(value, "alt"),
      time: requiredString(value, "time"),
      en: requiredString(value, "en"),
      zh: requiredString(value, "zh"),
    };
  }
  if (value.type === "pair") {
    return {
      type: "pair",
      en: requiredString(value, "en"),
      zh: requiredString(value, "zh"),
    };
  }
  throw new Error(`blocks[${index}] has unknown type "${value.type}"`);
}

function parseArticle(raw: unknown): Article {
  if (!isRecord(raw)) {
    throw new Error("Article must be an object");
  }
  if (!Array.isArray(raw.blocks)) {
    throw new Error("Article.blocks must be an array");
  }
  return {
    slug: requiredString(raw, "slug"),
    titleEn: requiredString(raw, "titleEn"),
    titleZh: requiredString(raw, "titleZh"),
    speaker: requiredString(raw, "speaker"),
    role: requiredString(raw, "role"),
    event: requiredString(raw, "event"),
    location: requiredString(raw, "location"),
    date: requiredString(raw, "date"),
    duration: requiredString(raw, "duration"),
    cover: requiredString(raw, "cover"),
    source: requiredString(raw, "source"),
    sourceLabel: requiredString(raw, "sourceLabel"),
    note: requiredString(raw, "note"),
    blocks: raw.blocks.map(parseBlock),
  };
}

export const articles: Article[] = [parseArticle(rawAllCodeIsSlop)];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function articleHref(slug: string): string {
  return `/library/${slug}`;
}

export function slideSrc(slug: string, file: string): string {
  return `${import.meta.env.BASE_URL}articles/${slug}/slides/${file}`;
}
