const { queryResultToJSON } = require('../utils/data');
const { respondWithData } = require('../utils/response');


class Controller {

  index (req, res, next) {
  }

  show (req, res, next) {
  }

  create (req, res, next) {
  }

  update (req, res, next) {
  }

  destroy (req, res, next) {
  }

  handle (req, res, next) {
    const promise = null;
    switch (req.method.toLowerCase()) {
      case 'get':
        promise = req.params.id ?
          this.show(req) : this.index(req);
        break;
      case 'post':
        promise = this.create(req);
        break;
      case 'put':
        promise = this.update(req);
        break;
      case 'delete':
        promise = this.destroy(req);
        break;
    }

    if (promise) {
      promise
        .then(queryResultToJSON)
        .then(respondWithData(res))
        .catch(next);
    }
    else {
      next();
    }
  }

}

module.exports = Controller;