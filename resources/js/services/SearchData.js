const API = require('./API')

const fetchAllResult = (URL) => {
  return API().get(`${URL}`);
};

const findSearchResult = (URL) => {
  return API().get(`${URL}`)
}
module.exports = {
    fetchAllResult,
    findSearchResult
}
