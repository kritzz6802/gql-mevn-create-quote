<template>
  <!-- <login/>
  <signUp/>
  <profileUser/>
  <createQuote/>
  <homePage/> -->
  <navbar/>

    <router-view />
</template>

<script>
// import login from './components/logIn.vue'
// import signUp from './components/signUp.vue'
// import profileUser from './components/profileUser.vue'
// import createQuote from './components/createQuote.vue'
// import homePage from './components/homePage.vue'
import navbar from './components/navBar.vue'

export default {
  name: 'App',
  components: {
    navbar
  }
}
</script>
