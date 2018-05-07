const dogOwner = require("../models/dogOwner");
const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;

module.exports = {
  create: create,
  readById: readById,
  delete: _delete,
  readAll: readAll,
  update: update
};
function update(id, doc) {
  doc._id = new ObjectId(doc._id);
  return conn
    .db()
    .collection("dogOwners")
    .replaceOne({ _id: new ObjectId(id) }, doc)
    .then(result => Promise.resolve());
}

function readAll() {
  return conn
    .db()
    .collection("dogOwners")
    .find()
    .toArray()
    .then(dogOwners => {
      for (let i = 0; i < dogOwners.length; i++) {
        let dogOwner = dogOwners[i];
        dogOwner._id = dogOwner._id.toString();
      }
      return dogOwners;
    });
}

function _delete(id) {
  return conn
    .db()
    .collection("dogOwners")
    .deleteOne({ _id: new ObjectId(id) })
    .then(result => Promise.resolve());
}

function readById(id) {
  return conn
    .db()
    .collection("dogOwners")
    .findOne({ _id: new ObjectId(id) })
    .then(dogOwner => {
      dogOwner._id = dogOwner._id.toString();
      return dogOwner;
    });
}

function create(model) {
  return conn
    .db()
    .collection("dogOwners")
    .insert(model)
    .then(result => result.insertedIds[0].toString());
}
