import { DefaultDocumentNodeResolver } from "sanity/desk";
import author from "schemas/documents/author";
import blog from "schemas/documents/blog";

import AuthorAvatarPreviewPane from "./AuthorAvatarPreviewPane";
import PostPreviewPane from "./PostPreviewPane";

export const previewDocumentNode = ({
    apiVersion,
    previewSecretId,
}: {
    apiVersion: string
    previewSecretId: `${string}.${string}`
}): DefaultDocumentNodeResolver => {
    return (S, { schemaType }) => {
        switch (schemaType) {
            case author.name:
                return S.document().views([
                    S.view.form(),
                    S.view
                        .component(({ document }) => (
                            <AuthorAvatarPreviewPane
                                name={document.displayed.name as any}
                                picture={document.displayed.picture as any}
                            />
                        ))
                        .title('Preview'),
                    ])

            case blog.name:
                return S.document().views([
                    S.view.form(),
                    S.view
                        .component(({ document }) => (
                            <PostPreviewPane
                                slug={document.displayed.slug?.current}
                                apiVersion={apiVersion}
                                previewSecretId={previewSecretId}
                            />
                        ))
                        .title('Preview'),
                    ])
  
            default:
                return null
        }
    }
}