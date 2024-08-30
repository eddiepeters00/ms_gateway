import createPost from "./post";
import createProtected from "./protected";
import config from "../../config";
import { logger } from "../../libs/logger";
import { makeInputObj, makeOutputObj } from "../entities";
import { setCache, getCache, makeFetch } from "../data-access";
import createGet from "./get";
import { findDocuments } from "../../libs/mongoDb";

const errorMsgs = config.ERROR_MSG;

const protectedRoutes = ({ token, data }) =>
  createProtected({ getCache, makeInputObj }).protectedRoutes({
    token,
    data,
    cacheConfig: config.CACHE_CONFIG,
  });

const post = ({ params, path }) =>
  createPost({
    makeInputObj,
    makeFetch,
    setCache,
    logger,
  }).post({
    params,
    path,
    JWTSecret: config.JWT_SECRET,
    cacheConfig: config.CACHE_CONFIG,
    errorMsgs: errorMsgs.post,
  });

const get = ({ params }) =>
  createGet({
    makeInputObj,
    makeOutputObj,
    findDocuments,
    getCache,
    logger,
  }).get({
    params,
    dbConfig: config.dbConfig,
    cacheConfig: config.CACHE_CONFIG,
    errorMsgs: errorMsgs.get,
  });

export { get, post, protectedRoutes };
