//! Like a chapter book, the index.js file within the api folder, specifies if you want to read "chapter 1, go here, if you want chapter, for here...."


const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

module.exports = router;
