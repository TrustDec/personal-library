import { slideSrc } from "../articles/catalog";
import type { Block } from "../articles/types";

export function ArticleContent({ slug, blocks }: { slug: string; blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <BlockView key={blockKey(block, index)} slug={slug} block={block} />
      ))}
    </>
  );
}

function blockKey(block: Block, index: number): string {
  if (block.type === "heading") return block.id;
  if (block.type === "slide") return `${block.file}:${block.time}`;
  return `pair-${index}`;
}

function BlockView({ slug, block }: { slug: string; block: Block }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 id={block.id}>
          <span className="en">{block.en}</span>
          <span className="zh">{block.zh}</span>
        </h2>
      );
    case "slide":
      return (
        <figure>
          <img src={slideSrc(slug, block.file)} alt={block.alt} />
          <figcaption>
            <span className="t">{block.time}</span>
            <span className="en">{block.en}</span>
            <span className="zh">{block.zh}</span>
          </figcaption>
        </figure>
      );
    case "pair":
      return (
        <div className="pair">
          <p className="en">{block.en}</p>
          <p className="zh">{block.zh}</p>
        </div>
      );
  }
}
