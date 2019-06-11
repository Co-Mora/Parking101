const API = require('../services/API')

const swal = require('sweetalert2')


const login = (credentials) => {

  return API('application/x-www-form-urlencoded').post('auth2/web/login', credentials).then(response => {
    if(response.data.auth === 200) {
    	const parsed = JSON.stringify(response.data);
      	localStorage.setItem('data', parsed);
    	this.$router.push({ name: 'home' });
    }
  }).catch(ex => {
    	setTimeout(() => {
	    	swal({
	          title: ex.message,
	          icon: 'error'
	        })
      	}, 100)
    
  })
};



const register = (credentials) => {
  return API().post('register', credentials)
};


module.exports = {
  login,
  register
};
