import { apiVersion, dataset, previewSecretId, projectId } from './lib/sanity.api'
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk'

/* import schema types here */
import blockContent from './schemas/objects/blockContent';
import mainImage from './schemas/objects/mainImage';
import blog from './schemas/documents/blog'


const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || 'Next.js Blog with Sanity.io'

export default defineConfig({
    basePath: '/admin',
    dataset,
    projectId,
    title,
    
    schema: {
        types: [
            /*this is where schema types go*/
            blockContent,
            mainImage,
            blog,
        ]
    },
    plugins: [
        deskTool({
            /* this is where desk structure goes */
        })
        /* all other plugins here */
    ]
})

