<template>
    <div>
      <div class="modal inmodal" id="myModalUpdate" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content animated bounceInRight">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                      <h4 class="modal-title">{{wheelMastersName}}</h4>
                  </div>
                  <div class="modal-body">
                      <div class="form-group">
                          <label>Pole Name</label>
                          <input type="text" v-model="name" placeholder="Enter Pole Name" class="form-control">
                      </div>
                      <div class="form-group">
                          <label>Remark Name</label>
                          <input type=" text" v-model="remark" placeholder="Enter Remark Name" class="form-control">
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" @click="updatePole(poleID)" :disabled="validated == true" class="btn btn-primary">Update changes</button>
                  </div>
              </div>
          </div>
      </div>
      <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                      <h4 class="modal-title">{{wheelMastersName}}</h4>
                  </div>
                  <div class="modal-body">
                      <div class="table-responsive">
                          <table class="table table-striped table-bordered table-hover dataTables-example">
                              <thead>
                                  <tr>
                                      <th data-hide="phone,tablet">name</th>
                                      <th data-hide="phone,tablet">mac</th>
                                      <th data-hide="phone,tablet">Delete</th>
                                      <th data-hide="phone,tablet">Update</th>

                                  </tr>
                              </thead>
                              <tbody>
                                  <span v-show="selectedPole == 0" style="font-size: 20px;">{{message}}</span>
                                  <tr v-for="pole in selectedPole" :key="pole" class="gradeX">
                                      <td class="center">{{pole.name || 'Unknown'}}</td>
                                      <td>{{pole.mac || 'Unknown'}}</td>
                                      <td><button class="pull-right btn btn-danger btn-sm" :value="pole.id" @click="deletePole(pole.id)">Delete</button></td>
                                      <td>
                                          <button class="pull-right btn btn-primary btn-sm" :value="pole.id" @click="viewPoleUpdate(pole.id)" >Update</button>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>

                  </div>

                  <div class="modal-footer">
                      <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                  </div>
              </div>
          </div>
      </div>
         <div id="wrapper">
            <nav-side :classPole="classPole"/>
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
                        <a  href="/login">
                            <i class="fa fa-sign-out"></i> Log out
                        </a>
                    </li>
                </ul>
            </nav>
            </div>
               <div class="ibox-title">
                 <p>Home / Wheel /  Pole</p>
               </div>
        <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">

                        <div class="ibox-content">
                          <div class="row">
                              <div class="col-lg-6">
                                  <div class="input-group" style="margin-bottom: 20px">
                                      <a href="/wheel/pole/add" class="btn btn-w-m btn-rounded btn-outline-primary">Create New Pole</a>
                                  </div>
                              </div>
                              <div class="col-sm-9 m-b-xs">
                                <select v-model="carparkID" class="form-control m-b" @change="filterMaster">
                                  <option disabled selected value="null" key="null">Please Select Carpark Name</option>
                                  <option v-for="car in carpark" :value="car.id" :key="car">{{car.name}}</option>
                                </select>
                              </div>
                              <div class="col-sm-9 m-b-xs">
                                <select v-model="wheelMastersID" class="form-control m-b" @change="filterMasterPole">
                                    <option disabled selected value="null" key="null">Please Select wheel Master</option>
                                    <option v-for="wheel in wheelMasters" :value="wheel.id" :key="wheel">{{wheel.name}}</option>
                                </select>
                              </div>
                              <div class="col-sm-3">
                                <div class="input-group" style="margin-bottom: 20px">
                                  <input v-model="searchResult" @change="getSearchResult" placeholder="Search" type="text" class="form-control form-control-sm"><span class="input-group-append">
                                      <button type="button"  @click="getSearchResult()" class="btn btn-sm btn-success">Search</button></span>
                                </div>
                              </div>
                          </div>
                            <div class="table-responsive">
                              <table v-show="!messagePole  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                                  <thead>
                                  <tr>
                                      <th data-hide="phone,tablet">id(s)</th>
                                      <th data-hide="phone,tablet">name</th>
                                      <th data-hide="phone,tablet">remark</th>
                                      <th data-hide="phone,tablet">lastSeen</th>
                                      <th data-hide="phone,tablet">wheelmaster Name</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                      <tr v-for="pole in poleMasters" :key="pole" class="gradeX" v-if="result == true && errorResult === false">
                                          <td class="center"><a data-toggle="modal" data-target="#myModal5" @click="viewPole(pole.id)">{{'Pole: ' + pole.id || 'Unknown'}}</a></td>
                                          <td>{{pole.name || 'Unknown'}}</td>
                                          <td>{{pole.remark || 'Unknown'}}</td>
                                          <td>{{pole.lastSeen || 'Unknown'}}</td>
                                          <td>{{wheelMastersName || 'Unknown'}}</td>
                                      </tr>
                                  </tbody>
                              </table>
                              <div class="alert alert-primary col-sm-12 m-b-xs" v-show="errorResult === true" role="alert">{{message}}</div>
                              <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messagePole" role="alert">{{messagePole}}</div>

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

const NavSide = require('../NavSide.vue')
const axios  = require('axios');
const CarParkService = require('../../services/CarParkService')
const qs =  require('qs')

export default {
  name: 'Pole',

  data () {
    return {
      carpark: null,
      wheelMasters: null,
      selectedPole: null,
      Istrigger: null,
      poles: null,
      poleID: null,

      name: null,
      remark: null,
      bayID: null,

      poleMasters: null,
      selected: null,
      carparkID: null,
      wheelMastersID: null,
      wheelMastersName: null,
     
      result: true,
      message: '',
      messagePole: null,
      searchResult: '',
      errorResult: false,
      classPole: true
    }
  },

  methods: {

    // getSearchResult() {
    //   if(this.searchResult.length === 0) {
    //     this.errorResult = false
    //     this.message = "";
    //     this.filterMasterPole()
    //   }
    //   axios
    //       .get(`https://sys2.parkaidemobile.com/api/carparks/${this.carparkID}/wheelmasters/${this.wheelMastersID}/wheelpoles?search=${this.searchResult}`, {
    //           headers: {
    //               'x-access-token': JSON.parse(this.token)
    //           }
    //       })
    //       .then(response => {
    //           this.poleMasters = response.data;
    //           this.errorResult = false;
    //           this.message = "";
    //           this.result = true;
    //           if (this.poleMasters.length === 0) {
    //                   this.errorResult = true
    //                   this.message = "No data available.";
    //           }
    //       })
    // },
    filterMaster() {
        CarParkService.fetchAllData(`carpark/${this.carparkID}/wheelmasters`).then(response => {
            this.wheelMasters = response.data
            this.messagePole = '';
            if(this.wheelMasters.length === 0) {
              this.messagePole = "No data available.";
            } else {
              this.wheelMastersID = response.data[0].id
              this.filterMasterPole()
            }
        })
    },
    filterMasterPole() {
         CarParkService.fetchAllData(`carpark/${this.carparkID}/wheelmasters/${this.wheelMastersID}/wheelpoles`).then(response => {
            this.poleMasters = response.data
            this.messagePole = '';
            if(this.poleMasters.length === 0) {
                  this.messagePole = "No data available.";
            }
        })
        this.wheelMasters.forEach((el) => {
           if(el.id === this.wheelMastersID) {
             this.wheelMastersName = el.name
           }
        })
    },
    viewPole(value) {
        CarParkService.viewCarPark(`carpark/${this.carparkID}/wheelmasters/${this.wheelMastersID}/wheelpoles`, value) .then(response => {
            this.selectedPole = response.data;
            if (this.selectedPole.length === 0) {
                this.message = "Threre's no carpark";
            }
        });

    },
    deletePole(value) {
        CarParkService.deleteData(`carpark/${this.carparkID}/wheelmasters/${this.wheelMastersID}/wheelpoles`, value)
    },
    viewPoleUpdate(value) {
        $("#myModal5").modal("hide");
        $("#myModalUpdate").modal("show");
        CarParkService.viewCarPark(`carpark/${this.carparkID}/wheelmasters/${this.wheelMastersID}/wheelpoles`, value).then(response => {
            this.selectedPole = response.data;
            this.showSelectedPole()
        });

    },
    updatePole(value) {
        this.validated = true;
        document.getElementById('myModalUpdate').style.display = "none";
        CarParkService.updateData(`carpark/${this.carparkID}/wheelmasters/${this.wheelMastersID}/wheellocks`, value, qs.stringify({
            name: this.name,
            remark: this.remark,
            wheelmasterID: this.wheelMastersID
        }));
    },
    showSelectedPole() {
      this.selectedPole.forEach((el) => {
          this.name = el.name;
          this.remark = el.remark;
          this.poleID = el.id;
          this.bayID = el.bayID

      })
    },
    loadData() {
        CarParkService.fetchAllData('carpark') .then(response => {
            this.carpark = response.data
            this.carparkID = response.data[0].id;
            this.filterMaster()
        })

    },
  },
  components: {
    NavSide
  },
  mounted () {
      this.loadData();
    },

}

</script>
