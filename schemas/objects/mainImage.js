import { defineType, defineField } from 'sanity';

export default defineType({
    name: "mainImage",
    type: "image",
    options: {
        hotspot: true
    },
    fields: [
        defineField({
            name: 'alt',
            type: 'string',
            description: 'Alternative text for SEO and accessibility.',
            validation: Rule => Rule.warning('You have to add alternative text.')
        }),
    ],
})