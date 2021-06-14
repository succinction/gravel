import { randomBytes, pbkdf2Sync } from 'crypto'
import { ObjectId } from 'mongodb'
import BaseModel from '../../libs/BaseModel'

export class User {

  _id = new ObjectId()
  email = ''
  firstName = ''
  lastName = ''
  password = ''
  salt = ''
  auth: ('user' | 'admin')[] = ['user']
  active = false
  createdAt = 0
  updatedAt = 0
  deletedAt = 0
    
}


export default class UserModel extends BaseModel<User> {

  constructor() {
    super('users')
  }

  /**
   * Get Users
   */
  async getUsers() {
    const result = await this.getCollection().find()
    return result.toArray()
  }
  
  /**
   * Signup User
   */
  async signUp(argsUser: Pick<User, 'email' | 'firstName' | 'lastName' | 'password'>):
    Promise<User> {
    const emailUser = await this.getCollection().findOne({ email: argsUser.email })
    if(emailUser) throw Error('User already exists.')
    const user = new User()
    Object.assign(user, argsUser)

    const { salt, password } = this.hashPassword(argsUser.password)
    user.password = password
    user.salt = salt
    user.createdAt = Date.now()
    user.updatedAt = user.createdAt
    user.active = true

    try{

      const insertedUser = await this.getCollection().insertOne(user)
      Object.assign(user, insertedUser.ops[0])

    } catch(error) {
      console.log(error)
      throw new Error(error)
    }
    return user

  }

  /**
   * Signin
   */
  async signIn(argsUser: Pick<User, 'email' | 'password'>): Promise<User> {
    try {
      const user = await this.getCollection().findOne({ email: argsUser.email })
      if(user) {
        if( this.passwordMatches(argsUser.password, user)){
          return user
        }
        else throw Error('Password not found.')
      }
      else throw Error('User not found.')
    } catch(error) {
      throw Error('User not found, or password is incorrect.')
    }
    
  }

  /**
   * Forgot Password
   */
  async forgotPassword(argsUser: Pick<User, 'email'>):
   Promise<User> {
    const user = await this.getCollection().findOne({ email: argsUser.email })
    if(!user) throw Error('User not found.')
    return user
  }

  /**
   * Reset Password
   */
  async ResetPassword(argsUser: { _id: string, password: string }):
    Promise<User> {
    const user = await this.getCollection().findOne({ _id:  new ObjectId(argsUser._id)})
    if(!user) throw Error('User not found.')
    
    const { salt, password } = this.hashPassword(argsUser.password)
    user.password = password
    user.salt = salt
    user.updatedAt = user.createdAt

    try {
      await this.getCollection().updateOne({ _id: new ObjectId(user._id) }, { $set: user })
      return user

    } catch(error) {
      throw new Error(error)
    }
  }

  /**
   * Update User
   */
  async updateUser(_id: string, argsUser: Pick<User, 'email' | 'firstName' | 'lastName' | 'password'>):
    Promise<User> {
    const user = await this.getCollection().findOne({ _id: new ObjectId(_id) })
    if(!user) throw Error('User not found.')
    Object.assign(user, argsUser)

    if(argsUser.password) {
      const { salt, password } = this.hashPassword(argsUser.password)
      user.password = password
      user.salt = salt
    }

    if(argsUser.email) {
      const emailUser: User | null = await this.getCollection().findOne({ email: user.email })
      console.log(emailUser?._id, user._id)
      if(emailUser && String(emailUser._id) != String(user._id))
        throw Error('Email already exists.')
    }

    user.updatedAt = Date.now()

    await this.getCollection().updateOne({ _id: new ObjectId(_id) }, { $set: user })
    return user

  }

  /**
   * Get User
   */
  async getUser (_id: string): Promise<Partial<User>> {
    const user = await this.getCollection().findOne({ _id: new ObjectId(_id) })
    if(!user) throw Error('User not found.')
    return user
  }

  /**
   * Hash Password
   */
  hashPassword (password: string = '', salt = ''): Pick<User, 'password' | 'salt'> {
    if (!salt) salt = randomBytes(16).toString('hex')
    const saltedPassword = pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex')
    return { salt: salt, password: saltedPassword }
  }

  /**
   * Password Matches
   */
  passwordMatches (password = '', user: Pick<User, 'password' | 'salt'>): boolean {
    const hashedPassword = this.hashPassword(password, user.salt).password
    return user.password === hashedPassword
  }

}
