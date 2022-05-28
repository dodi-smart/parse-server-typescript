// This file contain duplicate types from Parse-Server that are not yet updated
declare module "parse-server";

declare module "parse-server" {
    export namespace SchemaMigrations {
        export interface SchemaOptions {
            definitions: JSONSchema[];
            strict: boolean | undefined;
            deleteExtraFields: boolean | undefined;
            recreateModifiedFields: boolean | undefined;
            lockSchemas: boolean | undefined;
            beforeMigration: (() => void | Promise<void>) | undefined;
            afterMigration: (() => void | Promise<void>) | undefined;
        }

        export type FieldValueType =
            | "String"
            | "Boolean"
            | "File"
            | "Number"
            | "Relation"
            | "Pointer"
            | "Date"
            | "GeoPoint"
            | "Polygon"
            | "Array"
            | "Object"
            | "ACL";

        export interface FieldType {
            type: FieldValueType;
            required?: boolean;
            defaultValue?: number | string | boolean | unknown;
            targetClass?: string;
        }

        type ClassNameType = "_User" | "_Role" | string;

        export interface ProtectedFieldsInterface {
            [key: string]: string[];
        }

        export interface IndexInterface {
            [key: string]: number;
        }

        export interface IndexesInterface {
            [key: string]: IndexInterface;
        }

        export type CLPOperation = "find" | "count" | "get" | "update" | "create" | "delete";
        type CLPPermission =
            | "requiresAuthentication"
            | "*"
            | /* @Typescript 4.1+ `user:${string}` | `role:${string}` */ string;

        type CLPValue = { [key: string]: boolean };
        type CLPData = { [key: string]: CLPOperation[] };
        type CLPInterface = { [key: string]: CLPValue };

        export interface JSONSchema {
            className: ClassNameType;
            fields?: { [key: string]: FieldType };
            indexes?: IndexesInterface;
            classLevelPermissions?: {
                find?: CLPValue;
                count?: CLPValue;
                get?: CLPValue;
                update?: CLPValue;
                create?: CLPValue;
                delete?: CLPValue;
                addField?: CLPValue;
                protectedFields?: ProtectedFieldsInterface;
            };
        }

        export class CLP {
            static allow(perms: CLPData): CLPInterface;
        }

        function makeSchema(className: ClassNameType, schema: Omit<JSONSchema, "className">): JSONSchema;
    }
}
