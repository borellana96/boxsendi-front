<template lang="html">
  <div class="product productChoose">

    <div class="productImage" href="">

      <div class="imageContent">

        <img

          v-if="dataOrder.order_info.product_image_url==null"
          :src="'https://pngimage.net/wp-content/uploads/2018/06/producto-icono-png-3.png' "
        >
        <img class="img-table" v-else :src="dataOrder.order_info.product_image_url " >

      </div>

    </div>

    <div class="product-content">

      <div class="product-etiquetas-price">

        <div class="price">

          <span class="productCode ">#{{dataOrder.order_info.order_code}}</span>
          <span class="productName">{{dataOrder.order_info.weight_kg}} Kg</span>
          <span class="productName product-truncate bold">{{dataOrder.order_info.product_info}}</span>

        </div>

      </div>

      <div class="ctrls por clearfix">

        <div class="cantidad">

          <input class="num ctrl-num" type="text"   v-bind:value="dataOrder.number_of_items" numeric v-bind:min="1" v-bind:max="dataOrder.order_info.product_specimens" >


          <div class="arrows">

              <div class="up ctrl-max disabled"></div>

              <div class="down ctrl-min"></div>

          </div>

        </div>

        <button class="btn btn-danger proAdd " type="button" @click="alertQuitPackage"><i class="fas fa-times"></i></button>

      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: ['dataOrder'],
  data() {
    return {}
  },
  created() {},
  methods: {
    alertQuitPackage() {
      console.log('Click en quit')
      console.log(this.dataOrder)

      this.$emit('quit-package', this.dataOrder)
    }
  }
}
</script>
