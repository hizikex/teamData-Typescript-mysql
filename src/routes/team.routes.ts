import { Router, Request, Response } from "express";
import mysql from 'mysql';
let cacheService = require('express-api-cache');
let cache = cacheService.cache; 

const teamsRouter = Router();

teamsRouter.get('/', (request: Request, response: Response) => {
    return response.json("Okay")
});

teamsRouter.get('/team/:id', (req: Request, res: Response) => {

    let pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'team_system',
      connectionLimit: 10,
      multipleStatements: true
    });
  
    pool.getConnection((error: any, conn: any) => {
      if (error) {
        console.log('Error connecting to the database:', error);
        res.send({
          success: "false!",
          statusCode: 500,
          message: 'Getting error during connection'
        })
  
        return;
      } 
        console.log(`Connected to the database.`);

        pool.query(`SELECT * FROM teams WHERE id = ?`, [req.params.id], (err: any, rows: any) => {      
          if (err) {
            return res.send({
              success: false,
              statusCode: 400
            })
          } else {
            res.send({
              message: `SUCCESS, Team with ${req.params.id}`,
              data: rows
            })
          }
        })
    });
  });

  teamsRouter.get('/allteams', cache("10 minutes"), (req: Request, res: Response) => {

    let pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'team_system',
      connectionLimit: 10,
      multipleStatements: true
    });
  
    pool.getConnection((error: any, conn: any) => {
      if (error) {
        console.log('Error connecting to the database:', error);
        res.send({
          success: "false!",
          statusCode: 500,
          message: 'Getting error during connection'
        })
  
        return;
      } 
        console.log(`Connected to the database.`);
  
        pool.query(`SELECT * FROM teams`, (err: any, rows: any) => {
          if (err) {
            return res.send({
              success: false,
              statusCode: 400
            });
          } else {
            res.send({
              message: `All teams = ${rows.length}`,
              data: rows
            })
          }
        })
    });
  });

  teamsRouter.delete('/details/:id', (req: Request, res: Response) => {

    let pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'team_system',
      connectionLimit: 10,
      multipleStatements: true
    });
  
    pool.getConnection((error: any, conn: any) => {
      if (error) {
        console.log('Error connecting to the database:', error);
        res.send({
          success: "false!",
          statusCode: 500,
          message: 'Getting error during connection'
        })
  
        return;
      } 
        console.log(`Connected to the database.`);
  
        pool.query(`DELETE FROM teams WHERE id = ?`, [req.params.id], (err: any, rows: any) => {
          if (err) {
            return res.send({
              success: false,
              statusCode: 400
            });
          } else {
            res.send({
              message: `SUCCESSFULLY DELETED TEAM WITH ${req.params.id}`,
              data: rows
            })
          }
        })
    });
  });

  teamsRouter.post('/', (req:Request, res: Response) => {
    res.send({
      data: req.body
    })
  });
  
  teamsRouter.post('/register', (req:Request, res: Response) => {
    let pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'team_system',
      connectionLimit: 10,
      multipleStatements: true
    });
  
    pool.getConnection((error: any, conn: any) => {
      if (error) {
        console.log('Error connecting to the database:', error);
        res.send({
          success: "false!",
          statusCode: 500,
          message: 'Getting error during connection'
        })
  
        return;
      } 
        console.log(req.body);
  
        let sqlQuery = `CALL register_teams(?, ?, ?)`;
  
        conn.query(sqlQuery, [req.body.name, req.body.league, req.body.isActive], (err: any, rows: any) => {
          if (err) {
            conn.release();
            return res.send({
              success: false,
              statusCode: 500,
              message: `Getting error during the connection`
            });
          } else {
            res.send({
              success: true,
              statusCode: 200,
              data: req.body
            });
          }
        })
    });
  })

export default teamsRouter;