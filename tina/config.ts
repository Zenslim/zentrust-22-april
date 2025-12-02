import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main", // still required even in standard workflow
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!, // new Client ID
  token: process.env.TINA_TOKEN!, // Tina token from the new project

  apiURL: `https://content.tinajs.io/api/plugins/core/1.0/projects/${
    process.env.NEXT_PUBLIC_TINA_CLIENT_ID
  }`,

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
