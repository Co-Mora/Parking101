
<template>
    <div>
        <div id="wrapper">
        <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                        <h4 class="modal-title">{{customerName}}</h4>
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
                                    <span v-show="selectedCustomer == 0" style="font-size: 20px;">{{message}}</span>
                                    <tr v-for="cus in selectedCustomer" :key="cus" class="gradeX">
                                        <td class="center">{{cus.name || 'Unknown'}}</td>
                                        <td><button class="pull-right btn btn-danger btn-sm" :value="cus.id" @click="deleteCustomer(cus.id)">Delete</button></td>
                                        <td><button class="pull-right btn btn-primary btn-sm" :value="cus.id" @click="updateCarpark(cus.id)">Update</button></td>
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
        <nav-side :classCustomer="classCustomer"/>
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
            <p>Home / Customers</p>
          </div>
            <div class="wrapper wrapper-content animated fadeInRight">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="ibox ">
                            <div class="ibox-content">
                              <div class="row">
                                <div class="col-sm-9 m-b-xs">
                                    <select v-model="operatorID" class="form-control m-b" @change="loadData(1)">
                                        <option disabled value="null" key="null">Please Select operator Name</option>
                                        <option v-for="op in operators" :value="op.id" :key="op">{{op.name}}</option>
                                    </select>
                                </div>
                                <div class="col-sm-3">
                                <!-- <div class="input-group" style="margin-bottom: 20px">
                                  <input v-model="searchResult" @change="getSearchResult" placeholder="Search" type="text" class="form-control form-control-sm"><span class="input-group-append">
                                      <button type="button"  @click="getSearchResult()" class="btn btn-sm btn-success">Search</button></span>
                                </div> -->
                                </div>
                              </div>
                                <div class="table-responsive">
                                    <table v-show="!messageCustomer  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                                        <thead>
                                            <tr>
                                                <th data-hide="phone,tablet">id(s)</th>
                                                <th data-hide="phone,tablet">Name</th>
                                                <th data-hide="phone,tablet">Contact</th>
                                                <th data-hide="phone,tablet">National ID</th>
                                            </tr>
                                        </thead>
                                        <tbody  v-if="result == true && errorResult === false">
                                            <tr v-for="cus in customers" :key="cus" class="gradeX" >
                                                <td class="center"><a data-toggle="modal" data-target="#myModal5" @click="viewCustomer(cus.id)">{{cus.id || 'Unknown'}}</a></td>
                                                <td class="center">{{cus.name || 'Unknown'}}</td>
                                                <td class="center">{{cus.contact1 || 'Unknown'}}</td>
                                                <td class="center">{{cus.nationalID || 'Unknown'}}</td>
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
                                  <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageCustomer" role="alert">{{messageCustomer}}</div>
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
    name: "Customer",
    data() {
        return {
            customers: null,
            customerName: null,
            selectedCustomer: null,
            result: true,
            message: '',
            searchResult: '',
            errorResult: false,
            mySearch: [],
          classCustomer: true,
          operators: null,
          operatorID: null,
          messageCustomer: null,
        };
    },
    methods: {
    //   getSearchResult() {
    //     if(this.searchResult.length === 0) {
    //       this.errorResult = false;
    //       this.message = "";
    //       this.loadData();
    //     }else {
    //       searchResult.findSearchResult(`customer?search=`, this.searchResult).then(response => {
    //         this.customers = response.data;
    //         this.errorResult = false;
    //         this.message = "";
    //         this.result = true;
    //         if (this.customers.length === 0) {
    //           this.errorResult = true;
    //           this.result = true;
    //           this.message = "No data available.";
    //         }
    //       })
    //      }
    //   },
      viewCustomer(value) {
            CarParkService.viewCarPark(`customer`, value) .then(response => {
                this.selectedCustomer = response.data;
                if (this.selectedCustomer.length === 0) {
                    this.messageCustomer =  "No data available.";
                }
            });
            this.customers.forEach((el) => {
                this.customerName = el.name
            })
      },
     
      loadData() {
        CarParkService.fetchAllData(`operator/${this.operatorID}/customer`) .then(response => {
            this.customers = response.data;
            this.messageCustomer = '';
            if (this.customers.length === 0) {
                this.messageCustomer =  "No data available.";
            }
        });

    },
    filterOperator() {
       CarParkService.fetchAllData(`operator`).then(response => {
        this.operators = response.data
        this.operatorID = response.data[1].id;
        this.loadData()
      });
    }
    },
  components: {
    NavSide
  },
    mounted() {
     this.filterOperator();
    }
};

</script>
