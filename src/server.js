import express from "express";
import configViewEngine from './config/viewEngine';


const app = express();
const port = 8080;

configViewEngine(app);

app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/about', (req, res) => {
    res.send('Hello, world abc');
})

app.listen(port, () => {
    console.log('100%');
});