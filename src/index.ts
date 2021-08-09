import express from 'express'
import config from './parse/config'
import { dashboard } from './parse/parse-dashboard'
import { graphqlServer, parseServer } from './parse/parse-server'
import { displayEnvironment, filesCacheControl, requireHTTPS } from './parse/express-utils'
import { Cloud, Jobs, Webhooks } from './cloud/main'

const start = () => {
    const app = express()

    app.use(requireHTTPS)
    app.use(filesCacheControl)
    app.use('/dashboard', dashboard)
    app.use(config.MOUNT_PATH, parseServer.app)

    graphqlServer.applyGraphQL(app);

    Cloud.init()
    Jobs.init()
    Webhooks.init(app)

    app.listen(config.PORT, displayEnvironment)
}

start()
