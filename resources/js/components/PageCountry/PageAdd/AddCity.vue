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
              <select v-model="countryID" @change="loadData2" class="form-control m-b">
                <option disabled selected value="null" key="null">Please Select Country Name</option>
                <option
                  v-for="cout in country"
                  :value="cout.id"
                  :key="cout"
                >{{cout.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>State</label>
              <select v-model="stateID" @change="loadState" class="form-control m-b">
                <option disabled selected value="null" key="null">Please Select State Name</option>
                <option
                  v-for="state in states"
                  :value="state.id"
                  :key="state"
                >{{state.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>City</label>
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
              :disabled="validated === true"
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
import City from '../City';
import qs from 'qs';


export default {
  name: "AddCity",
  props: {
    loadData: { type: Function },
    filterByState: { type: Function },
    countryID1: { type: String },
    stateID1: { type: String },
    isBoxOpen: { type: String },
    method: { type: Function }
  },
  data() {
    return {
      validated: true,
      name: null,
      country: null,
      countryID: null,
      stateID: null,
      states: null,
      isBoxWel: true
    };
  },
  methods: {
    loadState() {
      console.log("Add City:", this.stateID);
    },
    cancelModal() {
      this.isBoxWel = false;
    },
    validatedData() {
      if (this.name.length > 0) {
        this.validated = false;
      } else {
        this.validated = true;
      }
    },
    addData() {
      
      $("#myModalAdd").modal("hide");
      CarParkService.createData(
        "city",
        qs.stringify({
          name: this.name,
          stateID: this.stateID
        })
      );
      this.$emit("clicked-stateID", this.stateID);
      this.$emit("clicked-countryID", this.countryID);
      this.name = null;
    },
    loadData1(value = 0) {
      CarParkService.fetchAllData("country").then(response => {
        this.country = response.data;
        if (value > 0) {
          this.countryID = value;
        } else {
          this.countryID = this.countryID1;
        }
        this.loadData2(this.stateID);
      });
    },
    loadData2(value = 0) {
      CarParkService.fetchAllData(`country/${this.countryID}/state`).then(
        response => {
          this.states = response.data;
          if (this.countryID == this.countryID1) {
            this.stateID = this.stateID1;
          } else {
            this.stateID = value;
          }
        }
      );
    }
  },

  mounted() {
    $("#myModalAdd").modal("show");
    this.loadData1();
  }
};
</script>
