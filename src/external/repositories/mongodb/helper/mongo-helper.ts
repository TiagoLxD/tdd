import { Collection, MongoClient, ObjectId } from 'mongodb'

const mongoUriNotSetError =
    'MongoDB URI is not set. Please call connect() first.'

const handleMongoError = (error: unknown): Error => {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return new Error(`MongoDB operation failed: ${errorMessage}`)
}

const ensureClient = async (
    uri: string | null,
    client: MongoClient | null,
): Promise<MongoClient> => {
    if (!uri) {
        throw new Error(mongoUriNotSetError)
    }
    if (!client) {
        try {
            return await MongoClient.connect(uri)
        } catch (error) {
            throw handleMongoError(error)
        }
    }
    return client
}

const mapDocument = (document: any): any => {
    const { _id, ...documentWithoutId } = document
    return { ...documentWithoutId, id: (_id as ObjectId).toHexString() }
}

export const MongoHelper = {
    client: null as MongoClient | null,
    uri: null as string | null,

    async connect(uri: string): Promise<void> {
        try {
            this.uri = uri
            this.client = await MongoClient.connect(uri)
        } catch (error) {
            throw handleMongoError(error)
        }
    },

    async disconnect(): Promise<void> {
        if (!this.client) {
            return
        }
        try {
            await this.client.close()
        } catch (error) {
            throw handleMongoError(error)
        } finally {
            this.client = null
            this.uri = null
        }
    },

    async getCollection(name: string): Promise<Collection> {
        this.client = await ensureClient(this.uri, this.client)
        return this.client.db().collection(name)
    },

    map: mapDocument,

    async clearCollection(name: string): Promise<void> {
        this.client = await ensureClient(this.uri, this.client)
        try {
            await this.client.db().collection(name).deleteMany({})
        } catch (error) {
            throw handleMongoError(error)
        }
    },
}
