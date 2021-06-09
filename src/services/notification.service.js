import axios from 'axios'
import store from './../store'
export const notificationService = {
  getCurrentNotifications(profileId, callback) {
    let url =
      process.env.API_URL +
      '/api/notifications/' + profileId + '/get-current-notifications'
    console.log(url)
    axios
      .get(url)
      .then(response => {
        // console.log("*_*_*_**_*_*_**_**_**_");
        
        // console.log("notificaciones");
        
        // console.log(response.data)
        if (callback!=null)
        {
          callback(response.data.current_notifications)
        }
        else{
          store.commit('SET_NOTIFICATIONS', response.data.current_notifications)
        }
        
        
     
      })
      .catch(errors => {
        console.log(errors)
        console.log(errors.response)

        
      })
    
  },

  getMoreNotifications(url, callback) {
    console.log('----------------')
    console.log(url)
    console.log("--------");
    
    axios
      .get(url)
      .then(response => {
        // console.log("*_*_*_**_*_*_**_**_**_");
        
        // console.log("notificaciones");
        
        // console.log(response.data)
        callback(response.data.current_notifications)
      
     
      })
      .catch(errors => {
        console.log(errors)
        alert("Error al traer más notificaciones")

        
      })
    
  },

  async readNotification(notificationID) {
    let url = process.env.API_URL + '/api/notifications/' + notificationID + '/read'
    console.log(url);
    
    let res = await axios
      .post(url, {})
      .then(response => {
        if (response.data.status) {
          let readNotification = response.data
          console.log(readNotification)
          console.log("notification leida 0");
          
          return true
        } else {
          alert('Error de servicio')
          return false
        }
      })
      .catch(errors => {
        console.log(errors)
        console.log(errors.response)
        alert('Error de conexión al servidor')
        return false
      })
    return res
  },




}
