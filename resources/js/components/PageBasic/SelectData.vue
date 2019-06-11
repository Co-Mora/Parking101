<template>
  <div>
    <div class="col-sm-9 m-b-xs">
      <select v-model="dataID" class="form-control m-b" @change="filterData">
        <option disabled value="null" key="null">{{title}}</option>
        <option v-for="(object, index) in data" :value="object.id" :key="index">{{object.name}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectData",
  props: ["data", "dataSource", "title"],

  data() {
    return {
      dataID: null,
    };
  },
  methods: {
    filterData() {
      this.$emit('clicked-dataID', this.dataID);
    }
  },

  mounted() {}
};
</script>
