const express = require("express");
const { sql, poolPromise } = require("../db");
const router = express.Router();

// Получить всех пользователей
router.get("/", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Добавить пользователя
router.post("/", async (req, res) => {
  try {
    const { FullName, Email, PasswordHash, Role } = req.body;
    const pool = await poolPromise;
    await pool.request()
        .input("FullName", sql.NVarChar, FullName)
        .input("Email", sql.NVarChar, Email)
        .input("PasswordHash", sql.NVarChar, PasswordHash)
        .input("Role", sql.NVarChar, Role)
        .query("INSERT INTO Users (FullName, Email, PasswordHash, Role) VALUES (@FullName, @Email, @PasswordHash, @Role)");
    res.json({ message: "Пользователь добавлен" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
