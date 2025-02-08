import { UserData } from '../../../entities'
import { UserRepository } from '../../../usecases/ports/user-repository'
import { MongoHelper } from './helper/mongo-helper'
import { Collection } from 'mongodb'

const getUserCollection = async (): Promise<Collection> => {
    return await MongoHelper.getCollection('users')
}

const mapUser = (user: any): UserData | null => {
    return user ? MongoHelper.map(user) : null
}

export class MongodbUserRepository implements UserRepository {
    async add(user: UserData): Promise<void> {
        const userCollection = await getUserCollection()
        await userCollection.insertOne(user)
    }

    async findUserByEmail(email: string): Promise<UserData | null> {
        const userCollection = await getUserCollection()
        const user = await userCollection.findOne({ email })
        return mapUser(user)
    }

    async findAllUsers(): Promise<UserData[]> {
        const userCollection = await getUserCollection()
        const users = await userCollection.find({}).toArray()
        return users
            .map(mapUser)
            .filter((user): user is UserData => user !== null)
    }

    async exists(user: UserData): Promise<boolean> {
        const userInDatabase = await this.findUserByEmail(user.email)
        return !!userInDatabase
    }
}
