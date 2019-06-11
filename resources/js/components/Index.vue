<template>
    <div>
         <div id="wrapper">
             <NavSide />
             <MainSide />
         </div>
    </div>
</template>

<script>

import NavSide from './NavSide.vue';
import MainSide from './MainSide.vue';

export default {
  name: 'Index',
  components: {
    NavSide,
    MainSide
  },
  mounted() {
    
  }
}
</script>


































