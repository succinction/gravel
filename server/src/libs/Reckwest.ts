import https from 'https'
import http from 'http'
import { URL } from 'url'

interface IOptions {
  params?: Record<string, any>
  headers?: Record<string, string>
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS',
  returnType?: 'JSON'
}

/**
 * UrlReq - Wraps the http.request function making it nice for unit testing APIs.
 */
export default class Reckwest {

  url = ''
  options: IOptions = {}

  constructor(url: string, options: IOptions = {}) {
    this.url = url
    this.options = options
  }
  
  /**
   * West
   */
  west<T = any>(): Promise<T> {
    return new Promise((resolve, reject) => {

      const urlProps = new URL(this.url)
  
      this.options.returnType = this.options.returnType || 'JSON'
  
      const settings = {
        host: urlProps.hostname,
        port: urlProps.port,
        path: urlProps.pathname,
        headers: this.options?.headers || {},
        method: this.options?.method || 'GET'
      }
  
      let paramsString = ''
      if(this.options.params){
        paramsString = JSON.stringify(this.options.params)
        settings.headers['Content-Type'] = 'application/json'
        settings.headers['Content-Length'] = String(paramsString.length)
      }
  
      const req = urlProps.protocol === 'https:' ? https.request(settings) : http.request(settings)
  
      if(paramsString){ req.write(paramsString) }
  
      let body = ''
      req.on('response', (res: any) => {
        res.setEncoding('utf-8')
        res.on('data', (chunk: string) => body += chunk )
        res.on('end', () => {
          try{
            resolve(this.options.returnType === 'JSON' ? JSON.parse(body) : body)
          } catch(error) { reject(error) }
        })
      })
  
      req.on('error', reject)
  
      req.end()
    })
  }
}
