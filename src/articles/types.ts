export type PairBlock = {
  type: "pair";
  en: string;
  zh: string;
};

export type SlideBlock = {
  type: "slide";
  file: string;
  alt: string;
  time: string;
  en: string;
  zh: string;
};

export type HeadingBlock = {
  type: "heading";
  id: string;
  en: string;
  zh: string;
};

export type Block = PairBlock | SlideBlock | HeadingBlock;

export type Article = {
  slug: string;
  titleEn: string;
  titleZh: string;
  speaker: string;
  role: string;
  event: string;
  location: string;
  date: string;
  duration: string;
  cover: string;
  source: string;
  sourceLabel: string;
  note: string;
  blocks: Block[];
};
