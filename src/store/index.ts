import { Injectable } from '@angular/core'
import { UserStore } from './user-store'

@Injectable()
export class Stores {
  constructor(
    userStore: UserStore,
  ) { }
}

export const STORES = [
  Stores,
  UserStore
]