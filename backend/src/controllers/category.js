const { errorHandler } = require("../utils/helpers/dbErrorHandler");
const Category = require("../models/category");

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().exec();
    const count = await Category.countDocuments().exec();

    res.json({
      meta: {
        totalCount: count,
      },
      categories,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.createOrUpdateCategory = async (req, res) => {
  const { categoryId } = req.params; // For update, we get categoryId from params
  try {
    let category;

    if (categoryId) {
      // If categoryId exists, update the existing category
      category = await Category.findByIdAndUpdate(categoryId, req.body, {
        new: true,
        runValidators: true,
      }).exec();
    } else {
      // If no categoryId, create a new category
      category = await new Category(req.body).save();
    }

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    res.json({ category });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.deleteCategory = async (req, res) => {
  const { _id } = req.category; // Assuming req.product is set by a middleware or similar
  try {
    // Assuming product._id contains the ID of the product to delete
    const result = await Category.deleteOne({ _id });

    if (result.deletedCount === 0) {
      // No document was deleted
      return res.status(404).json({
        error: "Category not found",
      });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    // Log the error for debugging purposes
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
