import Config from './Config'
import Reckwest from './Reckwest'

export default class Mailer {

  /**
   * Send
   */
  async send(subject: string, html: string, address: string): Promise<any> {

    if(Config.get('env') === 'test')
      return { results: { total_rejected_recipients: 0, total_accepted_recipients: 1, id: '123321'}}

    const reck = new Reckwest(Config.get('mailer.url'), {
      method: 'POST',
      headers: {
        Authorization: Config.get('mailer.authorization'),
        'Content-Type': 'application/json'
      },
      params: {
        content: {
          from: Config.get('mailer.from'),
          subject: subject,
          html
        },
        recipients: [ { address } ]
      }
    })

    return reck.west()

  }
}
