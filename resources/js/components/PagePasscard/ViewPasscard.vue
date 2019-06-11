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
            <h4 class="modal-title">{{'Edit ' + passcardNum}}</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Passcard Type</label>
              <select disabled v-model="passtypeID" class="form-control m-b">
                <option
                  selected
                  v-for="(pass, index) in passtypes"
                  :value="pass.id"
                  :key="index"
                >{{pass.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Car Park</label>
              <select disabled v-model="carparkID" class="form-control m-b">
                <option
                  selected
                  v-for="(car, index) in carpark"
                  :value="car.id"
                  :key="index"
                >{{car.name}}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Passcard Number</label>
              <input disabled type="text" v-model="passcardNum" class="form-control">
            </div>
            <div class="form-group">
              <label>Movement</label>
              <input disabled type="text" v-model="movement" class="form-control">
            </div>
            <div class="form-group">
              <label>Condition</label>
              <input type="text" disabled v-model="condition" class="form-control">
            </div>
            <div class="form-group">
              <label>Is Blocked</label>
              <div class="i-checks">
                <label>
                  <input :checked="isBlocked == 1" type="checkbox" value="option1" name="a">
                  <i></i> Blocked
                </label>
              </div>
              <div class="i-checks">
                <label>
                  <input :checked="isBlocked == 0" type="checkbox" value="option1" name="a">
                  <i></i> Not Blocked
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

export default {
  name: "ViewPasscard",
  props: ["dataOperator", "isBoxOpen"],
  data() {
    return {
      dataSource: null,
      classpassCardAll: true,

      operatorID: null,
      operators: null,
      passtypeID: null,
      passtypes: null,
      passcardNum: null,
      passcardType: null,
      carparkName: null,
      carparkID: null,
      carpark: null,
      movement: null,
      condition: null,
      isBlocked: null,

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
      this.$emit("clicked-cancel", false);
    },
    loadData() {
      this.dataOperator.forEach(el => {
        this.passcardNum = el.sku;
        this.condition = el.conditions;
        this.movement = el.movement;
        this.passtypeID = el.passtypeID;
        this.isBlocked = el.isBlocked
        console.log(this.passtypeID)
        this.loadCarPark(el.carparkID);
        this.loadPassType(this.passtypeID);
      });
    },
    loadCarPark(value) {
      CarParkService.fetchAllData(`carpark`).then(response => {
        this.carpark = response.data.result;
        this.showSelected(value);
      });
    },
    loadPassType(value) {
      CarParkService.fetchAllData(`passtype`).then(response => {
        this.passtypes = response.data.result;
      });
    },
    showSelected(value1) {
      this.carpark.forEach(el => {
        if (value1 === el.id) {
          this.carparkID = el.id;
          console.log(this.carparkID);
          return 0;
        }
      });
    }
  },
  mounted() {
    $("#myModalView").modal("show");
    this.loadData();
  }
};
</script>



