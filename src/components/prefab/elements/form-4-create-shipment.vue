<template lang="html">
  <div class="form_container">

    <div class="suitCase-content">

      <div class="formContent">
        <div class="formTitle">
          <h1>Resumen del embarque</h1>
        </div>
      </div>

      <div class="vitrinaContainer">

        <div class="vitrina vitrinaSuitcase">

          <div class="details-tab">
            <div id="accordion">



            <div class="card">

              <div class="details-content-title collapsed " id="headingclient" data-toggle="collapse" data-target="#collapseclient" aria-expanded="false" aria-controls="collapseclient">

                <span>Datos del embarque</span>

                <div class="details-text up-arrow"></div>

              </div>

              <div id="collapseclient" class=" collapse" aria-labelledby="headingclient">

                <div class="details-content-info">

                  <div class="details-title-block">

                    <span class="details-title-item">Descripción:</span>
                    <span class="details-title-item" >{{dataLocal.dataShipment.description}}</span>

                  </div>

                  <div class="details-title-block">

                    <span class="details-title-item">Destino:</span>

                    <span class="details-title-item">{{dataLocal.dataShipment.destination.attributes.name}}</span>



                  </div>

                  <div class="details-title-block" >

                    <span class="details-title-item">Operador de llegada:</span>
                    <span class="details-title-item" >{{dataLocal.dataShipment.reciever_operator.attributes.username}}</span>

                  </div>

                  <div class="details-title-block" >

                    <span class="details-title-item" >Fecha de salida:</span>
                    <span class="details-title-item"  >{{dataLocal.dataShipment.arrival_date|spanishDateTime}}</span>


                  </div>

                  <div class="details-title-block" >

                    <span class="details-title-item" >Fecha de llegada:</span>
                    <span class="details-title-item"  >{{dataLocal.dataShipment.departure_date|spanishDateTime}}</span>


                  </div>


                </div>

              </div>
            </div>





         <div class="card">
             <div class="details-content-title collapsed " id="headingclient2" data-toggle="collapse" data-target="#collapseclient2" aria-expanded="false" aria-controls="collapseclient2">
                  <span>Detalles de equipaje</span>
                  <div class="details-text up-arrow"></div>
            </div>

              <div id="collapseclient2" class=" collapse" aria-labelledby="headingclient2">

                <div class="details-content-info">
                    <div class="card-body">
                      <div class="resumen-type">
                        <div class="vitrinaContainer">
                          <div class="vitrina">
                            <ul class="vitrina-100">
                              <li v-for="luggageItem of dataLocal.dataLuggage.luggage_items">
                                <cardDetailLuggage v-bind:dataLuggage="luggageItem"></cardDetailLuggage>
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
          </div>





          <div class="">
          <div class="card">
           <div class="details-content-title collapsed " id="headingclient3" data-toggle="collapse" data-target="#collapseclient3" aria-expanded="false" aria-controls="collapseclient3">
                <span>Detalle de artículos</span>
                <div class="details-text up-arrow"></div>
            </div>

              <div id="collapseclient3" class=" collapse" aria-labelledby="headingclient3">
                <div class="details-content-info">
                  <div class="card-body">
                    <div class="resumen-type">
                      <div class="vitrinaContainer">
                        <div class="vitrina">
                          <ul class="vitrina-100">
                            <li v-for="package of dataLocal.dataOrder.packages">
                              <cardPackage v-bind:afterSavePackages="false" v-bind:dataPackage="package" ></cardPackage>
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






        </div>
      </div>

      <div class="text-right">

        <div class="weightContent">
          <span>{{totalWeightLb|currency}} Kg</span>
        </div>

        <a href="#" class="btn btn-primary btn-lg btn-edit" @click="showModalConfirmation">Despachar embarque</a>

      </div>

    </div>

    <b-modal hide-footer hide-header centered id="modalConfirmation" ref="modalConfirmation">
      <div class="modal-Content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Confirmar acción:</h5>
          <button type="button" class="close" aria-label="Close" @click="hideModalConfirmation">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="modal-body">
          <div class="text-center">
            <p>¿Estás seguro que deseas completar esta acción?</p>
          </div>
        </div>

        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary btn-lg" @click="toSendForm()">Aceptar</button>
          <button
            type="button"
            class="btn btn-primary btn-lg"
            @click="hideModalConfirmation()"
          >Cancelar</button>
        </div>
      </div>
    </b-modal>

  </div>
</template>

<script>
import cardDeleteOrders from '@/components/prefab/items/card-delete-orders.vue'
import cardPackage from "@/components/prefab/items/card-package.vue"
import cardDetailLuggage from "@/components/prefab/items/card-detail-luggage.vue"

export default {
  components: {
    cardDeleteOrders,
    cardPackage,
    cardDetailLuggage
  },
  props: ['id', 'dataLocal', 'totalWeightLb'],
  data() {
    return {
      totalWeight: 0
    }
  },
  created() {},
  methods: {
    toSendForm() {
      this.$emit('toSendForm', true)
    },
    hideModalConfirmation() {
      this.$refs.modalConfirmation.hide()
    },
    showModalConfirmation() {
      this.$refs.modalConfirmation.show()
    }
  }
}
</script>

<style lang="css" scoped>
</style>
