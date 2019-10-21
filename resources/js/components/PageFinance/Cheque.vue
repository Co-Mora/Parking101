<template>
  <div>
    <div id="wrapper">
      <nav-side :classCheque="classCheque" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">Home / Transaction / ParkBills / Cheque</div>
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
                            <th>Date</th>
                            <th>Cheque Date</th>
                            <th>Transaction ID</th>
                            <th>Bank Code</th>
                            <th>Bank Name</th>
                            <th>Cheque No</th>
                            <th>Ref. No</th>
                            <th>Staff No.</th>
                            <th>Staff Name</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Receipt No.</th>
                          </tr>
                        </thead>
                        <tbody v-if="result == true && errorResult === false">
                          <tr v-for="(data, index) in dataSource" :key="index" class="gradeX">
                            <td class="center">{{data.count}}</td>
                            <td class="center">{{data.createDate || 'N/A'}}</td>
                            <td class="center">{{data.ChequeDate || 'N/A'}}</td>
                            <td class="center">{{data.TransId}}</td>
                            <td class="center">{{data.BankCode}}</td>
                            <td class="center">{{data.BankName}}</td>

                            <td class="center">{{data.ChequeNumber}}</td>
                            <td class="center">{{data.RefNo}}</td>
                            <td class="center">{{data.personnelCode || 'N/A'}}</td>
                            <td class="center">{{data.staffName || 'N/A'}}</td>
                            <td class="center">{{parseFloat(data.Amount) || 'N/A'}}</td>
                            <td class="center">{{data.Status ? 'Success' : 'Failed'}}</td>
                            <td class="center">
                              <a
                                v-if="data.path"
                                style="color:#3498db"
                                :href="`/v1/transaction/receipt/view?receiptID=${data.path}`"
                              >{{'OR' + data.carparkID + '-' + data.receiptNum}}</a>
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
import Sequence from "../../services/Sequence";

import DateFormat from "../../services/DateFormat";
import LastUpdatedDate from "../../services/LastUpdatedDate";
import CarParkService from "../../services/CarParkService";

export default {
  name: "Cheque",
  data() {
    return {
      carpark: null,
      data1: [],
      dataSource: [],

      operatorID: null,
      operators: null,

      validated: false,
      messageSeason: null,
      errorResult: false,
      result: true,
      classCheque: true,
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
      parseFloat;
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.loadData(1);
        return 0;
      }
      SearchData.findSearchResult(
        `fund/check?search=${this.searchResult}`
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
      CarParkService.fetchAllData(`fund/check?page=${value}&sort=createDate`)
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
          this.loadData1();
        })
        .catch(ex => {
          this.$route.push({ path: "/v1/login" });
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
            //this.loadCollection(ee.collectionID);
          }
        });
      });
      this.messageSource = "";
      if (this.dataSource.length === 0) {
        this.messageSource = "No data available.";
      }
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
