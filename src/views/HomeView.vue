<template>
<div class="loginCon">
<div>
  <p>Now streaming free on the Roku Channel<br>
    Please log in with a valid username and password.</p>
</div>
    
  <h2 class="login-flash" v-if="signup">{{ flash }}</h2>
  <h2 class="login-flash" v-if="errors">{{ flash }}</h2>

    <section class="log-in">
       <input v-model="username" type="text" class="form-control" id="inlineFormInputName" placeholder="username" required>

      <input v-model="password" type="password" class="form-control" id="inlineFormPassword" placeholder="password" required>
    </section>
    <button
        v-if="signup"
        type="submit" 
        class="btn btn-primary login-submit"
        @click="trySignUp"
      >Sign up!
    </button>
    <button
        type="submit" 
        class="btn btn-primary login-submit"
        @click="tryLogin"
      >Go!
    </button>
    </div>
  <div class="mainImages">
    <img src="@/assets/images/movies_main.png" alt="movies">
    <img src="@/assets/images/music_main.png" alt="music">
    <img src="@/assets/images/tv_main.png" alt="tv">
  </div>
        <div class="streamLove">
            <div class="footerTitle">
                <h3>Stream What you love</h3>
            </div>
            <div class="bannerImg">
                <img src="@/assets/images/netflix.png" alt="netflix">
                <img src="@/assets/images/disney.png" alt="disney">
                <img src="@/assets/images/primevideo.png" alt="primevideo">
                <img src="@/assets/images/crave.png" alt="crave">
                <img src="@/assets/images/plex.png" alt="plex">
                <img src="@/assets/images/global.png" alt="global">
            </div>
        </div>

        <nav id="socialNav">
            <ul>
                <li> 
                    <a href="https://www.facebook.com/rokucanada" target="_blank">
                    <img src="@/assets/images/social_face.svg" alt="social_face"> 
                </a>
                </li>
                <li>
                    <a href="https://twitter.com/roku"  target="_blank">
                    <img src="@/assets/images/social_insta.svg" alt="social_insta"> 
                </a> </li>
                <li> 
                    <a href="https://www.youtube.com/playlist?list=PLlwPsASbZ1OQURA_AUHp-ocZ91YgbcenY"  target="_blank">
                    <img src="@/assets/images/social_twiter.svg" alt="social_twiter"> 
                </a> </li>
                <li>
                    <a href="https://www.instagram.com/rokucanada/"  target="_blank">
                    <img src="@/assets/images/social_youtube.svg" alt="social_youtube">
                </a>   </li>
            </ul>
        </nav>
        <div class="bottomFooter">
            <img src="@/assets/images/social_logo.svg" alt="logo"><br>
        <p class="mobilehidden">© 2022 Roku, Inc. All rights reserved. </p>
        <p class="webhidden">© 2022 Roku, Inc. All rights reserved. ROKU, the ROKU Logo, ROKU TV, ROKU POWERED, “Streaming Stick,” “HAPPY STREAMING” and “NOW THIS IS TV” are trademarks and/or registered trademarks of Roku, Inc. in the United States.
        </p>
         </div>
    <div class="bottomBg"> 
    <p> Created by Oksil Joo </p> 
    </div>
</template>

<script>
export default {
  name: 'TheLogin',

  data() {
    return {
      username: '',
      password: '',
      url: 'users/getone',
      flash: '',
      signup: false,
      errors: false
    }
  },

  methods: {
    tryLogin() {
      this.url = 'users/getone';
      this.login();
    },
    trySignUp() {
      this.url = 'users/signup';
      this.login();
    },

    goToUsers(time, vm) {
      setTimeout(function(){
        vm.$emit('setauth', true);
        vm.$router.push({ name: 'UserSelect'});
      }, time);
    },
    //and use the route to show the next view
    //TODO => should happen on successful login -> this needs to move the fetch call
    login() {
      // this.$router.push({ name: 'UserSelect' })
      // mock up the login functionality => formData is a virtual <form> element's data
      let formData = { username: this.username, password: this.password };

      //pass the form data to our login API

      fetch(url, {
        method: 'POST',
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(data => {
          //this is the result from the /users/getone route handler
          console.table(data);

          switch (data.action) {
            // user isn't in the database
            case 'add':
              this.signup = true;
              this.username = '';
              this.password = '';
              this.flash = 'Hmmm... your username does not exist, try signup';
              break;

              case 'added':
                this.flash = 'Added you to Roku Flashback! Enjoy!   ... redirecting ....';
                this.goToUsers(2500, this);
                break;
// wrong password
              case 'retry':
                document.querySelector(`input[type=${data.field}]`).classList.add('error');
                this.errors = true;
                this.flash = 'Your login info is not correct. please retry';
                break;

              default:
                this.goToUsers(0, this);
          }
          // this.$router.push({ name: 'UserSelect' })
          })
      .catch(err => console.error(err));
      
      //mock up the login functionality
      //and use the route to show the neext view
      
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/sass/main.scss";
@import "@/assets/sass/login.scss";
</style>