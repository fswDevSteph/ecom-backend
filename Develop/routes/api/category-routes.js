const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => { //! tested
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: Product
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
});

router.get('/:id', (req, res) => { //! tested
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: Product
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const category = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json("deleted!")
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
