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
              <label>Country</label>
              <select v-model="countryID" class="form-control m-b">
                <option disabled selected value="null" key="null">Please Select Country Name</option>
                <option v-for="cout in country" :value="cout.id" :key="cout">{{cout.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>{{propertyLoc2}}</label>
              <input
                type="text"
                @change="validatedData()"
                v-model="name"
                placeholder
                class="form-control"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              :disabled="validated == true"
              @click="addData()"
              class="btn btn-primary"
            >Add</button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="cancelModal()"
              data-dismiss="modal"
            >Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CarParkService from '../../../services/CarParkService';
import qs from 'qs';

export default {
  name: "AddState",
  props: ["isBoxOpen", "propertyLoc1", "propertyLoc2", "loadData"],
  data() {
    return {
      validated: true,
      name: null,
      country: null,
      countryID: null
    };
  },
  methods: {
    cancelModal() {
      this.isBoxOpen = true;
    },
    validatedData() {
      if (this.name.length > 0) {
        this.validated = false;
      } else {
        this.validated = true;
      }
    },
    addData() {
      this.loadData(this.countryID);
      CarParkService.createData(
        `country/${this.countryID}/state`,
        qs.stringify({
          name: this.name,
          countryID: this.countryID
        })

      );
      this.name = null
      $("#myModalAdd").modal("hide");
      // setTimeout(() => {
      //   window.location.href = `/location/states`;
      // }, 300);
    },
    loadData1(value = 2) {
      CarParkService.fetchAllData("country").then(response => {
        this.country = response.data;
        this.countryID = value;
      });
    }
  },

  mounted() {
    this.loadData1();
  }
};
</script>
