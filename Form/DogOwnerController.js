const dogOwnersServices = require("../services/dogOwnersServices");
const responses = require("../models/responses");
const apiPrefix = '/api/dogOwners';

module.exports = {
  create: create,
  readById: readById,
  delete: _delete,
  readAll: readAll,
  update: update
};

function update(req, res) {
  req.model.updateDate = new Date();
  delete req.model.createDate;

  dogOwnersServices
    .update(req.params.id, req.model)
    .then(dogOwner => {
      const responseModel = new responses.SuccessResponse();
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function readAll(req, res) {
  dogOwnersServices
    .readAll()
    .then(dogOwners => {
      const responseModel = new responses.ItemsResponse();
      responseModel.items = dogOwners;
      res.json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function _delete(req, res) {
  dogOwnersServices
    .delete(req.params.id)
    .then(() => {
      const responseModel = new responses.SuccessResponse();
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(new responses.ErrorResponse(err));
    });
}

function readById(req, res) {
  dogOwnersServices
    .readById(req.params.id)
    .then(dogOwner => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = dogOwner;
      res.json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}

function create(req, res) {
  dogOwnersServices.create(req.model)
      .then(id => {
      responseModel = new responses.ItemResponse()
      responseModel.item = id
      res
        .status(201)
        .location(`${apiPrefix}/${id}`)
        .json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
}
