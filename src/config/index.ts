const APP_NAME = process.env.NODE_NAME;
const NODE_ENV = process.env.NODE_ENV;
const NODE_HOSTNAME = process.env.NODE_HOSTNAME;
const NODE_PORT = process.env.NODE_PORT;
const JWT_SECRET = process.env.JWT_TOKEN_SECRET;

const ROUTES = [
  {
    path: process.env.USERS_MS_REG_ROUTE,
    method: process.env.USERS_MS_REG_METHOD,
    component: undefined,
  },
  {
    path: process.env.USERS_MS_AUTH_ROUTE,
    method: process.env.USERS_MS_AUTH_METHOD,
    component: undefined,
  },
  {
    path: process.env.TOKEN_MS_RETRIEVE_ROUTE,
    method: process.env.TOKEN_MS_RETRIEVE_METHOD,
    component: undefined,
  },
];

const CACHE_CONFIG = Object.freeze({
  host: process.env.REDIS_DB_HOST,
  port: process.env.REDIS_DB_PORT,
  ttl: parseInt(process.env.REDIS_DB_TTL),
  cacheKeyPrefix: `${APP_NAME}:`,
});

const ERROR_MSG = {
  post: {
    MISSING_PARAMETER: "missing parameter: ",
    EXISTING_USER: "user already exists",
    INVALID_EMAIL: "invalid email",
  },
};

export default Object.freeze({
  APP_NAME,
  ERROR_MSG,
  CACHE_CONFIG,
  JWT_SECRET,
  NODE_ENV,
  NODE_HOSTNAME,
  NODE_PORT,
  ROUTES,
});
