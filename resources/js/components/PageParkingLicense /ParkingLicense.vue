<template>
  <div>
    <!-- <ViewPasscard
      v-if="isBoxOpen"
      :isBoxOpen="isBoxOpen"
      @clicked-cancel="modalFunCancel"
      :dataOperator="dataOperator"
    />-->
    <div id="wrapper">
      <nav-side :classpassCardAll="classpassCardAll" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">
          <p>Home / Parking License / Parking License / Parking License Subscription</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-content">
                  <div class="row">
                    <div class="col-lg-6">
                      <paginate
                        v-show="!messageParking"
                        v-model="page"
                        :page-count="count"
                        :page-range="3"
                        :margin-pages="2"
                        :click-handler="paginateNum"
                        :prev-text="'Prev'"
                        :next-text="'Next'"
                        :container-class="'pagination'"
                        :page-class="'page-item'"
                      ></paginate>
                    </div>
                    <div class="col-sm-6">
                      <div class="input-group" style="margin-bottom: 20px">
                        <input
                          v-model="searchResult"
                          @change="getSearchResult"
                          placeholder="Search"
                          type="text"
                          class="form-control form-control-sm"
                        />
                        <span class="input-group-append">
                          <button
                            type="button"
                            @click="getSearchResult()"
                            class="btn btn-sm btn-success"
                          >Search</button>
                        </span>
                      </div>
                    </div>
                    <div class="col-sm-12 m-b-xs" style="margin-bottom:10px;">
                      <chosen-select
                        v-model="operatorID"
                        class="chosen-select form-control m-b"
                        v-if="operatorID && operators.length > 0"
                        data-vv-as="operatorID"
                        ref="input"
                        v-on:input="onChangeOperator(operatorID)"
                      >
                        <option disabled :value="null" key="null">Please Select Operator Name</option>
                        <option
                          v-for="(op, index) in operators"
                          :value="op.id"
                          :key="index"
                        >{{op.name}}</option>
                      </chosen-select>
                    </div>
                    <div class="col-sm-12 m-b-xs" style="margin-bottom:30px;">
                      <chosen-select
                        v-model="carparkID"
                        data-vv-as="carpark"
                        class="chosen-select form-control m-b"
                        @onchange="loadData(1)"
                        v-on:input="onChangeCarPark(carparkID)"
                      >
                        <option
                          :disabled="carparkID && carpark.length > 0"
                          selected
                          value="null"
                          key="null"
                        >{{!messagePasscard ? 'Please Select Car Park Name' : 'Please Select Car Park Name'}}</option>
                        <option
                          v-for="(car, index) in carpark"
                          :value="car.id"
                          :key="index"
                        >{{car.carparkCode + ' - '}}{{car.name}}</option>
                      </chosen-select>
                    </div>
                     <div class="col-sm-12 m-b-xs" style="margin-bottom:30px;">
                      <chosen-select
                        v-model="companyID"
                        data-vv-as="carpark"
                        class="chosen-select form-control m-b"
                        v-on:input="onChangeCompany(companyID)"
                      >
                        <option>Company</option>
                        <option>Personal</option>
                      </chosen-select>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table v-show="!messageParking && !message" class="table table-bordered">
                      <thead>
                        <tr>
                          <th data-hide="phone,tablet">No.</th>
                          <th data-hide="phone,tablet">Passcard Number</th>
                          <th data-hide="phone,tablet">Passcard Type</th>
                          <th data-hide="phone,tablet">Movement</th>
                          <th data-hide="phone,tablet">Condition</th>
                          <th data-hide="phone,tablet">Is Blocked</th>
                          <th data-hide="phone,tablet">Subscription</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="(data, index) in dataSource" :key="index" class="gradeU">
                          <td class="center">{{data.count}}</td>
                          <td class="center">
                            <a
                              style="color:#3498db"
                              data-toggle="modal"
                              data-target="#myModalUpdate"
                              @click="viewPasscard(data.id)"
                            >{{data.sku || 'NA'}}</a>
                          </td>
                          <td class="center">{{data.passtypeID || 'NA'}}</td>
                          <td class="center">{{data.movement || 'NA'}}</td>
                          <td class="center">{{data.conditions || 'NA'}}</td>
                          <td class="center">{{data.isBlocked == 0 ? 'Not Blocked' : 'Blocked'}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="alert alert-primary col-sm-12 m-b-xs"
                      v-show="errorResult === true && !messageParking"
                      role="alert"
                    >{{message}}</div>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-if="messageParking"
                      role="alert"
                    >{{messageParking}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MainFooter />
      </div>
    </div>
  </div>
</template>

<script>

import NavBar from "../NavBar";
import NavSide from "../NavSide";
import MainFooter from "../MainFooter";
import SearchData from "../../services/SearchData";

import DateFormat from "../../services/DateFormat";

import DateFormat from "../../services/DateFormat";
import LastUpdatedDate from "../../services/LastUpdatedDate";
import CarParkService from "../../services/CarParkService";
import Sequence from "../../services/Sequence";


export default {
  name: "ParkingLicense",
  data() {
    return {
      carpark: "",
      carparkID: "",
      companyID: "",
      customers: "",
      customerID: null,
      dataSource: null,
      classpassCardAll: true,
      dataOperator: [],
      operatorID: null,
      operators: null,
      count: null,
      validated: false,
      errorResult: false,
      result: true,
      message: "",
      messageParking: "",
      pag: 1,
      isBoxOpen: false
    };
  },
  components: {
    NavSide,
    NavBar,
    MainFooter
    // ViewPasscard
  },
  methods: {
    paginateNum(pageNum) {
      this.loadData(pageNum);
    },
    onChangeOperator: function(val) {
      this.filterCarPark(1);
    },
    onChangeCarPark: function(val) {
      this.loadData(1);
    },
    onChangeCompany: function(val) {
      this.filterCompany(val);
    },
    modalFunCancel(value) {
      this.isBoxOpen = value;
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.loadData();
      }
      SearchData.findSearchResult(
        `operator/${this.operatorID}/carpark/${this.carparkID}/passcard?search=${this.searchResult}`
      ).then(response => {
        this.dataSource = response.data.result;
        DateFormat.dateProcees(this.dataSource);
        Sequence.dataSequences(this.dataSource, 1, this.count);
        this.loadData1();
        this.errorResult = false;
        this.message = "";
        this.result = true;
        if (this.dataSource.length === 0) {
          this.errorResult = true;
          this.result = true;
          this.message = "No data available.";
        }
      });
    },
    viewPasscard(value) {
      $("#myModalView").modal("show");
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/passcard/${value}`
      ).then(response => {
        this.dataOperator = response.data;
        this.isBoxOpen = true;
      });
    },
    filterOperator() {
      CarParkService.fetchAllData(`operator`)
        .then(response => { 
          this.operators = response.data;
          this.operatorID = response.data[1].id;
          this.filterCarPark();
        })
        .catch(ex => {
          window.location.href = "/login";
        });
    },
    filterCarPark() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark?sort=createDate`
      ).then(response => {
        this.carpark = response.data.result;
        this.carparkID = response.data.result[0].id;
        if (this.carpark.length === 0) {
          this.messageParking = "No data available.";
        }
        DateFormat.dateProcees(this.carpark);
        LastUpdatedDate.dataSorting(this.carpark);
        this.loadData();
      });
    },
    filterCompany(val) {
        CarParkService.fetchAllData(`operator/${this.operatorID}/customer?carparkID=${this.carparkID}&isCompany=${val}`)
        .then(response => {
          this.customers = response.data.result;
          this.customerID = response.data.result[0].id;
          this.loadData();
        })
    },
    loadData(value = 1) {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark/${this.carparkID}/license?isCompany=${this.companyID}&customerID=${this.customerID}&page=${value}&sort=createDate`
      ).then(response => {
        this.dataSource = response.data.result;
        DateFormat.dateProcees(this.dataSource);
        this.count = Math.ceil(response.data.count / 100);
        if (this.dataSource.length < 100) {
          this.count = value;
        }
        Sequence.dataSequences(this.dataSource, value, this.count);

        this.messageParking = "";
        if (this.dataSource.length === 0) {
          this.messageParking = "No data available.";
        }
      });
    },
  },
  mounted() {
    this.filterOperator();

  }
};
</script>

