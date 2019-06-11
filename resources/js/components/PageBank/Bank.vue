

<template>

<div v-show="isLoggedIn">
    <div id="wrapper">
      <div class="modal inmodal fade" id="myModal5" tabindex="-1" role="dialog" aria-hidden="true">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                  <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                      <h4 class="modal-title">{{bankName}}</h4>
                  </div>
                  <div class="modal-body">
                      <div class="table-responsive">
                          <table class="table table-striped table-bordered table-hover dataTables-example">
                              <thead>
                                  <tr>
                                      <th data-hide="phone,tablet">name</th>
                                      <th data-hide="phone,tablet">Created Date</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <span v-show="selectedBank == 0" style="font-size: 20px;">{{message}}</span>
                                  <tr v-for="bank in selectedBank" :key="bank" class="gradeX">
                                      <td class="center">{{bank.name || 'Unknown'}}</td>
                                      <td class="center">{{bankDate || 'Unknown'}}</td>
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
       <NavSide :classBank="classBank"/>
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
            <div class="ibox-title">
              <p>Home / Bank</p>
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
                                    <table v-show="!messageBank  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                                        <thead>
                                            <tr>
                                                <th data-hide="phone,tablet">id(s)</th>
                                                <th data-hide="phone,tablet">Name</th>
                                                <th data-hide="phone,tablet">Image</th>
                                            </tr>
                                        </thead>
                                        <tbody  v-if="result == true && errorResult === false">
                                            <tr v-for="b in banks" :key="b" class="gradeX">
                                                <td class="center"><a data-toggle="modal" data-target="#myModal5" @click="viewBank(b.id)">{{'Bank: ' + b.id || 'Unknown'}}</a></td>
                                                <td class="center">{{b.name || 'Unknown'}}</td>
                                                <td class="center">{{b.image || 'Unknown'}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="alert alert-warning col-sm-12 m-b-xs" v-show="errorResult === true" role="alert">{{message}}</div>
                                  <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageBank" role="alert">{{messageBank}}</div>

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

import axios from "axios";
import NavSide from '../App/NavSide'


export default {
    name: "Customer",
    data() {
        return {
            banks: null,
            bankName: null,
            bankDate: null,
            selectedBank: null,
            token: localStorage.getItem("token"),
            isLoggedIn: localStorage.getItem("isLogged"),
            result: true,
            message: '',
            searchResult: '',
            errorResult: false,
            mySearch: [],
            classBank: true,
            messageBank: null
        };
    },
    methods: {
      getSearchResult() {
        if(this.searchResult.length === 0) {
          this.errorResult = false;
          this.message = "";
          axios
            .get(
              `https://sys2.parkaidemobile.com/api/banks`, {
                headers: {
                  "x-access-token": JSON.parse(this.token)
                }
              }
            )
            .then(response => {
              this.banks = response.data;
              if (this.banks.length === 0) {
                this.message = "No data available.";
              }
            });
        }
        axios
          .get(`https://sys2.parkaidemobile.com/api/banks?search=${this.searchResult}`, {
            headers: {
              'x-access-token': JSON.parse(this.token)
            }
          })
          .then(response => {
            this.banks = response.data;
            this.errorResult = false;
            this.message = "";
            this.result = true;
            if (this.banks.length === 0) {
              this.errorResult = true;
              this.result = true;
              this.message ="No data available.";
            }
          })

      },
      viewBank(value) {
          axios
              .get(
                  `https://sys2.parkaidemobile.com/api/banks/${value}`, {
                      headers: {
                          "x-access-token": JSON.parse(this.token)
                      }
                  }
              )
              .then(response => {
                  this.selectedBank = response.data;

                  if (this.selectedBank.length === 0) {
                      this.messageBank = "No data available.";
                  }
              });
              var date;
              var hours;
              var minutes;
              var seconds;
              var formattedTime;
              this.banks.forEach((el) => {
                 if(el.id === value) {
                   date = new Date(el.createDate*1000);
                   hours = date.getHours();
                   minutes = "0" + date.getMinutes();
                   seconds = "0" + date.getSeconds();
                   formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                   this.bankDate = formattedTime
                 }
              })
              this.banks.forEach((el) => {
                    if(value === el.id) {
                      this.bankName = el.name
                    }
              })
      },
      logout() {
        localStorage.removeItem('isLogged');
        localStorage.removeItem('token');
      }
    },
    components: {
      NavSide
    },
    mounted() {
      axios
          .get(
              `https://sys2.parkaidemobile.com/api/banks`, {
                  headers: {
                      "x-access-token": JSON.parse(this.token)
                  }
              }
          )
          .then(response => {
              this.banks = response.data;
              this.messageBank = '';
              if (this.banks.length === 0) {
                  this.messageBank = "No data available.";
              }
          });
    }
};

</script>
