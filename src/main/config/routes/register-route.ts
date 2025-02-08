import { makeRegisterAndSendEmailController } from '@/main/factories/register'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'

export default (router: Router): void => {
    router.post('/register', adaptRoute(makeRegisterAndSendEmailController()))
}
