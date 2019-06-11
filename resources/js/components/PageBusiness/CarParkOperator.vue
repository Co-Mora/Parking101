<template>
  <div>
    <ViewOperator
      v-if="isBoxOpen"
      :isBoxOpen="isBoxOpen"
      @clicked-cancel="modalFunCancel"
      @updatedItem="updatedOperator"
      :dataOperator="dataOperator"
    />
    <AddOperator
      v-if="isBoxOpenAdd"
      :isBoxOpenAdd="isBoxOpenAdd"
      @create-cancel="modalCreateCancel"
      @createdItem="createdOperator"
    />
    <div id="wrapper">
      <nav-side :classOperator="classOperator"/>
      <div id="page-wrapper" class="gray-bg">
        <NavBar/>
        <div class="ibox-title">
          <p>Home / Business / Car Park Operator / Car Park Operator</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-content">
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="input-group" style="margin-bottom: 20px">
                        <button
                          @click="createModal"
                          class="btn btn-rounded btn-w-m btn-outline-primary"
                        >Create New Operator</button>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <paginate
                        v-show="!messageOperator"
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
                        >
                        <span class="input-group-append">
                          <button
                            type="button"
                            @click="getSearchResult()"
                            class="btn btn-sm btn-success"
                          >Search</button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table v-if="!messageOperator && !message" class="table table-bordered">
                      <thead>
                        <tr>
                          <th data-hide="phone,tablet">No.</th>
                          <th data-hide="phone,tablet">CPO ID</th>
                          <th data-hide="phone,tablet">CPO Code</th>
                          <th data-hide="phone,tablet">CPO Name</th>
                          <th data-hide="phone,tablet">Contact Person Name</th>
                          <th data-hide="phone,tablet">Mobile No</th>
                          <th data-hide="phone,tablet">Email</th>
                          <th data-hide="phone,tablet">Date Created</th>
                          <th data-hide="phone,tablet">Status</th>
                        </tr>
                      </thead>
                      <tbody v-if="result == true && errorResult === false">
                        <tr v-for="(data, index) in dataSource" :key="index" class="gradeU">
                          <td class="center">{{data.count}}</td>
                          <td class="center">{{data.id || 'NA'}}</td>
                          <td class="center">{{data.code || 'N/A'}}</td>
                          <td class="center">
                            <a
                              style="color:#3498db"
                              data-toggle="modal"
                              data-target="#myModalView"
                              @click="viewOperator(data.id)"
                            >{{data.name || 'NA'}}</a>
                          </td>
                          <td class="center">{{data.pic || 'N/A'}}</td>
                          <td class="center">{{data.mobile || 'N/A'}}</td>
                          <td class="center">{{data.email || 'N/A'}}</td>
                          <td class="center">{{data.createDate || 'N/A'}}</td>
                          <td class="center">
                            <span
                              :class="{ 'label label-primary': data.isEnable == 1, 'label-danger': data.isEnable == 0 }"
                              class="float-left label"
                            >{{data.isEnable == 1 ? 'Enable' : 'Disable'}}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div
                      class="alert alert-primary col-sm-12 m-b-xs"
                      v-show="errorResult === true && !messageOperator"
                      role="alert"
                    >{{message}}</div>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-if="messageOperator"
                      role="alert"
                    >{{messageOperator}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MainFooter/>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../NavBar";
import NavSide from "../NavSide";
import MainFooter from "../MainFooter";
import SearchData from '../../services/SearchData';

import DateFormat from '../../services/DateFormat';
import LastUpdatedDate from '../../services/LastUpdatedDate';
import CarParkService from '../../services/CarParkService';
import Sequence from '../../services/Sequence';

import AddOperator from './AddOperator';
import ViewOperator from './ViewOperator';

export default {
  name: "CarParkOperator",
  data() {
    return {
      dataSource: null,
      classOperator: true,
      dataOperator: [],
      operatorID: null,
      operators: null,
      count: null,
      validated: false,
      errorResult: false,
      result: true,
      message: "",
      messageOperator: "",
      pag: 1,
      isBoxOpen: false,
      isBoxOpenAdd: false
    };
  },
  components: {
    NavSide,
    NavBar,
    MainFooter,
    AddOperator,
    ViewOperator
  },
  methods: {
    paginateNum(pageNum) {
      this.loadData(pageNum);
    },

    updatedOperator(value) {
      this.loadData(1);
      this.isBoxOpen = value;
    },
    modalFunCancel(value) {
      this.isBoxOpen = value;
    },
    modalCreateCancel(value) {
      this.isBoxOpenAdd = value;
    },
    createdOperator(value) {
      this.isBoxOpenAdd = value;
      this.loadData(1);
    },
    getSearchResult() {
      if (this.searchResult.length === 0) {
        this.errorResult = false;
        this.message = "";
        this.loadData();
        return 0;
      }
      SearchData.findSearchResult(`operator?search=${this.searchResult}`).then(
        response => {
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
        }
      );
    },
    viewOperator(value) {
      $("#myModalView").modal("show");
      CarParkService.fetchAllData(`operator/${value}`).then(response => {
        this.dataOperator = response.data;
        this.isBoxOpen = true;
      });
          this.isBoxOpen = false;
      $("#myModalView").modal("hide");

    },
    createModal() {
      $("#myModalAdd").modal("show");
      this.isBoxOpenAdd = true;
    },
    loadData(value = 1) {
      CarParkService.fetchAllData(
        `operator?page=${value}&sort=createDate`
      ).then(response => {
        this.dataSource = response.data.result;
        this.count = Math.ceil(response.data.count / 100);
        if (this.dataSource.length < 100) {
          this.count = value;
        }
        DateFormat.dateProcees(this.dataSource);

        Sequence.dataSequences(this.dataSource, value, this.count);
        this.messageOperator = "";
        if (this.dataSource.length === 0) {
          this.messageOperator = "No data available.";
        }
      }).catch((ex) => {
        this.$router.push({name: 'login'})
      })
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
