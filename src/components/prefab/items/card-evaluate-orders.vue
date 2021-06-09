<template lang="html">
  <div class="">
    <div class="product productChoose">

      <div class="product-content">
        <div class="flag">
          <p v-if="dataPackage.attributes.evaluated == 0" class="tag no-evaluado">No evaluado</p>
          <p v-if="dataPackage.attributes.evaluated == 1" class="tag evaluado">Evaluado</p>
        </div>
        

        <div class="product-etiquetas-price">


          <div class="price" >
            
            <span class="productCode bold">#{{dataPackage.attributes.purchaseOrder.attributes.order_code + " - " + dataPackage.attributes.order_number}}</span>
            <br>
            <span v-if ="fromShipmentFlag && dataPackage.attributes.purchaseOrder.attributes.has_packages_with_reposition && dataPackage.attributes.has_reposition_generated && !dataPackage.attributes.order_reposition_evaluated">
              Este paquete necesita de reposiciones, por lo que se debe autorizar su orden
            </span>
            <span v-else-if ="fromShipmentFlag && dataPackage.attributes.purchaseOrder.attributes.has_packages_with_reposition && !dataPackage.attributes.has_reposition_generated && !dataPackage.attributes.order_reposition_evaluated">
              Este paquete no necesita reposiciones, pero hay otros paquetes de la misma orden que sí lo necesitan
            </span>
            <br>
            
            Ejemplares originales: <span class="productCode ">{{dataPackage.attributes.items_from_order}}</span>
            Ejemplares de reposición: <span class="productCode ">{{dataPackage.attributes.items_from_reposition}}</span>
            Ejemplares totales: <span class="productCode ">{{dataPackage.attributes.number_of_items}}</span>

            
                      

          </div>

          

          <div class="botones-evaluacion" v-if="dataPackage.attributes.evaluated==0">
            
            <div>

              <button v-if ="dataPackage.attributes.evaluated == 0" class="btn btn-primary" type="button" @click= "evaluatePackage" >Evaluar</button>

            </div>

          </div>

          <div class="botones-evaluacion" v-if ="dataPackage.attributes.evaluated == 1">         
                    
            <router-link :to="{ name: 'show-package',params: { id: dataPackage.id }}">
              
              <button   class="btn btn-primary" type="button" >Ver detalle</button>

            </router-link>
          
          </div>

        </div>

        

        

      </div>

      
      

    </div>
  
    
    <b-modal hide-footer hide-header centered id="modalStatePackages" ref="modalStatePackages">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Ingresar datos de evaluación del paquete</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            block
            @click="hideModalStatePackages"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body modal-correcto text-center">
          <div class="validacion-body">

            <span class="modal-subtitle">Evaluación del paquete #{{dataPackage.attributes.purchaseOrder.attributes.order_code + " - " + dataPackage.attributes.order_number}}</span>
             
            <div class="eval-content">
              <span class="eval-content-1">N° de ejemplares exitosos </span>
              <input class="form-control eval-content-2" type="number" name="state_1" v-validate="'required|numeric'" v-model="state1">
            </div>
            <span v-show="errors.has('state_1')" class="text-danger" >{{ errors.first('state_1') }}</span>
            <span v-if="deltaItems!=null && parseInt(deltaItems) != 0">{{parseInt(deltaItems)>0?"Hay un déficit de "+ parseInt(deltaItems)+ " items": "Hay un exceso de "+ parseInt(deltaItems)*(-1)+ " items"}}</span>
            
            <div class="eval-content">
              <span class="eval-content-1">N° de ejemplares del producto correcto con desperfectos </span>
              <input class="form-control eval-content-2" type="number" name="state_2" v-validate="'required|numeric'" v-model="state2">
            </div>
                <span v-show="errors.has('state_2')" class="text-danger" >{{ errors.first('state_2') }}</span>
            
            <div class="eval-content">
              <span class="eval-content-1">N° de ejemplares de otro producto sin desperfectos </span>
              <input class="form-control eval-content-2" type="number" name="state_3" v-validate="'required|numeric'" v-model="state3">
            </div>
                <span v-show="errors.has('state_3')" class="text-danger" >{{ errors.first('state_3') }}</span>
            
            <div class="eval-content">
              <span class="eval-content-1">N° de ejemplares de otro producto con desperfectos  </span>
              <input class="form-control eval-content-2" type="number" name="state_4" v-validate="'required|numeric'" v-model="state4">
                
            </div>
            <span v-show="errors.has('state_4')" class="text-danger" >{{ errors.first('state_4') }}</span>
          </div>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-success" block  @click="askToSendEvaluation">Evaluar</button>
        </div>
      </div>
    </b-modal>

    <b-modal hide-footer hide-header id="modalIncidentsPackages" ref="modalIncidentsPackages">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Evaluación del paquete # {{dataPackage.id}} - {{dataPackage.attributes.order_number}}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            block
            @click="hideModalIncidentsPackages"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body modal-correcto text-center">
          <div class="validacion-body">
            <div v-if="listIncidents.length > 0">
              <div class="">
                <h5>Incidencias generadas</h5>
              </div>
              <hr>
              <div class="" v-for = "incident in listIncidents">
                <span>Descripcion:</span>
                <p>{{incident.attributes.description}}</p>
                
                  <div class="" v-if="incident.attributes.clusterable_type == 'different_quantity'">
                    <div class="">
                      <span>Ejemplares correctos sobre totales en el paquete: </span>
                      <span>{{incident.attributes.clusterable.attributes.correct_items + "/" +incident.attributes.clusterable.attributes.total_items}}</span>
                      <span>Tipo: </span>
                      <span v-if="incident.attributes.clusterable.attributes.delta_type==1"> Déficit</span>
                      <span v-else-if="incident.attributes.clusterable.attributes.delta_type==2">Exceso</span>
                      <span v-else> No definido</span>
                    </div>
                  </div>
                  <div class="" v-if="incident.attributes.clusterable_type == 'waste'">
                    <div class="">
                      
                      <span v-if="incident.attributes.clusterable.attributes.correct_product_flag==1">Items mermados:</span>
                      <span v-else>Ejemplares mermados de otros productos:</span>
                      <span>{{incident.attributes.clusterable.attributes.wasted_items}}</span>
                      
                    </div>
                  </div>
                  <div class="" v-if="incident.attributes.clusterable_type == 'wrong'">
                    <div class="">
                                          
                      <span v-if="incident.attributes.clusterable.attributes.wasted_flag==0">Ejemplares de otros productos no mermados:</span>
                      <span v-else>Ejemplares de otros productos mermados:</span>
                      <span>
                       {{incident.attributes.clusterable.attributes.wrong_items}}
                      </span>
                    </div>
                  </div>
                
                <hr>
              </div>
            </div>
            <div v-else-if="listIncidents.length == 0">
              <div class="center">
                <span>No se generaron incidencias</span>
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer text-center">
          <button type="button" class="btn btn-success" block @click="hideModalIncidentsPackages()">Cerrar</button>
        </div>
      </div>
    </b-modal>

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
          <button type="button" class="btn btn-primary btn-lg" @click="sendEvaluationData()">Aceptar</button>
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
import { packagesService } from '@/services/packages.service'

export default {
  props: ['dataPackage', 'fromShipmentFlag'],
  data() {
    return {
      state1: '',
      state2: '',
      state3: '',
      state4: '',
      responseEvaluation: null,
      listIncidents: [],
     


    }
  },
  created(){
    this.dataPackage = this.dataPackage;
  },
  methods: {

    
    evaluatePackage() {
      this.showModalStatePackages()
    },

    askToSendEvaluation() {
      // validar Datos
      if (!(this.state1 && this.state2 && this.state3 && this.state4)) {
        alert('Ingrese los valores del estado')
        return
      } else {
        this.showModalConfirmation()
      }
    },
    async sendEvaluationData() {
      let data = new Object()
      data.correct_items_not_wasted = this.state1
      data.correct_items_wasted = this.state2
      data.incorrect_items_not_wasted = this.state3
      data.incorrect_items_wasted = this.state4

      this.responseEvaluation = await packagesService.sendStatesPackage(
        this.dataPackage.id,
        data
      )
      

      if (!this.responseEvaluation) {
        // alert('hubo un error al enviar datos')
        this.hideModalConfirmation()
        this.hideModalStatePackages()
      } else {
        this.$emit('refresh', true);
        this.listIncidents = this.responseEvaluation.attributes.generated_incidents
        this.hideModalConfirmation()
        this.hideModalStatePackages()
        this.showModalIncidentsPackages()
      }
    },

    hideMorePackageInfo(packageId){
      console.log("en hideMorePackageInfo");
      
      let modalPackageInfoRef = 'modalMorePackageInfo-'+packageId
      console.log(modalPackageInfoRef);
   
      
      this.$refs[modalPackageInfoRef].hide()
 
    },

    hideModalStatePackages() {
      this.$refs.modalStatePackages.hide()
    },
    showModalStatePackages() {
      this.$refs.modalStatePackages.show()
    },
    hideModalIncidentsPackages() {
      this.$refs.modalIncidentsPackages.hide()
    },
    showModalIncidentsPackages() {
      this.$refs.modalIncidentsPackages.show()
    },
    hideModalConfirmation() {
      this.$refs.modalConfirmation.hide()
    },
    showModalConfirmation() {
      this.$refs.modalConfirmation.show()
    },
   

  },
  computed:{
    deltaItems(){
      if (this.state1!=''){
        let successItems = parseInt(this.state1)
        return this.dataPackage.attributes.number_of_items - successItems
      }
      return null
    }
  }
}
</script>
