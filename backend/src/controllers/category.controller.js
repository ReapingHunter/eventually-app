import Category from '../models/category.model.js'

export const getCategories = async(req, res) => {
  try {
    const categories = await Category.getAllCategory()
    res.status(200).send(categories)
  } catch (error) {
    res.status(500).send({ message: "Error fetching categories", error: error })
  }
}

export const getCategoryName = async(req, res) => {
  try {
    const { category_id } = req.query;
    const category = await Category.getCategoryNameById(category_id);
    if (category) {
      res.status(200).send(category);  // Respond with category name
    } else {
      res.status(404).send({ message: "Category not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching categories", error: error })
  }
}