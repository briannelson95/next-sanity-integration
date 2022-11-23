import { defineType, defineField } from "sanity";

export default defineType({
  name: "blog",
  type: "document",
  title: "Blog",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Blog title",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
    }),
    defineField({
      name: "mainContent",
      type: "blockContent",
      title: "Main Content"
    })
  ],
})