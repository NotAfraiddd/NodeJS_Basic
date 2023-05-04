import userService from '../services/userService';
/**
 * @description login
 * @param {*} req
 * @param {*} res
 * @returns
 */
let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: 'Missing inputs',
    });
  }
  let user = await userService.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: user.errCode,
    message: user.errMessage,
    userData: user.user ? user.user : {},
  });
};
/**
 *
 * @param {*} req
 * @param {*} res
 * @returns get all users
 */
let handleGetAllUser = async (req, res) => {
  //! let type = req.body.id
  //? thì sẽ truy cập thẳng vào body dùng postman là bên body
  //! let type = req.query.id
  //? thì dùng params
  let type = req.query.id; //? type means 'All, id'
  if (!type) {
    return res.status(200).json({
      errCode: 1,
      message: 'Missing required ID',
      userData: '',
    });
  } else {
    let users = await userService.getAllUsers(type);
    return res.status(200).json({
      errCode: 0,
      message: 'OK',
      userData: users,
    });
  }
};

let handleCreateNewUser = async (req, res) => {
  let data = await userService.createNewUser(req.body);
  return res.status(200).json(data);
};

module.exports = {
  handleLogin,
  handleGetAllUser,
  handleCreateNewUser,
};
