const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

const ProductRoute = require("./routes/productRoute");
const { notFound, errorHandler } = require("./utils/errorMiddleware");

// Config JSON Format
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Enabling cors
app.use(cors());

// MongoDB Database
const connectDB = require("./config/db");
connectDB();

// Setting up server
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Configuring Routes
app.use("/api/products", ProductRoute);

// Setting up own error handler
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}...`));
