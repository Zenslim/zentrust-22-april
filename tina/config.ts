import { defineConfig } from 'tinacms';

const seoFields = [
  { name: 'title', label: 'Meta Title', type: 'string', required: true },
  { name: 'description', label: 'Meta Description', type: 'string', required: true },
  { name: 'image', label: 'Meta Image', type: 'image' },
];

const baseFields = [
  { name: 'title', label: 'Title', type: 'string', required: true },
  {
    name: 'slug',
    label: 'Slug',
    type: 'string',
    ui: {
      parse: (value: string) => value?.toLowerCase().replace(/\s+/g, '-'),
    },
    required: true,
  },
  { name: 'heroImage', label: 'Hero Image', type: 'image' },
  { name: 'body', label: 'Body', type: 'rich-text', isBody: true },
  {
    name: 'seo',
    label: 'SEO',
    type: 'object',
    fields: seoFields,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'string',
    options: ['draft', 'published'],
    required: true,
  },
];

export default defineConfig({
  branch: 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  token: process.env.TINA_TOKEN!,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },
  schema: {
    collections: [
      {
        name: 'pages',
        label: 'Pages',
        path: 'content/pages',
        format: 'json',
        fields: baseFields,
      },
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'content/blog',
        format: 'md',
        ui: {
          filename: {
            slugify: (values) => values?.slug || values?.title?.toLowerCase().replace(/\s+/g, '-') || 'post',
          },
        },
        fields: [
          ...baseFields,
          { name: 'excerpt', label: 'Excerpt', type: 'string', required: true },
          { name: 'readTime', label: 'Read time', type: 'string', required: true },
          { name: 'date', label: 'Published date', type: 'datetime', required: true },
        ],
      },
      {
        name: 'stories',
        label: 'Success Stories',
        path: 'content/pages',
        format: 'json',
        match: {
          include: 'stories',
        },
        fields: [
          {
            name: 'items',
            label: 'Stories',
            type: 'object',
            list: true,
            fields: [
              { name: 'title', label: 'Title', type: 'string', required: true },
              { name: 'slug', label: 'Slug', type: 'string', required: true },
              { name: 'summary', label: 'Summary', type: 'string', required: true },
              { name: 'image', label: 'Image', type: 'image', required: true },
              { name: 'link', label: 'Link', type: 'string' },
              { name: 'status', label: 'Status', type: 'string', options: ['draft', 'published'], required: true },
            ],
          },
        ],
      },
      {
        name: 'team',
        label: 'Team Members',
        path: 'content/pages',
        format: 'json',
        match: { include: 'team' },
        fields: [
          {
            name: 'members',
            label: 'Members',
            type: 'object',
            list: true,
            fields: [
              { name: 'name', label: 'Name', type: 'string', required: true },
              { name: 'role', label: 'Role', type: 'string', required: true },
              { name: 'bio', label: 'Bio', type: 'string', required: true },
              { name: 'photo', label: 'Photo', type: 'image', required: true },
              {
                name: 'socials',
                label: 'Social links',
                type: 'object',
                list: true,
                fields: [
                  { name: 'platform', label: 'Platform', type: 'string' },
                  { name: 'url', label: 'URL', type: 'string' },
                ],
              },
              { name: 'status', label: 'Status', type: 'string', options: ['draft', 'published'], required: true },
            ],
          },
        ],
      },
      {
        name: 'programs',
        label: 'Programs',
        path: 'content/pages',
        format: 'json',
        match: { include: 'programs' },
        fields: [
          {
            name: 'items',
            label: 'Programs',
            type: 'object',
            list: true,
            fields: [
              { name: 'title', label: 'Title', type: 'string', required: true },
              { name: 'slug', label: 'Slug', type: 'string', required: true },
              { name: 'description', label: 'Description', type: 'string', required: true },
              { name: 'icon', label: 'Icon', type: 'string', required: true },
              { name: 'metric', label: 'Metric', type: 'string' },
              { name: 'heroImage', label: 'Hero image', type: 'image' },
              { name: 'status', label: 'Status', type: 'string', options: ['draft', 'published'], required: true },
            ],
          },
        ],
      },
    ],
  },
});
