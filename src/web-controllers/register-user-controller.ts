import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { MissingParamError } from './errors/missing-param-error'
import { serverError } from './utils'
import { ok } from './utils'
import { badRequest } from './utils'
import { UserData } from '../entities'
import { UseCase } from '../usecases/ports'

export class RegisterAndSendEmailController {
    private readonly usecase: UseCase

    constructor(usecase: UseCase) {
        this.usecase = usecase
    }

    public async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            if (!request.body.name || !request.body.email) {
                let missingParam = !request.body.name ? 'name ' : ''
                missingParam += !request.body.email ? 'email' : ''
                return badRequest(new MissingParamError(missingParam.trim()))
            }

            const userData: UserData = request.body
            const response = await this.usecase.perform(userData)

            if (response.isLeft()) {
                return badRequest(response.value)
            }

            return ok(response.value)
        } catch (error) {
            return serverError(error)
        }
    }
}
