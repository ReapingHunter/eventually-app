import {
  getCategories
} from '../controllers/category.controller.js'
import express from 'express'
const router = express.Router()

router.get("/all-categories", getCategories)

export default router