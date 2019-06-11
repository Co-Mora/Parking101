<template>
    <div>
      <div class="modal inmodal" id="myModalUpdate" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content animated bounceInRight">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">{{gateMasterName}}</h4>
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
              <button type="button" @click="updateGate(gateID)" :disabled="validated == true" class="btn btn-primary">Update changes</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                      <h4 class="modal-title">{{gateMasterName}}</h4>
                  </div>
                  <div class="modal-body">
                      <div class="table-responsive">
                          <table class="table table-striped table-bordered table-hover dataTables-example">
                              <thead>
                                  <tr>
                                      <th data-hide="phone,tablet">name</th>
                                      <th data-hide="phone,tablet">Delete</th>
                                      <th data-hide="phone,tablet">Update</th>

                                  </tr>
                              </thead>
                              <tbody>
                                  <span v-show="selectedGate == 0" style="font-size: 20px;">{{message}}</span>
                                  <tr v-for="gate in selectedGate" :key="gate" class="gradeX">
                                      <td class="center">{{gate.name || 'Unknown'}}</td>
                                      <td><button class="pull-right btn btn-danger btn-sm" :value="gate.id" @click="deleteGate(gate.id)">Delete</button></td>
                                      <td><button class="pull-right btn btn-primary btn-sm" :value="gate.id" @click="viewUpdateGate(gate.id)" >Update</button></td>

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
            <nav-side :classGate="classGate"/>
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
              <div class="ibox-title">
                <p>Home / Gates</p>
              </div>
         <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">

                        <div class="ibox-content">
                          <div class="row">
                            <div class="input-group" style="margin: 0 0 20px 16px">
                              <a href="/carparks/street/add" class="btn btn-w-m btn-rounded btn-outline-primary">Create New Gate</a>
                            </div>
                            <div class="col-sm-9 m-b-xs">
                              <select v-model="carparkID" class="form-control m-b" @change="addGateMaster">
                                <option disabled selected value="null" key="null">Please Select Car Park Name</option>
                                <option v-for="car in carpark" :value="car.id" :key="car">{{car.name}}</option>
                              </select>
                            </div>
                            <div class="col-sm-9 m-b-xs">
                              <select v-model="gateMasterID" class="form-control m-b" @change="addGates">
                                <option disabled selected value="null" key="null">Please Select Gate Master Name</option>
                                <option v-for="gate in gateMaster" :value="gate.id" :key="gate">{{gate.name}}</option>
                              </select>
                            </div>
                            <div class="col-sm-3">
                              <div class="input-group" style="margin-bottom: 20px">
                                <input v-model="searchResult" placeholder="Search" type="text" class="form-control form-control-sm"><span class="input-group-append">
                                      <button type="button" class="btn btn-sm btn-success">Search</button></span>
                              </div>
                            </div>
                          </div>
                          <div class="table-responsive">
                            <table v-show="!messageGate  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                               <thead>
                               <tr>
                                   <th data-hide="phone,tablet">id(s)</th>
                                   <th data-hide="phone,tablet">name</th>
                                   <th data-hide="phone,tablet">remark</th>
                                   <th data-hide="phone,tablet">Gate Name</th>
                               </tr>
                               </thead>
                               <tbody>
                                   <tr v-for="get in gates" :key="get" class="gradeX">
                                      <td class="center"><a data-toggle="modal" data-target="#myModal5" @click="viewGate(get.id)">{{get.id}}</a></td>
                                      <td class="center">{{get.name || 'Unknown'}}</td>
                                      <td class="center">{{get.remark || 'Unknown'}}</td>
                                      <td class="center">{{gateMasterName || 'Unknown'}}</td>
                                   </tr>
                               </tbody>
                               <tfoot>
                               <tr>
                                   <td colspan="5">
                                       <ul class="pagination float-right"></ul>
                                   </td>
                               </tr>
                               </tfoot>
                           </table>
                            <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageGate" role="alert">{{messageGate}}</div>

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

export default {
  name: "Gates",
  data() {
    return {

      gateID: null,
      validated: false,
      name: null,
      remark: null,

      carpark: null,
      gates: null,
      gateMaster: null,
      gateMasterID: null,
      gateMasterName: null,
      selectedGate: null,
      carparkID: 'null',
      message: null,
      classGate: true,
      messageGate: null,
    };
  },
  methods: {
    addGateMaster() {
      CarParkService.viewData(`carpark/${this.carparkID}/gatemasters`).then(response => {
          this.gateMaster = response.data;

          this.messageGate = '';
          if (this.gateMaster.length === 0) {
            this.messageGate = "No data available.";
          } else {
            this.gateMasterID = response.data[0].id
            this.addGates()
          }
        });
    },
    addGates() {
      CarParkService.fetchAllData(`carpark/${this.carparkID}/gatemasters/${this.gateMasterID}/gates`).then(response => {
          this.gates = response.data;
          this.messageGate = '';
          if (this.gates.length === 0) {
            this.messageGate = "No data available.";
          }
      });
      this.gateMaster.forEach((el) => {
           if(el.id === this.gateMasterID) {
             this.gateMasterName = el.name
           }
        })
    },
    viewGate(value) {
       CarParkService.viewCarPark(`carpark/${this.carparkID}/gatemasters/${this.gateMasterID}/gates`, value).then(response => {
                this.selectedGate = response.data;
                if (this.selectedGate.length === 0) {
                    this.messageGate = "No data available.";
                }
            });
    },
    deleteGate(value) {
      CarParkService.deleteData(`carpark/${this.carparkID}/gatemasters/${this.gateMasterID}/gates`, value)
    },
    viewUpdateGate(value) {
      $("#myModal5").modal("hide");
      $("#myModalUpdate").modal("show");
      CarParkService.viewCarPark(`carpark/${this.carparkID}/gatemasters/${this.gateMasterID}/gates`, value) .then(response => {
        this.selectedGate = response.data;
        this.showSelectedGate()
      });

    },
    updateGate(value) {
      this.validated = true;
      document.getElementById('myModalUpdate').style.display = "none";
       CarParkService.updateData(`carpark/${this.carparkID}/gatemasters/${this.gateMasterID}/gates`, value, qs.stringify({
          name: this.name,
          remark: this.remark,
          gatemasterID: this.gateMasterID
      }));
    },
    showSelectedGate() {
      this.selectedGate.forEach((el) => {
        this.name = el.name;
        this.remark = el.remark;
        this.gateID = el.id;

      })
    },
    loadData() {
      CarParkService.fetchAllData('carpark').then(response => {
        this.carpark = response.data;
        this.messageGate = '';
        if (this.carpark.length === 0) {
          this.messageGate = "No data available.";
        } else {
          this.carparkID = response.data[0].id;
          this.addGateMaster()
        }

      });
    },
  },

  components: {
    NavSide
  },
  mounted() {
   this.loadData();
  }
};
</script>
