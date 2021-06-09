<template lang="html">
  <div class="">
    <div class="product productChoose">

      <div class="productImage" href="">
        <div v-if ="afterSavePackages" class="flag">
            <p v-if="dataPackage.attributes.evaluated == 0" class="tag no-evaluado">No evaluado</p>
            <p v-if="dataPackage.attributes.evaluated == 1" class="tag evaluado">Evaluado</p>
        </div>
        <div class="imageContent">


          <img v-if="dataPackage.attributes.purchaseOrder.attributes.product_image_url==null" :src="'https://www.remaxcompras.com/wp-content/uploads/2020/05/paquete.png'" alt="" >

          <img v-else :src="dataPackage.attributes.purchaseOrder.attributes.product_image_url" alt="" >

        </div>

      </div>

      <div class="product-content">

        <div class="product-etiquetas-price">


          <div class="price" >

            <span class="productCode ">#{{dataPackage.attributes.purchaseOrder.attributes.order_code + " - " + dataPackage.attributes.order_number}}</span>
            <span class="productName ">{{dataPackage.attributes.partial_weight}} Kg</span>
            <span class="productName product-truncate bold">{{dataPackage.attributes.purchaseOrder.attributes.product_info}}</span>
            <span>Cantidad: {{dataPackage.attributes.number_of_items}}</span>

          </div>



        </div>





      </div>




    </div>









  </div>
</template>

<script>
import { packagesService } from '@/services/packages.service'

export default {
  props: ['dataPackage','afterSavePackages'],
  data() {
    return {



    }
  },
  created(){
    this.dataPackage = this.dataPackage;
  },

}
</script>
