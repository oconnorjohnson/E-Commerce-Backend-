const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Find all tags and associated Product Data
router.get('/', (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: 
      [
        {
        model: Product
        }
      ]
    });
    if(!tagData) {
      res.status(404).json({message: "No tags found in database..."});
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error)
  }
});

// Find a single tag by its 'id'
router.get('/:id', (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: 
      [
        {
          model: Product 
        }
      ]
    });
    if(!tagData) {
      res.status(404).json({message: "No tags found with that ID..."})
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error)
  }
});

// Create a new tag
router.post('/', (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {
    res.status(500).json(error)
  }
});

// Update tag's name by its 'id' value 
router.put('/:id', (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body,
      {
        where: {
          id: req.params.id
        }
      });
      if(!updatedTag[0]) {
        res.status(404).json({message: "No tags found with that ID..."});
      }
      res.status(200).json(updatedTag);
    } catch (error) {
      res.status(500).json(error)
    }
});

// Delete tag by its 'id' value 
router.delete('/:id', (req, res) => {
  try {
    const deletedTag = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if(!deletedTag) {
      res.status(404).json({message: "No tags found with that ID..."})
    }
    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
