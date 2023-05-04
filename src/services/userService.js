import db from '../models/index';
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);

/**
 * @description login
 * @param {*} email
 * @param {*} password
 * @returns Promise
 */
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      // ? khởi tạo giá trị user mặc định
      let userData = {
        user: '',
        errCode: '',
        errMessage: '',
      };
      let isExist = await checkUserEmail(email); //? check xem email đã tồn tại chưa
      if (isExist) {
        let user = await db.User.findOne({
          attributes: ['email', 'roleId', 'password'], //? only show columns you choose
          where: { email: email },
          raw: true, //? `true` means that translate to Object in your database
        });
        if (user) {
          //? nếu người dùng đã tồn tại
          let checkPassword = await bcrypt.compareSync(password, user.password);
          // ? check xem password và mã hóa password có giống nhau không
          if (checkPassword) {
            //? nếu check đúng thì đăng nhập thành công
            userData.errCode = 0;
            userData.errMessage = `Your password is OKAY`;
            delete user.password;
            // ! xóa thuộc tính password để tránh bị lộ
            userData.user = user;
          } else {
            // ? mật khẩu sai
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

let getAllUsers = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = '';
      if (type === 'All' || type === 'all') {
        user = db.User.findAll({
          attributes: {
            exclude: ['password'], //? don't show columns you choose
          },
        });
      }
      if (type && type !== 'All' && type !== 'all') {
        user = db.User.findOne({
          where: { id: type },
          attributes: {
            exclude: ['password'], //? don't show columns you choose
          },
        });
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkEmail = await checkUserEmail(data.email);
      if (checkEmail === true) {
        // ! phải trả về return nếu không nó sẽ bị trùng email nhưng vẫn tạo
        return resolve({
          errCode: 1,
          message: 'Email already',
        });
      }
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
      resolve({
        errCode: 0,
        message: 'OKAY',
      });
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
module.exports = {
  handleUserLogin,
  getAllUsers,
  createNewUser,
};
