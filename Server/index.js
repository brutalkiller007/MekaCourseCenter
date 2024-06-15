const express = require("express");
const app = express();
const file_upload = require("express-fileupload");
const cookie_parser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookie_parser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)
app.use(file_upload({
    useTempFiles: true,
    tempFileDir: "/tmp"
}));

const user_routes = require("./routes/user");
const profile_routes = require("./routes/profile");
const course_routes = require("./routes/course");
const payment_routes = require("./routes/payment");
const contact_us_routes = require("./routes/contact_us");

app.use("/api/v1/auth", user_routes);
app.use("/api/v1/profile", profile_routes);
app.use("/api/v1/course", course_routes);
app.use("/api/v1/payment", payment_routes);
app.use("/api/v1", contact_us_routes);

app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});

const db_connect = require("./config/database");
db_connect();

const cloudinary_connect = require("./config/cloudinary");
cloudinary_connect();

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Your Server is up and running...... "
    });
});
