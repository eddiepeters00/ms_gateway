import {
  setCache as makeSetCache,
  getCache as makeGetCache,
} from "../../libs/redis-cache";

import createFetch from "./fetch";

import { decodeJWT as makeDecodeJWT } from "../../libs/jwt-token";

const setCache = ({ data, cacheKey, cacheConfig }) =>
  makeSetCache({ data, cacheKey, cacheConfig });

const getCache = ({ cacheKey, cacheConfig }) =>
  makeGetCache({ cacheKey, cacheConfig });

const makeFetch = ({ params, path, method }) =>
  createFetch().makeFetch({ params, path, method });

export { setCache, getCache, makeFetch };
