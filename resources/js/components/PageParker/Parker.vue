<template>
    <div>
      <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                      <h4 class="modal-title">{{zoneName}}</h4>
                  </div>
                  <div class="modal-body">
                      <div class="table-responsive">
                          <table class="table table-striped table-bordered table-hover dataTables-example">
                              <thead>
                                  <tr>
                                    <th data-hide="phone,tablet">subscriberID</th>
                                    <th data-hide="phone,tablet">customerID</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <span v-show="selectedParker == 0" style="font-size: 20px;">{{message}}</span>
                                  <tr v-for="parker in selectedParker" :key="parker" class="gradeX">
                                      <td class="center">{{parker.subscriberID || 'Unknown'}}</td>
                                      <td class="center">{{parker.customerID || 'Unknown'}}</td>
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
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-white" data-dismiss="modal">Close</button>
                  </div>
              </div>
          </div>
      </div>
         <div id="wrapper">
           <NavSide :classParker="classParker"/>
            <div id="page-wrapper" class="gray-bg">
            <div class="row border-bottom">
            <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
           <div class="navbar-header">
            </div>
                <ul class="nav navbar-top-links navbar-right">
                    <li>
                        <span class="m-r-sm text-muted welcome-message">Welcome to {{username}}</span>
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
                <p>Home / Parker</p>
              </div>
         <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">

                        <div class="ibox-content">
                          <div class="row">
                            <div class="col-lg-6">
                              <div class="input-group" style="margin-bottom: 20px">
                                <a href="/parker/add" class="btn btn-w-m btn-outline-primary btn-rounded">Create New Parker</a>
                              </div>
                            </div>
                            <div class="col-sm-9 m-b-xs">
                              <select v-model="customerID" class="form-control m-b" @change="filterByParker">
                                <option disabled value="null" key="null">Please Select Customer Name</option>
                                <option v-for="cus in customer" :value="cus.id" :key="cus">{{cus.name}}</option>
                              </select>
                            </div>
                            <div class="col-sm-9 m-b-xs">
                              <select v-model="customerParkerID" class="form-control m-b" @change="getParker">
                                <option disabled  selected value="null" key="null">Please Select Parker Name</option>
                                <option v-for="p in customerParker" :value="p.id" :key="p">{{p.name}}</option>
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
                              <table v-show="!messageParker && !message" class="table table-striped table-bordered table-hover dataTables-example">
                                 <thead>
                                 <tr>
                                     <th data-hide="phone,tablet">id(s)</th>
                                     <th data-hide="phone,tablet">name</th>
                                     <th data-hide="phone,tablet">createDate</th>
                                     <th data-hide="phone,tablet">car1</th>
                                     <th data-hide="phone,tablet">car2</th>
                                     <th data-hide="phone,tablet">mobile</th>
                                     <th data-hide="phone,tablet">email</th>
                                 </tr>
                                 </thead>
                                 <tbody>
                                     <tr v-for="p in parker" :key="p" class="gradeX" v-if="result == true && errorResult === false">
                                         <td class="center"><a data-toggle="modal" data-target="#myModal5" @click="viewParker(p.id)">{{'Parker: ' + p.id || 'Unknown'}}</a></td>
                                         <td class="center">{{p.name || 'Unknown'}}</td>
                                         <td class="center">{{parkerDate || 'Unknown'}}</td>
                                         <td class="center">{{p.car1 || 'Unknown'}}</td>
                                         <td class="center">{{p.car2 || 'Unknown'}}</td>
                                         <td class="center">{{p.mobile || 'Unknown'}}</td>
                                         <td class="center">{{p.email || 'Unknown'}}</td>
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
                              <div class="alert alert-warning col-sm-12 m-b-xs" v-show="errorResult === true" role="alert">{{message}}</div>
                              <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageParker" role="alert">{{messageParker}}</div>

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
const NavBar = require('../NavBar.vue')
const axios  = require('axios');
const CarParkService = require('../../services/CarParkService')

export default {
  name: 'Parker',
  data () {
    return {
      parker: null,
      customerParkerID: 'null',
      customerParker: null,
      customer: null,
      parkerDate: null,
      customerID: null,
      selectedParker: null,

      result: true,
      message: '',
      searchResult: '',
      errorResult: false,
      mySearch: [],
      classParker: true,
      messageParker: null,
    }
  },
  methods: {
    getSearchResult() {
      if(this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.getParker()
      }
      axios
        .get(`https://sys2.parkaidemobile.com/api/customers/${this.customerID}/parkers/${this.customerParkerID}?search=${this.searchResult}`, {
          headers: {
            'x-access-token': JSON.parse(this.token)
          }
        })
        .then(response => {
          this.parker = response.data;
          this.errorResult = false;
          this.message = "";
          this.result = true;
          if (this.parker.length === 0) {
            this.errorResult = true;
            this.message =  "No data available.";
          }
        })
    },
    filterByParker() {
         CarParkService.viewData(`customer/${this.customerID}/parker`).then(response => {
            this.customerParker = response.data
            this.messageParker = "";
            if(this.customerParker.length === 0 ) {
                this.messageParker = "No data available.";
              } else {
              this.customerParkerID = response.data[0].id;
              this.getParker();
            }

        })
    },
    getParker() {
        CarParkService.fetchAllData(`customer/${this.customerID}/parker/${this.customerParkerID}`).then(response => {
            this.parker = response.data;
            this.messageParker = '';

          if(this.parker.length === 0) {
            this.messageParker = "No data available.";
            }
            var date;
            var hours;
            var minutes;
            var seconds;
            var formattedTime;
            this.parker.forEach((el) => {
               if(el.id === this.customerParkerID) {
                 date = new Date(el.createDate*1000);
                 hours = date.getHours();
                 minutes = "0" + date.getMinutes();
                 seconds = "0" + date.getSeconds();
                 formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                 this.parkerDate = formattedTime
               }
            });

        })
    },
    viewParker(value) {
         CarParkService.viewCarPark(`customer/${this.customerID}/parker`, value).then(response => {
            this.selectedParker = response.data;
        });
    },
    loadData() {
        CarParkService.fetchAllData('customer').then(response => {
            this.customer   = response.data;
            this.messageParker = "";
            if(this.customer.length === 0 ) {
            this.messageParker = "No data available.";
            } else {
            this.customerID = response.data[0].id;
            this.filterByParker()
            }
        })
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
