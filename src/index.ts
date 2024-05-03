import 'module-alias/register'
import express from "express";
import config from "./parse/config";
import { dashboard } from "./parse/parse-dashboard";
import { graphqlServer, parseServer } from "./parse/parse-server";
import { displayEnvironment, filesCacheControl, handleErrors, requireHTTPS } from "./parse/express-utils";
import { Cloud, Jobs, Webhooks } from "./cloud/main";

const start = async () => {
    const app = express();

    app.use(requireHTTPS);
    app.use(filesCacheControl);
    app.use("/dashboard", dashboard);
    await parseServer.start();
    app.use(config.MOUNT_PATH, parseServer.app);

    graphqlServer.applyGraphQL(app);

    Cloud.init();
    Jobs.init();
    Webhooks.init(app);

    app.listen(config.PORT, displayEnvironment).on("error", handleErrors);
};

start();