// schemaUtils.ts
export function GetKey<T>(key: keyof T): string {
    return key as string;
  }
  