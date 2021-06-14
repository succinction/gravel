import { writable, get,  Writable, Subscriber, Updater } from 'svelte/store'


/**
 * Store
 */
export default class Store<T = any> {
  
  private store: Writable<T>
  private action: string
  readonly default: T

  constructor(store: T) {
    this.default = store
    this.action = 'init'
    this.store = writable<T>(store)

  }

  /**
   * Subscribe
   */
  subscribe(run: Subscriber<T>, actions: string[] = []) {
    return this.store.subscribe((s) => {
        if(!actions.length || actions.includes(this.action)) run(s)
    })
  }

  /**
   * Set Store
   */
  set(value: T, action: string) {
    this.action = action
    this.store.set(value as T)
    this.action = 'init'
  }

  /**
   * Get Store
   */
  get() {
    return get(this.store)
  }

  /**
   * Update Store
   */
  update(updater: Updater<T>, action: string) {
    this.action = action
    this.store.update(updater)
    this.action = 'init'
  }

  /**
   * Request
   * Simple request
   */
  async graphQl<TData=any, TError=any>(query: string, variables: Record<string, any> = {}): Promise<{data: TData, errors: TError[]}> {
    const response = await fetch(`http://localhost:8080`, {
      method: 'post',
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    })
    return response.json()
  }

}
