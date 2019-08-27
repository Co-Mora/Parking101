
<template>
  <div>
    <div id="wrapper">
      <nav-side :classProduct="classProduct" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">
          <p>Home / Car Park / Product</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox-content">
                <div class="ibox-content">
                  <h3>{{ 'Active Product Fees'}}</h3>
                  <div class="table-responsive">
                    <table v-show="!messageActive && !message" class="table table-bordered">
                      <thead>
                        <tr>
                          <th>Product Name</th>
                          <th>Status</th>
                          <th>Deposit</th>
                          <th>Establishment</th>
                          <th>Monthly</th>
                          <th>Quarterly</th>
                          <th>Half-Yearly</th>
                          <th>Annually</th>
                          <th>Lost Card</th>
                          <th>Damage Card</th>
                          <th>Start Date</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr
                          v-for="(fee, index) in carparkProductFees"
                          v-show="(fee.isActive == 1 && fee.isPast == 0)"
                          :key="index"
                          class="gradeX"
                        >
                          <td class="center">{{carparkProduct}}</td>
                          <td class="center">
                            <span
                              :class="{ 'label label-primary': (fee.isActive == 1 && fee.isPast == 0)}"
                              class="float-left label"
                            >{{ 'Active'}}</span>
                          </td>
                          <td class="center">{{fee.deposit}}</td>
                          <td class="center">{{fee.establishment}}</td>
                          <td class="center">{{fee.monthly}}</td>
                          <td class="center">{{fee.quarterly}}</td>
                          <td class="center">{{fee.halfYearly}}</td>
                          <td class="center">{{fee.annually}}</td>
                          <td class="center">{{fee.lost}}</td>
                          <td class="center">{{fee.damage}}</td>
                          <td class="center">{{fee.startDate}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-if="messageActive"
                      role="alert"
                    >{{messageActive}}</div>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-show="errorResult === true"
                      role="alert"
                    >{{message}}</div>
                  </div>
                </div>
                  <div class="ibox-content">
                      <h3>{{ 'Future Product Fees'}}</h3>
                      <div class="table-responsive">
                          <table v-show="!messageFuture && !message" class="table table-bordered">
                              <thead>
                              <tr>
                                  <th>Product Name</th>
                                  <th>Status</th>
                                  <th>Deposit</th>
                                  <th>Establishment</th>
                                  <th>Monthly</th>
                                  <th>Quarterly</th>
                                  <th>Half-Yearly</th>
                                  <th>Annually</th>
                                  <th>Lost Card</th>
                                  <th>Damage Card</th>
                                  <th>Start Date</th>
                              </tr>
                              </thead>
                              <tbody v-if="result == true && errorResult === false">
                              <tr
                                  v-for="(fee, index) in carparkProductFees"
                                  v-show="(fee.isActive == 0 && fee.isPast == 0)"
                                  :key="index"
                                  class="gradeX"
                              >
                                  <td class="center">{{carparkProduct}}</td>
                                  <td class="center">
                            <span
                                :class="{ 'label label-warning': (fee.isActive == 0 && fee.isPast == 0)}"
                                class="float-left label"
                            >{{'Future'}}</span>
                                  </td>
                                  <td class="center">{{fee.deposit}}</td>
                                  <td class="center">{{fee.establishment}}</td>
                                  <td class="center">{{fee.monthly}}</td>
                                  <td class="center">{{fee.quarterly}}</td>
                                  <td class="center">{{fee.halfYearly}}</td>
                                  <td class="center">{{fee.annually}}</td>
                                  <td class="center">{{fee.lost}}</td>
                                  <td class="center">{{fee.damage}}</td>
                                  <td class="center">{{fee.startDate}}</td>
                              </tr>
                              </tbody>
                          </table>
                          <div
                              class="alert alert-warning col-sm-12 m-b-xs"
                              v-if="messageFuture"
                              role="alert"
                          >{{messageFuture}}</div>
                          <div
                              class="alert alert-warning col-sm-12 m-b-xs"
                              v-show="errorResult === true"
                              role="alert"
                          >{{message}}</div>
                      </div>
                  </div>
                  <div class="ibox-content">
                      <h3>{{ 'Past Product Fees'}}</h3>
                      <div class="table-responsive">
                          <table v-show="!messagePast && !message" class="table table-bordered">
                              <thead>
                              <tr>
                                  <th>Product Name</th>
                                  <th>Status</th>
                                  <th>Deposit</th>
                                  <th>Establishment</th>
                                  <th>Monthly</th>
                                  <th>Quarterly</th>
                                  <th>Half-Yearly</th>
                                  <th>Annually</th>
                                  <th>Lost Card</th>
                                  <th>Damage Card</th>
                                  <th>Start Date</th>
                              </tr>
                              </thead>
                              <tbody v-if="result == true && errorResult === false">
                              <tr
                                  v-for="(fee, index) in carparkProductFees"
                                  v-show="(fee.isActive == 0 && fee.isPast == 1)"
                                  :key="index"
                                  class="gradeX"
                              >
                                  <td class="center">{{carparkProduct}}</td>
                                  <td class="center">
                            <span
                                :class="{ 'label label-default': (fee.isActive == 0 && fee.isPast == 1)}"
                                class="float-left label"
                            >{{'Past'}}</span>
                                  </td>
                                  <td class="center">{{fee.deposit}}</td>
                                  <td class="center">{{fee.establishment}}</td>
                                  <td class="center">{{fee.monthly}}</td>
                                  <td class="center">{{fee.quarterly}}</td>
                                  <td class="center">{{fee.halfYearly}}</td>
                                  <td class="center">{{fee.annually}}</td>
                                  <td class="center">{{fee.lost}}</td>
                                  <td class="center">{{fee.damage}}</td>
                                  <td class="center">{{fee.startDate}}</td>
                              </tr>
                              </tbody>
                          </table>
                          <div
                              class="alert alert-warning col-sm-12 m-b-xs"
                              v-if="messagePast"
                              role="alert"
                          >{{messagePast}}</div>
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
import NavSide from "../../NavSide";
import NavBar from "../../NavBar";
import MainFooter from "../../MainFooter";
import DateFormat from "../../../services/DateFormat";

import CarParkService from "../../../services/CarParkService";
import qs from "qs";


export default {
  name: "ViewCarParkFees",
  data() {
    return {
      carpark: [],
      carparkProduct: null,
      carparkProductID: null,
      carparkProductFees: null,

      zones: null,
      name: null,
      count: null,
      operatorID: null,

      operators: null,
      validated: false,
      carparkID: "null",
      zoneID: null,

      carparkName: null,
      zoneName: null,
      pg: 1,
      result: true,

      message: "",
      items: [],
        messageActive: "No Active Fees.",
        messageFuture: "No Future Fees.",
        messagePast: "No Past Fees.",
      searchResult: "",
      errorResult: false,
      classProduct: true
    };
  },
  methods: {
    loadCarParkProduct() {
      CarParkService.fetchAllData(
        `carpark/${this.$route.query.carparkID}/zone/${this.$route.query.zoneID}/season/${this.$route.query.seasonID}`
      ).then(response => {
        this.carparkProduct = response.data[0].name;
      });
    },
    loadCarParkProductFees() {
      CarParkService.fetchAllData(
        `season/${this.$route.query.seasonID}/seasonFees`
      ).then(response => {
        this.carparkProductFees = response.data;
        this.carparkProductFees.forEach(el => {
            if(el.isActive == 1 && el.isPast == 0) {
                this.messageActive = null;
            }
            if(el.isActive == 0 && el.isPast == 0) {
                this.messageFuture = null;
            }
            if(el.isActive == 0 && el.isPast == 1) {
                this.messagePast = null;
            }

        });
        DateFormat.dateStartProcess(this.carparkProductFees);
        if (this.carparkProductFees.length > 0) {
          this.loadCarParkProduct();
          this.classProduct = true;
        }
      });
    }
  },
  components: {
    NavSide,
    NavBar,
    MainFooter
  },
  mounted() {
    this.loadCarParkProductFees();
  }
};
</script>
