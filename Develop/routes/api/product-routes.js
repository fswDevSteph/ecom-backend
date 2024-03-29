const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

//? get all products with category and tag data
// router.get('/', async (req, res) => { 
//   // find all products
//    try { //! find all products
//     const products = await Product.findAll({ //! include associated category and tag data
//       include: [{ model: Category }, { model: Tag /*through: ProductTag */ }],
//     });
//     res.json(products); //! return products in json format
//   } catch (err) {
//     console.error(err);
//     res.status(404).json({ error: 'Failed to retrieve products' }); //! 404 issue with routing
//   }
//   // be sure to include its associated Category and Tag data
// });

router.get('/', (req, res) => {
  //! find all products
  Product.findAll({ //! include associated category and tag data
    include: [{ model: Category }, { model: Tag /*through: ProductTag */ }],
  }).then(products => {
    res.json(products); //! return products in json format
  }).catch(err => {
    console.error(err);
    res.status(404).json({ error: 'Failed to retrieve products' }); //! 404 issue with routing
  })
});

//? get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try { //! find by primary key
    const product = await Product.findByPk(req.params.id, { //! include associated category and tag data
      include: [{ model: Category }, { model: Tag }], //! include associated category and tag data
    });
    if (!product) { //! if no product found
      res.status(404).json({ message: 'Product not found' }); //! return message
      return;
    }
    res.json(product); //! return product
  } catch (err) { //! catch error
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve product' });
  }
});

//? create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    // Create a new product using the data from the request body
    const newProduct = await Product.create(req.body);

    // Check if there are associated tags
    if (req.body.tagIds && req.body.tagIds.length) {
      // Create an array of ProductTag entries to associate tags with the new product
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: newProduct.id,
        tag_id,
      }));

      // Bulk create ProductTag entries to associate tags with the new product
      await ProductTag.bulkCreate(productTagIdArr);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {

        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // figure out which ones to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);
          // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
