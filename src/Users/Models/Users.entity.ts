import { EntityBase } from "src/Common/EntityBase";
import { Usertypes } from "./Usertype";
import { AutoMap } from "@automapper/classes";

export class Users extends EntityBase {

    @AutoMap()
    FirstName!: string

    @AutoMap()
    LastName!: string

    @AutoMap()
    Email!: string

    @AutoMap()
    StudentId?: string

    @AutoMap()
    PhoneNumber!: string

    @AutoMap()
    CountryCode!: string

    @AutoMap()
    Password!: string

    @AutoMap()
    Usertype!: Usertypes
}