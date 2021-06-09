<template lang="html">

  <div class="details-content">

    <div class="details-order">

      <div class="details-order-block details-image" style="text-align: center">

          <img v-if="orderDataShow.attributes.product_image_url==null && orderDataShow.attributes.is_from_meli_flag" :src="'https://pngimage.net/wp-content/uploads/2018/06/producto-icono-png-3.png'" width="180px" height="260px" >
          <img v-else-if="orderDataShow.attributes.product_image_url==null && orderDataShow.attributes.is_from_linio_flag" src="/static/img/linio-logo.png" width="180px" height="260px" >
          <img v-else :src="orderDataShow.attributes.product_image_url" width="180px" height="260px" ><br><br>
          <a v-if="orderDataShow.attributes.sku!=null" :href="orderDataShow.attributes.linksku" target="_blank" rel="noopener noreferrer" >
            <span id="order-code" class="code-order grabr-code enlace color"  v-b-popover.hover.top="'Código SKU'" >{{orderDataShow.attributes.sku}}</span>
          </a>
      </div>

      <div class="details-order-block details-info">

        <div class="details-title">

          <div class="details-title-container">

            <div class="">

              <span class="title-order"> {{orderDataShow.attributes.product_info}}</span>

            </div>

            <div class="details-title-block">

              <div  class="order-type">

                <span class="code-order system-code"  > SB # {{orderDataShow.attributes.order_code}}</span>

                <div v-if ="orderDataShow.attributes.is_from_grabr_flag" >

                  <span class="code-order-container">

                    <div class="circle-separador"></div>

                    <span class="tag-grabr" >

                      <span class="badge badge-primary badge-grabr">Grabr</span>

                    </span>

                    <div class="circle-separador"></div>

                    <a :href="'https://grabr.io/es/grabs/'+orderDataShow.attributes.grabrOrder.attributes.grabr_order_number" target="_blank">

                      <span id="order-code" class="code-order grabr-code" v-b-popover.hover.top="'Codigo del Partner'">#{{orderDataShow.attributes.grabrOrder.attributes.grabr_order_number}}
                      </span>

                    </a>

                  </span>

                </div>

                <div v-else-if ="orderDataShow.attributes.is_from_linio_flag" >

                  <span class="code-order-container">

                    <div class="circle-separador"></div>

                    <span class="tag-grabr" >

                      <!-- <span class="badge badge-primary badge-linio">Linio</span> -->

                    </span>
<!--
                    <div class="circle-separador"></div>

                      <a :href="'https://sellercenter.linio.com.pe/order/index/order-detail/id/'+orderDataShow.attributes.linioOrder.attributes.linio_order_id" target="_blank">
                        <span id="order-code" class="code-order grabr-code" v-b-popover.hover.top="'Codigo del Partner'">#{{orderDataShow.attributes.linioOrder.attributes.linio_order_number}}
                        </span>
                      </a> -->

                  </span>

                </div>

                <div v-else-if ="orderDataShow.attributes.is_from_meli_flag" >

                  <span class="code-order-container">

                    <div class="circle-separador"></div>

                    <span class="tag-grabr" >

                      <span class="badge badge-primary badge-meli">Mercado Libre</span>

                    </span>
                  </span>

                </div>

              </div>

            </div>


            <div class="details-title-container">

              <div class="details-title-block" v-if="!editDescriptionFlag">

                <span>{{orderDataShow.attributes.description!=null ? orderDataShow.attributes.description:"Sin descripción"}}</span>

                <span class="details-title-item" v-if="fromDetail && orderDataShow.attributes.status!=10 && orderDataShow.attributes.cancelled==0" @click="editDescription">Editar<i class="fas fa-edit"></i></span>

              </div>

              <div class="details-title-block" v-else>
                <div class="input-group input-box">
                  <input type="text" class="form-control null" v-model="description">
                </div>

                <div class="text-right">

                  <span class="details-title-item" :disabled = "description!=descriptionRealValue" @click="updateDescription">Guardar cambios</span>

                  <span class="details-title-item" @click="cancelEditDescription"><i class="fas fa-times" style="cursor: pointer"></i></span>

                </div>
              </div>

            </div>

            <div class="details-title-block" v-if="orderDataShow.attributes.is_from_meli_flag">
              <span class="details-title-item">Tienda: </span>
              <span class="tag-grabr" v-if="orderDataShow.attributes.meliOrder.attributes.store">
                <span class="badge badge-dark badge-store bg-primary" v-if="orderDataShow.attributes.meliOrder.attributes.store ==='electro'">{{orderDataShow.attributes.meliOrder.attributes.store}}</span>
                <span class="badge badge-dark badge-store brown" v-if="orderDataShow.attributes.meliOrder.attributes.store ==='clothing'">{{orderDataShow.attributes.meliOrder.attributes.store}}</span>
                <span class="badge badge-dark badge-store bg-success" v-if="orderDataShow.attributes.meliOrder.attributes.store ==='homegarden'">{{orderDataShow.attributes.meliOrder.attributes.store}}</span>
              </span>
              <span class="details-title-item" v-else>No definido</span>
            </div>

            <!-- <div class="details-title-block" v-if="orderDataShow.attributes.is_from_meli_flag">
              <span class="details-title-item">Código de orden:</span>
              <a :href="orderDataShow.attributes.meliOrder.attributes.meli_order_link" target="_blank" >
                  <span id="order-code" class="code-order grabr-code enlace" v-b-popover.hover.top="'Código del partner'">{{orderDataShow.attributes.meliOrder.attributes.meli_order_id}}</span>
              </a>
            </div>

            <div class="details-title-block" v-else-if="orderDataShow.attributes.is_from_linio_flag">
              <span class="details-title-item">Código de orden:</span>
              <a :href="orderDataShow.attributes.linioOrder.attributes.linio_order_link" target="_blank" >
                  <span id="order-code" class="code-order grabr-code enlace" v-b-popover.hover.top="'Código del partner'">{{orderDataShow.attributes.linioOrder.attributes.linio_order_id}}</span>
              </a>
            </div>

            <div class="details-title-block" v-if="orderDataShow.attributes.is_from_meli_flag">
              <span class="details-title-item">Código de publicación:</span>
               <a :href="orderDataShow.attributes.meliOrder.attributes.publication_code_link" target="_blank" >
                  <span id="order-code" class="code-order grabr-code enlace" v-b-popover.hover.top="'Código de publicación'">{{orderDataShow.attributes.meliOrder.attributes.publication_code}}</span>
                </a>
            </div>

            <div class="details-title-block" v-else-if="orderDataShow.attributes.is_from_linio_flag">
              <span class="details-title-item">Código de publicación:</span>
               <a :href="'http://www.linio.com.pe/'+orderDataShow.attributes.linioOrder.attributes.linio_publication_code+'.html'" target="_blank" >
                  <span id="order-code" class="code-order grabr-code enlace" v-b-popover.hover.top="'ID de la orden'">{{orderDataShow.attributes.linioOrder.attributes.linio_publication_code}}</span>
                </a>
            </div> -->
          </div>


          <div class="details-title-container">

            <div class="details-title-block" v-if="!editPackagedFlag">

              <span class="details-title-item">Empaque</span>

              <div style="display:flex">
              <span class="details-title-item">{{orderDataShow.attributes.packaged==null?"Sin especificar":(orderDataShow.attributes.packaged == 1?"Sí":"No")}}</span>

              <span class="details-title-item" v-if="fromDetail && orderDataShow.attributes.status!=10 && orderDataShow.attributes.cancelled==0 && (!orderDataShow.attributes.is_from_linio_flag)"  @click="editPackaged">Editar<i class="fas fa-edit"></i></span>
              </div>

            </div>

            <div class="details-title-block" v-else>

              <div class="input-group input-box">

                <select class="form-control form-control-lg" name = "packaged"  v-model="packaged">

                  <option disabled value>Seleccionar</option>

                  <option :value="1">Sin especificar</option>

                  <option :value="2" >Sí</option>

                  <option :value="3" >No</option>

                </select>

              </div>

              <div class="text-right">

                <span class="details-title-item" :disabled = "packaged!=packagedRealValue" @click="updatePackaged"
                >Guardar cambios</span>

                <span class="details-title-item" @click="cancelEditPackaged"><i class="fas fa-times" style="cursor: pointer"></i></span>

              </div>

            </div>

            <div class="details-title-block">

              <span class="details-title-item">Cantidad entregada</span>

              <span class="details-title-item">{{orderDataShow.attributes.product_specimens_delivered}}</span>

            </div>

            <div class="details-title-block">

              <span class="details-title-item">Cantidad total</span>

              <span class="details-title-item">{{orderDataShow.attributes.product_specimens}}</span>

            </div>

            <div class="details-title-block" v-if="!editCostingMethodFlag">

              <div style="display:flex">
                <span class="details-title-item">Met. costeo:</span>
                <span class="details-title-item">{{orderDataShow.attributes.costing_method==1?"PESO (7usd/kg)":orderDataShow.attributes.costing_method==2?"TRAVELER":orderDataShow.attributes.costing_method==3?"ALTERNATIVO":"No definido"}}</span>
              </div>

              <div style="display:flex">
                <span class="details-title-item">{{ orderDataShow.attributes.weight_kg!=null ? orderDataShow.attributes.weight_kg+" kg":"No definido"}}</span>

                <!-- <div style="display:flex">
                <span class="details-title-item">{{orderDataShow.attributes.packaged==null?"Sin especificar":(orderDataShow.attributes.packaged == 1?"Sí":"No")}}</span> -->

                <span v-if="orderDataShow.attributes.status == 2" class="details-title-item" @click="editCostingMethod">Editar<i class="fas fa-edit"></i></span>
              </div>

            </div>

            <div class="details-title-block" v-else>

              <div class="input-group input-box">

                <select class="form-control form-control-lg"
                        name="costingMethod"
                        v-model="costingMethod"
                        @change="changeCostingMethod">

                  <option disabled value>Seleccionar</option>

                  <option :value="1">Peso (7usd/kg)</option>

                  <option :value="2">Traveler</option>

                  <option :value="3">Alternativo</option>

                </select>

              </div>

              <div class="text-right">

                <span class="details-title-item" :disabled = "costingMethod!=costingMethodRealValue" @click="updateCostingMethod"
                >Guardar cambios</span>

                <span class="details-title-item" @click="cancelEditCostingMethod"><i class="fas fa-times" style="cursor: pointer"></i></span>

              </div>

            </div>

            <!--<div class="details-title-block" v-else-if="orderDataShow.attributes.is_from_linio_flag" >

              <span class="details-title-item">Met. costeo - PESO (Por Categoría)</span>

              <span class="details-title-item">{{ orderDataShow.attributes.weight_kg!=null ? orderDataShow.attributes.weight_kg+" lb":"No definido"}}</span>

            </div>-->

          </div>

        </div>

      </div>



    </div>

  </div>

</template>

<script>
import { ordersService } from '@/services/orders.service'
import { eventBus } from '../../../main.js'
export default {
  props: ['orderDataShow', 'fromDetail', 'fromTracking'],
  data() {
    return {
      packaged: 1,
      description: '',
      costingMethod: this.orderDataShow.attributes.costing_method,
      editPackagedFlag: false,
      editDescriptionFlag: false,
      editCostingMethodFlag: false
    }
  },
  created(){
    eventBus.$on('changeFlag', this.changeFlag);
  },
  methods: {
    editPackaged() {
      this.packaged = this.packagedRealValue
      this.editPackagedFlag = true
    },

    cancelEditPackaged() {
      console.log('cancelEditPackaged')
      this.editPackagedFlag = false
    },

    async updatePackaged() {
      console.log('updatePackaged')
      let auxObject = new Object()
      auxObject.packaged =
        this.packaged == 1 ? null : this.packaged == 2 ? 1 : 0

      let resp = await ordersService.updateBuyingOrderNoGrabr(
        this.orderDataShow.attributes.order_code,
        auxObject
      )

      this.$emit('inicialize-data')
      this.editPackagedFlag = false
    },

    editDescription() {
      this.description = this.descriptionRealValue
      this.editDescriptionFlag = true
    },

    cancelEditDescription() {
      console.log('cancelEditDescription')
      this.editDescriptionFlag = false
    },

    async updateDescription() {
      console.log('updateDescription')
      let auxObject = new Object()
      auxObject.description = this.description;
      let resp = await ordersService.updateBuyingOrderNoGrabr(
        this.orderDataShow.attributes.order_code,
        auxObject
      )
      console.log('cambios en descripcion');
      console.log(auxObject);
      this.$emit('inicialize-data')
      this.editDescriptionFlag = false
    },

    editCostingMethod() {
      this.costingMethod = this.costingMethodRealValue
      this.editCostingMethodFlag = true
    },

    cancelEditCostingMethod() {
      this.editCostingMethodFlag = false
      eventBus.$emit('change-cancel');
    },

    updateCostingMethod() {
      this.editCostingMethodFlag = false
      eventBus.$emit('updatePurchaseOrder');
    },

    changeCostingMethod(){
      eventBus.$emit('costing-method', this.costingMethod);
    },
    changeFlag(){
      this.editCostingMethodFlag = false
    }
  },
  computed: {
    packagedRealValue: function() {
      let packagedAux = this.orderDataShow.attributes.packaged
      if (packagedAux == null) {
        return 1
      } else if (packagedAux == 1) {
        return 2
      } else {
        return 3
      }
    },

    descriptionRealValue: function() {
      let descriptionAux = this.orderDataShow.attributes.description
      if (descriptionAux == null) {
        return null
      } else {
        return this.description
      }
    },

    costingMethodRealValue: function() {
      let costingMethodAux = this.orderDataShow.attributes.costing_method;
      if(costingMethodAux == 1)
        return 1;
      else if(costingMethodAux == 2)
        return 2;
      else if(costingMethodAux == 3)
        return 3;
    },
  },

}

$(function () {

  $("#image").on('click', function() {
     $(".details1").addClass("gg");

  });

  });

</script>
<style >
.brown{
  background: #6D4C41;
}
.enlace{
text-decoration: none;

}
.color{
color:#8f8f95;

}
</style>
