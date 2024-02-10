/**
 * Array of routes that accessible to the public
 * And this are not required authentication
 * @type { string[]}
 */

export const publicRoutes = ["/", "/auth/new-verificationToken"];

/**
 * These are authentication routes.That only accessble during authencication.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/reset"];

/**
 * These routes were accessbile during user authentiaction only
 * @type { string}
 */
export const authPrefix = "/api/auth";

/**
 * Default path to redirect user after logged in
 * @type { string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
