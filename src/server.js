import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './router/web';
import connectDB from './config/connectDB';
import bodyParser from 'body-parser';

require('dotenv').config();

const app = express();
const port = process.env.PORT;
//* config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// *setup view engine
configViewEngine(app);
// *init web route
initWebRoute(app);

connectDB();

app.listen(port, () => {
  console.log('100%');
});
