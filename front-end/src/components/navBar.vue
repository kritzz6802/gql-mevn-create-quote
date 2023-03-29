<template>
    <nav>
    <div class="nav-wrapper #673ab7 deep-purple">
        <router-link to="/" class="brand-logo left">Quote App</router-link>
        <ul id="nav-mobile" class="right">
        <li><router-link to="/login">login</router-link></li>
        <li><router-link to="/signup">signUp</router-link></li>
        <li v-if="token"><router-link to="/profile">profile</router-link></li>
        <li v-if="token"><router-link to="/create">create</router-link></li>
        <li v-if="token"> <button @click="logout">Logout</button> </li>
        </ul>

    </div>
</nav>
  </template>

  <script>
import router from '../router.js'
  export default {
    name: 'navBar',
    computed: {
    token() {
      // Get token from localStorage and return true if it exists, false otherwise
      return localStorage.getItem('token') !== null;
    }
  },methods:{
    logout(){
      localStorage.removeItem('token');
      router.push('/login')
    }
  }
  }
  </script>