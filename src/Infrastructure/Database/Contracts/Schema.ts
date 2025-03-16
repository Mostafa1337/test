import { EntityBase } from "../../../Common/EntityBase";
import { EntityBaseSchema } from "../EntityBase/EntityBase.schema";

export abstract class Schema<T extends EntityBase> extends EntityBaseSchema<T>{

}