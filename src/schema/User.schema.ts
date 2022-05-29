import { SchemaMigrations } from "parse-server";

export default SchemaMigrations.makeSchema("_User", {
    fields: {
        email: { type: "String" },
        authData: { type: "Object" },
        emailVerified: { type: "Boolean" },
        password: { type: "String" },
        username: { type: "String" },
        firstname: { type: "String" },
        lastname: { type: "String" },
        defaultCurrency: { type: "String" },
        locale: { type: "String" },
        clientKey: { type: "Object" },
    },
    indexes: {
        lastname: { lastname: 1 },
    },
    classLevelPermissions: {
        ...SchemaMigrations.CLP.allow({
            "*": ["create"],
            requiresAuthentication: ["update"],
        }),
        ...SchemaMigrations.CLP.allow({
            "role:Admin": ["update", "delete"],
        }),
        ...SchemaMigrations.CLP.allow({
            requiresAuthentication: ["find", "get", "count"],
        }),
        protectedFields: {
            "*": ["authData", "emailVerified", "password", "username", "lastname", "firstname"],
        },
    },
});