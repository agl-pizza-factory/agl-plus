import { Headers, Http, RequestOptions, Response } from '@angular/http'

import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class RestfulService {

  private headers = {
    'Content-Type': 'application/json'
  }

  constructor(public http: Http) { }

  get(url: string, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      this.http.get(url, this.prepareOptions(options))
        .map(response => this.handleResponse(response))
        .catch(error => this.handleError(error))
        .subscribe(data => resolve(data), error => reject(error))
    })
  }

  post(url: string, body: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      this.http.post(url, body, this.prepareOptions(options))
        .map(response => this.handleResponse(response))
        .catch(error => this.handleError(error))
        .subscribe(data => resolve(data), error => reject(error))
    })
  }

  put(url: string, body: any, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      this.http.put(url, body, this.prepareOptions(options))
        .map(response => this.handleResponse(response))
        .catch(error => this.handleError(error))
        .subscribe(data => resolve(data), error => reject(error))
    })
  }

  delete(url: string, options?: RequestOptions) {
    return new Promise((resolve, reject) => {
      this.http.delete(url, this.prepareOptions(options))
        .map(response => this.handleResponse(response))
        .catch(error => this.handleError(error))
        .subscribe(data => resolve(data), error => reject(error))
    })
  }

  setHeaders(headers: any, replace?: boolean) {
    this.headers = Object.assign({}, replace ? {} : this.headers, headers)
  }

  private prepareOptions(options: RequestOptions) {
    const headers: Headers = new Headers(this.headers)
    return Object.assign({ headers }, options)
  }

  private handleError(error: Response | any) {
    let errMsg: string
    if (error instanceof Response) {
      let body: any = error
      try { body = error.json() || '' } catch (e) { }
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    console.error(errMsg)
    return Observable.throw(errMsg)
  }

  private handleResponse(response: Response, successCode = [200]) {
    if (successCode.indexOf(response.status) < 0) {
      return Observable.throw(response)
    }
    try { response = response.json() } catch (e) { }
    return response
  }
}