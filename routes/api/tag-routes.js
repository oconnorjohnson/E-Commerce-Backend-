const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Find all tags and associated Product Data
router.get('/', (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{
        model: Product
      }]
    });
    if(!tagData) {
      res.status(404).json({message: "No tags found in database..."});
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
