import { EntitySchemaColumnOptions } from "typeorm";
import { EntityBase } from "../../../Common/EntityBase";

export type EntityBaseSchemaColumns = {[P in keyof EntityBase]: EntitySchemaColumnOptions}
