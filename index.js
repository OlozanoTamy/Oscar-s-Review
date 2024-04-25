import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import pg from "pg";
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "books",
    password: "UNCeax35",
    port: 5433,
})

db.connect();

app.get("/", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM libros")
        const libro = response.rows;
        console.log(libro);
        res.render("index", { listOfBooks: libro })
    } catch (error) {
        console.error("Failed to make request:", error.message);
    };
})

app.get("/nuevo", async (req, res) => {
    res.render("nuevo.ejs")
})


app.post("/send", async (req, res) => {

    try {
        const title = req.body.title;
        const autor = req.body.autor;
        const isbn = req.body.isbn;
        const recomend = req.body.recomend;
        const fecha = req.body.date;
        const resume = req.body.resume
        const response = db.query("INSERT INTO libros (isbn,title,author,recomend,resume,fecha) VALUES ($1,$2,$3,$4,$5,$6)", [isbn, title, autor, recomend, resume, fecha])
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }



})

app.get("/edit", async (req, res) => {
    res.render("edit.ejs");
})




app.listen(port, () => {
    console.log(`Port working in ${port}`);
})