export const FIREBASE_OPTIONS = {
    apiKey: "AIzaSyD6lKUKanLHTwYiwYtz6pnaEUxw8wWSFhs",
    authDomain: "techmeetstech-c6e6d.firebaseapp.com",
    databaseURL: "https://techmeetstech-c6e6d-default-rtdb.firebaseio.com",
    projectId: "techmeetstech-c6e6d",
    storageBucket: "techmeetstech-c6e6d.appspot.com",
    messagingSenderId: "171287247981",
    appId: "1:171287247981:web:e98d43922a52380be61364",
};

/**
 * Checks whether the current environment is a browser.
 * @returns Whether the current environment is a browser.
 */
export function isBrowser() {
    return typeof window === 'object';
}

/**
 * Checks whether the current enviornment is a server.
 * @returns Whether the current environment is a server.
 */
export function isServer() {
    return typeof window === 'undefined';
}

/**
 * Checks whether the current environment is in development mode.
 * @returns Whether the current environment is in development mode.
 */
export function isDev() {
    return process.env.NODE_ENV === 'development';
}

/**
 * Checks whether the current environment is in production mode.
 * @returns Whether the current environment is in production mode.
 */
export function isProd() {
    return process.env.NODE_ENV === 'production';
}
