const { ListItem } = require('../models');
const { queryResultToJSON } = require('../utils/data');
const { respondWithData } = require('../utils/response');


module.exports = {
  create (req, res, next) {
    ListItem.create(Object.assign(
      req.body,
      { list_id: req.params.id }
    ))
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  },

  update (req, res, next) {
    ListItem.update(req.body, {
      where: { id: req.params.id }
    })
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  },

  delete (req, res, next) {
    ListItem.destroy({
      where: { id: req.params.id }
    })
      .then(queryResultToJSON)
      .then(respondWithData(res))
      .catch(next);
  }
};
