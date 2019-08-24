<template>
    <div>
      <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation" style="margin-bottom: 0">
          <div class="navbar-header">
            <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
          </div>
          <div class="navbar-header">
          </div>
          <ul class="nav navbar-top-links navbar-right">
            <li>
              <span class="m-r-sm text-muted welcome-message">Welcome {{ email}}</span>
            </li>

            <li>
              <a @click="logout" href="/v1/login">
                <i class="fa fa-sign-out"></i> Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
</template>

<script>



export default {
  name: 'NavBar',
  data() {
    return {
      data: null,
      email: null,
    }
  },
  methods: {
    logout() {
    }
  },
  mounted() {
    var data = JSON.parse(localStorage.getItem("data"));
    this.email = data["email"];
  }
}
</script>
