import { groq } from "next-sanity";

const postFields = groq`
    _id,
    title,
    date,
    excerpt,
    coverImage,
    "slug": slug.current,
    "author": author->{name, picture}
`

export const settingsQuery = groq`*[_type == "settings"][0]{title}`

export const indexQuery = groq`
*[_type == "blog"] | order(date desc, _updatedAt desc) {
    ${postFields}
}
`

export const postQuery = groq`
{
    "blog": *[_type == "blog" && slug.current == $slug] | order(_updatedAt desc) [0] {
        content,
        ${postFields}
    },
    "moreBlogs": *[_type == "blog" && slug.current == $slug] | order(_updatedAt desc) [0...2] {
        conent,
        ${postFields}
    }
}
`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Author {
    name?: string
    picture?: any
}

export interface Blog {
    _id: string
    title?: string
    coverImage?: any
    date?: string
    excerpt?: string
    author?: Author
    slug?: string
    content?: any
}

export interface Settings {
    title?: string
}