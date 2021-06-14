import { graphql, GraphQLSchema, GraphQLObjectType } from 'graphql'
import Auth from './Auth'
import Database from './Database'
import Schema from './Schema'
import modules from '../modules'
import { IServerRequest, IServerResponse } from './types'


class Modules {

  schema!: GraphQLSchema

  /**
   * Middleware
   */
  async middleware(request: IServerRequest, res: IServerResponse) {
    try {
      const { query, variables } = JSON.parse(request.body || '')
      const auth = await this.createAuth(request)
      const root = { request, auth }
      const response = await graphql(this.schema, query, root, {}, variables)
      res.writeHead(200)
      res.end(JSON.stringify(response))
    } catch(error) {
      console.log(error)
      res.writeHead(400)
      res.end(JSON.stringify(error))
    }
  
  }

  /**
   * Load Schema
   */
  loadSchema() {  
    const schema = new Schema()
    modules.resolvers.forEach((Resolver) => {
      Resolver.types(schema)
    })

    const schemaOptions: {query?: GraphQLObjectType, mutation?: GraphQLObjectType} = {}
  
    if (Object.keys(schema.queries).length) {
      schemaOptions.query = new GraphQLObjectType({
        name: 'Query',
        fields: () => schema.queries
      })
    }

    if (Object.keys(schema.mutations).length) {
      schemaOptions.mutation = new GraphQLObjectType({
        name: 'Mutation',
        fields: () => schema.mutations
      })
    }
    this.schema = new GraphQLSchema(schemaOptions)
  }

  /**
   * Run
   */
  async run() {
    await Database.connect()
    this.loadSchema()
  }

  /**
   * Create Auth
   */
  async createAuth(request: IServerRequest): Promise<Auth> {
    const auth = new Auth()
    await auth.verifyToken(request.headers.authorization)
    return auth
  }

}

export default new Modules()
