<template>
  <div>
    <div id="wrapper">
      <div id="page-wrapper" class="gray-bg">
        <NavBar/>
        <div class="ibox-title">
          <p>Home / Finance</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-content">
                  <div class="row"></div>
                  <div class="table-responsive">
                    <!-- <AppStaticTable :carpark="carpark"/> -->
                    <table v-show="!messageSource > 0 && !message" class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Payment ID</th>
                          <th>Amount</th>
                          <th>Currency</th>
                          <th>Remark</th>
                          <th>Bank Name</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="data in dataSource" :key="data" class="gradeX">
                          <td class="center">{{data.PaymentId}}</td>
                          <td class="center">{{data.Amount || 'Unknown'}}</td>
                          <td class="center">{{data.Currency}}</td>
                          <td class="center">{{data.Remark}}</td>
                          <td class="center">{{data.S_bankname}}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr></tr>
                      </tfoot>
                    </table>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-show="errorResult === true"
                      role="alert"
                    >{{message}}</div>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-if="messageSource"
                      role="alert"
                    >{{messageSource}}</div>
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
const axios = require("axios");
const CarParkService = require("../../services/CarParkService");
const qs = require("qs");
const DateFormat = require("../../services/DateFormat");

export default {
  name: "Fund",
  data() {
    return {
      carpark: null,
      carparkID: null,
      dataSource: null,

      operatorID: null,
      operators: null,

      validated: false,
      messageSeason: null,
      errorResult: false,
      result: true,
      isTerms: false,
      message: "",
      pag: 1
    };
  },
  
  methods: {
    loadData() {
      CarParkService.fetchAllData(`fund`).then(response => {
        this.dataSource = response.data.result;
        DateFormat.dateProcees(this.dataSource);
        this.messageSource = "";
        if (this.dataSource.length === 0) {
          this.messageSource = "No data available.";
        }
      });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
