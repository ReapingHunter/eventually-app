import Category from '../models/category.model.js'

export const getCategories = async(req, res) => {
  try {
    const categories = await Category.getAllCategory()
    res.status(200).send(categories)
  } catch (error) {
    res.status(500).send({ message: "Error fetching categories", error: error })
  }
}