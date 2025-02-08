import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
    const router = Router()
    app.use('/api', router)

    const routesDir = `${__dirname}/../routes`
    readdirSync(routesDir)
        .filter((file) => !file.includes('.test.') && !file.endsWith('.map'))
        .forEach((file) => {
            import(`${routesDir}/${file}`)
                .then((module) => module.default(router))
                .catch((error) =>
                    console.error(`Error importing ${file}:`, error),
                )
        })
}
