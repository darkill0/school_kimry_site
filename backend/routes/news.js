const express = require("express");
const { sql, poolPromise } = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM News");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const pool = await poolPromise;
        const id = req.params.id;
        const result = await pool.request()
            .input('id', sql.Int, id) // Передаем ID как параметр
            .query("SELECT * FROM News WHERE NewsID = @id");

        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Новость не найдена' });
        }

        res.json(result);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
