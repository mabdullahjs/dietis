require("dotenv").config();
const app = require('./app');
const databaseConnected = require('./config/database');




databaseConnected();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is connected on port : ${process.env.PORT}`)
});

module.exports = {server}