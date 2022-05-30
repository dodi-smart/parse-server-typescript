import { SchemaMigrations } from "parse-server";
import UserSchema from "./User.schema";

// @ts-ignore
export const schemas: SchemaMigrations.JSONSchema[] = [UserSchema];