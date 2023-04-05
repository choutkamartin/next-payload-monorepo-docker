import qs from "qs";

import fetchCms from "utils/fetchCms";

export const fetchPage = async (slug: string, preview: boolean = false) => {
  const query = {
    slug: {
      equals: slug,
    },
  };

  const stringifiedQuery = qs.stringify(
    {
      where: query,
      draft: preview,
    },
    { addQueryPrefix: true }
  );

  const url = `/api/pages${stringifiedQuery}`;
  const data = await fetchCms(url);
  const page = data.docs[0];

  return page;
};

export const fetchPageSlugs = async () => {
  const url = `/api/pages/slugs`;
  const data = await fetchCms(url);

  return data;
};
