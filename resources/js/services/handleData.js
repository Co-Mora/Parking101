
var API_TOKEN = null;

const handleData = (data) => {
    // var data = JSON.parse(data);
    API_TOKEN = data.token;
    console.log('Data', data.token)
    console.log('API_TOKEN', API_TOKEN)
}


module.exports = {
    handleData,
    API_TOKEN
};