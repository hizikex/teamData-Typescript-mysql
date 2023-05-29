import { Router, Request, Response } from "express";
import teamsRouter from "./team.routes";

const routes = Router();

routes.use('/teams', teamsRouter);

export default routes; 