import db from '../models/index';
import CRUDService from '../services/CRUD.JS';
let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render('HomePage.ejs', { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};

let getCreate = (req, res) => {
  return res.render('CRUD.ejs');
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.send('post CRUD from server');
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render('DisplayCRUD.ejs', {
    dataTable: data,
  });
};

module.exports = {
  getHomePage,
  getCreate,
  postCRUD,
  displayGetCRUD,
};
