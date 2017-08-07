import { AuthService } from './auth-service'
import { RestfulService } from './restful-service'

export * from './auth-service'
export * from './restful-service'

export const SERVICES = [
  AuthService,
  RestfulService
]
