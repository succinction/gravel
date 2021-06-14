import { createSecretKey } from 'crypto'
import { SignJWT, JWTPayload } from 'jose-node-cjs-runtime/jwt/sign'
import { jwtVerify } from 'jose-node-cjs-runtime/jwt/verify'
import Config from "./Config"

interface IAuthSession {
  _id: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  auth?: string[]
}

export default class Auth {

  private token: string = ''
  private session?: IAuthSession
  private secret = createSecretKey(Buffer.from(Config.get('secret'), 'hex'))

  /**
   * Get Session
   */
  getSession() {
    if(this.session?._id)
      return this.session
    throw Error('Session not active.')
  }

  /**
   * Generate Token
   */
  getToken() {
    return this.token
  }

  /**
   * Generate Token
   */
  async generateToken(payload: JWTPayload, ttl = '24h') {
    this.token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(ttl)
    .sign(this.secret)
  }

  /**
   * Verify Token
   */
  async verifyToken(token = '') {
    try {
      token = token.replace('Bearer', '').trim()
      const { payload } = await jwtVerify(token, this.secret)
      this.session = payload as unknown as IAuthSession
    } catch(error) {}

  }

}

