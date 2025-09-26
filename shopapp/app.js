const express = require("express");
const app = express();

const mongoose = require("mongoose");

const products = require("./routes/products");
const categories = require("./routes/categories");
const home = require("./routes/home");

app.use(express.json());

app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/", home);

const username = "mhamamaralmhm65_db_user";
const password = "MasF8vvuSpRDqiYT";
const database = "nodejsdeneme";

(async () => {
  try {
    // mongodb+srv://mhamamaralmhm65_db_user:MasF8vvuSpRDqiYT@cluster0.4veashr.mongodb.net/

    // mongodb+srv://mhamamaralmhm65:<db_password>@cluster0.nkj6cbr.mongodb.net/  MasF8vvuSpRDqiYT
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@cluster0.4veashr.mongodb.net/${database}?retryWrites=true&w=majority`
    );
    console.log("mongodb bağlantısı kuruldu.");
  } catch (err) {
    console.log(err);
  }
})();

app.listen(3000, () => {
  console.log("listening on port 3000");
});

 