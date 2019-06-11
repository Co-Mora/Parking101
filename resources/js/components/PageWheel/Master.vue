

<template>

<div>
    <div class="modal inmodal" id="myModalUpdate" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content animated bounceInRight">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                    <h4 class="modal-title">{{carparkName}}</h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Master Name</label>
                        <input type="text" v-model="name" placeholder="Enter Master Name" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Remark Count</label>
                        <input type=" text" v-model="remark" placeholder="Enter Remark Name" class="form-control">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="updateMaster(masterID)" :disabled="validated == true" class="btn btn-primary">Update changes</button>
                </div>
            </div>
        </div>
    </div>
    <div id="wrapper">
        <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">{{carparkName}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover dataTables-example">
                                <thead>
                                    <tr>
                                        <th data-hide="phone,tablet">Carpark Name</th>
                                        <th data-hide="phone,tablet">name</th>
                                        <th data-hide="phone,tablet">Delete</th>
                                        <th data-hide="phone,tablet">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <span v-show="selectedMaster == 0" style="font-size: 20px;">{{message}}</span>
                                    <tr v-for="master in selectedMaster" :key="master" class="gradeX">
                                        <td class="center">{{carparkName || 'Unknown'}}</td>
                                        <td class="center">{{master.name || 'Unknown'}}</td>
                                        <td>
                                            <button class="pull-right btn btn-danger btn-sm" :value="master.id" @click="deleteMaster(master.id)">Delete</button>
                                        </td>
                                        <td>
                                            <button class="pull-right btn btn-primary btn-sm" :value="master.id" @click="viewMasterUpdate(master.id)" >Update</button>
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
        <nav-side :classMaster="classMaster"/>
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
              <p>Home / Wheel / Master</p>
            </div>
            <div class="wrapper wrapper-content animated fadeInRight">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="ibox ">

                            <div class="ibox-content">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="input-group" style="margin-bottom: 20px">
                                            <a href="/wheel/master/add" class="btn btn-w-m btn-rounded btn-outline-primary">Create New Master</a>
                                        </div>
                                    </div>
                                    <div class="col-sm-9 m-b-xs">
                                        <select v-model="carparkID" class="form-control m-b" @change="addMaster">
                                            <option disabled selected value="null" key="null">Please Select Carpark Name</option>
                                            <option v-for="car in carpark" :value="car.id" :key="car">{{car.name}}</option>
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
                                    <table v-show="!messageMaster  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                                        <thead>
                                            <tr>
                                                <th data-hide="phone,tablet">id(s)</th>
                                                <th data-hide="phone,tablet">name</th>
                                                <th data-hide="phone,tablet">remark</th>
                                                <th data-hide="phone,tablet">Car Park Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="master in masters" :key="master" class="gradeX" v-if="result == true && errorResult === false">
                                                <td class="center"><a data-toggle="modal" data-target="#myModal5" @click="viewMaster(master.id)">{{master.id}}</a></td>
                                                <td>{{master.name || 'Unknown'}}</td>
                                                <td>{{master.remark || 'Unknown'}}</td>
                                                <td>{{carparkName || 'Unknown'}}</td>
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
                                    <div class="alert alert-primary col-sm-12 m-b-xs" v-show="errorResult === true" role="alert">{{message}}</div>
                                    <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageMaster" role="alert">{{messageMaster}}</div>

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
    name: 'Master',

    data() {
        return {
            carpark: null,
            masters: null,

            masterID: null,
            name: null,
            remark: null,

            carparkID: 'null',
            carparkName: null,
            selectedMaster: null,

            result: true,
            message: '',
            messageMaster: null,
            searchResult: '',
            errorResult: false,
            classMaster: true,
        }
    },
    methods: {
        // getSearchResult() {
        //         if (this.searchResult.length === 0) {
        //             this.errorResult = false
        //             this.message = "";
        //             this.addMaster()
        //         }
        //         axios
        //             .get(`https://sys2.parkaidemobile.com/api/carparks/${this.carparkID}/wheelmasters?search=${this.searchResult}`, {
        //                 headers: {
        //                     'x-access-token': JSON.parse(this.token)
        //                 }
        //             })
        //             .then(response => {
        //                 this.masters = response.data;
        //                 this.errorResult = false;
        //                 this.message = "";
        //                 this.result = true;
        //                 if (this.masters.length === 0) {
        //                     this.errorResult = true;
        //                     this.result = true;
        //                     this.message = "No data available.";
        //                 }
        //             })
        //     },
            addMaster() {
                 CarParkService.fetchAllData(`carpark/${this.carparkID}/wheelmasters`).then(response => {
                        this.masters = response.data
                        this.messageMaster = '';
                        if(this.masters.length === 0 ){
                          this.messageMaster = "No data available.";
                        }
                    });
                    this.carpark.forEach((el) => {
                        if (el.id === this.carparkID) {
                            this.carparkName = el.name
                        }
                    })
            },
            viewMaster(value) {
                CarParkService.viewCarPark(`carpark/${this.carparkID}/wheelmasters`, value).then(response => {
                        this.selectedMaster = response.data;
                });

            },
            deleteMaster(value) {
                CarParkService.deleteData(`carpark/${this.carparkID}/wheelmasters`, value)
            },
            viewMasterUpdate(value) {
                $("#myModal5").modal("hide");
                $("#myModalUpdate").modal("show");
                CarParkService.viewCarPark(`carpark/${this.carparkID}/wheelmasters`, value).then(response => {
                        this.selectedMaster = response.data;
                        this.showSelectedMaster()
                });

            },
            updateMaster(value) {
                 this.validated = true;
                 document.getElementById('myModalUpdate').style.display = "none";
                 CarParkService.updateData(`carpark/${this.carparkID}/wheelmasters`, value, qs.stringify({
                    name: this.name,
                    remark: this.remark,
                    carparkID: this.carparkID
                }));
               
            },
            showSelectedMaster() {
                this.selectedMaster.forEach((el) => {
                    this.name = el.name;
                    this.remark = el.remark;
                    this.masterID = el.id;

                })
            },
           loadData() {
                CarParkService.fetchAllData('carpark').then(response => {
                    this.carpark = response.data
                    this.carparkID = response.data[0].id;
                    this.addMaster()
                })

            },

    },
  components: {
    NavSide
  },
    mounted() {
        this.loadData();
    }


}

</script>
