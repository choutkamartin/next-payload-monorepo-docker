import { Block } from "payload/types";

export const Hero: Block = {
  slug: "hero",
  labels: {
    singular: "Hero",
    plural: "Hero",
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
    },
    {
      name: "subtitle",
      type: "text",
      label: "Subtitle",
      required: true,
    },
  ],
};
