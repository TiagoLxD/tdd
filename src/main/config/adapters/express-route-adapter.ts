import { RegisterAndSendEmailController } from '@/web-controllers/register-user-controller'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { Request, Response } from 'express'

export const adaptRoute = (controller: RegisterAndSendEmailController) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
        }

        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}
