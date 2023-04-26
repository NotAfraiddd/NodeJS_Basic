const { Sequelize } = require('sequelize');
// create the connection to database
const sequelize = new Sequelize('nodebasic', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
  //! không thể bỏ port: 3307 vào file config.json vì nó sẽ báo lỗi không trùng port,
  //! hãy đưa ra ngoài đây và kết quả sẽ chạy được
  port: 3307,
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default connectDB;
