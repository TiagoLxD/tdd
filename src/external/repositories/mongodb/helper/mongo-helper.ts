import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient | null,
    uri: null as string | null,

    async connect(uri: string): Promise<void> {
        try {
            this.uri = uri
            this.client = await MongoClient.connect(uri)
        } catch (error: unknown) {
            throw new Error(
                `Failed to connect to MongoDB: ${error instanceof Error ? error.message : error}`,
            )
        }
    },

    async disconnect(): Promise<void> {
        if (!this.client) return
        try {
            await this.client.close()
        } catch (error: unknown) {
            throw new Error(
                `Error disconnecting from MongoDB: ${error instanceof Error ? error.message : error}`,
            )
        } finally {
            this.client = null
            this.uri = null
        }
    },

    async getCollection(name: string): Promise<Collection> {
        if (!this.uri)
            throw new Error(
                'MongoDB URI is not set. Please call connect() first.',
            )
        if (!this.client) {
            await this.connect(this.uri)
        }
        return this.client.db().collection(name)
    },

    map: (data: any): any => {
        const { _id, ...collectionWithoutId } = data
        return { ...collectionWithoutId, id: _id }
    },
}
