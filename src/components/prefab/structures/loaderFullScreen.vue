<template lang="html">
  <div  v-if="isFullActive">
    <div id="overlay" v-if="loading">
        <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props:['isFullActive'],
  data() {
    return {
      loading: false
    }
  },
  created(){
    axios.interceptors.request.use((config) => {
      this.loading = true;
      return config;
    }, (error) => {
      this.loading = false;
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      this.loading = false;
      return response;
    }, (error) => {
      this.loading = false;
      return Promise.reject(error);
    });
  }
}
</script>
<style lang="css" scoped>
  #overlay{
  height:100%;
  width:100%;
  z-index: 9999;
  background-color: rgba(126, 126, 126, 0.8);
  position:fixed;
  left:0;
  top:0;
  display: block;
  }
  .loader {
   border: 16px solid #b4b4b4;
   border-radius: 50%;
   border-top: 16px solid #23324A;
   width: 80px;
   height: 80px;
   -webkit-animation: spin 2s linear infinite; /* Safari */
   animation: spin 2s linear infinite;
  }
  /* Safari */
  @-webkit-keyframes spin {
   0% { -webkit-transform: rotate(0deg); }
   100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
   0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
  }
  .loader {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top:340px;
  }
</style>
