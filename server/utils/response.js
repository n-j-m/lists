
function respondWithData (res, code) {
  return (data) => res.status(code || 200).json(data);
}


module.exports = {
  respondWithData
};
