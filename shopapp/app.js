const express = require("express");
const app = express();

const mongoose = require("mongoose");

const products = require("./routes/products");
const categories = require("./routes/categories");
const home = require("./routes/home");

app.use(express.json());

app.use("/api/products" ,products);
app.use("/api/categories" ,categories);
app.use("/", home);

const username = "";
const password = "";
const database = "";

(async () => {
    try {
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.kfjfak2.mongodb.net/${database}?retryWrites=true&w=majority`);
        console.log("mongodb bağlantısı kuruldu.");
    }
    catch(err) {
        console.log(err);
    }
})();


app.listen(3000, () => {
    console.log("listening on port 3000");
});