import config from './config'
import ParseServer, { ParseGraphQLServer } from 'parse-server';
import { buildSchemas } from './schema';
import { UserSchema } from '../schema/User.schema';
import logger from './logger';

const verbose = config.PARSE_LOG_VERBOSE || false,
    silent = config.PARSE_SILENT || false,
    logLevel = (verbose) ? undefined : 'error'

const parseServer = new ParseServer({
    appId: config.APP_ID,
    appName: config.APPLICATION_NAME,
    cluster: config.WORKERS,
    databaseURI: config.DATABASE_URI,
    logLevel: logLevel,
    masterKey: config.MASTER_KEY,
    maxUploadSize: '5mb',
    publicServerURL: config.PUBLIC_SERVER_URL,
    serverURL: config.SERVER_URL,
    silent: silent,
    verbose: verbose,
    loggerAdapter: logger,
    allowClientClassCreation: false,
    serverStartComplete: async () => {
        await buildSchemas([UserSchema])
    },
})

const graphqlServer = new ParseGraphQLServer(parseServer, { graphQLPath: config.GRAPHQL_MOUNT });

export {
    parseServer, graphqlServer
}
