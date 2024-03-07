const express = require('express');
const routes = require('./routes');
// import sequelize connection ... trickery it goes in the config folder
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({force: false}).then(() => {
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
})

//! Wrapping the app.listen port connection  in the sequelize force snippet:
//! sequelize.sync({force: false}).then(() => {
  //? app.listen(PORT, () => {
  //? console.log(`App listening on port ${PORT}!`);
  //? });
//! })
//! says, "Hey, look into the models, create the database based on that and the start the server!"
