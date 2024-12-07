const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// const paymentRoute = require("./src/routes/paymentRoute");
const paymentRoute = require("./src/routes/paymentRoute");
// const mailRoute = require("./src/routes/mailRoute");

// Import the Nodemailer library

const connectDB = require("./src/database/db");
connectDB();

//Middleware
app.use(cors());
app.use(express.json());

app.use("/api/v1", paymentRoute);
// app.use("/api/v1", mailRoute);

app.listen(PORT, console.log(`server is running on Port ${PORT}`));
