import {User} from './users.model';

export function index(req, res) {
  User.find()
    .exec()
    .then(function(users) {
      res.json(users);
    })
    .catch(function(err) {
      res.status(500);
      console.error(err);
      res.send(err.toString());
    });
}

export function show(req, res) {
  User.findById(req.params.id)
    .exec()
    .then(function(existingUser) {
      if(existingUser) {
        res.status(200);
        res.json(existingUser);
      } else {
        return Promise.reject(new Error('User not found'));
      }
    })
    .catch(function(err) {
      if(err.message.toLowerCase().includes('not found')) {
        res.status(404);
        res.json({message: err.message});
      } else {
        res.status(400);
        console.error(err);
        res.send(err.toString());
      }
    });
}

export function create(req, res) {
  let user = req.body;
  User.create(user)
    .then(function(createdUser) {
      res.status(201);
      res.json(createdUser);
    })
    .catch(function(err) {
      res.status(400);
      console.error(err);
      res.send(err.toString());
    });
}

export function update(req, res) {
  User.findById(req.params.id)
    .exec()
    .then(function(existingUser) {
      if(existingUser) {
        // Don't let users update their username
        existingUser.name.firstName = req.body.name.firstName;
        existingUser.name.lastName = req.body.name.lastName;
        existingUser.email = req.body.email;
        return existingUser.increment().save();
      } else {
        return Promise.reject(new Error('User not found'));
      }
    })
    .then(function(updateStatus) {
      // update method does not return updated object, query for it here to return from API
      return User.findById(req.params.id);
    })
    .then(function(savedUser) {
      res.status(200);
      res.json(savedUser);
    })
    .catch(function(err) {
      console.log(err);
      if(err.message.toLowerCase().includes('not found')) {
        res.status(404);
        res.json({message: err.message});
      } else {
        res.status(400);
        console.error(err);
        res.send(err.toString());
      }
    });
}

export function destroy(req, res) {
  User.findById(req.params.id)
    .exec()
    .then(function(existingUser) {
      if(existingUser) {
        return existingUser.remove();
      } else {
        return Promise.reject(new Error('User not found'));
      }
    })
    .then(function() {
      res.status(204).send();
    })
    .catch(function(err) {
      if(err.message.toLowerCase().includes('not found')) {
        res.status(404);
        res.json({message: err.message});
      } else {
        res.status(400);
        console.error(err);
        res.send(err.toString());
      }
    });
}

