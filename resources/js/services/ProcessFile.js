const API = require('../services/API');

const process = (URL, credentials) =>  {
    return API('multipart/form-data').post(`${URL}`, credentials);
};


module.exports = {
    process
};