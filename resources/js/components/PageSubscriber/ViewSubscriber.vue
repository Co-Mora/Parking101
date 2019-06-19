<template>
  <div>
    <div class="modal inmodal" id="myModalView" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
          <div class="modal-header">
            <button type="button" @click="cancelModal" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">{{subscriberName}}</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Sub ID</label>
              <input
                disabled
                type="text"
                placeholder="CPO ID"
                v-model="subID"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label>UUID</label>
              <input type="text" disabled placeholder="CPO Name" v-model="uuid" class="form-control">
            </div>
            <div>
              <label class="col-form-label">User Name</label>
              <div class="input-group">
                <input
                  type="text"
                  disabled
                  placeholder="Contact Person Name"
                  v-model="username"
                  class="form-control"
                >
                <span class="input-group-append">
                  <button type="button" class="btn btn-default">
                    <i class="fa fa-user"></i>
                  </button>
                </span>
              </div>
            </div>

            <div>
              <label class="col-form-label">Email</label>
              <div class="input-group">
                <input type="text" disabled v-model="email" class="form-control">
                <span class="input-group-append">
                  <button type="button" class="btn btn-default">
                    <i class="fa fa-envelope"></i>
                  </button>
                </span>
              </div>
            </div>
            <div>
              <label class="col-form-label">Date Created</label>
              <div class="input-group">
                <input type="text" disabled v-model="dateCreated" class="form-control">
                <span class="input-group-append">
                  <button type="button" class="btn btn-default">
                    <i class="fa fa-clock-o"></i>
                  </button>
                </span>
              </div>
            </div>
            <div class="form-group">
              <label>Email Verification</label>
              <div class="i-checks">
                <label>
                  <input :checked="isVerified == 1" type="checkbox" value="option1" name="a">
                  <i></i> Verified
                </label>
              </div>
              <div class="i-checks">
                <label>
                  <input :checked="isVerified == 0" type="checkbox" value="option1" name="a">
                  <i></i> Not Verified
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="cancelModal"
              data-dismiss="modal"
            >Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const CarParkService = require("../../services/CarParkService");
const DateFormat = require("../../services/DateFormat");
const qs = require("qs");

export default {
  name: "ViewSubscriber",
  props: ["dataOperator", "isBoxOpen"],
  data() {
    return {
      dataSource: null,
              
      subscriberName: null,
      subID: null,

      uuid: null,
      username: null,
      password: null,
      email: null,
      dateCreated: null,
      isVerified: null,

      validated: false,
      errorResult: false,
      result: true,
      message: "",
      pag: 1
    };
  },
  components: {},
  methods: {
    closeModal() {
      console.log("Closed");
    },
    cancelModal() {
      this.$emit("clicked-cancel", false);
    },
    UpdateItem() {
      $("#myModalView").modal("hide");
      CarParkService.updateData(
        `operator`,
        this.operatorID,
        qs.stringify({
          code: this.code,
          name: this.name,
          pic: this.contactName,
          mobile: this.mobile,
          email: this.email
        })
      );
      setTimeout(() => {
        this.$emit("updatedItem", false);
      }, 200);
    },
    loadData() {
      DateFormat.dateProcees(this.dataOperator);
      this.dataOperator.forEach(el => {
        this.subscriberName = el.username;
        this.subID = el.userID;
        this.uuid = el.uuid;
        this.username = el.username;
        this.password = el.password;
        this.email = el.email;
        this.isVerified = el.hasVerifed
        this.dateCreated = el.createDate;
      });
    }
  },
  mounted() {
    $("#myModalView").modal("show");
    this.loadData();
    $(document).ready(function() {
      $(".i-checks").iCheck({
        checkboxClass: "icheckbox_square-green",
        radioClass: "iradio_square-green"
      });
    });
  }
};
</script>



