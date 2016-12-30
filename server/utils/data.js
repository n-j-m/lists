
function queryResultToJSON (data) {
  if (Array.isArray(data)) {
    return data.map(queryResultToJSON);
  }

  if (data.get) {
    return data.get();
  }
  return data;
}


module.exports = {
  queryResultToJSON
};
