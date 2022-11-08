const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const connectDB = require("./config/dbconnection");

//Route imports
const managerRoutes = require('./routes/manager-routes');
// const adminRoutes = require('./routes/admin-routes');
// const attendeeRoutes = require('./routes/attendee-routes');
// const wspresenterRoutes = require('./routes/ws-presenter-routes');
// const editorRoutes = require('./routes/editor-routes');
// const reviewerRoutes = require('./routes/reviewer-routes');
// const workshopRoutes = require('./routes/workshop-routes');

const app = express();
const PORT = process.env.PORT || 5001;

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

/**
 * Routes
 */
app.use('/api/manager', managerRoutes);
// app.use('/api/worker', researcherRoutes);
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

//DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}....`);
  });
});
