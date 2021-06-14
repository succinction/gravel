import { MongoClient, Db, Collection } from 'mongodb'
import Config from './Config'

class Database {

  client!: MongoClient
  db!: Db

  /**
   * Connect
   */
  async connect() {
    this.client = await MongoClient.connect(Config.get('db.url'))
    this.db = this.client.db()
  }

  /**
   * Close
   */
  close() {
    if (this.client)
      this.client.close();
  }

  /**
   * Collection
   */
  collection<T>(col: string): Collection<T> {
    return this.db.collection<T>(col)
  }
}

export default new Database()
