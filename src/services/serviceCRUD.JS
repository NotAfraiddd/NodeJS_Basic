var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const db = require('../models');
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
      let users = await db.User.findAll({ raw: true });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

let getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = await db.User.findOne({
        where: { id: data.id },
      });
      if (userData) {
        userData.firstName = data.firstName;
        userData.email = data.email;
        userData.lastName = data.lastName;
        userData.address = data.phoneNumber;
        userData.phoneNumber = data.phoneNumber;
        userData.gender = data.gender == 0 ? true : false;
        userData.image = data.image;
        userData.roleId = data.roleId;
        await userData.save();
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        console.log('Loi update');
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createNewUser,
  getAllUser,
  getUserById,
  updateUserData,
};
