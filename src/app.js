import cookieParser from 'cookie-parser'
import express from 'express'

import { authrouter } from './routes/auth.routes.js'
import { expenseRouter } from './routes/expense.routes.js'
import { categoryRoute } from './routes/category.routes.js'
import { analyticsRouter } from './routes/analytics.routes.js'
import { budgetRouter } from './routes/budget.routes.js'

const app = express()
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',authrouter)
app.use('/api/expense',expenseRouter)

app.use('/api/category',categoryRoute)

app.use('/api/analytics',analyticsRouter)

app.use('/api/budget',budgetRouter)

export {app}