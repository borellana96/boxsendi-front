<template>
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->

    <section class="sidebar">

      <!-- Sidebar user panel (optional) 
      <div class="user-panel enviosUser">
        <div class="pull-left image">
          <img :src="user.avatar">
        </div>
        <div class="pull-left info">
          <div>
            <p
              class="white mb-0"
            >{{$store.state.user.attributes.profile.attributes.name}} {{$store.state.user.attributes.profile.attributes.surnames}}</p>

            <p class="white mb-0" v-if="$store.state.user.type === 'Admin'">Administrador general</p>
            <p
              class="white mb-0"
              v-else-if="$store.state.user.type === 'Operator' && $store.state.user.attributes.operator_type === 1"
            >Operador de envio</p>
            <p
              class="white mb-0"
              v-else-if="$store.state.user.type === 'Operator' && $store.state.user.attributes.operator_type === 2"
            >Operador de recepción</p>
            <p class="white mb-0" v-else-if="$store.state.user.type === 'Client'">Cliente</p>
          </div>
          <a href>
            <i class="fa fa-circle text-success"></i> Online
          </a>
      </div>-->

      <!-- search form (Optional) -->
      <!-- <form v-on:submit.prevent class="sidebar-form" id="searchForm">
        <div class="input-group" id="searchContainer">
          <span class="input-group-btn">
            <input
              type="text"
              name="search"
              id="search"
              class="search form-control"
              data-toggle="hideseek"
              p
              laceholder="Search Menus"
              data-list=".sidebar-menu"
            >
            <button type="submit" name="search" id="search-btn" class="btn btn-flat">
              <i class="fa fa-search"></i>
            </button>
          </span>
        </div>
      </form>-->
      <!-- /.search form -->
      <!-- Sidebar Menu -->
      <sidebar-menu/>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>
</template>
<script>
import SidebarMenu from './SidebarMenu'

export default {
  name: 'Sidebar',
  props: ['user'],
  components: { SidebarMenu },
  mounted: function() {
    window
      .jQuery('[data-toggle="hideseek"]')
      .off()
      .hideseek()
  }
}
</script>
<style scope="local">
.user-panel .image img {
  border-radius: 50%;
}
#searchForm {
  padding-left: 0em;
  padding-right: 0em;
}
#searchContainer {
  height: 100%;
  padding-bottom: 0em;
}
#search {
  width: 80%;
  float: right;
}

#search-btn {
  width: 20%;
}
</style>
