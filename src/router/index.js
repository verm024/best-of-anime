import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import ProfileEdit from '../views/ProfileEdit.vue'
import ConfirmPassword from '../views/ConfirmPassword.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import ModeratorDashboard from '../views/ModeratorDashboard.vue'
import PollAll from '../views/Poll/All.vue'
import PollNew from '../views/Poll/New.vue'
import PollDetail from '../views/Poll/Detail.vue'
import firebase from '../firebase'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: ProfileEdit,
    meta: {
      requiresLogin: true,
      requiresPasswordConfirmation: true
    }
  },
  {
    path: '/confirmpassword',
    name: 'ConfirmPassword',
    component: ConfirmPassword,
    meta: {
      requiresLogin: true,
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: {
      requiresLogin: true,
      requiresAdmin: true
    }
  },{
    path: '/moderator',
    name: 'ModeratorDashboard',
    component: ModeratorDashboard,
    meta: {
      requiresLogin: true,
      minimumLevel: 11
    }
  },
  {
    path: '/poll/latest',
    name: "PollAll",
    component: PollAll,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: '/poll/new',
    name: "PollNew",
    component: PollNew,
    meta: {
      requiresLogin: true,
      minimumLevel: 5
    }
  },
  {
    path: '/poll/detail/:date',
    name: "PollDetail",
    component: PollDetail,
    meta: {
      requiresLogin: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth.currentUser
  let requiresLogin = to.matched.some(x => x.meta.requiresLogin)
  let requiresAdmin = to.matched.some(x => x.meta.requiresAdmin)
  let requiresPasswordConfirmation = to.matched.some(x => x.meta.requiresPasswordConfirmation)
  let minimumLevel = to.matched.some(x => x.meta.minimumLevel)
  if(currentUser){
    if(requiresLogin){
      //atur role di sini
      if(requiresAdmin){
        if(store.state.userProfile.role == "admin"){
          next()
        }
        else{
          next('/unauthorized')
        }
      }
      else if(minimumLevel){
        if(store.state.userProfile.rank < to.meta.minimumLevel){
          next('/unauthorized')
        }
        else{
          next()
        }
      }
      else if(requiresPasswordConfirmation){
        if(store.state.passwordConfirmed){
          next()
        }
        else{
          next('/confirmpassword')
        }
      }
      else{
        next()
      }
    }
    else{
      if(to.name =="Login" || to.name == "Register"){
        next('/')
      }
      else{
        next()
      }
    }
  }
  else{
    if(requiresLogin){
      next('/login')
    }
    else[
      next()
    ]
  }
})

export default router