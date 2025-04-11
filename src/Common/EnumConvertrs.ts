function enumToKeyMap<T extends Record<string, string | number>>(enumObj: T): Record<keyof T, keyof T> {
    const keyMap = {} as Record<keyof T, keyof T>;
    for (const key in enumObj) {
        if (isNaN(Number(key))) { // Skip numeric keys for numeric enums
            keyMap[key] = key;
        }
    }
    return keyMap;
}

// Convert the key map back to the original enum structure
function keyMapToEnum<T extends Record<string, string | number>>(keyMap: Record<keyof T, keyof T>, enumObj: T): T {
    const originalEnum = {} as T;
    for (const key in keyMap) {
        originalEnum[key] = enumObj[key];
    }
    return originalEnum;
}