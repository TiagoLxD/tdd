import { UserData } from '../../src/entities'
import { RegisterUserOnMailingList } from '../../src/usecases/register-user-on-mailing-list/register-user-on-mailing-list'
import { InMemoryUserRepository } from '../../src/usecases/repository/in-memory-user-repository'
import { HttpRequest } from '../../src/web-controllers/ports'
import { RegisterAndSendEmailController } from '../../src/web-controllers/register-user-controller'

describe('Sing up  controller', () => {
    test('should return status code 201 when user is valid user data', async () => {
        const request: HttpRequest = {
            body: {
                name: 'any_name',
                email: 'teste@teste.com',
            },
        }

        const users: UserData[] = []
        const userRepository = new InMemoryUserRepository(users)
        const usecase = new RegisterUserOnMailingList(userRepository)
        const registerUserController = new RegisterAndSendEmailController(
            usecase,
        )

        const response = await registerUserController.handle(request)

        expect(response.statusCode).toBe(201)
    })
})
