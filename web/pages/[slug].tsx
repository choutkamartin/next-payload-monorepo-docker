import { Page } from "@/payload-types";
import { RenderBlocks } from "components/RenderBlocks";
import { GetStaticProps } from "next";
import { fetchPage, fetchPageSlugs } from "queries/page";

const Slug = ({ page, preview }: { page: Page; preview: boolean }) => {
  return <RenderBlocks blocks={page.layout} />;
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const page = await fetchPage(params?.slug as string, preview);
  if (!page) {
    return {
      notFound: true,
    };
  }

  return {
    props: { page, preview },
  };
};

export const getStaticPaths = async () => {
  const slugs = await fetchPageSlugs();
  return {
    paths: slugs?.map((slug: string) => `/${slug}`),
    fallback: "blocking",
  };
};

export default Slug;
