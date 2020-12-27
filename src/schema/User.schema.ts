// Follow the JSON structure from REST API https://docs.parseplatform.org/rest/guide/#schema
export const UserSchema = {
    className: '_User',
    fields: {
        objectId: { type: 'String' },
        createdAt: {
            type: 'Date',
        },
        updatedAt: {
            type: 'Date',
        },
        ACL: { type: 'ACL' },
        email: { type: 'String' },
        authData: { type: 'Object' },
        password: { type: 'String' },
        username: { type: 'String' },
        firstname: { type: 'String' },
        lastname: { type: 'String' },
        picture: { type: 'File' },
        civility: { type: 'String' },
        type: { type: 'String' },
        birthDate: { type: 'Date' },
        address: { type: 'Object' },
        meta: { type: 'Array' },
        phone: { type: 'String' },
    },
    indexes: {
        objectId: { objectId: 1 },
        type: { type: 1 },
        lastname: { lastname: 1 },
    },
    classLevelPermissions: {
        find: { requiresAuthentication: true },
        count: { requiresAuthentication: true },
        get: { requiresAuthentication: true },
        update: { 'role:Admin': true },
        create: { '*': true },
        delete: { 'role:Admin': true },
        addField: {},
        protectedFields: {
            // @ts-ignore
            'role:Admin': [],
        },
    },
}