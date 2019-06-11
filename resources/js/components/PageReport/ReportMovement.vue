<template>
    <div>
         <div id="wrapper">
            <nav-side :classMovemnt="classMovemnt" />
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
                <p>Home / License</p>
              </div>
         <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">
                        <div class="ibox-content">
                          <div class="row">
                             <div class="col-sm-9 m-b-xs">
                                    <select v-model="operatorID" class="form-control m-b" @change="filterReport">
                                        <option disabled value="null" key="null">Please Select operator Name</option>
                                        <option v-for="op in operators" :value="op.id" :key="op">{{op.name}}</option>
                                    </select>
                                </div>
                                <div class="col-sm-3">
                                <div class="input-group" style="margin-bottom: 20px">
                                  <input v-model="searchResult" placeholder="Search" type="text" class="form-control form-control-sm"><span class="input-group-append">
                                      <button type="button"  @click="getSearchResult()" class="btn btn-sm btn-success">Search</button></span>
                                </div>
                          </div>
                          <div class="table-responsive">
                            <table v-show="!messageMovement  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                               <thead>
                               <tr>
                                   <th data-hide="phone,tablet">id(s)</th>
                                   <th data-hide="phone,tablet">customerName</th>
                                   <th data-hide="phone,tablet">seasonName</th>
                                   <th data-hide="phone,tablet">status</th>
                                    <th data-hide="phone,tablet">username</th>
                               </tr>
                               </thead>
                               <tbody>
                                   <tr v-for="move in movement" :key="move" class="gradeX" >
                                     <td class="center"><a>{{move.id}}</a></td>
                                       <td class="center">{{move.customerName || 'Unknown'}}</td>
                                      <td class="center">{{move.seasonName || 'Unknown'}}</td>
                                      <td class="center">{{move.status || 'Unknown'}}</td>
                                      <td class="center">{{move.username || 'Unknown'}}</td>
                                   </tr>
                               </tbody>
                           </table>
                            <div class="alert alert-primary col-sm-12 m-b-xs" v-show="errorResult === true" role="alert">{{message}}</div>
                            <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageMovement" role="alert">{{messageMovement}}</div>

                          </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        </div>
    </div>
         </div>
    </div>
</template>
<script>
const NavSide = require('../NavSide.vue')
const NavBar = require('../NavBar.vue')
const axios  = require('axios');
const CarParkService = require('../../services/CarParkService')

export default {
  name: "License",
  data() {
    return {
      operatorID: null,
      operators: null,
     
      movement: [], 
      validated: false,
      result: true,
      message: '',
      messageMovement: null,
      classMovemnt: true
    };
  },
  methods: {
    loadData() {
        CarParkService.fetchAllData('operator').then(response => {
          this.operators = response.data;
          this.operatorID = response.data[1].id;
          this.filterReport()
        });
    },
    filterReport() {
      CarParkService.fetchAllData(`operator/${this.operatorID}/report/movement`).then(response => {
          this.movement = response.data;
          this.messageMovement = '';
          if (this.movement.length === 0) {
            this.messageMovement ="No data available.";
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
