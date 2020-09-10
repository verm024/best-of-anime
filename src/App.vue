<template>
  <v-app :style="app_background">
    <v-app-bar
      app
      dark
      color="transparent"
      :flat="flat"
    >
      <div class="container d-flex align-center">
        <div class="d-flex align-center" @click="goHome()">
          <v-img
            alt="BoA"
            class="ml-2"
            contain
            src="https://drive.google.com/uc?export=view&id=1OWt-KdLhRHi7qKBafV3RkKk8D9H8l2zz"
            transition="scale-transition"
            height="50px"
            style="cursor: pointer"
          />
        </div>

        <v-spacer></v-spacer>
        <v-menu transition="slide-y-transition" offset-y rounded="0" v-if="currentUser && userProfile">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <span class="mr-3 navbar-rank">{{ userProfile.rank }}</span>
              <span class="mr-2 navbar-dropdown-text">{{ userProfile.display_name }}</span>
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list v-if="userProfile.rank == 11">
            <v-list-item v-for="(item, index) in navbar_items_moderator" :key="index" @click="navbarDropdownClick(item)">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list v-if="userProfile.rank == 12">
            <v-list-item v-for="(item, index) in navbar_items_admin" :key="index" @click="navbarDropdownClick(item)">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-list v-else>
            <v-list-item v-for="(item, index) in navbar_items" :key="index" @click="navbarDropdownClick(item)">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div v-else>
          <v-btn text to="/" class="navbar-item">
              <span class="navbar-dropdown-text">Home</span>
          </v-btn>
          <v-btn text to="/login" class="navbar-item mr-6 ml-6">
              <span class="">Login</span>
          </v-btn>
          <v-btn text to='/register' class="navbar-item">
              <span class="navbar-dropdown-text">Register</span>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <v-main class="main">
      <router-view>
        
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import firebase from './firebase'

export default {
  name: 'App',

  data(){
    return {
      app_background: 'background: linear-gradient(116.82deg, #0E1C2F 0%, #050910 100%)',
      flat: true,
      navbar_items: ['Home', 'History', 'Profile', 'Logout'],
      navbar_items_admin: ['Home', 'History', 'Profile', 'Admin', 'Moderator', 'Logout'],
      navbar_items_moderator: ['Home', 'History', 'Profile', 'Moderator', 'Logout']
    }
  },
  methods: {
    navbarDropdownClick(choosenValue){
      if(choosenValue == 'Profile' && this.$route.fullPath != '/profile'){
        this.$router.push('/profile')
      }
      else if(choosenValue == 'Logout'){
        this.logout()
      }
      else if(choosenValue == 'History' && this.$route.fullPath != '/history'){
        this.$router.push('/history')
      }
      else if(choosenValue == 'Home' && this.$route.fullPath != '/'){
        this.$router.push('/')
      }
      else if(choosenValue == 'Admin' && this.$route.fullPath != '/admin'){
        this.$router.push('/admin')
      }
      else if(choosenValue == 'Moderator' && this.$route.fullPath != '/moderator'){
        this.$router.push('/moderator')
      }
    },
    async logout(){
      await firebase.auth.signOut()
      this.$store.commit("setCurrentUser", null)
      this.$store.commit("setUserProfile", null)
      this.$router.push('/login')
    },
    goHome(){
      if(this.$route.fullPath != '/'){
        this.$router.push('/')
      }
    }
  },
  mounted() {
    if(this.$route.fullPath == "/login" || this.$route.fullPath == "/register"){
      document.getElementsByClassName('v-application--wrap')[0].style.backgroundImage = "url('https://drive.google.com/uc?export=view&id=1y0ILcCzDucSdpz-iYx6Zug0FfIbw8Y-o')"
      document.getElementsByClassName('v-application--wrap')[0].style.backgroundSize = 'cover'
      document.getElementsByClassName('v-application--wrap')[0].style.backgroundPosition = 'center'
      document.getElementsByClassName('v-app-bar')[0].style.background = 'transparent'
      this.flat = true
    }
    else{
      this.app_background = 'background: linear-gradient(116.82deg, #0E1C2F 0%, #050910 100%)'
      document.getElementsByClassName('v-app-bar')[0].style.backgroundImage = "url('https://drive.google.com/uc?export=view&id=1yxTV0Zq-0BfqY41dh5JzXuFRGuONcvez')"
      document.getElementsByClassName('v-app-bar')[0].style.backgroundSize = 'cover'
      document.getElementsByClassName('v-app-bar')[0].style.backgroundPosition = 'center'
      document.getElementsByClassName('v-application--wrap')[0].style.background = "transparent"
      this.flat = false
    }
  },
  computed: {
    ...mapState(['currentUser', 'userProfile'])
  },
  watch: {
    $route: {
      immediate: true,
      handler(){
        if(document.getElementsByClassName('v-application--wrap')[0] && document.getElementsByClassName('v-app-bar')[0]){
          if(this.$route.fullPath == "/login" || this.$route.fullPath == "/register"){
            document.getElementsByClassName('v-application--wrap')[0].style.backgroundImage = "url('https://drive.google.com/uc?export=view&id=1y0ILcCzDucSdpz-iYx6Zug0FfIbw8Y-o')"
            document.getElementsByClassName('v-application--wrap')[0].style.backgroundSize = 'cover'
            document.getElementsByClassName('v-application--wrap')[0].style.backgroundPosition = 'center'
            document.getElementsByClassName('v-app-bar')[0].style.background = 'transparent'
            this.flat = true
          }
          else{
            this.app_background = 'background: linear-gradient(116.82deg, #0E1C2F 0%, #050910 100%)'
            document.getElementsByClassName('v-app-bar')[0].style.backgroundImage = "url('https://drive.google.com/uc?export=view&id=1yxTV0Zq-0BfqY41dh5JzXuFRGuONcvez')"
            document.getElementsByClassName('v-app-bar')[0].style.backgroundSize = 'cover'
            document.getElementsByClassName('v-app-bar')[0].style.backgroundPosition = 'center'
            document.getElementsByClassName('v-application--wrap')[0].style.background = "transparent"
            this.flat = false
          }
        }
      }
    }
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');

  .v-list-item__title{
    color: rgba(0, 0, 0, 0.87);
  }

  *{
    font-family: 'Open Sans', sans-serif;
    color: #F4F4F6;
  } 

  .navbar-item.v-btn--active span{
    color: #519A9E !important;
  }

  .navbar-item.v-btn::before{
    background-color: transparent;
  }

  .v-btn{
    font-size: 16px;
  }

  .main .page-wrapped{
    min-height: 100vh;
  }

</style>

<style scoped>
  .navbar-rank{
    font-weight: 700;
    border: 2px solid #519A9E;
    width: 30px;
    line-height: 25px;
    border-radius: 100px;
  }

  .navbar-dropdown-text, .navbar-item span{
    font-weight: 600;
    letter-spacing: 0;
  }
</style>
