import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './router/web';

require('dotenv').config();

const app = express();
const port = process.env.PORT;

// *setup view engine
configViewEngine(app);
// *init web route
initWebRoute(app);

app.listen(port, () => {
  console.log('100%');
});
