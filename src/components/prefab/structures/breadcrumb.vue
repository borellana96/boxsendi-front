<template lang="html">
  <div class="sub-header">

    <span class="kt-subheader__title">{{nameSection}} </span>

    <div class="kt-subheader__breadcrumbs">

      <router-link :to="{ name: 'Dashboard'}" class="kt-subheader__breadcrumbs-home"><i class="fas fa-home"></i></router-link>

      <div v-for="route in listRoutes" class="bread-new">

        <span class="kt-subheader__breadcrumbs-separator"></span>

        <router-link v-if="!route.idRoute" :to="{ name: route.nameRoute}" class="kt-subheader__breadcrumbs-link">{{route.titleRoute}}</router-link>

        <router-link v-if="route.idRoute" :to="{ name: route.nameRoute, params: {id:route.idRoute}}" class="kt-subheader__breadcrumbs-link">{{route.titleRoute}}</router-link>

      </div>

      <span v-if="activeRoute" class="bread-new">

        <span class="kt-subheader__breadcrumbs-separator"></span>

        <span class="kt-subheader__breadcrumbs-link route-none">{{activeRoute}}</span>

      </span>

    </div>

  </div>

</template>

<script>
export default {
  props:['nameSection','listRoutes','activeRoute'],
  data(){
    return{

    }
  },
}
</script>

<style lang="css" scoped>
</style>
