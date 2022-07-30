import SwaggerUI from 'swagger-ui-express'
import YAML from 'yamljs'

const swaggerMiddleware = () => {
  const specifications = {
    customSiteTitle: 'FolkSoul API',
    customCss: '.swagger-ui .topbar { display: none }',
  }
  const swaggerDocument = YAML.load('./src/config/swagger.yaml') as any
  return [SwaggerUI.serve, SwaggerUI.setup(swaggerDocument, specifications)]
}

export default swaggerMiddleware

