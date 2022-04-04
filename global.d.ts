/**
 * Global type declarations.
 */
export declare global {
	interface JSON {
		/**
		 * Converts a JavaScript Object Notation (JSON) string into an object.
		 * @param text A valid JSON string.
		 * @param reviver A function that transforms the results. This function is called for each member of the object.
		 * If a member contains nested objects, the nested objects are transformed before the parent object is.
		 * @remarks The default type is replaced to use `unknown` instead of `any`.
		 * @see {@link https://github.com/microsoft/TypeScript/issues/26188}
		 */
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		parse(text: string, reviver?: (key: any, value: any) => any): unknown;
	}

	interface ArrayConstructor {
		/**
		 * @remarks The default type is replaced to use `unknown` instead of `any`.
		 * @see {@link https://github.com/microsoft/TypeScript/issues/26188}
		 */
		isArray(arg: unknown): arg is unknown[];
	}

	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * The Firebase service account encoded as JSON and URI-encoded.
			 */
			FIREBASE_SERVICE_ACCOUNT: string;
			/**
			 * The Firebase auth emulator host URI.
			 */
			FIRESTORE_AUTH_EMULATOR_HOST?: string;
			/**
			 * The Firestore emulator host URI.
			 */
			FIRESTORE_EMULATOR_HOST?: string;
		}
	}
}
