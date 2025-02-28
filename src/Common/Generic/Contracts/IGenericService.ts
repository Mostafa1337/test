import { EntityBase } from "src/Common/EntityBase";
import { IGenericRepo } from "./IGenericRepo";

export interface IGenericService<T extends EntityBase> extends IGenericRepo<T>
{
}