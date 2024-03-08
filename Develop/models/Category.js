const { Model, DataTypes } = require('sequelize'); //! this line is saying that we are importing the Model and DataTypes from the sequelize library

const sequelize = require('../config/connection.js'); //! is importing the connection to the database from the connection.js file

class Category extends Model {} //! this line is creating the Category model by extending the Sequelize Model class

Category.init( //! this line is initializing the model's data and configuration, passing two objects as arguments
  {
    // define columns
    id: { //* id column
      type: DataTypes.INTEGER, //! data type is INTEGER
      allowNull: false, //! it cannot be null
      primaryKey: true, //! this is teh primary key
      autoIncrement: true //! the id will auto increment
    },
    category_name: { //* category_name column
      type: DataTypes.STRING, //! data type is STRING
      allowNull: false //! Cant be null
    }
  },
  {
    sequelize, 
    timestamps: false, //! this line is saying that we don't want timestamps
    freezeTableName: true, //! this line is saying that the table name won't be pluralized
    underscored: true, //! this line is saying that the column names will be snake_case
    modelName: 'category', //! this line is saying that the model name will be the lowercase version of the modelb name
  }
);

module.exports = Category;
