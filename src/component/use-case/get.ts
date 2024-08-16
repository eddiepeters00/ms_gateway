export default function createGet({
  makeInputObj,
  findDocuments,
  getCache,
  makeOutputObj,
  logger,
}) {
  return Object.freeze({ get });

  async function get({ params, dbConfig, cacheConfig, errorMsgs }) {
    logger.info(`[USE-CASE][GET] Reading from db - START!`);
    Object.keys(params).forEach(
      (key) => params[key] === undefined && delete params[key]
    );

    if (Object.values(params).length) {
      const userFactory = makeInputObj({ params });

      params = {
        usernameHash: !params.username ? undefined : userFactory.usernameHash(),
        emailHash: !params.email ? undefined : userFactory.emailHash(),
      };

      Object.keys(params).forEach(
        (key) => params[key] === undefined && delete params[key]
      );
    }

    const cacheKey = cacheConfig.cacheKeyPrefix + params.usernameHash;

    const cachedUser = await getCache({ cacheKey, cacheConfig });

    if (cachedUser && cachedUser.length) return JSON.parse(cachedUser)[0];

    // 'and' query
    const dbResults = await findDocuments({ query: params, dbConfig });

    const results = dbResults.map((post) => {
      const resultsObj = makeOutputObj({ params: post });
      return {
        username: resultsObj.username(),
        email: resultsObj.email(),
        created: resultsObj.created(),
        modified: resultsObj.modified(),
      };
    });

    return results;
  }
}
