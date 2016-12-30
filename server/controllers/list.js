const { List, ListItem, User } = require('../models');
const { respondWithData } = require('../utils/response');
const { queryResultToJSON } = require('../utils/data');

const defaultFindOptions = {
  include: [{ model: ListItem, as: 'items' }, User]
};

function findOpts (opts) {
  return Object.assign(defaultFindOptions, opts);
}

module.exports = {
  index (req, res, next) {
    List.scope('allAssoc').findAll({
      where: {
        user_id: req.user.id
      }
    })
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  },

  show (req, res, next) {
    List.scope('allAssoc').find({
      where: {
        id: req.params.id
      }
    })
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  },

  addItem (req, res, next) {
    ListItem.create(Object.assign(
      req.body,
      { list_id: req.params.id }
    ))
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  },

  create (req, res, next) {
    List.scope('allAssoc').create(
      Object.assign(
        req.body, {
          user_id: req.user.id
        }))
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  },

  update (req, res, next) {
    List.scope('allAssoc').update(req.body, {
      where: { id: req.params.id }
    })
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  },

  delete (req, res, next) {
    List.destroy({
      where: { id: req.params.id }
    })
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  }
};
