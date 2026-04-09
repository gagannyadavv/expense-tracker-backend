import express, { Router } from 'express'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { addCategoryController } from '../controllers/category.controller.js'
import { getAllCategory } from '../controllers/category.controller.js'
import { deleteCategory } from '../controllers/category.controller.js'

const categoryRoute = Router()

categoryRoute.post('/add',authMiddleware,addCategoryController)
categoryRoute.get('/getall',authMiddleware ,getAllCategory)
categoryRoute.delete('/delete/:id',authMiddleware,deleteCategory)

export {categoryRoute}