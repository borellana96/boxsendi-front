<template lang="html">

  <div  class="form_container" >

    <div class="form-login text-title">

      <div v-if = "newCityDestiny || !this.dataLocal.dataShipment.status">

        <div class="formContent">
            <h1>Datos del embarque</h1>
        </div>
        <div class="formItem">

          <div v-if="!this.dataLocal.dataShipment.status && currentUserRole=='Admin'" >

            <label for="" class="float-left">Operador de envío</label>
           
            <div class="input-group">
              <select class="form-control form-control-lg sen-form-input-with-tooltip" name="destiny_city" v-validate="'required'" v-model="newCreatorOperator">
                <option disabled value>Selecciona</option>
                <option :value="operator" v-for="operator of listSenderOperators">{{operator.attributes.username}}</option>
              </select>

              <div class="sen-tooltip">
                <span>Es el operador de envío al que se le asigna el embarque</span>
              </div>

              <span v-show="errors.has('creator_operator')" class="text-danger">{{ errors.first('creator_operator') }}</span>

            </div>
              

          </div>

          <div v-else-if="this.dataLocal.dataShipment.status && currentUserRole=='Admin'" class="form-group ">


            <label for="" class="float-left">Operador de envío</label>

            <div class="input-group">

              <p class="form-control block">{{newCreatorOperator.attributes.username}}</p>

            </div>

          </div>

          <div v-if="!this.dataLocal.dataShipment.status" class="form-group ">

            <label for="" class="float-left">Destino</label>
            <div class="input-group">
            <div class="input-group">
              <select class="form-control form-control-lg sen-form-input-with-tooltip" name="destiny_city" v-validate="'required'" v-model="newCityDestiny">
                <option disabled value>Selecciona</option>
                <option :value="cityOrigin" v-for="cityOrigin of listCities">{{cityOrigin.attributes.name}}</option>
              </select>

              <div class="sen-tooltip">
                <span>Es la ciudad destino del embarque</span>
              </div>

              <span v-show="errors.has('destiny_city')" class="text-danger">{{ errors.first('destiny_city') }}</span>

            </div>
            </div>

          </div>

          <div v-else-if="this.dataLocal.dataShipment.status" class="form-group ">


            <label for="" class="float-left">Destino</label>

            <div class="input-group">
            <div class="input-group">

              <p class="form-control block">{{newCityDestiny.attributes.name}}</p>

            </div>
            </div>

          </div>

          <div v-if="!this.dataLocal.dataShipment.status" class="form-group">

            <label for="" class="float-left">Descripción</label>
            <div class="input-group">
            <div class="input-group">


              <textarea class="form-control null sen-form-input-with-tooltip " name="description_shipment" v-validate="'required'" rows="3" cols="70" v-model="newDescription" :maxlength="500"></textarea>

              <span v-show="errors.has('description_shipment')" class="text-danger">{{ errors.first('description_shipment') }}</span>

          </div>
          </div>
          </div>

          <div v-else-if="this.dataLocal.dataShipment.status" class="form-group">
            <label for="" class="float-left">Descripción</label>

            <div class="input-group">
            <div class="input-group">

              <p class="form-control block" v-model="newDescription">{{dataLocal.dataShipment.description}}</p>

            </div>
            </div>

          </div>

          <div v-if="!this.dataLocal.dataShipment.status" class="form-group">

            <label for="" class="float-left">Fecha de salida</label>

            <div class="input-group">
            <div class="input-group">

              <input type="date" name="departure_date" max="2100-12-31" v-validate="'required'" class="form-control null sen-form-input-with-tooltip" v-model="newDateDeparture">

              <div class="sen-tooltip">
                <span>Fecha de salida del vuelo del embarque desde la ciudad de origen</span>
              </div>

              <span v-show="errors.has('departure_date')" class="text-danger">{{ errors.first('departure_date') }}</span>

            </div>
            </div>

          </div>

          <div v-else class="form-group">

            <label for="" class="float-left">Fecha y hora de salida</label>

            <div class="input-group">
            <div class="input-group">

              <p  class="form-control block" >{{newDateDeparture|spanishDateTime}}</p>

            </div>
            </div>

          </div>

          <div v-if="!this.dataLocal.dataShipment.status" class="form-group">

            <label for="" class="float-left">Hora de salida</label>

            <div class="input-group">
            <div class="input-group">

              <input type="time" name="departure_hour"  v-validate="'required'" class="form-control null sen-form-input-with-tooltip" v-model="newHourDeparture">

              <div class="sen-tooltip">
                <span>Hora de salida del vuelo del embarque desde la ciudad de origen</span>
              </div>

              <span v-show="errors.has('departure_hour')" class="text-danger">{{ errors.first('departure_hour') }}</span>

            </div>
            </div>

          </div>

          <div v-if="!this.dataLocal.dataShipment.status" class="form-group">

            <label for="" class="float-left">Fecha de llegada<i data-toggle="tooltip" data-placement="bottom" title="" class="far fa-question-circle"></i></label>

            <div class="input-group">
            <div class="input-group">

              <input type="date" name="arrival_date" max="2100-12-31" v-validate="'required'" class="form-control null sen-form-input-with-tooltip" v-model="newDateArrival">

              <div class="sen-tooltip">
                <span>Fecha de llegada del vuelo del embarque a la ciudad destino</span>
              </div>

              <span v-show="errors.has('arrival_date')" class="text-danger">{{ errors.first('arrival_date') }}</span>

            </div>
            </div>

          </div>

          <div v-else class="form-group">

            <label for="" class="float-left">Fecha y hora de llegada <i data-toggle="tooltip" data-placement="bottom" title="" class="far fa-question-circle"></i></label>

            <div class="input-group">
            <div class="input-group">

              <p  class="form-control block" >{{newDateArrival|spanishDateTime}}</p>

            </div>
            </div>

          </div>

          <div v-if="!this.dataLocal.dataShipment.status" class="form-group">

            <label for="" class="float-left">Hora de llegada</label>

            <div class="input-group">
            <div class="input-group">

              <input type="time" name="arrival_hour"  v-validate="'required'" class="form-control null sen-form-input-with-tooltip" v-model="newHourArrival">

              <div class="sen-tooltip">
                <span>Hora de llegada del vuelo del embarque a la ciudad origen</span>
              </div>

              <span v-show="errors.has('arrival_hour')" class="text-danger">{{ errors.first('arrival_hour') }}</span>

            </div>
            </div>

          </div>

          <div class="form-group" v-if=" !this.dataLocal.dataShipment.status">

            <label for="" class="float-left">Operador de llegada</label>

            <div class="input-group">
            <div class="input-group">

              <select class="form-control form-control-lg sen-form-input-with-tooltip" name="reciever_operator" v-validate="'required'" v-model="newRecieverOperator">
                <option disabled value>Selecciona</option>
                <option :value="operator" v-for="operator of listOperatorReciever">{{operator.attributes.username}} </option>
              </select>

              <div class="sen-tooltip">
                <span>Es el operador que está en el destino, al que se le asigna el embarque</span>
              </div>

              <span v-show="errors.has('reciever_operator')" class="text-danger">{{ errors.first('reciever_operator') }}</span>

            </div>
            </div>

          </div>

          <div class="form-group" v-if="newRecieverOperator && this.dataLocal.dataShipment.status">

            <label for="" class="float-left">Operador de llegada</label>

            <div class="input-group">
            <div class="input-group">

              <p class="form-control block">{{newRecieverOperator.attributes.profile.attributes.name}} {{newRecieverOperator.attributes.profile.attributes.surnames}}</p>

            </div>
            </div>

          </div>
          <p></p>
          <div class="text-right" v-if="!this.dataLocal.dataShipment.status"><a href="#" class="btn btn-primary btn-lg btn-edit" @click="toNextForm">Crear Embarque</a></div>

        </div> <!---->

      </div> <!---->

    </div> <!----> <!----> <!---->

    <b-modal hide-footer hide-header id="validacionmodal" ref="validacionmodal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle"></h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            block
            @click="hideModalValidation"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body modal-correcto text-center">
          <div class="validacion-body">
            <h1></h1>
          </div>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-success" block @click="hideModalValidation">Continuar</button>
        </div>
      </div>
    </b-modal>

  </div>

</template>

<script>
import { citiesService } from '@/services/cities.service'
import { operatorService } from '@/services/operators.service'
import { shipmentService } from '@/services/shipment.service'
import spanish from 'vee-validate/dist/locale/es'
export default {
  props: ['idOperator', 'dataLocal'],
  data() {
    return {
      locale: 'en',
      dataShipmentCopy: null,
      newCityDestiny: null,
      newDescription: '',
      newDateDeparture: '',
      newHourDeparture: '',
      newDateArrival: '',
      newHourArrival: '',
      newRecieverOperator: null,
      newCreatorOperator: null,

      responseForm1: null,
      listCities: [],
      listOperatorReciever: [],
      listSenderOperators: [],
    }
  },
  created() {
    this.$validator.localize('es', {
      messages: spanish.messages,
      attributes: {
        description_shipment: 'descripción',
        destiny_city: 'ciudad destino',
        creator_operator: 'operador de envío',
        departure_date: 'fecha de salida',
        departure_hour: 'hora de salida',
        arrival_date: 'fecha de llegada',
        arrival_hour: 'hora de llegada',
        reciever_operator: 'operador de recepción',
      },
    })
    // start with spanish locale.
    this.$validator.localize('es')

    // verificar si NO existen datos locales
    if (!this.dataLocal.dataShipment.status) {
      //crear
      if (this.currentUserRole == 'Admin') {
        //admin
        operatorService.listSenderOperators(this.getListSenderOperators)
      } else {
        //operador
        citiesService.listDestinationCityToBoardByShipingOperator(
          this.idOperator,
          this.getListCities
        )
      }
    } else {
      //editar datos locales
      console.log('Estamos en editar')
      // Copiar datos locales a valores de data
      this.setBoardingDataToShowAndEdit()
    }

    // se inicializo en el callback
  },
  watch: {
    newCreatorOperator: function (newSenderOperator) {
      if (!this.dataLocal.dataShipment.status) {
        console.log('Operador de envio elegido:')
        console.log(newSenderOperator)
        // Lista ciudades disponibles para embarcar
        citiesService.listDestinationCityToBoardByShipingOperator(
          newSenderOperator.id,
          this.getListCities
        )
      }
    },
    newCityDestiny: function (newValue) {
      console.log(newValue)
      this.newRecieverOperator = null
      if (newValue != null) {
        // Lista operadores de destino
        operatorService.listOperatorsDestination(
          newValue.id,
          this.getListOperators
        )
      }
    },
  },
  methods: {
    validarForm() {
      return 1
    },
    async toNextForm() {
      this.$validator.validate().then(async (result) => {
        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          console.log('Formulario Embarque VALIDADO')
          // ------validar los datos de inputs------///

          // verificar si existia local data antes
          // si hubo, se debe verificar primero si hubo cambio en la nueva data respecto al anterior
          if (this.dataLocal.dataShipment.status) {
            //editar
            let verifChange = false
            if (this.dataShipmentCopy.description != this.newDescription) {
              this.dataShipmentCopy.description = this.newDescription
              verifChange = true
            }
            if (this.dataShipmentCopy.departure_date != this.newDateDeparture) {
              this.dataShipmentCopy.departure_date = this.newDateDeparture
              verifChange = true
            }
            if (this.dataShipmentCopy.departure_hour != this.newHourDeparture) {
              this.dataShipmentCopy.departure_hour = this.newHourDeparture
              verifChange = true
            }
            if (this.dataShipmentCopy.arrival_date != this.newDateArrival) {
              this.dataShipmentCopy.arrival_date = this.newDateArrival
              verifChange = true
            }
            if (this.dataShipmentCopy.arrival_hour != this.newHourArrival) {
              this.dataShipmentCopy.arrival_hour = this.newHourArrival
              verifChange = true
            }
            if (this.dataShipmentCopy.destination_id != this.newCityDestiny.id) {
              this.dataShipmentCopy.destination_id = this.newCityDestiny.id
              verifChange = true
            }
            if (
              this.dataShipmentCopy.reciever_operator_id !=
              this.newRecieverOperator.id
            ) {
              this.dataShipmentCopy.reciever_operator_id = this.newRecieverOperator.id
              verifChange = true
            }
            if (verifChange) {
              // si cambio -> update
            }
            // no cambio -> no hacer nada, no mandar servicio
          }
          // no hubo -> create
          else if (!this.dataLocal.dataShipment.status) {
            console.log('Nuevo form limpio')
            this.dataShipmentCopy = new Object()
            this.dataShipmentCopy.status = true
            this.dataShipmentCopy.description = this.newDescription
            this.dataShipmentCopy.departure_date = this.newDateDeparture + ' ' + this.newHourDeparture
            // this.dataShipmentCopy.departure_hour = this.newHourDeparture
            this.dataShipmentCopy.arrival_date = this.newDateArrival + ' ' + this.newHourArrival
            // this.dataShipmentCopy.arrival_hour = this.newHourArrival
            this.dataShipmentCopy.destination_id = this.newCityDestiny.id
            this.dataShipmentCopy.destination = this.newCityDestiny

            let creatorId = this.currentUserRole=='Admin'? this.newCreatorOperator.id:this.idOperator
            this.dataShipmentCopy.creator_operator_id = creatorId
            this.dataShipmentCopy.reciever_operator_id = this.newRecieverOperator.id
            // mandar servicio
            this.responseForm1 = await shipmentService.shipmentBasicCreate(
              this.dataShipmentCopy
            )

            if (!this.responseForm1) {
              this.dataShipmentCopy = new Object()
              this.dataShipmentCopy.status = false
              alert('fallo al crear embarque')
            } else {
              this.$emit('saveOK', true)
              this.showModalValidation()
              return
            }
          }
          this.$emit('toNextForm', this.dataShipmentCopy, this.responseForm1)
        }
      })
    },
    getListCities(list) {
      this.listCities = list
    },
    getListOperators(list) {
      this.listOperatorReciever = list
    },
    getListSenderOperators(list) {
      this.listSenderOperators = list
    },
    setBoardingDataToShowAndEdit() {
      this.dataShipmentCopy = this.dataLocal.dataShipment
      // inicializar valores locales

      this.newCityDestiny = this.dataLocal.dataShipment.destination
      this.newDescription = this.dataLocal.dataShipment.description
      this.newDateDeparture = this.dataLocal.dataShipment.departure_date
      this.newHourDeparture = this.dataLocal.dataShipment.departure_hour
      this.newDateArrival = this.dataLocal.dataShipment.arrival_date
      this.newHourArrival = this.dataLocal.dataShipment.arrival_hour
      this.newRecieverOperator = this.dataLocal.dataShipment.reciever_operator
      this.newCreatorOperator = this.dataLocal.dataShipment.creator_operator
    },
    hideModalValidation() {
      this.$refs.validacionmodal.hide()
      this.$emit('toNextForm', this.dataShipmentCopy, this.responseForm1)
    },
    showModalValidation() {
      this.$refs.validacionmodal.show()
    },
  },
  computed: {
    currentUserRole: function () {
      return this.$store.state.user.type
    },
  },
}
</script>

<style lang="css" scoped>
</style>
