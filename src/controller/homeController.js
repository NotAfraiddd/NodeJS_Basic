import db from '../models/index';
import CRUDService from '../services/serviceCRUD.JS';
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

let editGetCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    let data = await CRUDService.getUserById(id);
    return res.render('Edit.ejs', {
      data: data,
    });
  } else {
    return res.send('User not found');
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  await CRUDService.updateUserData(data);
  return res.send('xong');
};

module.exports = {
  getHomePage,
  getCreate,
  postCRUD,
  displayGetCRUD,
  editGetCRUD,
  putCRUD,
};
