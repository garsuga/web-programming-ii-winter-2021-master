import mongoose from 'mongoose';
let Schema = mongoose.Schema;

/*
  This section declares the schemas for the different documents
  that will be used
 */

let name = Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true}
});

let userSchema = Schema({
  username: {type: String, required: true, index: true, unique: true},
  email: {type: String, required: true, index: true, unique: true},
  name: name
});

/*
  This section creates interactive models from the defined schemas
  above so that you can perform Create Read Update and Delete (CRUD)
  operations against the schemas.
  NOTE since the nameSchema is embedded within userSchema, it does NOT have
  to be created as a model!
 */
let User = mongoose.model('User', userSchema);

// Export the created model, User
export {User};
