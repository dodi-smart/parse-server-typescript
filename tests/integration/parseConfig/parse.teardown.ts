import "./parse.setup";

import { clearParseTestData } from "./../cloud/commands";

export const parseTeardown = async () => {
    await clearParseTestData();
};
