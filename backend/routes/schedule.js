const express = require("express");
const { sql, poolPromise } = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const { dayOfWeek } = req.query;

        let query = `
            SELECT
                c.ClassName,
                sc.StartTime,
                sc.EndTime,
                t.Subject AS Subject,
                u.FullName AS Teacher,
                r.RoomNumber AS Room,
                sc.DayOfWeek
            FROM Schedule sc
            JOIN Classes c ON sc.ClassID = c.ClassID
            JOIN Teachers t ON sc.TeacherID = t.TeacherID
            JOIN Rooms r ON sc.RoomID = r.RoomID
            JOIN Users u ON t.UserID = u.UserID
        `;

        if (dayOfWeek) {
            query += ` WHERE sc.DayOfWeek = @dayOfWeek`;
        }

        query += ` ORDER BY c.ClassName, sc.StartTime`;

        const pool = await poolPromise;
        const request = pool.request();

        if (dayOfWeek) {
            request.input('dayOfWeek', sql.NVarChar, dayOfWeek);
        }

        const result = await request.query(query);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;