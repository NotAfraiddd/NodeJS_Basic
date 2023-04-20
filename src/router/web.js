import express from 'express';
import { getHomePage } from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
  router.get('/', getHomePage);

  router.get('/about', (req, res) => {
    res.send('Hello, world abc');
  });

  return app.use('/', router);
};

export default initWebRoute;
