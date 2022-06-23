const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

/* Global Variables */
const app = express();
const PORT = process.env.PORT || 9000;
global.__basedir = __dirname;

/* MongoDB Database Connection */
const DB = process.env.DB;
const DB_URI = process.env.MONGODB_URI;
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(`Successfully connected to MongoDB => Database => ${DB}`);
  })
  .catch((err) => {
    console.error(err.message);
  });

/* Middleware */
app.use(cors());
app.use(express.json());

/* PayPal */
app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

/* Static Files */
app.use(express.static("public"));

/* Routes */
app.use("/products", require("./routes/products.route.js"));
app.use("/users", require("./routes/users.route.js"));
app.use("/carts", require("./routes/carts.route.js"));
app.use("/orders", require("./routes/orders.route.js"));
app.use("/profile", require("./routes/profile.route.js"));
app.use("/gallery", require("./routes/gallery.route.js"));

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
