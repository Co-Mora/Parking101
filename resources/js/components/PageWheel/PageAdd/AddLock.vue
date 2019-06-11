<template>
   <div>
         <div id="wrapper">
             <NavSide :classLock="classLock"/>
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
                        <a @click="logout" href="/login">
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
            </div>
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
                            <h4>Filter by Wheel Master</h4>
                        </div>
                        <div class="ibox-content">
                                <div class="col-lg-12">
                                    <div class="input-group">
                                        <select v-model="carparkID" class="form-control m-b" @change="filterByWheelMaster">
                                            <option disabled selected value="null" key="null">Please Select Carpark Name</option>
                                            <option v-for="car in carpark" :value="car.id" :key="car">{{car.name}}</option>
                                        </select>
                                    </div>
                                    <div class="input-group" style="margin: 20px 0">
                                        <select v-model="wheelMasterID" class="form-control m-b" >
                                            <option disabled selected value="null" key="null">Please Select Wheel Master</option>
                                            <option v-for="wheel in wheelMaster" :value="wheel.id" :key="wheel">{{wheel.name}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group row"><label class="col-sm-2 col-form-label">Lock Name</label>
                                    <div class="col-sm-10"><input v-model="name"  placeholder="Name" type="text" class="form-control"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group row"><label class="col-sm-2 col-form-label">Lock Remark</label>
                                    <div class="col-sm-10"><input v-model="remark"  placeholder="remark" type="text" class="form-control"></div>
                                </div>
                                <div class="hr-line-dashed"></div>
                                <div class="form-group row"><label class="col-sm-2 col-form-label">Lock BayID</label>
                                    <div class="col-sm-10"><input v-model="bayID"  placeholder="bayID" type="text" class="form-control"></div>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-4 col-sm-offset-2">
                                        <button class="btn btn-primary btn-sm" @click="addWheelMasterLock" :disabled="validated == true">Add</button>
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
  name: 'AddLock',
  data () {
    return {
      classLock: true,
      carparkID: 'null',
      carpark: null,
      wheelMasterID: 'null',
      wheelMaster: null,
      name: null,
      remark: null,
      bayID: null,
      validated: false,
      errors: [],
    }
  },
  components: {
    NavSide
  },
  methods: {

    addWheelMasterLock() {
         setTimeout(() => {
        $('.alert').alert('close')
      }, 2000)
         if (!this.name && !this.remark) {
        this.errors.push('Please fill up the forms')
        return false
      } if (!this.name) {
        this.errors.push('Please fill up the Level Name')
      } if (!this.remark) {
        this.errors.push('Please fill up the level remark')
      } else {
        this.errors = []
        this.validated = true
         CarParkService.createData(`carpark/${this.carparkID}/wheelmasters/${this.wheelMasterID}/wheellocks`, qs.stringify({
            name: this.name,
            remark: this.remark,
            bayID: this.bayID
        }));
      }
    },
    filterByWheelMaster() {
        CarParkService.fetchAllData(`carpark/${this.carparkID}/wheelmasters`).then(response => {
            this.wheelMaster = response.data
            if(this.wheelMaster.length === 0) {
                this.message = "Threre's no carpark";
            }
        })
    },
    loadData() {
        CarParkService.fetchAllData('carpark').then(response => {
            this.carpark = response.data
        });
    },
  },

 mounted () {
     this.loadData();

  }
}


</script>
