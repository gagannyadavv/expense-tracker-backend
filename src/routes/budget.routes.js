import express, { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addBudget } from "../controllers/budget.controller.js";

const budgetRouter = Router()

budgetRouter.post('/addbudget',authMiddleware,addBudget)



export {budgetRouter}