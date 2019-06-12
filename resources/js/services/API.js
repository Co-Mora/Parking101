const axios = require('axios')

var data = JSON.parse(localStorage.getItem("data"));
module.exports = (content) => {
    return axios.create({
        baseURL: 'https://sys2.parkaidemobile.com/api2/',
        headers: { 
            'Content-Type': content,
            'x-access-token': data ? data["data"]["token"]  : '' ,
            'roleID': 10023
        }
    })
}


//
