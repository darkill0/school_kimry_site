require("dotenv").config();
const sql = require("mssql");

// Конфигурация подключения с аутентификацией SQL Server
const dbConfig = {
    server: "localhost",
    database: "SchoolThesisDB",
    authentication: {
        type: "default",
        options: {
            userName: "sa", // Имя пользователя
            password: "123", // Пароль
        },
    },
    options: {
        encrypt: true, // Включаем шифрование
        trustServerCertificate: true, // Игнорируем проблемы с самоподписанным сертификатом
    },
};

// Функция подключения к базе данных
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log("Подключено к базе данных SQL Server с аутентификацией SQL Server");
        return pool;
    })
    .catch(err => {
        console.error("Ошибка подключения к базе данных", err);
        process.exit(1);
    });

module.exports = { sql, poolPromise };
