import { Migrations } from "parse";

export default Migrations.makeSchema("_User", {
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
        type: { type: 1 },
        lastname: { lastname: 1 },
    },
    classLevelPermissions: {
        ...Migrations.CLP.allow({
            "*": ["create"],
            requiresAuthentication: ["update"],
        }),
        ...Migrations.CLP.allow({
            "role:Admin": ["update", "delete"],
        }),
        ...Migrations.CLP.allow({
            requiresAuthentication: ["find", "get", "count"],
        }),
        protectedFields: {
            "*": ["authData", "emailVerified", "password", "username", "lastname", "firstname"],
        },
    },
});
