import type { CollectionConfig } from "payload/types";
import { Hero } from "../blocks/Hero";
import { Quote } from "../blocks/Quote";

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: {
    singular: "Page",
    plural: "Pages",
  },
  access: {
    read: () => {
      return true;
    },
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "createdAt", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Name",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      label: "Slug",
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Page content (blocks)",
          fields: [
            {
              label: "Components",
              labels: {
                singular: "Component",
                plural: "Components",
              },
              required: true,
              name: "layout",
              type: "blocks",
              blocks: [Hero, Quote],
            },
          ],
        },
      ],
    },
  ],
  endpoints: [
    {
      path: "/slugs",
      method: "get",
      handler: async (req, res, next) => {
        const { docs } = await req.payload.find({
          collection: "pages",
          pagination: false,
        });
        const slugs = docs.map((page) => page.slug);
        if (docs) {
          res.status(200).send(slugs);
        } else {
          res.status(404).send({ error: "not found" });
        }
      },
    },
    {
      path: "/all",
      method: "get",
      handler: async (req, res) => {
        const { docs } = await req.payload.find({
          collection: "pages",
          pagination: false,
        });
        if (docs) {
          res.status(200).send(docs);
        } else {
          res.status(404).send({ error: "not found" });
        }
      },
    },
  ],
};
