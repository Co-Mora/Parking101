const API = require('../services/API')

const swal = require('sweetalert2')



const fetchAllData = (URL) => {
  return API('application/x-www-form-urlencoded').get(`${URL}`);
};

const createData = (URL, credentials) => {
  API('application/x-www-form-urlencoded').post(`${URL}`, credentials).then(response => {
    if (response.status === 200) {
      setTimeout(() => {
        swal({
          title: 'Add it successfully',
          icon: 'success'
        })
      }, 50);
    } else {
      setTimeout(() => {
        swal({
          title: 'Data Error',
          icon: 'error'
        })
      }, 50)
    }
  });
};

const verifyUser = (URL, credentials) => {
  return API('application/x-www-form-urlencoded').post(`${URL}`, credentials)

};


const updateData = (URL, value, credentials) => {
  $("#myModalUpdate").modal("hide");
  return API('application/x-www-form-urlencoded').put(`${URL}/${value}`, credentials).then(response => {
    if (response.status == 200) {
      setTimeout(() => {
        swal({
          title: 'Update it successfully',
          icon: 'success'
        })
      }, 50);
    }
  }).catch(error => {
    if (error) {
      setTimeout(() => {
        swal({
          title: error.message,
          icon: 'error'
        })
      }, 50)
    }

  });

}




const deleteData = (URL, value) => {
  $("#myModal5").modal("hide");
  return API('application/x-www-form-urlencoded').delete(`${URL}/${value}`).then(response => {

    if (response.status == 200) {
      setTimeout(() => {
        swal({
          title: 'Delete it successfully',
          icon: 'success'
        })
      }, 200);
      setTimeout(() => {
        window.location.href = '/carparks'
      }, 1000)
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

};

const viewCarPark = (URL, value) => {
  return API().get(`${URL}/${value}`);
};

const viewData = (URL) => {
  return API().get(`${URL}`);
};


module.exports = {
  fetchAllData,
  createData,
  updateData,
  deleteData,
  viewCarPark,
  viewData,
  verifyUser
}
