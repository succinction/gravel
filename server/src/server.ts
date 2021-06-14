import { createServer } from 'http'
import { IServerRequest, IServerResponse } from './libs/types'
import Config from './libs/Config'
import Modules from './libs/Modules'

class Server {

  /**
   * Error
   */
  error(response: IServerResponse, error: unknown) {
    response.writeHead(400)
    response.end(error)
  }

  /**
   * Run
   */
  async run() {
    await Modules.run()

    createServer( async (request: IServerRequest, response: IServerResponse) => {
      response.setHeader('Access-Control-Allow-Origin', Config.get('cors.origin'))

      if (request.method === "OPTIONS") {
        response.setHeader('Access-Control-Allow-Methods', Config.get('cors.methods'))
        response.setHeader('Access-Control-Max-Age', Config.get('cors.maxAge'))
        response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");  
        response.setHeader('Content-Length', '0')
        response.writeHead(204)
        return response.end()
      }

      try {
        request.body = ''
        request.on('data', (d) => request.body += d )
        request.on('end', () => Modules.middleware(request, response))
      }
      catch (error) { this.error(response, error) }
      request.on('error', (error) => this.error(response, error))
    }).listen(Config.get('port'))
  }
}
var server = new Server()
server.run()
