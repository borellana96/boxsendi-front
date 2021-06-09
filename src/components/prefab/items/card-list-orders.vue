<template lang="html">

  <div  class="product productOrder">

    <div class="productImage" href="">

      <div class="imageContent">

        <div class="flag tag-alta">
          <p v-if ="currentOrder.attributes.warning_expired_flag==1" class="tag">Con retraso</p>
          <p v-else-if ="currentOrder.attributes.warning_expired_flag==0 && currentOrder.attributes.items_to_replace>0" class="tag">A reponer</p>
        </div>


        <img

          v-if="currentOrder.attributes.product_image_url==null"
          :src="'https://pngimage.net/wp-content/uploads/2018/06/producto-icono-png-3.png' "
        >
        <img class="img-table" v-else :src=" currentOrder.attributes.product_image_url " >


      </div>

    </div>

    <div class="product-content">

      <div class="product-etiquetas-price">

        <div class="price">

            <span class="productCode ">#{{currentOrder.attributes.order_code}}</span>
            <span class="productName">{{currentOrder.attributes.weight_kg}} Kg</span>
            <span class="productName product-truncate bold">{{currentOrder.attributes.product_info}}</span>



        </div>

      </div>

      <div class="ctrls por clearfix">

        <div class="cantidad">

          <input class="num ctrl-num" type="number" onkeydown="return false"  v-model="counterItems" v-bind:min="1" v-bind:max="currentOrder.attributes.available_items_to_package" >

        </div>

        <button class="btn btn-primary proAdd" type="button" @click="alertAddPackage"><i class="fas fa-plus"></i></button>

        <button class="btn btn-danger proDelete" type="button" >Quitar</button>

      </div>

    </div>

  </div>

</template>

<script>
export default {
  props: ['currentOrder', 'totalWeightKg'],
  data() {
    return {
      added: false,
      counterItems: this.currentOrder.attributes.available_items_to_package

    }
  },

  methods: {
    alertAddPackage() {
      console.log('Click en boton')

      let partialWeight =
        (this.currentOrder.attributes.weight_kg /
          this.currentOrder.attributes.product_specimens) *
        this.counterItems

      if (partialWeight + this.totalWeightKg > 1500) {
        alert(
          'No puede mover esta cantidad de items del paquete porque sobrepasa el limite de peso de un embarque'
        )

        return
      }

      if (this.added) return
      let addedPackage
      addedPackage = new Object()

      addedPackage.number_of_items = this.counterItems
      addedPackage.partial_weight = partialWeight
      addedPackage.partial_weight = Number(
        Math.round(parseFloat(addedPackage.partial_weight) + 'e2') + 'e-2'
      ).toFixed(2)
      addedPackage.purchase_order_id = this.currentOrder.id

      if (
        typeof this.currentOrder.package_id !== 'undefined' &&
        this.currentOrder.package_id
      ) {
        addedPackage.id = this.currentOrder.package_id
      }
      let orderInfo = new Object()
      orderInfo.product_info = this.currentOrder.attributes.product_info
      orderInfo.product_image_url = this.currentOrder.attributes.product_image_url
      orderInfo.product_specimens = this.currentOrder.attributes.product_specimens
      orderInfo.order_code = this.currentOrder.attributes.order_code
      orderInfo.weight_kg = this.currentOrder.attributes.weight_kg
      orderInfo.id = this.currentOrder.id

      addedPackage.order_info = orderInfo
      this.added = true
      this.$emit('add-package', addedPackage)
    }
  }
}
</script>
