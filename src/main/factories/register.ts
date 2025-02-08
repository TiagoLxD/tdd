import { RegisterAndSendEmailController } from '@/web-controllers/register-user-controller'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '../../usecases/repository/in-memory-user-repository'

export const makeRegisterAndSendEmailController =
    (): RegisterAndSendEmailController => {
        const useCase = new RegisterUserOnMailingList(
            new InMemoryUserRepository([]),
        )

        return new RegisterAndSendEmailController(useCase)
    }
