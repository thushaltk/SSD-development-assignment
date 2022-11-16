const express = require("express");
const cors = require("cors");
const https = require("https");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const connectDB = require("./config/dbconnection");
const fs = require("fs");
const path = require("path")

//Route imports
const managerRoutes = require('./routes/manager-routes');
const workerRoutes = require('./routes/worker-routes');
const cookieParser = require("cookie-parser");
const adminRoutes = require('./routes/admin-routes');

const app = express();
const PORT = process.env.PORT || 3443;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");
  res.setHeader("Content-Range", "bytes: 0-10/*");

  next();
});
app.use(cookieParser())

/**
 * Routes
 */

app.use('/api/admin', adminRoutes);
app.use('/api/manager', managerRoutes);
 app.use('/api/worker', workerRoutes);
// app.use('/api/manager', attendeeRoutes);


app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

//For ERROR HANDLING
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occured" });
});


const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

//DB connection
connectDB().then(() => {
  sslServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}....`);
  });
});
