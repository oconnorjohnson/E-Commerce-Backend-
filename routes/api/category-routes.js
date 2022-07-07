const router = require('express').Router();
const { Category, Product } = require('../../models');
const { restore } = require('../../models/Category');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{
        model: Product,
      }]
    });
    if(!categoryData) {
      res.status(404).json({message: "Categories cannot be found!"});
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
      }]
    });
    if(!categoryData) {
      res.status(404).json({message: "No category with said ID found..."});
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', (req, res) => {
  try {
    const updatedCategory = await Category.update({
      id: req.params.id,
      category_name: req.body.category_name
    }, {
      where: {
        id: req.params.id
      }
    });
    if(!updatedCategory[0]) {
      res.status(404).json({message:"No category with said ID found..."});
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', (req, res) => {
  try {
    const deletedCategory = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if(!deletedCategory) {
      res.status(404).json({message: "No category with said ID found..."});
    }
    res.status(200).json(deletedCategeory);
  } catch {
    restore.status(500).json(error);
  }
});

module.exports = router;
