import PostPage from "./PostPage";
import {
    type Blog,
    type Settings,
    postQuery,
    settingsQuery, 
} from "lib/sanity.queries";
import { usePreview } from "lib/sanity.preview";

export default function PreviewPostPage({
    token,
    slug,
}: {
    token: null | string
    slug: string
}) {
    const data: { post: Blog; morePosts: Blog[] } = usePreview(token, postQuery, {
        slug,
      })
      const settings: Settings = usePreview(token, settingsQuery) || {}
    
      return <PostPage preview data={data} settings={settings} />
}