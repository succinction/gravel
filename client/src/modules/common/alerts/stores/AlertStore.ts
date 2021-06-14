import page from  'page'
import Store from '../../../lib/Store'

export interface IAlert {
  title?: string
  message: string
  tag?: string
  timeout?: number
  type?: string
  cleared?: boolean
  duplicates?: true
}

export interface IAlertStore {
  alerts: IAlert[]
}

class AlertStore extends Store<IAlertStore> {

  constructor(){
    super({ alerts: [] })
    page.exit(this.onPageExit.bind(this))
  }

  /**
   * On Page Exit
   */
   onPageExit(ctx, next){
    // Any persisted alerts need to go now.
    this.get().alerts.forEach(alert => {
      if(!alert.timeout){
        alert.timeout = 4000
      }
    })
    this.clear()
    next()
  }

  /**
   * Add
   */
  add(addAlerts: IAlert[]) {
    const alerts: IAlert[] = []
    addAlerts.forEach(alert => {
      alert.type = alert.type || 'info'

      // Check for duplicates unless duplicates are allowed
      this.get().alerts.forEach(a => {
        if(!alert.duplicates && a.message == alert.message){
          this.delete(alert.message)
        }
      })

      alerts.push(alert)
    })

    setTimeout(() => {
      this.set({alerts}, 'add.success')
    }, 500)

  }

  /**
   * Delete
   */
  delete(message){
    this.set({alerts: this.get().alerts.filter(a => a.message != message )}, 'delete.success')
  }

  /**
   * Clear
   */
  clear() {
    this.set(this.default, 'cleared.success')
  }

}

export const alertStore = new AlertStore()
