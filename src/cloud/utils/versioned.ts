export type VersionedFunction = (req: Parse.Cloud.JobRequest | Parse.Cloud.FunctionRequest) => Promise<void>;

// This function will run the functions based on the version param
// If the version param is set, will lookup the function and run it
// otherwise will run the default
export function versioned(implementations: { [x: string]: VersionedFunction; default: VersionedFunction }) {
    return function (req: Parse.Cloud.JobRequest | Parse.Cloud.FunctionRequest): Promise<void> {
        const { version } = req.params;
        const impl = implementations[version] || implementations.default;
        return impl(req);
    };
}
