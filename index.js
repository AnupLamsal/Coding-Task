const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const ProductRoute = require("./routes/productRoute");

// Config JSON Format
app.use(express.json());

// MongoDB Database
const connectDB = require("./config/db");
connectDB();

// Setting up server
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Configuring Routes
app.use("/api/product", ProductRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}...`));
