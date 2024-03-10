const router = require('express').Router(); //! this line is importing the express router
const apiRoutes = require('./api'); //! this line is importing the api routes from the api folder

router.use('/api', apiRoutes); //! this line is saying that the router will use the api routes

router.use((req, res) => { //! this line is saying that if the route is not found, it will send a 404 error
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router; //! this line is exporting the router for use in other files