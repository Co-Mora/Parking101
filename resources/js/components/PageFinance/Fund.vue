<template>
  <div>
    <div id="wrapper">
      <nav-side :classFinance="classFinance" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">
          <p>Home / Transaction / ParkBills / Online Banking</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-content">
                  <div class="row">
                    <div class="col-lg-6">
                      <paginate
                        v-if="!messageSource"
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
                      <div v-if="!messageError" class="input-group" style="margin-bottom: 20px">
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
                    <div class="table-responsive">
                      <table
                        v-show="!messageSource && !message"
                        v-if="!messageError"
                        class="table table-bordered"
                      >
                        <thead>
                          <tr>
                            <th>NO.</th>
                            <th>Ref. No.</th>
                            <th>Date</th>
                            <th>Transaction Date</th>
                            <th>Transaction ID</th>
                            <th>Auth. Code</th>
                            <th>Payment Method</th>
                            <th>Bank Name</th>
                            <th>CC Name</th>
                            <th>CC No</th>
                            <th>Remark</th>
                            <th>Currency</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Receipt No.</th>
                          </tr>
                        </thead>
                        <tbody v-if="result == true && errorResult === false">
                          <tr v-for="(data, index) in dataSource" :key="index" class="gradeX">
                            <td class="center">{{data.count}}</td>
                            <td class="center">{{data.RefNo}}</td>
                            <td class="center">{{data.createDate || 'Unknown'}}</td>
                            <td class="center">{{data.TranDate}}</td>
                            <td class="center">{{data.TransId}}</td>
                            <td class="center">{{data.AuthCode}}</td>
                            <td class="center">{{data.PaymentId}}</td>
                            <td class="center">{{data.S_bankname || 'NA'}}</td>
                            <td class="center">{{data.CCName || 'NA'}}</td>
                            <td class="center">{{data.CCNo || 'NA'}}</td>
                            <td class="center">{{data.Remark}}</td>
                            <td class="center">{{data.Currency}}</td>
                            <td class="center">{{data.Amount}}</td>
                            <td
                              class="center"
                            >{{data.Status == 1 ? 'Success': data.Status == 0 ? 'Fail' : data.Status == 6 ? 'Pending Authorization' : 'NA'}}</td>
                            <td class="center">
                              <a
                                v-if="data.path"
                                style="color:#3498db"
                                :href="`/transaction/receipt/view?receiptID=${data.path}`"
                              >{{'OR' + data.carparkCode + '-' + data.receiptNum}}</a>
                              {{!data.path ? 'N/A' : ''}}
                            </td>
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
                      <div
                        class="alert alert-danger col-sm-12 m-b-xs"
                        v-if="messageError"
                        role="alert"
                      >{{messageError}}</div>
                    </div>
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
import qs from "qs";

import NavBar from "../NavBar";
import NavSide from "../NavSide";
import MainFooter from "../MainFooter";
import SearchData from "../../services/SearchData";

import DateFormat from "../../services/DateFormat";
import LastUpdatedDate from "../../services/LastUpdatedDate";
import CarParkService from "../../services/CarParkService";
import Sequence from "../../services/Sequence";

export default {
  name: "Fund",
  data() {
    return {

      carpark: null,
      carparkID: null,
      data1: [],
      dataSource: [],

      operatorID: null,
      operators: null,

      validated: false,
      messageSeason: null,
      errorResult: false,
      result: true,
      classFinance: true,
      searchResult: "",
      selectedFund: null,

      detailsData: null,
      messageError: "",
      isTerms: false,
      message: "",
      pag: 1,

      count: null
    };
  },
  components: {
    NavSide,
    NavBar,
    MainFooter
  },
  methods: {
    paginateNum(pageNum) {
      this.loadData(pageNum);
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.loadData(1);
        return 0;
      }
      SearchData.findSearchResult(
        `fund/online?search=${this.searchResult}`
      ).then(response => {
        this.dataSource = response.data.result;
        DateFormat.dateProcees(this.dataSource);
        Sequence.dataSequences(this.dataSource, 1, this.count);

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
    loadData(value = 1) {
      CarParkService.fetchAllData(`fund/online?page=${value}&sort=createDate`)
        .then(response => {
          if (response.data.result.length === 0) {
            this.dataSource = [];
          }
          this.dataSource = response.data.result;
          this.count = Math.ceil(response.data.count / this.dataSource.length);
          if (this.dataSource.length < 100) {
            this.count = value;
          }
          Sequence.dataSequences(this.dataSource, value, this.count);

          this.dataSource.forEach(el => {
            if (parseInt(el.PaymentId) == 6) {
              el.PaymentId = "Maybank2U";
            }
            if (parseInt(el.PaymentId) == 2) {
              el.PaymentId = "Credit Card (RM)";
            }
            if (parseInt(el.PaymentId) == 210) {
              el.PaymentId = "Boost Wallet";
            }

            if (parseInt(el.PaymentId) == 270) {
              el.PaymentId = "FPX_B2B_UOB";
            }
            if (parseInt(el.PaymentId) == 271) {
              el.PaymentId = "FPX_B2B_BRakyat";
            }
            if (parseInt(el.PaymentId) == 272) {
              el.PaymentId = "FPX_B2B_ALB";
            }
            if (parseInt(el.PaymentId) == 273) {
              el.PaymentId = "FPX_B2B_Affin";
            }
            if (parseInt(el.PaymentId) == 274) {
              el.PaymentId = "FPX_B2B_CIMB";
            }
            if (parseInt(el.PaymentId) == 275) {
              el.PaymentId = "FPX_B2B_BIMB";
            }
            if (parseInt(el.PaymentId) == 276) {
              el.PaymentId = "FPX_B2B_M2U";
            }
            if (parseInt(el.PaymentId) == 277) {
              el.PaymentId = "FPX_B2B_Ambank";
            }
            if (parseInt(el.PaymentId) == 278) {
              el.PaymentId = "FPX_B2B_HLB";
            }
            if (parseInt(el.PaymentId) == 279) {
              el.PaymentId = "FPX_B2B_PBB";
            }
            if (parseInt(el.PaymentId) == 280) {
              el.PaymentId = "FPX_B2B_RHB";
            }
            if (parseInt(el.PaymentId) == 281) {
              el.PaymentId = "FPX_B2B_Muamalat";
            }
            if (parseInt(el.PaymentId) == 282) {
              el.PaymentId = "FPX_B2B_HSBC";
            }
            if (parseInt(el.PaymentId) == 283) {
              el.PaymentId = "FPX_B2B_KFH";
            }
            if (parseInt(el.PaymentId) == 285) {
              el.PaymentId = "FPX_B2B_OCBC";
            }
            if (parseInt(el.PaymentId) == 286) {
              el.PaymentId = "FPX_B2B_SCB";
            }
          });
          this.loadData1();
        })
        .catch(ex => {
          this.$router.push({ path: "/v1/login" });
        });
    },
    loadData1() {
      CarParkService.fetchAllData(`receipt`).then(response => {
        this.dataPath = response.data.result;
        DateFormat.dateProcees(this.dataSource);
        this.messageSource = "";
        if (this.dataSource.length > 0) {
          this.loadData2();
        } else {
          this.messageSource = "No data available.";
        }
      });
    },
    loadData2() {
      this.dataSource.forEach(el => {
        this.dataPath.forEach(ee => {
          if (el.RefNo == ee.collectionID) {
            el.path = ee.collectionID;
            el.receiptNum = ee.receiptNum;
            el.carparkID = ee.carparkID;
            // this.loadCarPark(ee.carparkID);
          }
        });
      });
      this.messageSource = "";
      if (this.dataSource.length === 0) {
        this.messageSource = "No data available.";
      }
    }
    // loadCarPark(val) {
    //   CarParkService.fetchAllData(`carpark?carparkID=${val}`).then(response => {
    //     if (response.data.result.length !== 0) {
    //       response.data.result.forEach(el => {
    //         this.dataSource.forEach(ell => {
    //           this.dataPath.forEach(ee => {
    //             if (ell.RefNo == ee.collectionID) {
    //               console.log(el.carparkCode);
    //               ell.carparkCode = el.carparkCode;
    //             }
    //           });
    //         });
    //       });
    //     }
    //   });
    // }
  },
  mounted() {
    this.loadData();
  }
};
</script>
