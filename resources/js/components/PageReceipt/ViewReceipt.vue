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
                  <div class="row">
                    <iframe
                      style="margin: 0 auto; text-align: center"
                      :src="receipt"
                      type="application/html"
                      frameborder="0"
                      width="1000"
                      height="1000"
                      scrolling="no"
                    ></iframe>
                  </div>
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
        <MainFooter/>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../NavBar";
import NavSide from "../NavSide";
import MainFooter from "../MainFooter";
import SearchData from "../../services/SearchData";
import Sequence from "../../services/Sequence";

import DateFormat from "../../services/DateFormat";
import LastUpdatedDate from "../../services/LastUpdatedDate";
import CarParkService from "../../services/CarParkService";

export default {
  name: "ViewReceipt",
  data() {
    return {
      dataSource: null,
      receipt: null,
      style: null,
      height: null,
      width: null,
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
      let value = this.$route.query.receiptID;

      // var currentUrl = window.location.pathname;
      // let value = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);
      console.log(value);
      this.handlefileProcess(value);
    },
    handlefileProcess(value) {
      CarParkService.fetchAllData(`receipt?collectionID=${value}`).then(
        response => {
          this.receipt = response.data.result[0].path;
        }
      );
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>
