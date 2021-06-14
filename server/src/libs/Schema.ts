import { GraphQLOutputType, GraphQLInputObjectType, GraphQLScalarType,
  GraphQLFieldConfigMap } from 'graphql'

export default class Schema {
  outputTypes: Record<string, GraphQLOutputType> = {}
  inputTypes: Record<string, GraphQLInputObjectType> = {}
  scalars: Record<string, GraphQLScalarType> = {}
  queries: GraphQLFieldConfigMap<any, any> = {}
  mutations: GraphQLFieldConfigMap<any, any> = {}
}
