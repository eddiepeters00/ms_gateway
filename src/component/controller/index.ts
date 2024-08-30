import { logger } from "../../libs/logger";
import { post, protectedRoutes, get } from "../use-case";
const baseUrl = "/api/v1/services";

const postEP = async (req, res) => {
  try {
    const path = req.path;
    const method = req.method;
    let results = await post({ params: req.body, path });
    res.json({ err: 0, data: results });
  } catch (err) {
    logger.error(`[EP][POST] ${req.method}: ${err.message}`);
    res.status(403);
    res.json({ err: 1, data: err.message });
  }
};

const getEP = async (req, res) => {
  try {
    let results = await get({ params: req.params });
    results.json({ err: 0, data: results });
  } catch (err) {
    logger.error(`[EP][GET] ${req.method}: ${err.message}`);
    res.status(403);
    res.json({ err: 1, data: err.message });
  }
};

const protectedEP = async (req, res) => {
  try {
    const path = req.path;
    const method = req.method;
    const token = req.headers.authorization;

    const results = await protectedRoutes({ token, data: req.body });

    res.json({ err: 0, data: results });
  } catch (err) {
    logger.error(`[EP][POST] ${req.method}: ${err.message}`);
    res.status(403);
    res.json({ err: 1, data: err.message });
  }
};

const routes = [
  { path: `${baseUrl}/registration`, method: "post", component: postEP },
  { path: `${baseUrl}/auth`, method: "post", component: postEP },
  { path: `${baseUrl}/protected`, method: "post", component: protectedEP },
  { path: `${baseUrl}/user`, method: "get", component: getEP },
];

export { routes };
