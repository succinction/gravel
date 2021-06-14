import { GraphQLObjectType, GraphQLID, GraphQLString,
  GraphQLInputObjectType, GraphQLList, Kind,
  GraphQLNonNull } from 'graphql'
import BaseResolver from '../../libs/BaseResolver'
import Schema from '../../libs/Schema'
import Mailer from '../../libs/Mailer'
import { IApp } from '../../libs/types'
import UserModel, { User } from './UserModel'
import Config from '../../libs/Config'
import forgotEmailTemplate from './templates/email/forgot' 

export default class UserResolver extends BaseResolver {

  userModel: UserModel

  constructor(app: IApp) {
    super(app)
    this.userModel = new UserModel()
  }

  /**
   * Types
   */
  static types({ outputTypes, inputTypes, scalars, queries, mutations }: Schema) {

    // Outputs
    outputTypes.User = new GraphQLObjectType({
      name: 'User',
      fields: () => ({ 
        _id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        createdAt: { type: scalars.Date },
        updatedAt: { type: scalars.Date },
        deleteAt: { type: scalars.Date }

      })
    })

    outputTypes.Message = new GraphQLObjectType({
      name: 'Message',
      fields: () => ({ 
        message: { type: GraphQLString }
      })
    })

    outputTypes.Token = new GraphQLObjectType({
      name: 'Token',
      fields: () => ({ 
        token: { type: GraphQLString }
      })
    })
    
    // Inputs
    inputTypes.UserSignup = new GraphQLInputObjectType({
      name: 'UserSignup',
      fields: () => ({ 
        firstName: { type: GraphQLNonNull(scalars.NonEmptyString) },
        lastName: { type: GraphQLNonNull(scalars.NonEmptyString) },
        email: { type: GraphQLNonNull(scalars.Email) },
        password: { type: GraphQLNonNull(scalars.Password) }
      })
    })

    inputTypes.UserForgotPassword = new GraphQLInputObjectType({
      name: 'UserForgotPassword',
      fields: () => ({ 
        email: { type: GraphQLNonNull(scalars.Email) }
      })
    })

    inputTypes.UserSignin = new GraphQLInputObjectType({
      name: 'UserSignin',
      fields: () => ({ 
        email: { type: GraphQLNonNull(scalars.Email) },
        password: { type: GraphQLNonNull(scalars.Password) }
      })
    })

    inputTypes.UserUpdate = new GraphQLInputObjectType({
      name: 'UserUpdate',
      fields: () => ({ 
        firstName: { type: scalars.NonEmptyString },
        lastName: { type: scalars.NonEmptyString },
        email: { type: scalars.Email },
        password: { type: scalars.Password }
      })
    })

    // Scalars
    scalars.NonEmptyString = BaseResolver.createScalar({
      name: 'NonEmptyString',
      description: 'Input must not be empty',
      kind: Kind.STRING,
      validate: (v: any) => v.length > 0
    })

    scalars.Password = BaseResolver.createScalar({
      name: 'Password',
      description: 'Password must be greater than 7 and less than 50',
      kind: Kind.STRING,
      serialize: () => '********',
      validate: (v: any) => v.length > 7 && v.length < 50 
    })

    scalars.Email = BaseResolver.createScalar({
      name: 'Email',
      description: 'Email must contain a @ and a . character',
      kind: Kind.STRING,
      validate: (v: any) => /^\S+@\S+\.\S+$/.test(v)
    })

    scalars.Date = BaseResolver.createScalar({
      name: 'Date',
      description: 'Email must contain a @ and a . character',
      kind: Kind.STRING,
      serialize: (v: any) => new Date(v).toJSON(),
      validate: (v: any) => !isNaN((new Date(v)).getTime()),
      format: (v: any) => new Date(v)
    })

    // Queries
    queries.users = {
      type: GraphQLList(outputTypes.User),
      resolve: BaseResolver.resolve(UserResolver, 'resolveUsers')
    }

    queries.self = {
      type: outputTypes.User,
      resolve: BaseResolver.resolve(UserResolver, 'resolveSelf')
    }

    // Mutations
    mutations.signUp = {
      args: { user: { type: inputTypes.UserSignup } },
      type: outputTypes.Token,
      resolve: BaseResolver.resolve(UserResolver, 'resolveSignup')
    }

    mutations.signIn = {
      args: { user: { type: inputTypes.UserSignin } },
      type: outputTypes.Token,
      resolve: BaseResolver.resolve(UserResolver, 'resolveSignin')
    }

    mutations.forgotPassword = {
      args: { user: { type: inputTypes.UserForgotPassword } },
      type: outputTypes.Message,
      resolve: BaseResolver.resolve(UserResolver, 'resolveForgotPassword')
    }

    mutations.updateSelf = {
      args: { user: { type: inputTypes.UserUpdate } },
      type: outputTypes.Token,
      resolve: BaseResolver.resolve(UserResolver, 'resolveUpdateSelf')
    }
  }

  /**
  * Get Token
  */
  async getToken(user: User): Promise<{ token: string }> {
    const auth = this.getAuth()
    await auth.generateToken({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      auth: user.auth
    })
    return { token: auth.getToken() }
  }

  /**
   * Resolve Signup
   */
  async resolveSignup(): Promise<{ token: string }> {
    const user = await this.userModel.signUp(this.getArgs().user)
    return this.getToken(user)

  }

  /**
   * Resolve Signin
   */
  async resolveSignin(): Promise<{ token: string }> {
    const user = await this.userModel.signIn(this.getArgs().user)
    return this.getToken(user)

  }

  /**
   * Forgot Password
   */
  async resolveForgotPassword(): Promise<{ message: string }> {
    const user = await this.userModel.forgotPassword(this.getArgs().user)
    await this.getAuth().generateToken({ _id: user._id }, '5m')
    const mailer = new Mailer()
    const url = `${Config.get('resetPassword.url')}${encodeURIComponent(this.getAuth().getToken())}`
    const result = await mailer.send('Password reset.', forgotEmailTemplate('Jon', url), this.getArgs().user.email)
    if(result.results?.total_accepted_recipients) {
      return { message: 'Email with password reset link sent. Link expires in 5 mins.' }
    }
    throw Error('Error sending password reset link.')
  }

  /**
   * Resolve Users
   */
  resolveUsers(): Promise<Partial<User>[]> {
    const session = this.getAuth().getSession()
    if(session?.auth?.includes('admin'))
      return this.userModel.getUsers()
    throw Error('Requires admin access!')
  }

  /**
   * Resolve Self
   */
  resolveSelf(): Promise<Partial<User>> {
    const session = this.getAuth().getSession()
    return this.userModel.getUser(session?._id)
  }

  /**
   * Resolve Update Self
   */
   async resolveUpdateSelf(): Promise<{ token: string }> {
    const session = this.getAuth().getSession()
    const user = await this.userModel.updateUser(session._id, this.getArgs().user)
    return this.getToken(user)
  }
    
}
