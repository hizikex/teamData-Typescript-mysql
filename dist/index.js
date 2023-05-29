"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const PORT = 5300;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(routes_1.default);
// app.get('/details/:id', (req: Request, res: Response) => {
//   let pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'team_system',
//     connectionLimit: 10,
//     multipleStatements: true
//   });
//   pool.getConnection((error: any, conn: any) => {
//     if (error) {
//       console.log('Error connecting to the database:', error);
//       res.send({
//         success: "false!",
//         statusCode: 500,
//         message: 'Getting error during connection'
//       })
//       return;
//     } 
//       console.log(`Connected to the database.`);
//       pool.query(`SELECT * FROM teams WHERE id = ?`, [req.params.id], (err: any, rows: any) => {
//         if (err) {
//           return res.send({
//             success: false,
//             statusCode: 400
//           });
//         } else {
//           res.send({
//             message: `SUCCESS, Team with ${req.params.id}`,
//             data: rows
//           })
//         }
//       })
//   });
// });
// app.post('/', (req:Request, res: Response) => {
//   res.send({
//     data: req.body
//   })
// });
// app.post('/register', (req:Request, res: Response) => {
//   let pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'team_system',
//     connectionLimit: 10,
//     multipleStatements: true
//   });
//   pool.getConnection((error: any, conn: any) => {
//     if (error) {
//       console.log('Error connecting to the database:', error);
//       res.send({
//         success: "false!",
//         statusCode: 500,
//         message: 'Getting error during connection'
//       })
//       return;
//     } 
//       console.log(req.body);
//       let sqlQuery = `CALL register_teams(?, ?, ?)`;
//       conn.query(sqlQuery, [req.body.name, req.body.league, req.body.isActive], (err: any, rows: any) => {
//         if (err) {
//           conn.release();
//           return res.send({
//             success: false,
//             statusCode: 500,
//             message: `Getting error during the connection`
//           });
//         } else {
//           res.send({
//             success: true,
//             statusCode: 200,
//             data: req.body
//           });
//         }
//       })
//   });
// })
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
