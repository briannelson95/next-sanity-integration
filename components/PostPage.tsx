import Container from "./BlogContainer";
import BlogHeader from "./BlogHeader";
import PostBody from "./PostBody";
import PostTitle from "./PostTitle";
import Layout from "./BlogLayout";
import type { Blog, Settings } from "../lib/sanity.queries"
import { urlForImage } from "lib/sanity.image";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";

export default function PostPage(props: {
    preview?: boolean
    loading?: boolean
    data: { post: Blog; morePosts: Blog[] }
    settings: Settings
}) {
    const { preview, loading, data, settings } = props
    const { post = {} as any, morePosts = [] } = data || {}
    const { title = 'Blog.' } = settings || {}

    const router = useRouter()

    const slug = post?.slug

    if (!router.isFallback && !slug && !preview) {
        return <ErrorPage statusCode={404} />
    }

    return (
        <Layout preview={preview} loading={loading}>
            <Container>
                <BlogHeader title={title} level={2} />
                {router.isFallback || (preview && !post) ? (
                    <PostTitle>Loading…</PostTitle>
                ) : (
                    <>
                        <article>
                            <Head>
                                <title>{`${post.title} | ${title}`}</title>
                                {post.coverImage?.asset?._ref && (
                                    <meta
                                        key="ogImage"
                                        property="og:image"
                                        content={urlForImage(post.coverImage)
                                        .width(1200)
                                        .height(627)
                                        .fit('crop')
                                        .url()}
                                    />
                                )}
                            </Head>
                            <PostBody content={post.content} />
                        </article>
                    </>
                )}
            </Container>
        </Layout>
    )
}