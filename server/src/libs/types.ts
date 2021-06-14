import type { ServerResponse, IncomingMessage } from 'http'
import type { GraphQLResolveInfo } from 'graphql'
import type Auth from './Auth'

export interface IServerResponse extends ServerResponse {}
export interface IServerRequest extends IncomingMessage {
  body?: string
}

export interface IApp {
  args: Record<string, any>
  info: GraphQLResolveInfo
}

export interface IParseScalar {
  value?: any
  description: string
  ast?: any
  kind?: string
  validate?: (v: any) => boolean
  format?: (v: any) => any
}

export interface ICreateScalar {
  name: string
  description: string 
  kind?: string
  serialize?: (v: any) => any
  validate?: (v: any) => boolean
  format?: (v: any) => any
}