import {
  getCategories,
  getCategoryName
} from '../controllers/category.controller.js'
import express from 'express'
const router = express.Router()

router.get("/all-categories", getCategories)
router.get("/category-name", getCategoryName)

export default router