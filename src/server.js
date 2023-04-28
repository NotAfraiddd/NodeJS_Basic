import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoute from './router/web';
import connectDB from './config/connectDB';
import bodyParser from 'body-parser';
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Cấu hình cho phép CORS
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
