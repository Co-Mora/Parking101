<template>
  <div>
    <div class="modal inmodal" id="myModalAdd" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
          <div class="modal-header">
            <button type="button" @click="cancelModal" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">Add Car Park Operator</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>CPO Code</label>
              <input type="text" placeholder="CPO Code" v-model="code" class="form-control">
            </div>
            <div class="form-group">
              <label>CPO Name</label>
              <input type="text" placeholder="CPO Name" v-model="name" class="form-control">
            </div>
            <div>
              <label class="col-form-label">Contact Person Name</label>
              <div class="input-group">
                <input
                  type="text"
                  placeholder="Contact Person Name"
                  v-model="contactName"
                  class="form-control"
                >
                <span class="input-group-append">
                  <button type="button" class="btn btn-default">
                    <i class="fa fa-phone"></i>
                  </button>
                </span>
              </div>
            </div>
            <div>
              <label class="col-form-label">Mobile No</label>
              <div class="input-group">
                <input type="text" v-model="mobile" class="form-control">
                <span class="input-group-append">
                  <button type="button" class="btn btn-default">
                    <i class="fa fa-phone"></i>
                  </button>
                </span>
              </div>
            </div>
            <div>
              <label class="col-form-label">Email</label>
              <div class="input-group">
                <input type="text" v-model="email" class="form-control">
                <span class="input-group-append">
                  <button type="button" class="btn btn-default">
                    <i class="fa fa-envelope"></i>
                  </button>
                </span>
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
            <button
              type="button"
              class="btn btn-primary"
              @click="createItem"
              data-dismiss="modal"
            >Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CarParkService from '../../services/CarParkService';
import DateFormat from '../../services/DateFormat';
import qs from 'qs';

export default {
  name: "AddOperator",
  props: ["isBoxOpenAdd"],
  data() {
    return {
      dataSource: null,
      classpassCardAll: true,

      operatorID: null,
      operators: null,
      operatorName: null,
      code: null,
      name: null,
      contactName: null,
      mobile: null,
      email: null,
      dateCreated: null,

      validated: false,
      errorResult: false,
      result: true,
      message: "",
      pag: 1
    };
  },
  components: {},
  methods: {
    cancelModal() {
      this.$emit("create-cancel", false);
    },
    createItem() {
      $("#myModalAdd").modal("hide");
      CarParkService.createData(
        `operator`,
        qs.stringify({
          code: this.code,
          name: this.name,
          pic: this.contactName,
          mobile: this.mobile,
          email: this.email
        })
      );
      setTimeout(() => {
        this.$emit("createdItem", false);
      }, 200);
    },
    loadData() {},
    loadCarPark(value) {
      CarParkService.fetchAllData(`carpark`).then(response => {
        this.carpark = response.data.result;
        this.showSelected(value);
      });
    }
  },
  mounted() {
    $("#myModalAdd").modal("show");
    this.loadData();
  }
};
</script>



