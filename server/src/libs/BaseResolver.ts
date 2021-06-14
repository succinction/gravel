import { GraphQLError, GraphQLScalarType, GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql'
import Schema from './Schema'
import Auth from './Auth'
import { IServerRequest, IParseScalar, ICreateScalar, IApp } from './types'

export default class BaseResolver {

  private app!: IApp

  constructor(app: IApp) {
    this.app = app
  }

  /**
   * Types
   */
  static types(schema: Schema) { }

  /**
   * Resolve
   */
  static resolve(Resolver: any, func: string): GraphQLFieldResolver<any, any, any> {
    return (_source: any, args: Record<string, any>, _context: any, info: GraphQLResolveInfo) => {
      const resolve = new Resolver({ args, info })
      return resolve[func]()
    }
  }

  /**
   * Parse Scalar
   */
   static parseScalar({value, description, ast, kind, validate, format}: IParseScalar): IParseScalar['format'] {

    format = format || ((v: any) => v)
    validate = validate || ((v: any) => true)
  
    if (ast) {
      if (ast.kind === kind && validate(ast.value))
        return format(ast.value)
    }
    else if (validate(value))
      return format(value)
    throw new GraphQLError(description)
  }

  /**
   * Create Scalar
   */
  static createScalar({ name, description, kind, serialize, validate, format }: ICreateScalar): GraphQLScalarType {

    return new GraphQLScalarType({
      name: name,
      description: description,
      serialize: serialize || (function (value) { return value }),
      parseValue: (value) => BaseResolver.parseScalar({ value, description, validate, format }) ,
      parseLiteral: (ast) => BaseResolver.parseScalar({ ast, kind, description, validate, format })
    })
  }

  /**
   * Get Auth
   */
  getAuth(): Auth {
    return this.app.info.rootValue.auth
  }

  /**
   * Get Request
   */
  getRequest(): IServerRequest {
    return this.app.info.rootValue.request
  }

  /**
   * Get Args
   */
  getArgs() {
    return this.app.args
  }

  /**
   * Get Info
   */
  getInfo() {
    return this.app.info
  }
  
}
