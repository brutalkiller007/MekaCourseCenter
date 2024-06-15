const mongoose = require("mongoose");
require("dotenv").config();

const db_connect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("DB Connection Successfull"))
    .catch((error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    })
}

module.exports = db_connect;