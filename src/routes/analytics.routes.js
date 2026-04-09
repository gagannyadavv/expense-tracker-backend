import express, { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { totalExpenses } from "../controllers/analytics.controller.js";
import {totalCategoryWiseExpense} from '../controllers/analytics.controller.js'
import { weeklyAnalysis } from "../controllers/analytics.controller.js";
import { monthlyAnalysis } from "../controllers/analytics.controller.js";
const analyticsRouter = Router()

analyticsRouter.get('/total',authMiddleware,totalExpenses)

analyticsRouter.get('/categorytotal',authMiddleware,totalCategoryWiseExpense)

analyticsRouter.get('/weekly',authMiddleware,weeklyAnalysis)

analyticsRouter.get('/monthly',authMiddleware,monthlyAnalysis)

export {analyticsRouter}