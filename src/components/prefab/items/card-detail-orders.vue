<template lang="html">
  <div class="product productSuitcase">

    <div class="productImage" href="">

      <div class="overlayImage"></div>

      <div class="imageContent">

        <div class="flag">
          <p class="tag">Alta</p>

        </div>

        <img src="https://www.remaxcompras.com/wp-content/uploads/2020/05/paquete.png" alt="">

      </div>

    </div>

    <div class="product-content">

      <div class="product-etiquetas-price">

        <h3 class="productName">name</h3>

        <div class="price">

          <span class="price-after">

              <span class="bold">n kg</span>

          </span>

        </div>

      </div>

      <div class="ctrls por clearfix">

        <button class="btn btn-secondary proDelete" type="button" >Detalles</button>

      </div>

    </div>

  </div>
</template>

<script>

export default {
  props:[
    'dataOrder'
  ],
  data(){
    return{
    }
  }
}
</script>
