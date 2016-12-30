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
    List.scope('withUser').findAll({
      where: {
        user_id: req.user.id
      }
    })
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  },

  show (req, res, next) {
    List.find(findOpts({
      where: {
        id: req.params.id
      }
    }))
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  },

  create (req, res, next) {
    List.create(
      Object.assign(
        req.body, {
          user_id: req.user.id
        }), findOpts({}))
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  },

  update (req, res, next) {
    List.update(req.body, findOpts({
      where: { id: req.params.id }
    }))
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
