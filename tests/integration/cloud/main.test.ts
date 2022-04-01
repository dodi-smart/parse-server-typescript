import { Parse } from "../parseConfig/parse.setup";

describe("threadTest", () => {
    let threadTestResponse: string;

    beforeEach(async () => {
        threadTestResponse = await Parse.Cloud.run("threadTest");
    });

    it('returns "test" string', () => {
        expect(threadTestResponse).toEqual("test");
    });
});
