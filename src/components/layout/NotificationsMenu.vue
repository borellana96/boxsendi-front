<template>

  <div v-if ="typeof(notifications.data) != 'undefined' " class="link">

    <div class="dropdown">

      <div class="icon-avatar"  id="dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

        <img class="img-nav" src="/static/img/notification.svg" alt="">

        <div class="notification-cant">

          <span>{{unreadCount}}</span>

        </div>

      </div>

      <div class="dropdown-menu drop-edit" aria-labelledby="dropdown">

        <div class="notification-item-container">

          <div class="notification-content">

            <notification-item
            v-for="notification in notifications.data"
            :key="notification.id"
            :notification="notification"
            @readSuccess="discountReadNotification"
            ></notification-item>

          </div>

          <div v-if="!notifications.data.length" class="no-notifications">

            <span >No tienes nuevas notificaciones</span>
            
          </div>

          <div v-else-if="nextNotificationsUrl!=null" @click="getMoreNotifications" class="notification-more">

            <span >Ver más</span>

          </div>
          
        </div>

      </div>

    </div>
    
  </div>

</template>

<script>
import { mapState } from 'vuex'
import NotificationItem from './NotificationItem'
import { userInfo } from 'os';
import { notificationService } from '@/services/notification.service'
export default {
  name: 'NotificationsMenu',
  components: {
    NotificationItem
  },
  
  data() {
    
    
    return {
      tab: 'new',
      // notifications: this.$store.state.userInfo.notifications
    }
  },
  mounted() {
    console.log('Mounted!')
 
    /* NOTIFICATIONS */
    // if (this.$store.state.user.type === 'Operator') {
    //   window.Echo.private(
    //     'App.Models.Operator.' + this.$store.state.user.id
    //   ).notification(notification => {
    //     console.log("Operator");
        
    //     console.log(notification)
      

    //     console.log("notifications before")
    //     console.log(this.notifications.length);

    //     // this.notifications.unshift(notification)
    //     this.userInfo.notifications.data.unshift(notification)

    //     console.log("notifications after")
    //     console.log(this.notifications.length);
       

     
    //   })
    // } else if (this.$store.state.user.type === 'Admin') {
    //   window.Echo.private(
    //     'App.Models.Admin.' + this.$store.state.user.id
    //   ).notification(notification => {

    //     console.log("Admin");
        
    //     console.log(notification)
      

    //     console.log("notifications before")
    //     console.log(this.userInfo.notifications.data)
    //     console.log(this.userInfo.notifications.data.length)

    //     // this.notifications.unshift(notification)
    //     this.userInfo.notifications.data.unshift(notification)

    //     console.log("notifications after")
    //     console.log(this.userInfo.notifications.data)
    //     console.log(this.userInfo.notifications.data.length);

    //     this.userInfo.notifications.unread_count++
       
    //   })
    // } else if (this.$store.state.user.type === 'Client') {
    //   window.Echo.private(
    //     'App.Models.Client.' + this.$store.state.user.id
    //   ).notification(notification => {
    //     // console.log(notification)
    //     // this.notifications.unshift(notification)
    //   })
    // }

  },
  computed: {
    ...mapState(['userInfo']),
    notifications(){
      return this.userInfo.notifications
    },
    nextNotificationsUrl(){
      return this.notifications.next_page_url
    },
    unreadCount(){
      return this.notifications.unread_count
    }

    
    // newNotifications() {
    //   console.log("calculating new notifications")
    //   console.log("notifications")
    //   console.log(this.userInfo.notifications)
           
    //   // if (typeof(this.userInfo.notifications.data) != 'undefined' )
    //   // {
    //   //   return this.userInfo.notifications.data.filter(n => !n.read_at)
    //   // }
    //   return null
      
    // },
    // oldNotifications() {
    //   // if (typeof(this.userInfo.notifications.data) != 'undefined' )
    //   // {
    //   //   return this.userInfo.notifications.data.filter(n => n.read_at)
    //   // }
    //   return null
      
    // }
  },
  methods: {
   
    markAllAsRead() {
      event.stopPropagation()
      this.userInfo.notifications
        .filter(n => !n.read_at)
        .forEach(function(notification) {
          notification.read_at = new Date().toUTCString
        })
    },
    switchTab(event, tab) {
      event.stopPropagation()
      this.tab = tab
    },

    getMoreNotifications(){
      console.log("more notifications");
      
      notificationService.getMoreNotifications(this.nextNotificationsUrl, this.updateNotifications)
    },
    updateNotifications(notificationPagination)
    {
      console.log("update notifications")
      console.log(notificationPagination);
      
      console.log(this.userInfo.notifications);
      
      this.userInfo.notifications.next_page_url = notificationPagination.next_page_url
      console.log("array 1")
      console.log(this.userInfo.notifications.data)
      
      
      this.userInfo.notifications.data = this.userInfo.notifications.data.concat(notificationPagination.data)

      console.log(this.userInfo.notifications);

      //debe mantenerse abierto
      
    },

    discountReadNotification(n=1)
    {
      console.log("en discount read notification");
      console.log(this.userInfo);
      console.log(this.userInfo.notifications.unread_count);
      
      if (this.userInfo.notifications.unread_count >0 )
      {
        console.log("vamos a restar");

        this.userInfo.notifications.unread_count =  this.userInfo.notifications.unread_count - n
       
        
      }
      
    }

  }
}
</script>

<style scoped>
</style>