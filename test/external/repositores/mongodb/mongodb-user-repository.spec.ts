import { MongoHelper } from '@/external/repositories/mongodb/helper'
import { MongodbUserRepository } from '@/external/repositories/mongodb'
import { UserData } from '@/entities'

describe('MongoDB User Repository', () => {
    let userRepository: MongodbUserRepository

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string)
        userRepository = new MongodbUserRepository()
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    beforeEach(async () => {
        await MongoHelper.clearCollection('users')
    })

    it('should add a user and then confirm its existence', async () => {
        const userData: UserData = {
            name: 'any_name',
            email: 'any_email@mail.com',
        }
        await userRepository.add(userData)
        const userExists = await userRepository.exists(userData)
        expect(userExists).toBe(true)
    })

    it('should find a user by email', async () => {
        const userData: UserData = {
            name: 'any_name',
            email: 'any_email@mail.com',
        }
        await userRepository.add(userData)
        const foundUser = await userRepository.findUserByEmail(userData.email)
        expect(foundUser).toEqual(userData)
    })

    it('should return null if user is not found by email', async () => {
        const foundUser = await userRepository.findUserByEmail(
            'nonexistent@mail.com',
        )
        expect(foundUser).toBeNull()
    })

    it('should find all users', async () => {
        const userData1: UserData = {
            name: 'any_name_1',
            email: 'any_email_1@mail.com',
        }
        const userData2: UserData = {
            name: 'any_name_2',
            email: 'any_email_2@mail.com',
        }

        await userRepository.add(userData1)
        await userRepository.add(userData2)

        const allUsers = await userRepository.findAllUsers()

        expect(allUsers).toContainEqual(userData1)
        expect(allUsers).toContainEqual(userData2)
        expect(allUsers.length).toBe(2)
    })
})
