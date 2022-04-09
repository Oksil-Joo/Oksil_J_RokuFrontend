<template>
    <header id="top_Main">

        <div class="logoTop">
            <img src="@/assets/logo.svg" alt="logo">
        </div>
        <div class="flashback">
            <img class="mediaImages" src="@/assets/images/flashbackBg.png" alt="flashBackBg">
            <img class="gotoTop" src="@/assets/images/moile_flash.svg" alt="flashBack">
<nav class="float-right">
      <ul v-if="authenticated">            
        <li><i class="fas fa-user-circle"></i></li>
        <li v-if="role === 1"><i class="fas fa-cog"></i></li>
        <li><i class="fas fa-power-off"></i></li>					
      </ul>
      </nav>
        </div>
    </header>
    <router-view :key="$route.path" :loggedin="authenticated" :role="role" @setauth="setAuthenticated"></router-view>
</template>
<script>
export default {
  name: "TheMainApp",

  data() {
    return {
      authenticated: false,
      role: 0
    }
  },

  methods: {
    setAuthenticated(status) {
      debugger;
      this.authenticated = status.status;
      this.role = status.role;
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/sass/main.scss";
</style>
