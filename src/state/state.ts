import { User } from './user'

export interface State {
  user?: User
  authInProgress?: boolean
  authRequired?: boolean
}