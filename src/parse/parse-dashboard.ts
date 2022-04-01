import config from "./config";
import ParseDashboard from "parse-dashboard";

const dashboardConfig = {
    apps: [
        {
            appId: config.APP_ID,
            appName: config.APPLICATION_NAME,
            masterKey: config.MASTER_KEY,
            serverURL: config.SERVER_URL,
            graphQLServerURL: config.GRAPHQL_URL,
        },
    ],
    port: config.PORT,
    trustProxy: 1,
    users: [
        {
            user: config.DASHBOARD_USERNAME,
            pass: config.DASHBOARD_PASSWORD,
        },
    ],
};

const dashboardOptions = {
    options: {
        allowInsecureHTTP: false,
        cookieSessionSecret: config.DASHBOARD_SECRET,
    },
};

// Dashboard configuration
const dashboard = new ParseDashboard(dashboardConfig, dashboardOptions);

export { dashboard };
