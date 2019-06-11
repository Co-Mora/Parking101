const API = require('../services/API')

const swal = require('sweetalert2')

const registerUser = (URL, credentials) => {
  API().post(`${URL}`, credentials).then(response => {
    if(response.status === 200) {
      setTimeout(() => {
        swal({
          title: 'User Registered',
          icon: 'success'
        })
      }, 200);
    } else {
      setTimeout(() => {
        swal({
          title: 'Data Error',
          icon: 'error'
        })
      }, 200)
    }
  });
};

const verifyUser = (URL, value, credentials) => {
  return API().post(`${URL}/${value}`, credentials).then(response => {
    if (response.status == 200) {
      setTimeout(() => {
        swal({
          title: 'Verify it successfully',
          icon: 'success'
        })
      }, 200);
    }
  }).catch(error => {
    if (error) {
      setTimeout(() => {
        swal({
          title: 'Error occurred',
          icon: 'error'
        })
      }, 100)
    }

  });

}

const loginUser = (URL, value, credentials) => {
    return API().post(`${URL}/${value}`, credentials).then(response => {
      if (response.status == 200) {
        setTimeout(() => {
          swal({
            title: 'Login successfully',
            icon: 'success'
          })
        }, 200);
      }
    }).catch(error => {
      if (error) {
        setTimeout(() => {
          swal({
            title: 'Error occurred',
            icon: 'error'
          })
        }, 100)
      }
  
    });
  
  }
  

module.exports = {
    registerUser,
    verifyUser,
    loginUser,
}
