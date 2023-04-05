import { GetStaticProps } from "next";
import { Page } from "payload-types";
import { Fragment } from "react";

import { RenderBlocks } from "components/RenderBlocks";
import { fetchPage } from "queries/page";

const Index = ({ page, preview }: { page: Page; preview: boolean }) => {
  return (
    <Fragment>
      <RenderBlocks blocks={page.layout} />
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const page = await fetchPage("index", preview);

  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page, preview },
  };
};

export default Index;
