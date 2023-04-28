import express from 'express';
import {
  getHomePage,
  getCreate,
  postCRUD,
  displayGetCRUD,
  editGetCRUD,
  putCRUD,
  deleteCRUD,
} from '../controller/homeController';
import userController from '../controller/userController';
let router = express.Router();

const initWebRoute = (app) => {
  // ! khi muốn lấy thông tin về dùng GET
  router.get('/', getHomePage);
  router.get('/create', getCreate);
  router.post('/get-crud', postCRUD);
  router.get('/get-crud', displayGetCRUD);
  router.get('/edit-crud', editGetCRUD);
  router.post('/get-crud', putCRUD);
  router.get('/delete-crud', deleteCRUD);
  // ? API for nodejs
  router.post('/api/login', userController.handleLogin);
  router.get('/api/get-all-user', userController.handleGetAllUser);

  return app.use('/', router);
};

export default initWebRoute;
