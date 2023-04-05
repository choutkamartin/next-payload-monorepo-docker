import { Fragment } from "react";
import { Hero } from "components/Hero";
import { Page } from "@/payload-types";

const RenderBlocks = ({ blocks }: { blocks: Page["layout"] }) => {
  const blockComponents: any = {
    hero: Hero,
  };

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;
          if (blockType) {
            const Block = blockComponents[blockType];
            if (Block) {
              return <Block {...block} key={block.id} />;
            } else {
              console.log("Block type not supported");
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};

export default RenderBlocks;
