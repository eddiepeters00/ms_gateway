export default function createPost({
  makeInputObj,
  setCache,
  makeFetch,
  logger,
}) {
  return Object.freeze({ post });

  async function post({ params, cacheConfig, JWTSecret, path, errorMsgs }) {
    try {
      if (path.includes("registration")) {
        const destinationPath = "http://127.0.0.1:3001/api/v1/user";

        const results = await makeFetch({
          params,
          path: destinationPath,
          method: "post",
        });

        return results.json();
      }

      if (path.includes("auth")) {
        const authPath = "http://127.0.0.1:3001/api/v1/user/auth";
        const authResults = await makeFetch({
          params,
          path: authPath,
          method: "post",
        });

        const results = await authResults.json();

        console.log("[GATEWAY][USE-CASE][POST]:" + results.data[0]);
        const token = results.data[0].email;

        const tokenPath = "http://127.0.0.1:3002/api/v1/token";
        const tokenResult = await makeFetch({
          params: { token },
          path: tokenPath,
          method: "post",
        });

        const tokenRes = await tokenResult.json();

        setCache({
          data: results.data[0],
          cacheKey: tokenRes.data,
          cacheConfig,
        });
        return {
          error: 0,
          data: {
            ...results.data[0],
            token: tokenRes.data,
          },
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
