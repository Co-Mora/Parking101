<template>
  <div>
    <div class="modal inmodal" id="myModalSub" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
          <div class="modal-header">
            <button type="button" @click="cancelModal" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">Subscription</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Parking License</label>
              <input disabled type="text" v-model="parkingID" class="form-control">
            </div>
            <div class="form-group">
              <label>Account Holder</label>
              <input disabled type="text" v-model="accountHolder" class="form-control">
            </div>
            <div class="form-group">
              <label>Parker Full Name</label>
              <input disabled type="text" v-model="name" class="form-control">
            </div>
            <div class="form-group">
              <label>Mobile No.</label>
              <input disabled type="text" v-model="mobile" class="form-control">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="text" disabled v-model="email" class="form-control">
            </div>
            <div class="form-group">
              <label>Car Plate</label>
              <input type="text" disabled v-model="car1" class="form-control">
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

export default {
  name: "Subscription",
  props: ["isSubOpen", "leaseID"],
  data() {
    return {
      dataSource: null,
      classpassCardAll: true,
      car1: null,
      email: null,
      mobile: null,
      name: null,
      username: null,


      parkerID: null,
      parker: null,

      validated: false,
      errorResult: false,
      result: true,
      message: "",
      messagePasscard: "",
      pag: 1
    };
  },
  components: {},
  methods: {
    cancelModal() {
      this.$emit("clicked-cancel-sub", false);
    },
    loadData(source) {
      source.forEach(el => {
        this.car1 = el.car1;
        this.email = el.email;
        this.mobile = el.mobile;
        this.name = el.name;
        this.username = el.username;
      });
    },
    loadLease() {
      CarParkService.fetchAllData(`lease/${this.leaseID}`).then(response => {
        this.parkerID = response.data[0].parkerID;
        this.loadParker(this.parkerID);
      });
    },
    loadParker(value) {
      CarParkService.fetchAllData(`parker/${value}`).then(response => {
        this.parker = response.data;
        this.loadData(this.parker)
      });
    }
  },
  mounted() {
    $("#myModalSub").modal("show");
    this.loadLease();
  }
};
</script>



