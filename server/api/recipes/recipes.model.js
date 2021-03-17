import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/*
  This section declares the schemas for the different documents
  that will be used
 */

let ingredients = Schema({
  name: {type: String, required: true},
  amount: {type: String, required: true}
});

// This is the main recipes schema
let recipes = Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image: {type: String, required: true},
  prepTime: {type: Number, required: true},
  cookTime: {type: Number, required: true},
  directions: {type: [String], required: true},
  ingredients: {type: [ingredients], required: true},
  reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
}, { usePushEach: true });

/*
  This section creates interactive models from the defined schemas
  above so that you can perform Create Read Update and Delete (CRUD)
  operations against the schemas.
  NOTE since the ingredients is embedded within recipes, it does NOT have
  to be created as a model!
 */
let Recipe = mongoose.model('Recipe', recipes);

// Export the created model, Recipe
export {Recipe};
