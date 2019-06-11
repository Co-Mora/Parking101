<template>
  <div>
    <div class="modal inmodal" id="myModalAdd" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content animated bounceInRight">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
              <span class="sr-only">Close</span>
            </button>
            <h4 class="modal-title">Add New</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>{{propertyLoc1}}</label>
              <input
                type="text"
                @change="validatedData()"
                v-model="name"
                placeholder="Enter Country Name"
                class="form-control"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" :disabled="validated == true" @click="addData()" class="btn btn-primary">Add</button>
            <button type="button" class="btn btn-info" @click="cancelModal()" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
const CarParkService = require("../../services/CarParkService");
const qs = require("qs");

export default {
  name: "CreateModalBox",
  props: ["isBoxOpen", "apiData", "countryID", "propertyLoc1"],
  data() {
    return {
      validated: true,
      name: null
    };
  },
  methods: {
    cancelModal() {
      this.isBoxOpen = true
      
    },
    validatedData() {
      if (this.name.length > 0) {
        this.validated = false;
        
      } else {
        this.validated = true;
      }
    },
    addData() {
      CarParkService.createData(
          `${this.apiData}`,
          qs.stringify({
            name: this.name
          })
        );
        $("#myModalAdd").modal("hide");
        setTimeout(() => {
          window.location.href = `/location/countries`;
        }, 400);
    },
  },
  
  
};
</script>
