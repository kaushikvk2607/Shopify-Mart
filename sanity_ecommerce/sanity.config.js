import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import schemas from './schemas/schema'

export default defineConfig(
  {
  name: 'default',
  title: 'my-ecommerce',

  projectId: 'snfov5gv',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],
  
  
  schema: {
    types: schemas,
  },

}
)
