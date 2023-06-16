const express = require('express');
const { Pool } = require('ps');
const dotenv = require('dotenv');
dotenv.config();
const app = express();


const sql = postgres(process.env.DATABASE_URL);
const PORT = process.env.PORT

const pool = new Pool({
    connectionString: dbString
})

app.use(express.static("public"));

app.get("/goodDrinks", async (req , res) => {
    try {
        const result = await Pool.query("SELECT * FROM goodDrinks")
        res.json(result.rows).status(200)
    } catch (err) {
        res.json(err.message).status(500)
    }
})

// TODO: Replace 3000 with process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`listening on Port ${3000}`);
});

app.listen (PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})