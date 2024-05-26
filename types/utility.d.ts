export * from 'utility-types';

/**
 * T is the Original Object Type, this utility type
 * is used to turn array values into a union
 */
export type ArrayToUnion<T> = T extends readonly (infer U)[] ? U : never;

/**
 * T is the Original Object Type, this utility type
 * returns a union of the values of the keys of the original
 * object
 *
 * @param T Original Object Type
 * @returns Union of the values of the keys of the original object
 */
export type ObjectKeyValuesToUnion<T> = T[keyof T];

/**
 * T is the Original Object Type
 * O is the { key: newKey } replacement for the object
 *
 * @param T Original Object Type
 * @param O Object with key: newKey replacement
 *
 * @returns New Object type with replaced keys
 */
export type TransformObjectKeys<T, O> = {
	[K in keyof T as K extends keyof O ? O[K] : K]: T[K];
};

/**
 * Turn the values and nested object values of the object
 * into mutable
 *
 * @param T Original Object Type
 * @returns Mutable Object Type
 */
export type DeepMutable<T> = T extends (infer U)[]
	? U[]
	: T extends object
	? { -readonly [P in keyof T]: DeepMutable<T[P]> }
	: T;

/**
 * Remove undefined from values
 *
 * @param T Original Type
 * @returns New Type without undefined values
 */
export type Defined<T> = T extends undefined ? never : T;

/**
 * Remove undefined from values
 *
 * @param T Original Object Type
 * @returns New Type without undefined values
 */
export type DefinedObject<T> = {
	[K in keyof T]: Defined<T[K]>;
};

/**
 * Add null to key values
 *
 * @param T Original Object Type
 * @returns New Type with null values
 */
export type NullableKeys<T> = {
	[K in keyof T]: T[K] | null;
};

/**
 * Remove null from key values
 *
 * @param T Original Object Type
 * @returns New Type without null values
 */
export type NonNullableKeys<T> = {
	[K in keyof T]: NonNullable<T[K]>;
};

/**
 * Add types to object keys
 *
 * @param T Object
 * @param V types to add (ex. string | number)
 * @param K keys to add type to
 */
export type AddTypesToObjectKeys<T, V, K extends keyof T> = {
	[P in keyof T]: P extends K ? T[P] | V : T[P];
};

/**
 * Replace object key value type
 *
 * @param T Object
 * @param V types to replace
 * @param K keys to replace
 */
export type ReplaceTypesOfObjectKeys<T, V, K extends keyof T> = {
	[P in keyof T]: P extends K ? V : T[P];
};

/**
 * Remove type from object keys
 *
 * @param T Object
 * @param V types to remove
 * @param K keys to remove type from object keys
 */
export type RemoveTypesFromObjectKeys<T, V, K extends keyof T> = {
	[P in keyof T]: P extends K ? never : T[P];
};

/**
 * Convert snake_case to camelCase
 *
 * @param S string
 */
export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
	? `${Lowercase<T>}${Capitalize<SnakeToCamelCase<U>>}`
	: S;

/**
 * Convert an object with snake_case keys to camelCase
 *
 * @param T Object
 */
export type SnakeToCamelCaseKeys<T> = {
	[K in keyof T as SnakeToCamelCase<K & string>]: T[K];
};

/**
 * Convert an object and nested objects with snake_case keys to camelCase
 *
 * @param T Object
 */
export type DeepSnakeToCamelCaseKeys<T> = {
	[K in keyof T as SnakeToCamelCase<K & string>]: T[K] extends object ? DeepSnakeToCamelCaseKeys<T[K]> : T[K];
};

/**
 * Convert snake_case to kebab-case
 *
 * @param S string
 */
export type SnakeToKebabCase<S extends string> = S extends `${infer T}_${infer U}`
	? `${Lowercase<T>}-${SnakeToKebabCase<U>}`
	: S;

/**
 * Convert an object with snake_case keys to kebab-case
 *
 * @param T Object
 */
export type SnakeToKebabCaseKeys<T> = {
	[K in keyof T as SnakeToKebabCase<K & string>]: T[K];
};

/**
 * Convert an object and nested objects with snake_case keys to kebab-case
 *
 * @param T Object
 */
export type DeepSnakeToKebabCaseKeys<T> = {
	[K in keyof T as SnakeToKebabCase<K & string>]: T[K] extends object ? DeepSnakeToKebabCaseKeys<T[K]> : T[K];
};

/**
 * Convert camelCase to snake_case
 *
 * @param S string
 */
export type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
	? `${Lowercase<T> extends T ? T : `_${Lowercase<T>}`}${CamelToSnakeCase<U>}`
	: '';

/**
 * Convert an object with camelCase keys to snake_case
 *
 * @param T Object
 */
export type CamelToSnakeCaseKeys<T> = {
	[K in keyof T as CamelToSnakeCase<K & string>]: T[K];
};

/**
 * Convert an object and nested objects with camelCase keys to snake_case
 *
 * @param T Object
 */
export type DeepCamelToSnakeCaseKeys<T> = {
	[K in keyof T as CamelToSnakeCase<K & string>]: T[K] extends object ? DeepCamelToSnakeCaseKeys<T[K]> : T[K];
};

/**
 * Convert camelCase to kebab-case
 *
 * @param S string
 */
export type CamelToKebabCase<S extends string> = S extends `${infer T}${infer U}`
	? `${Lowercase<T>}${KebabToSnakeCase<U>}`
	: S;

/**
 * Convert object with camelCase keys to kebab-case
 *
 * @param T Object
 */
export type CamelToKebabCaseKeys<T> = {
	[K in keyof T as CamelToKebabCase<K & string>]: T[K];
};

/**
 * Convert an object and nested objects with camelCase keys to kebab-case
 *
 * @param T Object
 */
export type DeepCamelToKebabCaseKeys<T> = {
	[K in keyof T as CamelToKebabCase<K & string>]: T[K] extends object ? DeepCamelToKebabCaseKeys<T[K]> : T[K];
};

/**
 * Convert kebab-case to snake_case
 *
 * @param S string
 */
export type KebabToSnakeCase<S extends string> = S extends `${infer T}-${infer U}`
	? `${Lowercase<T>}_${KebabToSnakeCase<U>}`
	: S;

/**
 * Convert object with kebab-case keys to snake_case
 *
 * @param T Object
 */
export type KebabToSnakeCaseKeys<T> = {
	[K in keyof T as KebabToSnakeCase<K & string>]: T[K];
};

/**
 * Convert an object and nested objects with kebab-case keys to snake_case
 *
 * @param T Object
 */
export type DeepKebabToSnakeCaseKeys<T> = {
	[K in keyof T as KebabToSnakeCase<K & string>]: T[K] extends object ? DeepKebabToSnakeCaseKeys<T[K]> : T[K];
};

/**
 * Convert kebab-case to camelCase
 *
 * @param S string
 */
export type KebabToCamelCase<S extends string> = S extends `${infer T}-${infer U}`
	? `${Lowercase<T>}${Capitalize<KebabToCamelCase<U>>}`
	: S;

/**
 * Convert object with kebab-case keys to camelCase
 *
 * @param T Object
 */
export type KebabToCamelCaseKeys<T> = {
	[K in keyof T as KebabToCamelCase<K & string>]: T[K];
};

/**
 * Convert an object and nested objects with kebab-case keys to camelCase
 *
 * @param T Object
 */
export type DeepKebabToCamelCaseKeys<T> = {
	[K in keyof T as KebabToCamelCase<K & string>]: T[K] extends object ? DeepKebabToCamelCaseKeys<T[K]> : T[K];
};

/**
 * Convert object keys to uppercase
 *
 * @param T Object
 */
export type UppercaseKeys<T> = {
	[K in keyof T as Uppercase<K & string>]: T[K];
};

/**
 * Convert an object and nested objects with keys to uppercase
 *
 * @param T Object
 */
export type DeepUppercaseKeys<T> = {
	[K in keyof T as Uppercase<K & string>]: T[K] extends object ? DeepUppercaseKeys<T[K]> : T[K];
};

/**
 * Convert object keys to lowercase
 *
 * @param T Object
 */
export type LowercaseKeys<T> = {
	[K in keyof T as Lowercase<K & string>]: T[K];
};

/**
 * Convert an object and nested objects with keys to lowercase
 *
 * @param T Object
 */
export type DeepLowercaseKeys<T> = {
	[K in keyof T as Lowercase<K & string>]: T[K] extends object ? DeepLowercaseKeys<T[K]> : T[K];
};

/**
 * Convert object keys to capitalize
 *
 * @param T Object
 */
export type CapitalizeKeys<T> = {
	[K in keyof T as Capitalize<K & string>]: T[K];
};

/**
 * Convert an object and nested objects with keys to capitalize
 *
 * @param T Object
 */
export type DeepCapitalizeKeys<T> = {
	[K in keyof T as Capitalize<K & string>]: T[K] extends object ? DeepCapitalizeKeys<T[K]> : T[K];
};

/**
 * Convert object keys to decapitalize
 *
 * @param T Object
 */
export type DecapitalizeKeys<T> = {
	[K in keyof T as Uncapitalize<K & string>]: T[K];
};

/**
 * Convert an object and nested objects with keys to decapitalize
 *
 * @param T Object
 */
export type DeepDecapitalizeKeys<T> = {
	[K in keyof T as Uncapitalize<K & string>]: T[K] extends object ? DeepDecapitalizeKeys<T[K]> : T[K];
};

/**
 * Partial specialization that allows for partial
 * deserialization of an object
 *
 * @param T Original Object Type
 * @param K keys to make partial
 * @returns New Type with partial keys
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Required specialization that allows for partial
 * deserialization of an object
 *
 * @param T Original Object Type
 * @param K keys to make required
 * @returns New Type with required keys
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Adds a prefix to all keys of an object
 *
 * @param T Object Type
 * @param P Prefix to add to all keys
 * @returns New Object Type with prefix added to all keys
 */
export type AddPrefixToAllKeys<T, P extends string> = {
	[K in keyof T as `${P}${K}`]: T[K];
};

/**
 * Removes a prefix from all keys of an object
 *
 * @param T Object Type
 * @param P Prefix to remove from all keys
 * @returns New Object Type with prefix removed from all keys
 */
export type RemovePrefixFromAllKeys<T, P extends string> = {
	[K in keyof T as K extends `${P}${infer U}` ? U : K]: T[K];
};

/**
 * Adds a suffix to all keys of an object
 *
 * @param T Object Type
 * @param S Suffix to add to all keys
 * @returns New Object Type with suffix added to all keys
 */
export type AddSuffixToAllKeys<T, S extends string> = {
	[K in keyof T as `${K}${S}`]: T[K];
};

/**
 * Removes a suffix from all keys of an object
 *
 * @param T Object Type
 * @param S Suffix to remove from all keys
 * @returns New Object Type with suffix removed from all keys
 */
export type RemoveSuffixFromAllKeys<T, S extends string> = {
	[K in keyof T as K extends `${infer U}${S}` ? U : K]: T[K];
};

/**
 * Adds a prefix and suffix to all keys of an object
 *
 * @param T Object Type
 * @param P Prefix to add to all keys
 * @param S Suffix to add to all keys
 * @returns New Object Type with prefix and suffix added to all keys
 */
export type AddPrefixAndSuffixToAllKeys<T, P extends string, S extends string> = {
	[K in keyof T as `${P}${K}${S}`]: T[K];
};

/**
 * Removes a prefix and suffix from all keys of an object
 *
 * @param T Object Type
 * @param P Prefix to remove from all keys
 * @param S Suffix to remove from all keys
 * @returns New Object Type with prefix and suffix removed from all keys
 */
export type RemovePrefixAndSuffixFromAllKeys<T, P extends string, S extends string> = {
	[K in keyof T as K extends `${P}${infer U}${S}` ? U : K]: T[K];
};

/**
 * Adds a prefix to keys of an object
 *
 * @param T Object Type
 * @param P Prefix to add to keys
 * @returns New Object Type with prefix added to keys
 */
export type AddPrefixToKeys<T, P extends string> = {
	[K in keyof T as `${P}${K}`]: T[K];
};

/**
 * Removes a prefix from keys of an object
 *
 * @param T Object Type
 * @param P Prefix to remove from keys
 * @returns New Object Type with prefix removed from keys
 */
export type RemovePrefixFromKeys<T, P extends string> = {
	[K in keyof T as K extends `${P}${infer U}` ? U : K]: T[K];
};

/**
 * Adds a suffix to keys of an object
 *
 * @param T Object Type
 * @param S Suffix to add to keys
 * @returns New Object Type with suffix added to keys
 */
export type AddSuffixToKeys<T, S extends string> = {
	[K in keyof T as `${K}${S}`]: T[K];
};

/**
 * Removes a suffix from keys of an object
 *
 * @param T Object Type
 * @param S Suffix to remove from keys
 * @returns New Object Type with suffix removed from keys
 */
export type RemoveSuffixFromKeys<T, S extends string> = {
	[K in keyof T as K extends `${infer U}${S}` ? U : K]: T[K];
};

/**
 * Adds a prefix and suffix to keys of an object
 *
 * @param T Object Type
 * @param P Prefix to add to keys
 * @param S Suffix to add to keys
 * @returns New Object Type with prefix and suffix added to keys
 */
export type AddPrefixAndSuffixToKeys<T, P extends string, S extends string> = {
	[K in keyof T as `${P}${K}${S}`]: T[K];
};

/**
 * Removes a prefix and suffix from keys of an object
 *
 * @param T Object Type
 * @param P Prefix to remove from keys
 * @param S Suffix to remove from keys
 * @returns New Object Type with prefix and suffix removed from keys
 */
export type RemovePrefixAndSuffixFromKeys<T, P extends string, S extends string> = {
	[K in keyof T as K extends `${P}${infer U}${S}` ? U : K]: T[K];
};
