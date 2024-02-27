const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((data) => {
    console.log("connection sucessfull");
  })
  .catch((err) => {
    console.log("error connecting " + err);
  });
