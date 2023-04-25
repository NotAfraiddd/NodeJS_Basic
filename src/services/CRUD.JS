var bcrypt = require('bcryptjs');
const db = require('../models');
var salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordForm = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordForm,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.phoneNumber,
        phoneNumber: data.phoneNumber,
        gender: data.gender == 0 ? true : false,
        image: data.image,
        roleId: data.roleId,
      });
      resolve('OKAY');
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPassword = (pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(pass, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({ raw: true });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser,
  getAllUser,
};
