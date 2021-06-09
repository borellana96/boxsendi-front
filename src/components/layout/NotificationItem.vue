<template>
 
  <div class="notification-item" @click="readNotification">

    <div class="notification-item-text notification-item-title">

      <span>{{ notification.data.title }}</span>

      <div v-if="readFlag" class="flag flag-yes">

        <span>Leido</span>
        
      </div>

      <div v-else="readFlag" class="flag flag-no">

        <span>No leido</span>
        
      </div>

    </div>

    <span class="notification-item-text notification-item-msj">{{ notification.data.message }}</span>

    <span class="notification-item-text notification-item-date">{{notification.data.sended_at.date|spanishDateTime}}</span>

  </div>
 
</template>

<script>
import { notificationService } from '@/services/notification.service'
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },

  methods:{
    async readNotification(){
      window.location.origin
      let redirectTo = '/purchaseOrder/'+this.notification.data.purchaseorder_id+'/Show'
      if (!this.readFlag){
        let res = await notificationService.readNotification(this.notification.id)
        console.log("notification leida exitosamente");
        this.$emit('readSuccess',1)
        
        if (res){
            
            console.log(redirectTo);
           

            window.location.replace(window.location.origin +redirectTo);

            
        }
        
      }
      else{
        console.log("notification ya fue leida");
        console.log(redirectTo);
        
        window.location.replace("http://www.w3schools.com");
        window.location.href = redirectTo;
      }
      
    }

  },
  computed:{
    readFlag(){
      return  typeof(this.notification.read_at) != 'undefined' && this.notification.read_at!=null
    }

  }
}
</script>

<style scoped>
.navbar-custom-menu
  > .navbar-nav
  > li.notifications-menu
  > .dropdown-menu
  > li
  > ul.menu
  li
  > a
  > h4,
.navbar-custom-menu
  > .navbar-nav
  > li.notifications-menu
  > .dropdown-menu
  > li
  > ul.menu
  li
  > a
  > p {
  margin: 0;
  white-space: normal;
  word-break: break-word;
}
.navbar-custom-menu
  > .navbar-nav
  > li.notifications-menu
  > .dropdown-menu
  > li
  > ul.menu
  li
  > a
  > h4 {
  font-size: 15px;
}
.navbar-custom-menu
  > .navbar-nav
  > li.notifications-menu
  > .dropdown-menu
  > li
  > ul.menu
  li
  > a
  > h4
  small {
  font-size: 10px;
}
.navbar-custom-menu
  > .navbar-nav
  > li.notifications-menu
  > .dropdown-menu
  > li
  > ul.menu
  li
  > a
  > p {
  font-size: 12px;
}
.navbar-custom-menu
  > .navbar-nav
  > li.notifications-menu
  > .dropdown-menu
  > li
  > ul.menu
  li
  > a
  > h4
  > span {
  display: inline-block;
}
.navbar-custom-menu
  > .navbar-nav
  > li.notifications-menu
  > .dropdown-menu
  > li
  > ul.menu
  li
  > a
  > h4
  > small.time {
  margin-top: 3px;
}
</style>