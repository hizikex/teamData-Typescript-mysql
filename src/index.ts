import dotenv from "dotenv";
dotenv.config();
import * as mysql from 'mysql';
import express from 'express';
import {Application, Request, Response } from 'express';
import routes from "./routes";
const PORT = 5300;
const app: Application = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(routes);

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
