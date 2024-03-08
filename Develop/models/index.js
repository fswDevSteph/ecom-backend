// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, { //! this line is saying that the Product belongs to the Category
  foreignKey: "category_id", //! this line is saying that the foreign key is category_id
  onDelete: "CASCADE" //! this line is saying that if the category is deleted, the product will also be deleted
})
// Categories have many Products
Category.hasMany(Product, { //! this line is saying that the Category has many Products
  foreignKey: "category_id", //! this line is saying that the foreign key is category_id
  onDelete: "CASCADE"
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { //! this line is saying that the Product belongs to many Tags
  foreignKey: "product_id", //! this line is saying that the foreign key is product_id
  through: ProductTag  //! this line is saying that the through table is ProductTag. The Throughtable is a table that is created to hold the foreign keys of the two tables that are being connected
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: "tag_id",
  through: ProductTag
})

module.exports = {
  Product, //! this line is exporting the Product model
  Category, 
  Tag,
  ProductTag,
};
