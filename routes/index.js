const express = require('express');
const router = express.Router();

/* Require the data containing the recipes */
const { recipes } = require('../data/data.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  // 1. Pass all recipe data to 'index' template
  res.locals.recipes = recipes;
  res.render('index');
});

/* GET recipe page. */
router.get('/recipes/:id', function(req, res, next) {
  // The request object's params property contains the recipe ID. The request gets this ID from the URL parameter
  const recipeId = req.params.id;
  // For each recipe ID, find the one with the matching ID
  //!NOTE: Is the + to turn it into a string?
  const recipe = recipes.find( ({ id }) => id === +recipeId );
  
  if (recipe) {
    // 2. Pass the recipe data to the 'recipe' template
    res.locals.recipe = recipe;
    res.render('recipe');
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
