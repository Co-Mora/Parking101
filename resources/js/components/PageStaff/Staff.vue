<template>
    <div>
         <div id="wrapper">
            <nav-side :classStaff="classStaff"/>
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
                <p>Home / Staffs</p>
              </div>
         <div class="wrapper wrapper-content animated fadeInRight">
            <div class="row">
                <div class="col-lg-12">
                    <div class="ibox ">

                        <div class="ibox-content">
                          <div class="row">
                            <div class="col-sm-12">
                              <div class="input-group" style="margin-bottom: 20px">
                                <input v-model="searchResult" @change="getSearchResult" placeholder="Search" type="text" class="form-control form-control-sm"><span class="input-group-append">
                                      <button type="button"  @click="getSearchResult()" class="btn btn-sm btn-success">Search</button></span>
                              </div>
                            </div>
                          </div>
                          <div class="table-responsive">
                            <table v-show="!messageStaff  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                              <thead>
                              <tr>
                                <th data-hide="phone,tablet">id(s)</th>
                                <th data-hide="phone,tablet">name</th>
                                <th data-hide="phone,tablet">Address</th>

                              </tr>
                              </thead>
                              <tbody>
                              <tr v-for="s in staff" :key="s" class="gradeU"  v-if="result == true && errorResult === false">
                                <td class="center">{{s.id || 'Unknown'}}</td>
                                <td class="center">{{s.name || 'Unknown'}}</td>
                                <td class="center">{{s.address || 'Unknown'}}</td>
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
                            <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageStaff" role="alert">{{messageStaff}}</div>

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
  name: "Zone",
  data() {
    return {
      staff: null,
      staffID: null,
     
      carparkID: null,
      result: true,
      message: '',
      messageStaff: null,
      searchResult: '',
      errorResult: false,
      mySearch: [],
      classStaff: true,
    };
  },
  methods: {
    getSearchResult() {
      if(this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        axios
          .get(
            `https://sys2.parkaidemobile.com/api/staffs`, {
              headers: {
                "x-access-token": JSON.parse(this.token)
              }
            }
          )
          .then(response => {
            this.staff = response.data;
            if (this.staff.length === 0) {
              this.message =  "No data available.";
            }
          });
      }
      axios
        .get(`https://sys2.parkaidemobile.com/api/staffs?search=${this.searchResult}`, {
          headers: {
            'x-access-token': JSON.parse(this.token)
          }
        })
        .then(response => {
          this.staff = response.data;
          this.errorResult = false;
          this.message = "";
          this.result = true;
          if (this.staff.length === 0) {
            this.errorResult = true;
            this.result = true;
            this.message =  "No data available.";
          }
        })

    },
     loadData() {
      CarParkService.fetchAllData('staff').then(response => {
          this.staff = response.data;
          this.messageStaff = "";
          if (this.staff.length === 0) {
            this.messageStaff =  "No data available.";
          } else {
            this.staffID = response.data[0].id;
          }


      });
    },
  },
  components :{
    NavSide
  },
  mounted() {
    this.loadData();
  }
};
</script>
