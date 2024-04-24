import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index")
})



app.listen(port, () => {
    console.log(`Port working in ${port}`);
})