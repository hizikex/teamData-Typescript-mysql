"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("mysql"));
const usersRouter = (0, express_1.Router)();
usersRouter.get('/', (request, response) => {
    return response.json("Okay");
});
usersRouter.get('/details/:id', (req, res) => {
    let pool = mysql_1.default.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'team_system',
        connectionLimit: 10,
        multipleStatements: true
    });
    pool.getConnection((error, conn) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.send({
                success: "false!",
                statusCode: 500,
                message: 'Getting error during connection'
            });
            return;
        }
        console.log(`Connected to the database.`);
        pool.query(`SELECT * FROM teams WHERE id = ?`, [req.params.id], (err, rows) => {
            if (err) {
                return res.send({
                    success: false,
                    statusCode: 400
                });
            }
            else {
                res.send({
                    message: `SUCCESS, Team with ${req.params.id}`,
                    data: rows
                });
            }
        });
    });
});
usersRouter.post('/', (req, res) => {
    res.send({
        data: req.body
    });
});
usersRouter.post('/register', (req, res) => {
    let pool = mysql_1.default.createPool({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'team_system',
        connectionLimit: 10,
        multipleStatements: true
    });
    pool.getConnection((error, conn) => {
        if (error) {
            console.log('Error connecting to the database:', error);
            res.send({
                success: "false!",
                statusCode: 500,
                message: 'Getting error during connection'
            });
            return;
        }
        console.log(req.body);
        let sqlQuery = `CALL register_teams(?, ?, ?)`;
        conn.query(sqlQuery, [req.body.name, req.body.league, req.body.isActive], (err, rows) => {
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 500,
                    message: `Getting error during the connection`
                });
            }
            else {
                res.send({
                    success: true,
                    statusCode: 200,
                    data: req.body
                });
            }
        });
    });
});
exports.default = usersRouter;
