import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
export default defineConfig({
  name: 'default',
  title: 'myNewSanityProj',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_PROJECT_DATASET,

  plugins: [
    deskTool({
      structure: (S, context) => {
        /* Structure code */
        return S.list()
          .title('Content')
          .items([
            // Minimum required configuration
            orderableDocumentListDeskItem({
              type: 'illustrations',
              title: 'Illustrations',
              S,
              context,
            }),
            orderableDocumentListDeskItem({type: 'conceptArt', title: 'Concept Art', S, context}),
            orderableDocumentListDeskItem({type: 'author', title: 'Author', S, context}),
          ])
      },
    }),
    visionTool(),
    vercelDeployTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
