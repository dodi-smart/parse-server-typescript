import bodyParser from 'body-parser'
import { Request, Response, Application } from 'express'

export class Cloud {
    static async init(): Promise<void> {
        Parse.Cloud.define('threadTest', () => {
            return 'test'
        })
    }
}

export class Webhooks {
    static async init(app: Application): Promise<void> {
        app.post('/webhooks/test', bodyParser.raw({ type: 'application/json' }), (request: Request, response: Response) => {
            response.status(200).json({})
        })
    }
}

export class Jobs {
    static async init(): Promise<void> {
        Parse.Cloud.job("test", async () => {
            return
        })
    }
}