import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/*
  This section declares the schemas for the different documents
  that will be used
 */

// This is the main recipes schema
let review = Schema({
  description: {type: String, required: true},
  rating: {type: Number, required: true},
  createDate: {type: Date, required: true, default: Date.now},
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

/*
  This section creates interactive models from the defined schemas
  above so that you can perform Create Read Update and Delete (CRUD)
  operations against the schemas.
  NOTE since the nameSchema is embedded within userSchema, it does NOT have
  to be created as a model!
 */
let Review = mongoose.model('Review', review);

// Export the created model, Recipes
export {Review};
