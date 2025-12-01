import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },

  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/blog",
        format: "md",
        ui: {
          filename: {
            slugify: (values) =>
              values?.title?.toLowerCase().replace(/ /g, "-"),
          },
        },
        fields: [
          { name: "title", type: "string", label: "Title", required: true },
          { name: "date", type: "datetime", label: "Published On" },
          { name: "tags", type: "string", list: true, label: "Tags" },
          { name: "coverImage", type: "image", label: "Cover Image" },
          {
            name: "body",
            type: "rich-text",
            label: "Content",
            isBody: true,
          },
        ],
      },
    ],
  },
});
