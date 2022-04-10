<template>
    <header id="top_Main">

        <div class="logoTop">
            <img src="@/assets/logo.svg" alt="logo">
        </div>
        <div class="flashback">
            <img class="mediaImages" src="@/assets/images/flashbackBg.png" alt="flashBackBg">
            <img class="gotoTop" src="@/assets/images/moile_flash.svg" alt="flashBack">
<nav class="rightMenu">
      <ul v-if="authenticated">            
        <li><img src="@/assets/images/parents.svg" alt="parents"></li>
        <li @click="switchUsers"><img src="@/assets/images/kids.svg" alt="kids"></li>
        <li @click="LogOut"><button class="logOutBtn">Log Out</button></li>					
      </ul>
      </nav>
        </div>
    </header>
    <router-view @setauth="setAuthenticated"></router-view>
</template>
<script>
export default {
  name: "TheMainApp",

  data() {
    return {
      authenticated: false
    }
  },

  methods: {
    setAuthenticated(status) {

      this.authenticated = status;
    },

  created(){
    if (window.localStorage.getItem('CurrentUser')) {
      this.$router.push({
        name: 'FlashBack',
        params: JSON.parse(localStorage.getItem('currentUser'))
      });
      this.setAuthenticated(true);
    }
  },
    switchUsers() {
      this.$router.push({ name: 'UserSelect'});
    },
    logOut() {
      if (window.localStorage.getItem('CurrentUser')) {
        localStorage.removeItem('currentUser');
      }
      this.setAuthenticated(false);
      this.$router.push({ name: 'HomeView'});
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/sass/main.scss";
</style>
