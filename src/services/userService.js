import db from '../models/index';
import bcrypt from 'bcryptjs';
/**
 * @description login
 * @param {*} req
 * @param {*} res
 * @returns
 */
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {
        user: '',
        errCode: '',
        errMessage: '',
      };
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ['email', 'roleId', 'password'], //? only show columns you choose
          where: { email: email },
          raw: true, //? `true` means that translate to Object in your database
        });
        if (user) {
          let checkPassword = await bcrypt.compareSync(password, user.password);
          if (checkPassword) {
            userData.errCode = 0;
            userData.errMessage = `Your password is OKAY`;
            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `Your password is wrong`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `Your email does not exist`;
        }
      } else {
        console.log(userData);
        userData.errCode = 1;
        userData.errMessage = 'Your email does not exist';
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin,
};
