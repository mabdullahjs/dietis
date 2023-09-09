require("dotenv").config();
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const resident = require('./routes/resident');
const user = require('./routes/user');
const cors = require('cors')
const department = require('./routes/Department');
const team = require('./routes/team');
const chat = require('./routes/chat');
const teamLeader = require('./routes/teamLeader');
const departByTime = require('./routes/departByTime');
const protocol = require('./routes/protocol');
const qrcode = require("./routes/qrcode");
const path = require("path");




//directory name
const _dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));


//cors for production
app.use(cors())

// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true,
//     methods:["GET", "POST", "PUT", "DELETE"]
// }))

//show static page on / request
app.get(express.static(path.join(_dirname, "./web/build")));
app.use("/", express.static(path.join(_dirname, "./web/build")));
app.use('/static', express.static(path.join(_dirname, 'static')))


app.use('/api/v1/', resident);
app.use('/api/v1/', user);
app.use('/api/v1/', department);
app.use('/api/v1/', team);
app.use('/api/v1/', chat);
app.use('/api/v1/', teamLeader);
app.use('/api/v1/', departByTime);
app.use('/api/v1/', protocol);
app.use('/api/v1/', qrcode);

module.exports = app;