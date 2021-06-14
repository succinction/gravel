export { ObjectId } from 'mongodb'

export default class BaseRecord<TRecord> {

  /*
   * Merge props
   */
  assign<T>(props: Partial<TRecord>): void {
    Object.assign(this, props)
  }

}
