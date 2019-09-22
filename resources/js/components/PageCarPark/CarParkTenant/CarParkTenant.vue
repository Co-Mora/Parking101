
<template>
  <div>
    <ViewCarParkTenantDetails
      v-if="isBoxOpen"
      :isBoxOpen="isBoxOpen"
      @clicked-cancel="modalFunCancel"
      :tenantNameModel="tenantNameModel"
      :tenantTypeModel="tenantTypeModel"
      :carparkName="carparkName"
      :carparkNameCode="carparkNameCode"
    />
    <div id="wrapper">
      <nav-side :classCarParkTenant="classCarParkTenant" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">
          <p>Home / Car Park Tenant</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox-content">
                <div class="ibox-content">
                  <div class="row">
                    <div class="col-lg-6">
                      <div
                        style="margin-bottom: 10px;"
                      >{{'View ' + start + '-' + end + ' ' + ' of ' + ' ' + total}}</div>
                      <paginate
                        v-show="!messageSource"
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
                        <option disabled :value="null" key="null">{{title}}</option>
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
                        data-vv-as="carparkID"
                        class="chosen-select form-control m-b"
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
                  </div>
                  <div class="table-responsive">
                    <table v-show="!messageSource && !message" class="table table-bordered">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Car Park</th>
                          <th>Tenant Name</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="(tenant, index) in tenants" :key="index" class="gradeX">
                          <td class="center">{{tenant.count}}</td>
                          <td class="center">{{carparkName}}</td>
                          <td class="center">
                            <a
                              style="color:#3498db"
                              data-toggle="modal"
                              data-target="#myModalView"
                              @click="viewCarParkDetail(tenant.tenantNum, tenant.type)"
                            >{{tenant.tenantNum}}</a>
                          </td>
                          <td class="center">{{tenant.type}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-if="messageSource"
                      role="alert"
                    >{{messageSource}}</div>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-show="errorResult === true"
                      role="alert"
                    >{{message}}</div>
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
import NavBar from "../../NavBar";
import NavSide from "../../NavSide";
import MainFooter from "../../MainFooter";
import SearchData from "../../../services/SearchData";

import DateFormat from "../../../services/DateFormat";
import CarParkService from "../../../services/CarParkService";
import Sequence from "../../../services/Sequence";
import ViewCarParkTenantDetails from "./ViewCarTenantDetails";
export default {
  name: "CarParkTenant",
  data() {
    return {
      isBoxOpen: false,

      carpark: [],
      tenants: null,
      name: null,
      count: null,
      operatorID: null,
      operators: null,
      total: null,
      start: 1,
      end: 100,
      validated: false,
      customers: null,
      carparkID: "null",
      tenantID: null,
      carparkName: null,
      pg: 1,
      result: true,
      message: "",
      messageSource: null,
      searchResult: "",
      errorResult: false,
      classCarParkTenant: true,
      tenantNameModel: null,
      tenantTypeModel: null,
      carparkNameCode: null
    };
  },
  methods: {
    onChangeOperator: function(val) {
      this.loadData();
    },
    onChangeCarPark: function(val) {
      this.loadTenant();
    },
    modalFunCancel(value) {
      this.isBoxOpen = value;
    },
    paginateNum(pageNum) {
      this.pg = pageNum;
      this.loadTenant(pageNum);
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.loadTenant();
      }

      SearchData.findSearchResult(
        `tenant?search=${this.searchResult}&carparkID=${this.carparkID}`
      ).then(response => {
        this.tenants = response.data.result;
        DateFormat.dateProcees(this.tenants);
        Sequence.dataSequences(this.tenants, 1, this.count);
        this.errorResult = false;
        this.message = "";
        this.result = true;
        if (this.tenants.length === 0) {
          this.errorResult = true;
          this.result = true;
          this.message = "No data available.";
        }
      });
    },
    loadTenant(value = 1) {
      CarParkService.viewData(
        `operator/${this.operatorID}/carpark/${this.carparkID}/tenant?sort=createDate`
      ).then(response => {
        this.tenants = response.data.result;
        this.total = response.data.count;

        this.tenants.forEach(el => {
          this.customers.forEach(ee => {
            if (el.customerID === ee.id) {
              el.tenantNum = ee.name;
              if (ee.isCompany == 1) {
                el.type = "Company";
              } else {
                el.type = "Personal";
              }
            }
          });
        });

        this.count = Math.ceil(response.data.count / 100);
        if (this.tenants.length < 100) {
          this.count = value;
        }
        DateFormat.dateProcees(this.tenants);
        Sequence.dataSequences(this.tenants, value, this.count);
        this.loadCarParkName();

        if (value == 1) {
          this.start = 1;
          this.end = 100;
        } else {
          if (value === this.count && this.carpark.length < 100) {
            this.start = Sequence.handleViewSquence();
            this.end = this.total;
          } else {
            this.start = Sequence.handleViewSquence() - 100;
            this.end = Sequence.handleEndSquence() - 101;
          }
        }
        this.messageSource = "";
        if (this.tenants.length === 0) {
          this.messageSource = "No data available.";
        }
      });
    },
    viewCarParkDetail(tenantName, tenantType) {
      $("#myModalView").modal("show");
      this.tenantNameModel = tenantName;
      this.tenantTypeModel = tenantType;
      this.isBoxOpen = false;
      setTimeout(() => {
        this.isBoxOpen = true;
        $("#myModalView").modal("hide");
      }, 200);
    },
    loadData() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark?sort=createDate`
      ).then(response => {
        this.carpark = response.data.result;
        if (this.carpark.length === 0) {
          this.messageSource = "No data available.";
        }
        this.carparkID = response.data.result[0].id;
        this.loadCustomers();
        this.loadTenant();
      });
    },
    loadCarParkName() {
      CarParkService.fetchAllData(
        `operator/${this.operatorID}/carpark/${this.carparkID}`
      ).then(response => {
        this.carparkName = response.data[0].name;
        this.carparkNameCode = response.data[0].carparkCode;
      });
    },
    loadCustomers() {
      CarParkService.fetchAllData(`operator/${this.operatorID}/customer`).then(
        response => {
          this.customers = response.data.result;
        }
      );
    },
    filterOperator() {
      CarParkService.fetchAllData("operator?sort=createDate")
        .then(response => {
          this.operators = response.data.result;
          if (this.operators.length > 0) {
            this.operatorID = response.data.result[1].id;
            this.loadData();
          } else {
            this.messageSource = "No data available.";
          }
        })
        .catch(ex => {
          this.$router.push({ path: "/v1/login" });
        });
    }
  },
  components: {
    NavSide,
    NavBar,
    MainFooter,
    ViewCarParkTenantDetails
  },
  mounted() {
    this.filterOperator();
  }
};
</script>
