import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/Login";
import About from "@/views/About";
import Signup from "@/views/Signup";
import Administration from "@/views/Administration";

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
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
        path: '/administration',
        name: 'Administration',
        component: Administration
    }
]

const router = new VueRouter({
  routes
})

export default router
