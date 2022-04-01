import config from "../../../src/parse/config";
import Parse from "parse/node";

Parse.User.enableUnsafeCurrentUser();
Parse.initialize(config.APP_ID, config.MASTER_KEY);
Parse.serverURL = config.SERVER_URL;

export { Parse };
