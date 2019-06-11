<template>
  <div>
    <table class="table table-bordered">
      <thead>
        <tr v-for="(object, index) in data" :key="index">
          <th>{{object}}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="gradeX" v-for="(object, index) in dataSource" :key="index">
          <td>{{object.name}}</td>
          <td>{{object.name}}</td>
          <td>{{object.name}}</td>
          <td>{{object.name}}</td>
          <td>{{object.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
const CarParkService = require("../../services/CarParkService");

export default {
  name: "app-static-table",
  props: ["data", "dataSource"],
  data() {
    return {
      
    };
  },
  methods: {
      
  }
};
</script>

<style scoped>
</style>
