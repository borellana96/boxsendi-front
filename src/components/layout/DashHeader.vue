<template>

  <nav class="navbar main-header">

    <div class="wrap-header">

      <div class="nav-block">

        <div class="logo-nav" >

          <span class="burguer-menu" data-toggle="offcanvas" role="button">
        
          </span>

          <div style="color: red">BOXSENDI</div>

        </div>

        <div class="nav-icon">

          <div class="nav-nuevo">

            <notifications-menu></notifications-menu>

            <user-menu :user="user"></user-menu>

          </div>

        </div>

      </div>

    </div>

  </nav>

  
</template>

<script>
import { mapState } from 'vuex'
import MessagesMenu from './MessagesMenu'
import TasksMenu from './TasksMenu'
import NotificationsMenu from './NotificationsMenu'
import UserMenu from './UserMenu'
import LogOut from './LogOut'

export default {
  name: 'DashHeader',
  components: {
    MessagesMenu,
    NotificationsMenu,
    TasksMenu,
    UserMenu,
    LogOut
  },
  props: ['user'],
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>
