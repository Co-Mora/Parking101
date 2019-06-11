<template>
    <div>
         <div id="wrapper">
           <NavSide :classMaster="classMaster"/>
             <div id="page-wrapper" class="gray-bg">
            <div class="row border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
            </div>
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                        <span class="m-r-sm text-muted welcome-message">Welcome to Carpark Aide.</span>
                    </li>

                    <li>
                        <a href="/login">
                            <i class="fa fa-sign-out"></i> Log out
                        </a>
                    </li>
                </ul>
            </nav>
            </div>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-md-12">
                <div class="col-md-6" v-for="error in errors" :key="error">
                <div class=" alert alert-danger alert-dismissible fade show" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    {{error}}
                </div>
                </div>
            </div>
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-title">
                            <h4>Add Master</h4>
                        </div>
                        <div class="ibox-content">
                               <div class="col-lg-12">
                                    <div class="form-group row">
                                        <select v-model="carparkID" class="form-control m-b" >
                                            <option disabled selected value="null" key="null">Please Select Carpark Name</option>
                                            <option v-for="car in carpark" :value="car.id" :key="car">{{car.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row"><label class="col-sm-2 col-form-label">Master Name</label>
                                    <div class="col-sm-10"><input v-model="name"  placeholder="Name" type="text" class="form-control"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                 <div class="form-group row"><label class="col-sm-2 col-form-label">Master Remark</label>
                                    <div class="col-sm-10"><input v-model="remark"  placeholder="Remark here" type="text" class="form-control"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group row">
                                    <div class="col-sm-4 col-sm-offset-2">
                                        <button class="btn btn-primary btn-sm" @click="addMaster" :disabled="validated == true">Add</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="footer">
                <div class="float-right">
                    10GB of <strong>250GB</strong> Free.
                </div>
                <div>
                    <strong>Copyright</strong> CarPark Company &copy; 2018
                </div>
            </div>

        </div>
         </div>

    </div>
</template>

<script>
const NavSide = require('../../NavSide.vue')
const axios  = require('axios');
const CarParkService = require('../../../services/CarParkService')
const qs =  require('qs')

export default {
  name: 'AddMaster',
  data () {
    return {
      classMaster: true,
      validated: false,
      carparkID: 'null',
      carpark: null,
      name: null,
      remark: null,
      errors: [],
    }
  },
  methods: {
    // processFile() {
    //   let formData = new FormData();
    //   formData.append('imgUploader', this.file);

    //   axios.post( 'https://sys2.parkaidemobile.com/api/images/upload',
    //             formData,
    //             {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'x-access-token': JSON.parse(this.token)
    //             }
    //           }
    //         ).then(response => {
    //           this.image = response.data
    //           console.log('SUCCESS!!', response.data);
    //     })
    //     .catch(function(ex){
    //       console.log(ex);
    //     });

    // },
    // handleFileUpload() {
    //    this.file = this.$refs.file.files[0];
    //    console.log("File:", this.file);
    //    this.processFile();
    // },
    addMaster() {
         setTimeout(() => {
        $('.alert').alert('close')
      }, 2000)
         if (!this.name && !this.remark) {
        this.errors.push('Please fill up the forms')
        return false
      } if (!this.name) {
        this.errors.push('Please fill up the Level Name')
      } if (!this.remark) {
        this.errors.push('Please fill up the level image')
      } else {
        this.errors = []
        this.validated = true
         CarParkService.createData(`carpark/${this.carparkID}/wheelmasters`, qs.stringify({
            name: this.name,
            remark: this.remark,
        }));
      }
    },
    loadData() {
        CarParkService.fetchAllData('carpark').then(response => {
            this.carpark = response.data
        });
    },
  },
  components: {
    NavSide
  },
 mounted () {
    this.loadData();
  }
}


</script>
