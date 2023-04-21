import express from 'express';
import { getHomePage } from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
  // ! khi muốn lấy thông tin về dùng GET
  router.get('/', getHomePage);
  router.get('/about', getHomePage);

  return app.use('/', router);
};

export default initWebRoute;
