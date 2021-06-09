<template>
  <ul class="sidebar-menu">
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <img class="img-link" src="static/img/home.svg" alt>
        <span class="page">Principal</span>
      </a>
    </router-link>

    <router-link
      v-if="$store.state.user.attributes.permissions_keys.includes(5)"
      tag="li"
      class="pageLink"
      to="/orders"
    >
      <a>
        <img class="img-link" src="/static/img/welcome-bag.svg" alt>
        <span class="page">Órdenes de compra</span>
      </a>
    </router-link>

    <!-- <router-link
      v-if="$store.state.user.attributes.permissions_keys.includes(12)"
      tag="li"
      class="pageLink"
      to="/shipments"
    >
      <a>
        <img class="img-link" src="/static/img/welcome-ship.svg" alt>
        <span class="page">Embarques</span>
      </a>
    </router-link> -->

    <!-- <router-link tag="li" class="pageLink" to="/template">
      <a>
        <i class="fas fa-code"></i>
        <span class="page">Templates</span>
      </a>
    </router-link>-->

    <!-- <router-link v-if="$store.state.user.attributes.permissions_keys.includes(14)" tag="li" class="pageLink" to="/users">
      <a>
        <img class="img-link" src="/static/img/welcome-users.svg" alt>
        <span class="page">Usuarios</span>
      </a>
    </router-link> -->

<!-- <router-link v-if="$store.state.user.attributes.permissions_keys.includes(14)" tag="li" class="pageLink" to="/tableRebate">
      <a>
        <img class="img-link" src="/static/img/administrador.svg" alt>
        <span class="page">Utils</span>
      </a>
    </router-link> -->
    <!--
    <li class="treeview">
      <a href="#">
        <i class="fas fa-ship"></i>
        <span class="treeview-title page">Embarcaciones</span>
        <span class="pull-right-container pull-right d-flex flex-column">
          <i class="fa fa-angle-right fa-fw align-self-center"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="#">
            <i class="fa fa-file-word-o"></i> Item 1
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-picture-o"></i> Item 2
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-pdf-o"></i> Item 3
          </a>
        </li>
      </ul>
    </li>

    <li class="treeview">
      <a href="#">
        <i class="fas fa-user"></i>
        <span class="treeview-title page">Usuarios</span>
        <span class="pull-right-container pull-right d-flex flex-column">
          <i class="fa fa-angle-right fa-fw align-self-center"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="#">
            <i class="fa fa-file-word-o"></i> Item 1
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-picture-o"></i> Item 2
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-pdf-o"></i> Item 3
          </a>
        </li>
      </ul>
    </li>-->
    <!-- <router-link tag="li" class="pageLink" to="/tables">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Tables</span>
      </a>
    </router-link>-->
    <!-- <li class="header">ME</li>
    <router-link tag="li" class="pageLink" to="/tasks">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">Tasks</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/setting">
      <a>
        <i class="fa fa-cog"></i>
        <span class="page">Settings</span>
      </a>
    </router-link>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span class="treeview-title">Files</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="#">
            <i class="fa fa-file-word-o"></i> Item 1
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-picture-o"></i> Item 2
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-pdf-o"></i> Item 3
          </a>
        </li>
      </ul>
    </li>-->
    <!-- <li class="header">LOGS</li>
    <router-link tag="li" class="pageLink" to="/access">
      <a>
        <i class="fa fa-book"></i>
        <span class="page">Access</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/server">
      <a>
        <i class="fa fa-hdd-o"></i>
        <span class="page">Server</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/repos">
      <a>
        <i class="fa fa-heart"></i>
        <span class="page">Repos</span>
        <small class="label pull-right bg-green">AJAX</small>
      </a>
    </router-link>
    <li class="header">PAGES</li>
    <router-link tag="li" class="pageLink" to="/login">
      <a>
        <i class="far fa-circle text-yellow"></i>
        <span class="page pl-1">Login</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/404">
      <a>
        <i class="far fa-circle text-red"></i>
        <span class="page pl-1">404</span>
      </a>
    </router-link>-->
    <div class="page inferior" >
       <td><span class="tamanoLetra">Compra:</span></td>
       <td><span class="tamanoLetra">{{info ? info.data.buy : ''}}</span></td>
       <td><span class="page tamanoLetra">Venta:</span></td>
       <td><span class="tamanoLetra">{{info ? info.data.sale : ''}}</span></td>
    </div>
  </ul>

</template>
<script>
import axios from 'axios'
export default {
  data () {
      return {
        info: null
      }
  },
  mounted () {
      let url =process.env.API_URL +'/api/exchange_rate/list'
    axios
      .get(url)
      .then(response => (this.info = response))
  }
}
</script>
<style >
.tamanoLetra{
font-size: small;
color:#8f8f95
}
 .inferior{
position:absolute; /*El div será ubicado con relación a la pantalla*/
left:0px; /*A la derecha deje un espacio de 0px*/
right:0px; /*A la izquierda deje un espacio de 0px*/
bottom:0px; /*Abajo deje un espacio de 0px*/
z-index:0;
 }

</style>
