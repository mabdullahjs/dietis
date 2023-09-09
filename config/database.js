require("dotenv").config();
const mongoose = require('mongoose');

const databaseConnected = () =>{
    mongoose.connect(process.env.DATABASE_URL)
    .then((con)=>{
        console.log(`Database is connected Successfully on : ${con.connection.host}`)
    })
    .catch((error)=> {
        console.log(error)
    })
}

module.exports = databaseConnected;