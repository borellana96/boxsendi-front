<template>
  <!-- Navbar Right Menu 
  <li >
    <a href @click.prevent="logout()">
      <i class="fa fa-power-off"></i>
    </a>
  </li>-->
</template>

<script>
export default {
  name: 'LogOut',
  methods: {
    logout() {
      console.log('Estoy en logout')

      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_TOKEN', null)

      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('token', null)
      }

      this.$router.push('/login/admin')
    }
  }
}
</script>

<style scoped>
a {
  padding-left: 17.5px !important;
  padding-right: 17.5px !important;
}
</style>
