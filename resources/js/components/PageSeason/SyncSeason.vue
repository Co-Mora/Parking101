<template>
  <div>
    <div id="wrapper">
      <nav-side :classSeason="classSeason" />
      <div id="page-wrapper" class="gray-bg">
        <NavBar />
        <div class="ibox-title">Home / Season / SyncSeason</div>
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
                            <th>Car Park Name</th>
                            <th>Mobile</th>
                            <th>Operator Name</th>
                            <th>Season Date</th>
                          </tr>
                        </thead>
                        <tbody v-if="result == true && errorResult === false">
                          <tr v-for="(data, index) in dataSource" :key="index" class="gradeX">
                            <td class="center">{{data.count}}</td>
                            <td class="center">{{data.carparkName || 'N/A'}}</td>
                            <td class="center">{{data.mobile || 'N/A'}}</td>
                            <td class="center">{{data.operatorName}}</td>
                            <td class="center">{{data.createDate}}</td>
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
  name: "SyncSeason",
  data() {
    return {
      classSeason: true,
      carpark: null,
      data1: [],
      dataSource: [],
      dataPath: [],
      operatorID: null,
      operators: null,

      validated: false,
      messageSeason: null,
      errorResult: false,
      result: true,
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
        `sync/season?search=${this.searchResult}`
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
      CarParkService.fetchAllData(`sync/season?page=${value}&sort=createDate`)
        .then(response => {
          if (response.data.result.length === 0) {
            this.dataSource = [];
            this.messageSource = "No data available.";
          }
          this.dataSource = response.data.result;

          this.count = Math.ceil(response.data.count / this.dataSource.length);
          if (this.dataSource.length < 100) {
            this.count = value;
          }
          DateFormat.dateProcees(this.dataSource);
          Sequence.dataSequences(this.dataSource, value, this.count);
        })
        .catch(ex => {
          this.$router.push({ name: "login" });
        });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
