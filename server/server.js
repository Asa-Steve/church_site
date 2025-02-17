const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
// Import the Nodemailer library

// const paymentRoute = require("./src/routes/paymentRoute");
const paymentRoute = require("./src/routes/paymentRoute");
const postRoute = require("./src/routes/postRoute");
const userRoute = require("./src/routes/userRoute");
const requestRoute = require("./src/routes/requestRoute");
const infantRoute = require("./src/routes/infantRoute");
const recordRoute = require("./src/routes/recordRoute");
const mailRoute = require("./src/routes/mailRoute");

const handleError = require("./src/middleware/handleError");

const connectDB = require("./src/database/db");
connectDB();

const allowedOrigins = [
  "http://localhost:5173", // Local development (Vite)
  "http://127.0.0.1:5173", // Alternative local address
  "https://mount-zion.onrender.com", // Hosted React frontend (will update with actual domain later)
];
//Middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET, POST, PUT, DELETE",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/v1", paymentRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/requests", requestRoute);
app.use("/api/v1/infants", infantRoute);
app.use("/api/v1/records", recordRoute);
app.use("/api/v1/mail", mailRoute);

// Error-handling middleware
app.use(handleError);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
