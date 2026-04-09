import express, { Router } from 'express'
import {authMiddleware} from '../middleware/auth.middleware.js'
import {createExpense} from '../controllers/expense.controllers.js'
import { deleteExpense } from '../controllers/expense.controllers.js'
import { getAllExpenses } from '../controllers/expense.controllers.js'


const expenseRouter = Router()

expenseRouter.post('/add',authMiddleware,createExpense)
expenseRouter.post('/delete/:Id',authMiddleware,deleteExpense)
expenseRouter.get('/getall',authMiddleware,getAllExpenses)


export {expenseRouter}