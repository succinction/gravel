import { onDestroy } from 'svelte'
import type Store from './Store'

export function base64Decode(str: string) {
  var output = str.replace('-', '+').replace('_', '/')
  switch (output.length % 4) {
    case 0:
      break
    case 2:
      output += '=='
      break
    case 3:
      output += '='
      break
  }
  return window.atob(output)
}

export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
      return v.toString(16)
  })
}

export function subscribe<T=any>(instance: Store, fn: (value: T) => any, actions: string | string[] = []) {
  onDestroy(instance.subscribe(fn, Array.isArray(actions) ? actions : [actions]))
}
