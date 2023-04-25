import express from 'express';
import { getHomePage, getCreate, postCRUD, displayGetCRUD } from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
  // ! khi muốn lấy thông tin về dùng GET
  router.get('/', getHomePage);
  router.get('/create', getCreate);
  router.post('/post-crud', postCRUD);
  router.get('/get-crud', displayGetCRUD);

  return app.use('/', router);
};

export default initWebRoute;
