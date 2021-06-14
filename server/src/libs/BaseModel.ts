
import { Collection } from 'mongodb'
import Database from './Database'


export default class BaseModel<TRecord> {

  private collection!: Collection<TRecord>

  collectionName!: string

  constructor(collectionName: string) {
    this.collectionName = collectionName
    this.collection = Database.collection<TRecord>(collectionName)
  }

  /*
   * Get Collection
   */
  getCollection() {
    return this.collection
  }

}
