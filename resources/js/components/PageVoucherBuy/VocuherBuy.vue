

<template>

  <div v-show="isLoggedIn">
    <div id="wrapper">
     <NavSide :classVoucherBuy="classVoucherBuy"/>
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
          <p>Home / VoucherBuy</p>
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
                    <table v-show="!messageVoucher  && !message" class="table table-striped table-bordered table-hover dataTables-example">
                      <thead>
                      <tr>
                        <th data-hide="phone,tablet">id(s)</th>
                        <th data-hide="phone,tablet">Mobile</th>
                        <th data-hide="phone,tablet">Name</th>
                        <th data-hide="phone,tablet">Email</th>
                        <th data-hide="phone,tablet">Voucher Name</th>
                        <th data-hide="phone,tablet">Image</th>

                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="voucher in voucherBuy" :key="voucher" class="gradeX"  v-if="result == true && errorResult === false">
                        <td class="center">{{voucher.voucherID || 'Unknown'}}</td>
                        <td class="center">{{voucher.mobile || 'Unknown'}}</td>
                        <td class="center">{{voucher.SubscriberName || 'Unknown'}}</td>
                        <td class="center">{{voucher.email || 'Unknown'}}</td>
                        <td class="center">{{voucher.VoucherName || 'Unknown'}}</td>
                        <td class="center">{{voucher.image || 'Unknown'}}</td>
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
                    <div class="alert alert-warning col-sm-12 m-b-xs" v-if="messageVoucher" role="alert">{{messageVoucher}}</div>

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
    name: "VoucherBuy",
    data() {
      return {
        voucherBuy: null,
        token: localStorage.getItem("token"),
        isLoggedIn: localStorage.getItem("isLogged"),
        result: true,
        message: '',
        searchResult: '',
        errorResult: false,
        classVoucherBuy: true,
        messageVoucher: null,
      };
    },
    methods: {
      getSearchResult() {
        if(this.searchResult.length === 0) {
          this.errorResult = false;
          this.message = "";
          axios
            .get(
              `https://sys2.parkaidemobile.com/api/voucherBuy`, {
                headers: {
                  "x-access-token": JSON.parse(this.token)
                }
              }
            )
            .then(response => {
              this.voucherBuy = response.data;
            });
        }
        axios
          .get(`https://sys2.parkaidemobile.com/api/voucherBuy?search=${this.searchResult}`, {
            headers: {
              'x-access-token': JSON.parse(this.token)
            }
          })
          .then(response => {
            this.voucherBuy = response.data;
            this.errorResult = false;
            this.message = "";
            this.result = true;
            if (this.voucherBuy.length === 0) {
              this.errorResult = true;
              this.result = true;
              this.message = "No data available.";
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
          `https://sys2.parkaidemobile.com/api/voucherBuy`, {
            headers: {
              "x-access-token": JSON.parse(this.token)
            }
          }
        )
        .then(response => {
          this.voucherBuy = response.data;
          this.messageVoucher = '';
          if (this.voucherBuy.length === 0) {
            this.messageVoucher = "No data available.";
          }
        });
    }
  };

</script>
