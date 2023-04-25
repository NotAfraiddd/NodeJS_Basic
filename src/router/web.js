import express from 'express';
import { getHomePage, getCreate, postCRUD, displayGetCRUD, editGetCRUD, putCRUD } from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
  // ! khi muốn lấy thông tin về dùng GET
  router.get('/', getHomePage);
  router.get('/create', getCreate);
  router.post('/post-crud', postCRUD);
  router.get('/get-crud', displayGetCRUD);
  router.get('/edit-crud', editGetCRUD);
  router.post('/edit-crud', putCRUD);

  return app.use('/', router);
};

export default initWebRoute;
