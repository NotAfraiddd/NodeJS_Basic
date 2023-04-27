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

module.exports = {
  handleLogin,
};
