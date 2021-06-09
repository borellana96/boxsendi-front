<template lang="html">
  <div class="product productSuitcase">

    <div class="productImage" href="">

      <div class="overlayImage"></div>
      <div class="price">

          <span class="price-after">

              <span class="bold">{{dataLuggage.attributes.luggage_type.attributes.name}} </span>

          </span>

        </div>

      <div class="imageContent">

        <div class="flag">
          <p class="tag">Alta</p>

        </div>
        

        <img v-if="dataLuggage.attributes.luggage_type.attributes.key==1" src="https://i.ibb.co/mSQZTM9/maleta-De-Mano.jpg" alt="">
        <img v-if="dataLuggage.attributes.luggage_type.attributes.key==2" src="https://i.ibb.co/CJhVtQ0/maleta.jpg" alt="">
        <img v-if="dataLuggage.attributes.luggage_type.attributes.key==3" src="https://i.ibb.co/pZYJLpy/mochila.jpg" alt="">
        <img v-if="dataLuggage.attributes.luggage_type.attributes.key==4" src="https://i.ibb.co/K6T2hWp/box.png" alt="">
      </div>

    </div>

    <div class="product-content">

      <div class="product-etiquetas-price">

        <h3 class="productName">{{dataLuggage.attributes.description}}</h3>

        <div class="price">

          <span class="price-after">

              <span class="bold">{{dataLuggage.attributes.weight}} kg</span>

          </span>

        </div>

      </div>

      <div class="ctrls por clearfix">

        <button class="btn btn-danger proDelete" type="button" @click="quitLuggageItem" >Quitar</button>

      </div>

    </div>

  </div>
</template>

<script>
import { luggageService } from '@/services/luggage.service'
export default {
  props: ['dataLuggage'],
  data() {
    return {}
  },
  methods: {
    async quitLuggageItem() {
      let deleteOk = await luggageService.deleteLuggageItem(
        this.dataLuggage.numeration,
        this.dataLuggage.boarding_id
      )
      if (deleteOk) {
        this.$emit(
          'delete-from-luggage-list',
          this.dataLuggage.numeration,
          this.dataLuggage.boarding_id
        )
      } else {
        console.log('No se pudo eliminar')
      }
    }
  }
}
</script>
