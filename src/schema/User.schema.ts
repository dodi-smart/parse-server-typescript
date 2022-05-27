export default {
    className: "_User",
    fields: {
        objectId: { type: "String" },
        createdAt: {
            type: "Date",
        },
        updatedAt: {
            type: "Date",
        },
        ACL: { type: "ACL" },
        email: { type: "String" },
        authData: { type: "Object" },
        password: { type: "String" },
        username: { type: "String" },
        firstname: { type: "String" },
        lastname: { type: "String" },
        picture: { type: "File" },
        civility: { type: "String" },
        type: { type: "String" },
        birthDate: { type: "Date" },
        address: { type: "Object" },
        meta: { type: "Array" },
        phone: { type: "String" },
    },
    indexes: {
        type: { type: 1 },
        lastname: { lastname: 1 },
    },
    classLevelPermissions: {
        get: { requiresAuthentication: true },
        find: { requiresAuthentication: true },
        count: { requiresAuthentication: true },
        update: { "role:Admin": true },
        delete: { "role:Admin": true },
        create: { "*": true },
    },
} as Parse.Migrations.JSONSchema;
