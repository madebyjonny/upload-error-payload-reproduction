import type { CollectionConfig } from "payload";

export const createSlug = (title: string) => {
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const Posts: CollectionConfig = {
  slug: "posts",
  fields: [
    {
      type: "tabs", // required
      tabs: [
        {
          label: "Content", // required
          description: "This is your article content",
          fields: [
            {
              name: "title",
              type: "text",
            },
            {
              name: "slug",
              type: "text",
              label: "Slug",
              admin: {
                position: "sidebar",
              },
            },
            {
              name: "body",
              type: "richText",
            },
          ],
        },
        {
          label: "SEO Meta content", // required
          description:
            "content for seo content that will appear in search results",
          fields: [
            // required
            {
              name: "meta_title", // accessible via tabTwo.numberField
              type: "text",
            },
            {
              name: "description", // accessible via tabTwo.numberField
              type: "text",
            },
            {
              name: "keywords", // accessible via tabTwo.numberField
              type: "text",
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data.slug) {
          data.slug = createSlug(data.title);
        }
        return data;
      },
    ],
  },
};
