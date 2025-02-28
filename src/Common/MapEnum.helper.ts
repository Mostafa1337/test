import { forMember, mapFrom } from '@automapper/core';

export type EnumLike = { [key: number]: string };

export class MapEnumHelper {
    static Map<Class,T extends EnumLike>(enumType: T,keyName: keyof Class) {
        return forMember(
            (destination:Class) => destination[keyName],
            mapFrom((source : Class) => {
                return enumType[source[keyName] as string] // leave it string to work, the appropite type is number 
                                                          // the convertion the from enum number to string 
            }),
        );
    }
}