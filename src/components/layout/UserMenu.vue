<template>
  <div class="link">

    <div class="dropdown">

      <div class="icon-avatar"  id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

        <div class="user-circle"> <img src="/static/img/user/admin.png" alt=""></div>

        <div class="icon-online"> </div>

      </div>

      <div class="dropdown-menu drop-edit" aria-labelledby="dropdown">

        <div class="link-user">

          <div class="link-user-img">

              <img src="/static/img/user/admin.png" alt="">

            <!-- <img :src="user.avatar"> -->

          </div>

          <div class="link-user-content">

            <span class="link-user-content-name" >{{$store.state.user.attributes.profile.attributes.name}} {{$store.state.user.attributes.profile.attributes.surnames}}</span>

            <span class="link-user-content-role" v-if="$store.state.user.type === 'Admin'" @click="perfil()">Administrador general</span>

            <span  class="link-user-content-role" v-else-if="$store.state.user.type === 'Operator' && $store.state.user.attributes.operator_type === 1" @click="perfil()">Operador de envío</span>

            <span  class="link-user-content-role" v-else-if="$store.state.user.type === 'Operator' && $store.state.user.attributes.operator_type === 2" @click="perfil()">Operador de recepción</span>

            <span class="link-user-content-role" v-else-if="$store.state.user.type === 'Client'" @click="perfil()">Cliente</span>

          </div>

        </div>
        <div @click.prevent="changePaswood()" class="link link-drop">

          <div class="link-option"><span>Cambiar contraseña</span></div>

          <img class="img-nav" src="/static/img/changePasswoord.svg" alt="">

        </div>

        <div @click.prevent="logout()" class="link link-drop">

          <div class="link-option"><span>Cerrar sesion</span></div>

          <img class="img-nav" src="/static/img/logout.svg" alt="">

        </div>

      </div>
      

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      id:this.$store.state.user.id
    }
  },
  name: 'UserMenu',
  props: ['user'],
  methods: {
    logout() {
      console.log('Estoy en logout')
      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_TOKEN', null)
      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('token', null)
      }
      this.$router.push('/welcome')
    },
    perfil(){
      this.$router.push({ name: 'Profile'});
    },
    changePaswood(){
      console.log("Cambiando contraseña")
      console.log(this.$store.state.user.id)
        this.$router.push({ name: 'NewPassword',params:{id:this.id}});
    }
  }
}
</script>

<style scoped>
/* li.dropdown > a {
    height: 50px;
    width: 50px;
    padding-left: 12.5px;
  } */
.user-image {
  margin-right: 0 !important;
}
</style>
