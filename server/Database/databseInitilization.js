const mongoose = require("mongoose");
const databaseURI = "mongodb://127.0.0.1:27017/BlogsNIta";
mongoose.connect(databaseURI).then(() => {
    console.log("Database connected");
});