import config from "./config";
import { NextFunction, Request, Response } from "express";
import logger from "./logger";

const handleErrors = (err: Error): void => {
    logger.error(`💥 ${err}`);
};

const displayEnvironment = (): void => {
    // Display all environmental variables on start.
    logger.info("-------- Environmental Variables: ---------------------");
    for (const key in config) {
        const configValue = config[key as keyof typeof config];
        if (typeof configValue === "string") {
            // Redact most of the value of anything with KEY or SECRET in the key
            const value =
                key.includes("KEY") ||
                key.includes("SECRET") ||
                key.includes("TOKEN") ||
                key.includes("DATABASE") ||
                key.includes("PASSWORD")
                    ? "****** Redacted *****" + configValue.slice(-6)
                    : configValue;
            logger.info(key + " : " + value);
        }
    }
    logger.info("------------------------------ End of Environment.");
    logger.info("📡 Started Parse Dashboard at " + config.ROOT_URL + "/dashboard");
    logger.info("📡 Started Parse Server at " + config.SERVER_URL);
    logger.info("📡 Started Parse GraphQL at " + config.GRAPHQL_URL);
};

const requireHTTPS = (req: Request, res: Response, next: NextFunction): void => {
    const host = req.get("host");
    // The 'x-forwarded-proto' check is for Heroku
    !req.secure && req.get("x-forwarded-proto") !== "https" && host && !host.includes("localhost")
        ? res.redirect("https://" + req.get("host") + req.url)
        : next();
};

const filesCacheControl = (req: Request, res: Response, next: NextFunction): void => {
    const maxAge = process.env.CACHE_MAX_AGE || 2_592_000;
    if (req.url.startsWith("/files/")) res.setHeader("Cache-Control", `max-age=${maxAge}`);
    next();
};

export { displayEnvironment, handleErrors, requireHTTPS, filesCacheControl };
