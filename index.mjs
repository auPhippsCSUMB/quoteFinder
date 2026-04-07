import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
//for Express to get values using the POST method
app.use(express.urlencoded({ extended: true }));
//setting up database connection pool, replace values in red
const pool = mysql.createPool({
    host: "z8dl7f9kwf2g82re.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PWD,
    database: "b1pz8uuphb690ey0",
    connectionLimit: 10,
    waitForConnections: true
});
//routes
app.get('/', async(req, res) => {
    let sql = `
    SELECT authorId, firstName, lastName
    FROM authors
    ORDER BY lastName
    `;

    let sql2 = `
    SELECT authorId, firstName, lastName
    FROM authors
    ORDER BY lastName
    `;

    const [authors] = await pool.query(sql);
    const [categories] = await pool.query(sql2);

    res.render("home.ejs", {authors, categories});
});

app.get("/searchByKeyword", async (req, res) => {
    try {
        let keyword = req.query.keyword;
        let sql = `SELECT quote, firstName, lastName
                    FROM quotes q
                    NATURAL JOIN authors
                    WHERE quote LIKE ? `;
        let sqlParams = [`%${keyword}%`];

        const [rows] = await pool.query(sql, sqlParams);
        res.render("quotes.ejs", { rows });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.get("/searchByAuthor", async (req, res) => {
    try {
        let authorId = req.query.authorId;
        let sql = `SELECT quote, firstName, lastName
                    FROM quotes q
                    NATURAL JOIN authors
                    WHERE authorId LIKE ? `;
        let sqlParams = [`%${authorId}%`];

        const [rows] = await pool.query(sql, sqlParams);
        res.render("quotes.ejs", { rows });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest

app.get("/dbTest", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT CURDATE()");
        res.send(rows);
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send("Database error!");
    }
});//dbTest
app.listen(3000, () => {
    console.log("Express server running")
})