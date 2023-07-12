// configuration for db connection
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Hungry2023",
  DB: "hungryheoric",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};