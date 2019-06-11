<template>
  <div>
    <div id="wrapper">
      <nav-side :classpassCardType="classpassCardType"/>
      <div id="page-wrapper" class="gray-bg">
        <NavBar/>
        <div class="ibox-title">
          <p>Home / Receipt</p>
        </div>
        <div class="wrapper wrapper-content animated fadeInRight">
          <div class="row">
            <div class="col-lg-12">
              <div class="ibox">
                <div class="ibox-content">
                  <div class="row"></div>
                  <div class="table-responsive">
                     <div v-html="receipt"></div>
                    <div
                      class="alert alert-primary col-sm-12 m-b-xs"
                      v-show="errorResult == true && !messagePasscard"
                      role="alert"
                    >{{message}}</div>
                    <div
                      class="alert alert-warning col-sm-12 m-b-xs"
                      v-if="messagePasscard"
                      role="alert"
                    >{{messagePasscard}}</div>
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
const NavSide = require("../NavSide.vue");
const NavBar = require("../NavBar.vue");
const MainFooter = require("../MainFooter.vue");
const CarParkService = require("../../services/CarParkService");
const SearchData = require("../../services/SearchData");
const DateFormat = require("../../services/DateFormat");
const LastUpdatedDate = require("../../services/LastUpdatedDate");
const Sequence = require("../../services/Sequence");

export default {
  name: "Passcard",
  data() {
    return {
      dataSource: null,
      receipt: null,
      validated: false,
      errorResult: false,
      count: null,
      result: true,
      message: "",
      messagePasscard: "",
      pag: 1
    };
  },
  components: {
    NavSide,
    NavBar,
    MainFooter
  },
  methods: {
    loadData() {
      var currentUrl = window.location.pathname;
      let value = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
      console.log(value);
      this.handlefileProcess(value);
    },
    handlefileProcess(value) {
      CarParkService.fetchAllData(`receipt?collectionID=${value}`).then(response => {
        this.receipt = response.data.result[0].path;
        console.log(this.receipt)
      });
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
