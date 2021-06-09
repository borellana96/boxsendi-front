<template lang="html">

  <div class="form-order">

    <div class="form_container form-flex">

      <div class="container-order">

        <div class="chooseOrder order-block">

          <div class="vitrina-content">

            <div class="formContent">
                <div class="formTitle">
                  <h1>Tus órdenes</h1>
                </div>
            </div>

            <!-- <div class="filter-search" id="icon-search">
              <input id="search-bar" type="text" class="input form-control" placeholder="Buscar..." >
            </div> -->
            <div v-if ="availableOrders.length <=0">
              <span class="page-stats no-orders">No cuenta con órdenes disponibles para este embarque</span>

            </div>

            <div class="vitrinaContainer">

              <div class="vitrina">

                <ul>

                   <li v-if="order.visible" v-for="(order) in availableOrders"
                        :key="order.id" >
                       <cardListOrders  v-bind:currentOrder="order" v-bind:totalWeightKg="totalWeightKg" @add-package="addPackage" ></cardListOrders>
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </div>

        <div class="resumeOrder order-block">

          <div class="vitrina-content">

          <div class="formContent">

            <div class="formTitle">
              <h1>Tu embarque</h1>
            </div>

            <div class="formNew" data-toggle="modal" data-target="#modalSuitcase" >

              <div class="weightContent">
                <span>{{totalWeightKg|currency}} Kg</span>
              </div>

              <b-button  class="btn-primary"  @click="savePackages" :disabled="availableOrders.length <=0 ">Guardar</b-button>

            </div>

          </div>

          <!-- <div class="filter-search" id="icon-search">
            <input id="search-bar" type="text" class="input form-control" placeholder="Buscar..." >
          </div> -->



          <div class="vitrinaContainer">
            <div class="vitrina">
            <ul>

              <li v-for="(addedPackage) of packagesToSave">
                  <cardDeleteOrders v-bind:dataOrder="addedPackage"   @quit-package="quitPackage" ></cardDeleteOrders>
              </li>
            </ul>
          </div>

          </div>

        </div>

      </div>

      </div>

      </div>

    </div>

  </div>


</template>

<script>
import cardListOrders from '@/components/prefab/items/card-list-orders.vue'
import cardDeleteOrders from '@/components/prefab/items/card-delete-orders.vue'
import { ordersService } from '@/services/orders.service'
import { shipmentService } from '@/services/shipment.service'
export default {
  props: ['id', 'dataLocal'],
  components: {
    cardListOrders,
    cardDeleteOrders
  },
  data() {
    return {
      creatorId: '',
      destinationId: '',
      dataOrderCopy: null,

      availableOrders: [],

      packagesToSave: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    inicialiceDataLocal() {
      this.dataOrderCopy = this.dataLocal.dataOrder
    },
    async savePackages() {
      console.log('Estamos en save packages')

      let formData = new Object()

      this.packagesToSave.forEach(pack => {
        delete pack.order_info
      })

      formData.packages_to_save = this.packagesToSave
      console.log('paso 1')

      let response = await shipmentService.savePackages(this.id, formData)
      console.log(response)

      console.log('paso 2')

      this.$emit('packages-saved')

    },
    callbackTest(value) {
      console.log('estamos en el callback de prueba')
      return
    },

    getAvailableOrders(retrievedOrders) {
      this.availableOrders = retrievedOrders
      this.availableOrders.forEach(order => {
        order.visible = true
      })
    },
    fetchData() {
      this.inicialiceDataLocal()
      this.destinationId = this.dataLocal.dataShipment.destination_id
      this.creatorId  = this.dataLocal.dataShipment.creator_operator_id

      let packagesFromServer = this.dataLocal.dataOrder.packages
      if(packagesFromServer){
        packagesFromServer.forEach(pack => {
          let packObj = new Object()
          packObj.id = pack.id
          packObj.number_of_items = pack.attributes.number_of_items
          packObj.partial_weight = pack.attributes.partial_weight
          packObj.purchase_order_id = pack.attributes.purchase_order_id
          packObj.modified = 0
          let orderInfo = new Object()

          orderInfo.product_info =  pack.attributes.purchaseOrder.attributes.product_info
          orderInfo.product_image_url =  pack.attributes.purchaseOrder.attributes.product_image_url
          orderInfo.product_specimens =  pack.attributes.purchaseOrder.attributes.product_specimens
          orderInfo.order_code = pack.attributes.purchaseOrder.attributes.order_code
          orderInfo.weight_kg = pack.attributes.purchaseOrder.attributes.weight_kg
          orderInfo.id = null
          orderInfo.purchaseOrder = pack.attributes.purchaseOrder
          packObj.order_info = orderInfo
          this.packagesToSave.push(packObj)
        })
      }

      ordersService.listOrdersByCityAndOperator(
        this.creatorId,
        this.destinationId,
        this.getAvailableOrders
      )
    },
    addPackage(newPackage) {
      console.log('En add package')
      console.log(newPackage)

      newPackage.number_of_items = parseInt(newPackage.number_of_items)
      newPackage.partial_weight = parseFloat(newPackage.partial_weight)
      let retrievedOrder = this.findAvailableOrdersById(
        newPackage.order_info.id
      )
      retrievedOrder.visible = false
      if (
        typeof retrievedOrder.number_of_items_prev !== 'undefined' &&
        retrievedOrder.number_of_items_prev
      ) {
        newPackage.modified =
          newPackage.number_of_items != retrievedOrder.number_of_items_prev
            ? 1
            : 0
      }
      this.packagesToSave.push(newPackage)
    },
    findAvailableOrdersById(keyId) {
      return this.availableOrders.find(function(order) {
        return order.id == keyId
      })
    },
    quitPackage(quitPackage) {
      console.log('En quit package')
      console.log(quitPackage)
      console.log(quitPackage.order_info)

      if (quitPackage.order_info.id != null) {
        console.log('Va al if')

        let retrievedOrder = this.findAvailableOrdersById(
          quitPackage.order_info.id
        )
        retrievedOrder.visible = true

        let index = this.packagesToSave.findIndex(function(pack) {
          return pack.purchase_order_id == quitPackage.purchase_order_id
        })
        console.log(index)

        this.packagesToSave.splice(index, 1)
        console.log(this.packagesToSave)
      } else {
        console.log(quitPackage)

        console.log('Va al else')
        console.log(this.packagesToSave[0])
        console.log(this.packagesToSave[1])

        let packageItems = quitPackage.number_of_items
        let purchaseOrder = quitPackage.order_info.purchaseOrder
        let itemsToPackage =
          purchaseOrder.attributes.available_items_to_package != null
            ? purchaseOrder.attributes.available_items_to_package + packageItems
            : null
        purchaseOrder.attributes.available_items_to_package = itemsToPackage
        purchaseOrder.visible = true
        purchaseOrder.from_existing = true
        purchaseOrder.number_of_items_prev = packageItems
        purchaseOrder.package_id = quitPackage.id
        this.availableOrders.push(purchaseOrder)

        let index = this.packagesToSave.findIndex(function(pack) {
          return pack.id == quitPackage.id
        })
        console.log(index)
        console.log(this.packagesToSave)
        console.log(this.packagesToSave[0])
        console.log(this.packagesToSave[1])
        this.packagesToSave.splice(index, 1)

        console.log(this.packagesToSave)
        console.log(this.packagesToSave[0])

        return
      }
    }
  },
  computed: {
    totalWeightKg: function() {
      let total = 0

      this.packagesToSave.forEach(pack => {
        total = total + pack.partial_weight
      })

      if(this.dataLocal.dataLuggage.luggage_items){
        this.dataLocal.dataLuggage.luggage_items.forEach(luggage => {
          total = total + luggage.attributes.weight
        })
      }

      this.$emit('total-weight-updated', total)
      return total
    }
  }
}
</script>
