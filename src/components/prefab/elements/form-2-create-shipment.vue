<template lang="html">
  <div class="" v-if="dataLuggageCopy">

    <div class="form_container">

      <div class="suitCase-content">

        <div class="formContent">
          <div class="formTitle">
            <h1>Equipaje</h1>
          </div>

            <div class="formNew">
              <b-button v-b-modal.modalSuitcase class="btn-primary">
                <i class="fas fa-plus"></i>Añadir equipaje
              </b-button>
            </div>
        </div>

          <div class="vitrinaContainer" v-if="dataLuggageCopy.luggage_items!= null && dataLuggageCopy.luggage_items.length!=0">

            <div class="vitrina ">

              <ul>

                <li v-for="luggageItem of dataLuggageCopy.luggage_items">
                  <cardAddLuggage v-bind:dataLuggage="luggageItem" @delete-from-luggage-list="deleteFromLuggageList"></cardAddLuggage>
                </li>

              </ul>

            </div>

          </div>

          <div class="emptyVitrina" v-if="dataLuggageCopy.luggage_items == null || dataLuggageCopy.luggage_items.length == 0">
            <p>No has añadido equipaje</p>
          </div>

          <div class="text-right">

            <div class="weightContent">
              <span>{{totalWeight|currency}} kg</span>
            </div>

            <button class="btn btn-primary btn-lg btn-edit" @click="toNextForm">Continuar</button>

          </div>

      </div>

    </div>

    <b-modal hide-footer hide-header id="modalSuitcase" ref="modalSuitcase">
      <div class="modal-content">
          <div class="modal-header">

            <h5 class="modal-title" id="exampleModalLongTitle">Datos de equipaje</h5>
            <button type="button" class="close" @click="hideModalSuitcase"><span aria-hidden="true">&times;</span></button>

          </div>

          <div class="modal-body" id="modal-body">

            <div class="form-login text-title" id="infoextra">

              <div class="form-group ">
                <label for="" class="float-left">Tipo de equipaje</label>
                <select class="form-control form-control-lg" name="type_luggage" v-validate="'required'" v-model="typeLuggage">
                  <option disabled value>Selecciona</option>
                  <option :value="luggageType" v-for="luggageType of listLuggageType">{{luggageTypeTitle[luggageType.attributes.key]}}</option>
                </select>
                <span v-show="errors.has('type_luggage')" class="text-danger">{{ errors.first('type_luggage') }}</span>

              </div>

              <div class="form-group">
                <label for class="float-left">Peso<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
                <input
                  type="text"
                  name="weight_luggage"
                  v-validate="'required|decimal:2'"
                  class="form-control null"
                  v-floatonly
                  :maxlength="8"

                  v-model="weightLuggage">
                <span v-show="errors.has('weight_luggage')" class="text-danger">{{ errors.first('weight_luggage') }}</span>
              </div>

              <div class="form-group " >
                <label for="" class="float-left">Unidad de peso</label>
                <select class="form-control form-control-lg" name="weight_unit" v-validate="'required'" v-model="weightUnitLuggage">
                  <option disabled value>Selecciona</option>
                  <option :value="weughtUnit" v-for="weughtUnit of listWeightUnit">{{weughtUnit.attributes.name}}</option>
                </select>
                <span v-show="errors.has('weight_unit')" class="text-danger">{{ errors.first('weight_unit') }}</span>

              </div>

              <div class="form-group">
                <label for class="float-left">Descripción<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip" ></i></label>
                <textarea class="form-control null" name="description_luggage" v-validate="'required'" rows="3" cols="70" :maxlength="500" v-model="descriptionLuggage"></textarea>
                <span v-show="errors.has('description_luggage')" class="text-danger">{{ errors.first('description_luggage') }}</span>
              </div>

            </div>

          </div>

          <div class="modal-footer text-right">
            <button type="button" class="btn btn-primary btn-lg" @click="addNewLuggage">Continuar</button>
          </div>
      </div>
    </b-modal>
  </div>

</template>

<script>
import cardAddLuggage from '@/components/prefab/items/card-add-luggage.vue'
import { weightUnitService } from '@/services/weightUnit.service'
import { luggageService } from '@/services/luggage.service'
import spanish from 'vee-validate/dist/locale/es'
export default {
  components: {
    cardAddLuggage
  },
  props: ['id', 'dataLocal'],
  data() {
    let luggageTypeTitle = {
      1:'Maleta',
      2:'Carry on',
      3:'Mochila',
      4:'Box'
    }
    return {
      luggageTypeTitle,
      dataLuggageCopy: null,

      typeLuggage: null,
      weightLuggage: '',
      weightUnitLuggage: null,
      descriptionLuggage: '',

      responseForm2: null,
      listWeightUnit: [],
      listLuggageType: []
    }
  },
  created() {
    this.$validator.localize('es', {
      messages: spanish.messages,
      attributes: {
        type_luggage: 'tipo de equipaje',
        weight_luggage:'peso',
        weight_unit:'unidad de peso',
        description_luggage:'descripción',
      }
    })
    // start with spanish locale.
    this.$validator.localize('es')

    this.inicialiceDataLocal()
    weightUnitService.listAllWeightUnit(this.getListWeightUnit)
    luggageService.listAllLuggageType(this.getListLuggageType)
  },
  methods: {
    toNextForm() {
      this.$emit('toNextForm', this.dataLuggageCopy)
    },
    deleteFromLuggageList(numeration, boardingId) {
      console.log('Estamos en el metodo del emit deleteFromLuggageList')
      console.log(numeration)
      console.log(boardingId)
      console.log(this.dataLuggageCopy.luggage_items[0])
      console.log(this.dataLuggageCopy.luggage_items[1])

      let index = this.findIndexLuggageByIds(numeration, boardingId)
      console.log('El index es ' + index)

      this.dataLuggageCopy.luggage_items.splice(index, 1)
      console.log('Terminamos de eliminar')
    },
    findIndexLuggageByIds(numeration, boardingId) {
      return this.dataLuggageCopy.luggage_items.findIndex(function(luggage) {
        return (
          luggage.numeration == numeration && luggage.boarding_id == boardingId
        )
      })
    },

    inicialiceDataLocal() {
      this.dataLuggageCopy = this.dataLocal.dataLuggage
    },
    getListWeightUnit(list) {
      this.listWeightUnit = list
      this.listWeightUnit.forEach(unit => {
        if (unit.attributes.key_name == 'lb') {
          this.weightUnitLuggage = unit
        }
      })
    },
    getListLuggageType(list) {
      this.listLuggageType = list
    },
    async addNewLuggage() {
      // validar fomulario
      this.$validator.validate().then(async result => {
        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          console.log("paso")

          let dataObject = new Object()
          dataObject.description = this.descriptionLuggage
          dataObject.weight = this.weightLuggage
          dataObject.weight_unit_id = this.weightUnitLuggage.id
          dataObject.luggage_type_id = this.typeLuggage.id

          this.responseForm2 = await luggageService.addLuggageToShipment(
            this.id,
            dataObject
          )
          this.hideModalSuitcase()

          if (this.responseForm2) {
            this.$emit('updateListLuggage', this.responseForm2)

            setTimeout(
              function() {
                this.inicialiceDataLocal()
              }.bind(this),
              2000
            )
          }
        }
      })


    },
    validarForm() {
      return 1
    },
    hideModalSuitcase() {
      this.$refs.modalSuitcase.hide()
    },
    showModalSuitcase() {
      this.$refs.modalSuitcase.show()
    }
  },
  computed: {
    totalWeight: function() {
      let subTotal = 0
      if (this.dataLuggageCopy.luggage_items != null) {
        for (var i = 0; i < this.dataLuggageCopy.luggage_items.length; i++) {
          subTotal += this.dataLuggageCopy.luggage_items[i].attributes.weight
        }
      }
      return subTotal
    }
  }
}
</script>
