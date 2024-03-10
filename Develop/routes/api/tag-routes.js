const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Tag.findAll({
    include: Product
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
});

router.get('/:id', (req, res) => {
  // find one tag by its `id` value
  // be sure to include its associated Products
  Tag.findByPk(req.params.id, {
    include: Product
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
});

router.put('/:id', (req, res) => {
  // update a tag by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
});

router.delete('/:id', (req, res) => {
  // delete a tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
});

module.exports = router;
