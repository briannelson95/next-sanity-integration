import { BookIcon } from '@sanity/icons'
import { format, parseISO } from 'date-fns'
import { defineType, defineField } from "sanity";

import author from './author';

export default defineType({
  name: "blog",
  type: "document",
  icon: BookIcon,
  title: "Blog",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Blog title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context)
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      type: "blockContent",
      title: "Content"
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'mainImage',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: author.name }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage'
    },
    prepare({ title, media, author, date}) {
      const subtitles = [
        author && `by ${author}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ')}
    }
  }
})