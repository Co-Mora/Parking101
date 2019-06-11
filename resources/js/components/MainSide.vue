<template>
    <div>
        <div id="page-wrapper" class="gray-bg">
        <NavBar />
      <div class="wrapper wrapper-content animated fadeInRight">
          <car-park />
        </div>
        <MainFooter />

        </div>
    </div>
</template>

<script>
import CarPark from './CarPark'
import MainFooter from './MainFooter'
import NavBar from './NavBar'

export default {
  name: 'MainSide',
  data () {
    return {
     
    }
  },
  components: {
    CarPark,
    NavBar,
    MainFooter
  },
  methods: {

    
  },
  
}

</script>
