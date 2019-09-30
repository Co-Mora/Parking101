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
            <h4 class="modal-title">{{'Edit ' + carparkName}}</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Car Park</label>
              <input disabled type="text" v-model="fullCarPark" class="form-control" />
            </div>
            <div class="form-group">
              <label>Tenant Type</label>
              <input type="text" v-model="tenantTypeModel" disabled class="form-control" />
            </div>
            <div class="form-group">
              <label>Tenant</label>
              <input type="text" v-model="dataSource" disabled class="form-control" />
            </div>
            <div>
              <label class="col-form-label">Company Reg. No.</label>
              <div class="input-group">
                <input type="text" disabled v-model="nationalID" class="form-control" />
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
export default {
  name: "ViewCarParkDetails",
  props: [
    "tenantNameModel",
    "isBoxOpen",
    "tenantTypeModel",
    "carparkName",
    "carparkNameCode",
    "tenantCustomerIDModel"
  ],
  data() {
    return {
      dataSource: null,
      fullCarPark: null,
      carparkNameCode: null,
      name: null
    };
  },
  components: {},
  methods: {
    cancelModal() {
      this.$emit("clicked-cancel", false);
    }
  },

  mounted() {
    $("#myModalView").modal("show");

    this.dataSource = this.tenantNameModel + "-" + this.tenantTypeModel;
    this.fullCarPark = this.carparkNameCode + "-" + this.carparkName;
  }
};
</script>



