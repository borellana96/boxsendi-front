
<template>
  <div class="newOrder" v-if="grabr">
    <breadcrumb :nameSection="nameSection" :listRoutes="listRoutes"></breadcrumb>
    <!-- ///////////////////// Step by step ///////////////////// -->

    <div class="step_container">

      <ul class="progressbar progress-new">
        
        <li
          id="li1"
          href="#"
          :class="{ inprocess : state1 === 1 , active: state2 === 1 || state2 === 2}"
          @click="changeFormView(1)"
        >
          <p>Datos del cliente</p>
        </li>


        <li
          id="li2"
          :class="{inprocess: state2 === 1, active: state3 === 1 || state3 === 2, disabled: state1 === 1}"
          @click="changeFormView(2)"
        >
          <p>Datos del artículo</p>
        </li>

        <li
          id="li3"
          :class="{inprocess: state3 === 1, active: state4 === 1, disabled: state2 === 1 || state1===1}"
          @click="changeFormView(3)"
        >
          <p>Datos de compra</p>
        </li>

        <li
          id="li4"
          :class="{inprocess: state4 === 1 , disabled: state1 ===1 || state2 === 1 || state3 ===1 }"
          @click="changeFormView(4)"
        >
          <p>Resumen</p>
        </li>

      </ul>

    </div>

    <div class="form-content-info">
      <!-- ///////////////////// Fomulario paso 1 ///////////////////// -->

      <div v-if="state1 === 1" class="">
        
        <div v-if="grabr.id  == 1">

          <div class="form-block-text">
            
            <span>Datos del cliente</span>

          </div>
      
          <div class="form-group">
            
            <label >Nombres y apellidos</label>

            <div class="input-group">
              
              <input
                type="text"
                name="fullname"
                :class="{'input': true, 'is-danger': errors.has('fullname') }"
                aria-describedby="email"
                class="form-control "
                v-model="newName"
                :maxlength="100"
              >

              
            </div>

            <span
              v-show="errors.has('fullname')"
              class="text-danger"
            >{{ errors.first('fullname') }}</span>

          </div>

          <div class="form-group">
            <label >Tipo de documento</label>

            <div class="input-group">

            <select
              class="form-control form-control-lg"
              @change="cleanDocumentNumbers"
              v-model="typeId"
            >
              <option disabled value>Selecciona</option>
              <option value="1">DNI</option>
              <option value="2">Id cliente</option>
            </select>

            </div>
          
          </div>

          <div v-if="typeId == 1" class="form-group">
            
            <label >Número de documento</label>

            <div class="input-group">
              <input
                type="text"
                name="document_number"
                class="form-control "
                v-model="numberId"
                v-digitsonly
                :minlength="8"
                :maxlength="8"
              >

              <span
                v-show="errors.has('document_number')"
                class="text-danger"
              >{{ errors.first('document_number') }}</span>

            </div>

          </div>

          <div v-if="typeId == 2" class="form-group">

            <label >Id del cliente</label>

            <div class="input-group">
              <input
                type="text"
                name="Id client"
                class="form-control "
                v-model="idClient"
                :maxlength="20"
              >
              
            </div>

            <span
              v-show="errors.has('Id client')"
              class="text-danger"
            >{{ errors.first('Id client') }}</span>

          </div>

          <div class="form-group">
            <label>Número de celular</label>

            <div class="input-group">
              
              <input
                type="text"
                name="phone_number"
                aria-describedby="email"
                class="form-control "
                v-model="numberPhone"
                :minlength="9"
                :maxlength="15"
                v-digitsonly-cellphone
              >

            </div>

            <span
              v-show="errors.has('phone_number')"
              class="text-danger"
            >{{ errors.first('phone_number') }}</span>

          </div>

          <div class="form-group text-right">

            <button
              href="#"
              class="btn btn-primary btn-lg btn-edit"
              @click="validateFirstFormAdvanced"
            >Continuar</button>

          </div>
          
        </div>

        <div v-if="grabr.id  == 2">
          
          <div class="form-block-text">
            
            <span>Datos del cliente</span>

          </div>
        
          <div class="form-group">

            <label >Número de documento</label>

            <div class="form-client">

              <div class="input-group">

                <input
                  type="text"
                  id="Nombre"
                  name="document_number_nograbr"
                  v-validate="{required: true && this.userValidated}"
                  aria-describedby="email"
                  class="form-control "
                  v-model="userFinding"
                  v-digitsonly
                  maxlength="8"
                >

                <div class="input-group-append" id="button-addon4">

                  <button
                    type="button"
                    class="btn btn-primary btn-lg btn-edit btn-subir"
                    @click="validateUserById(userFinding, setUserChoosed)"
                  >Validar cliente</button>

                </div>

              </div>

              <span
                v-show="errors.has('document_number_nograbr')"
                class="text-danger"
              >{{ errors.first('document_number_nograbr') }}</span>

            </div>

            <div
              class="validacion-cliente"
              :class="{'validacion-cliente-no-encontrado': mesageVerifUser=='Cliente no existe en el sistema','validacion-cliente-encontrado': mesageVerifUser!='Cliente no existe en el sistema' && mesageVerifUser!=''}"
            >
              <span>{{this.mesageVerifUser}}</span>

            </div>

            <div class="form-group">

              <button
                href="#"
                class="btn btn-primary btn-lg btn-edit"
                @click="validateFistFormV2"
              >Continuar</button>

            </div>

          </div>
          
        </div>

      </div>

      <!-- ///////////////////// Fomulario paso 2 ///////////////////// -->

      <div v-if="state2 === 1" class="">
        
        <div v-if="grabr.id  == 1">
          
          <div class="form-block-text">
            
            <span>Datos del artículo</span>

          </div>

          <div class="form-group">

            <label >Imagen del artículo</label>

            <div class="input-group">
              <div class="block-image">

                <div class="imageProduct">

                  <img :src="newImageProduct">

                  <i class="fas fa-image"></i>
                  
                </div>

                <div class="image-content">
                  <label for="data_image" >
                    <span class="btn btn-primary"><img class="logo-sendibox" src="/static/img/camara.svg" alt="">Seleccionar imagen</span>
                  </label>
                  
                  <input id="data_image" type="file" accept="image/x-png, image/jpeg" @change="uploadImage" style="display:none" >

                  <input type="text" id="product_image" name="product_image" v-model="newImageName" v-validate="'required'" style="display:none" >
                </div>

              </div>
            </div>

            <span
              v-show="errors.has('product_image')"
              class="text-danger"
            >{{ errors.first('product_image') }}</span>
          
          </div>
        
          <div class="form-group">

            <label >Empaque</label>

            <div class="input-group">

              <select class="form-control form-control-lg" name="packaged" v-model="packaged">
                <option disabled value>Seleccionar</option>
                <option :value="1">Sin especificar</option>
                <option :value="2">Sí</option>
                <option :value="3">No</option>
              </select>
              
            </div>
          
          </div>

          <div class="form-group">

            <label >Nro. de orden de compra</label>

            <div class="input-group">

              <input
                type="text"
                name="purchase_order_number"
                aria-describedby="email"
                class="form-control "
                v-model="newNumbOrder"
                :maxlength="20"
                v-digitsonly
              >
              
            </div>

            <span
              v-show="errors.has('purchase_order_number')"
              class="text-danger"
            >{{ errors.first('purchase_order_number') }}</span>

          </div>

          <div class="form-group">

            <label >Nombre del producto</label>

            <div class="input-group">
              <input
                name="product_information"
                aria-describedby="email"
                class="form-control "
                v-model="newInfoProduct"
                :maxlength="200"
              >
              
            </div>

            <span
              v-show="errors.has('product_information')"
              class="text-danger"
            >{{ errors.first('product_information') }}</span>
          
          </div>

          <div class="form-group">

            <label > Descripción del producto (Opcional)</label>

            <div class="input-group">

              <input
                name="product_description_optional"
                aria-describedby="email"
                class="form-control "
                v-model="newDescriptionProduct"
                :maxlength="500"
              >
              
            </div>
          
          </div>

          <div class="form-group">

            <label >Número de ejemplares</label>

            <div class="input-group">
              <input
                type="text"
                name="number_of_items_1"
                v-validate="'required'"
                aria-describedby="email"
                class="form-control "
                v-model="newStockProduct"
                v-digitsonly
                :maxlength="5"
              >
            </div>

            <span
              v-show="errors.has('number_of_items_1')"
              class="text-danger"
            >{{ errors.first('number_of_items_1') }}</span>
          
          </div>

          <div class="form-group">
            
            <label >Nro. de chat en Grabr</label>

            <div class="input-group">
              <input
                type="text"
                name="purchase_chat_link"
                v-validate="{required: true}"
                aria-describedby="email"
                class="form-control "
                v-model="newLinkChat"
                v-digitsonly
              >
              
            </div>

            <span
              v-show="errors.has('purchase_chat_link')"
              class="text-danger"
            >{{ errors.first('purchase_chat_link') }}</span>
          
          </div>

          <div class="form-group">
            
            <label >Fecha de asignación al viajero</label>

            <div class="input-group">
              
              <input
                type="date"
                name="purchase_order_date"
                v-validate="'required'"
                aria-describedby="email"
                class="form-control "
                v-model="newDateOffer"
                max="2100-12-31"
              >
              
            </div>

            <span
              v-show="errors.has('purchase_order_date')"
              class="text-danger"
            >{{ errors.first('purchase_order_date') }}</span>
          
          </div>

          <div class="form-group text-right">
            
            <a
              href="#"
              class="btn btn-primary btn-lg btn-edit"
              @click="validateSecondFormAdvanced"
            >Continuar</a>
          
          </div>
         
        </div>

        <div v-if="grabr.id  == 2">
    
          <div class="form-block-text">
            <span>Datos del artículo</span>
          </div>

          <div class="form-group">
            <label >Imagen del artículo</label>
            <div class="input-group">

              <div class="block-image">
                  <div class="imageProduct">
                    <img :src="newImageProductV2">
                    <i class="fas fa-image"></i>  
                  </div>

                  <div class="image-content">
                    <label for="data_image" >
                      <span class="btn btn-primary"><img class="logo-sendibox" src="/static/img/camara.svg" alt="">Seleccionar imagen</span>
                    </label>

                    <input id="data_image" type="file" accept="image/x-png, image/jpeg" @change="uploadImage" style="display:none" >

                    <input type="text" id="product_image" name="product_image" v-model="newImageName" v-validate="{required: grabr.id  == 2}" style="display:none" >
                  </div>

                  <span v-show="errors.has('product_image')" class="text-danger"
                  >{{ errors.first('product_image') }}</span>
              </div>
          </div>
        </div>
        
          <div class="form-group">
            
            <label >Empaque</label>

            <div class="input-group">

              <select class="form-control form-control-lg" name="packaged" v-model="packaged">
                <option disabled value>Seleccionar</option>
                <option :value="1">Sin especificar</option>
                <option :value="2">Sí</option>
                <option :value="3">No</option>
              </select>
              
            </div>
          
          </div>

          <div class="form-group">

            <label >Nombre del producto</label>

            <div class="input-group">
              
              <input
                type="text"
                name="product_information_2"
                v-validate="{required: grabr.id  == 2}"
                aria-describedby="email"
                class="form-control "
                v-model="newInfoProductV2"
                :maxlength="200"
              >

              
            </div>

            <span
              v-show="errors.has('product_information_2')"
              class="text-danger"
            >{{ errors.first('product_information_2') }}</span>

          </div>

          <div class="form-group">
            
            <label >Descripción del producto (Opcional)</label>

            <div class="input-group">
              <input
                aria-describedby="email"
                class="form-control "
                v-model="newDescriptionProductV2"
                :maxlength="500"
              >
              
            </div>
          
          </div>

          <div class="form-group">
            
            <label >Número de ejemplares</label>

            <div class="input-group">
              <input
                type="text"
                name="number_of_items_2"
                v-validate="{required: grabr.id  == 2}"
                aria-describedby="email"
                class="form-control "
                v-model="newStockProductV2"
                v-digitsonly
              >
              
            </div>

            <span
              v-show="errors.has('number_of_items_2')"
              class="text-danger"
            >{{ errors.first('number_of_items_2') }}</span>
          
          </div>

          <div class="form-group">

            <label >Peso de la orden</label>

            <div class="input-group">
              <input
                type="text"
                name="order_weight_2"
                v-validate="{required: grabr.id  == 2}"
                aria-describedby="email"
                class="form-control "
                v-model="newWeight"
                v-floatonly
              >
            </div>

            <span
              v-show="errors.has('order_weight_2')"
              class="text-danger"
            >{{ errors.first('order_weight_2') }}</span>
          
          </div>

          <div class="form-group">
            
            <label >Unidades de peso</label>

            <div class="input-group">

              <select
                class="form-control form-control-lg"
                name="weight_units_2"
                v-validate="{required: grabr.id  == 2}"
                v-model="unitWeight"
              >
                <option disabled value>Seleccionar</option>
                <option 
                  :value="units" 
                  v-for="units of listUnits"
                  :key="units.id"
                >{{units.attributes.name}}</option>
              </select>

            </div>

            <span
              v-show="errors.has('weight_units_2')"
              class="text-danger"
            >{{ errors.first('weight_units_2') }}</span>

          </div>

          <div class="form-group text-right">
            
            <a
              href="#"
              class="btn btn-primary btn-lg btn-edit"
              @click="validateSecondFormAdvanced"
            >Continuar</a>

          </div>
          
        </div>

      </div>

      <!-- ///////////////////// Fomulario paso 3 ///////////////////// -->

      <div v-if="state3 === 1" class="">
        
        <div v-if="grabr.id  == 1">
         
          <div class="form-block-text">
            
            <span>Datos de compra</span>

          </div>
        
          <div class="form-group">
            <label >Precio (USD)</label>
            <div class="input-group">
              <input
                name="price"
                v-validate="'required'"
                aria-describedby="email"
                class="form-control "
                v-model="newCost"
                v-floatonly
                @keyup="setNewTax()"
                :maxlength="7"
              >      
            </div>
            <span v-show="errors.has('price')" class="text-danger">{{ errors.first('price') }}</span>
          </div>

          <div class="form-group">

            <label>Impuesto (USD)</label>
            <div class="input-group">
              <input
                name="tax"
                v-validate="'required'"
                aria-describedby="email"
                class="form-control "
                v-model="newTax"
                v-floatonly
                :maxlength="7"
              >
              
            </div>

            <span v-show="errors.has('tax')" class="text-danger">{{ errors.first('tax') }}</span>

          </div>

          <div class="form-group">

            <label >Fee (USD)</label>

            <div class="input-group">
              <input
                name="fee"
                v-validate="'required'"
                aria-describedby="email"
                class="form-control "
                v-model="newCostPost"
                v-floatonly
                :maxlength="7"
              >
              
            </div>

            <span v-show="errors.has('fee')" class="text-danger">{{ errors.first('fee') }}</span>

          </div>

          <div class="form-group">

            <label >Número de viaje</label>

            <div class="input-group">
              
              <input
                type="text"
                aria-describedby="email"
                name="travel_number"
                v-validate="'required'"
                class="form-control "
                v-model="travelNumber"
                v-digitsonly
                :minlength="1"
                :maxlength="10"
              >
              
            </div>

            <span
              v-show="errors.has('travel_number')"
              class="text-danger"
            >{{ errors.first('travel_number') }}</span>

          </div>

          <div class="form-group">

            <label >Cuenta Grabr</label>

            <div class="input-group">

              <input
                name="grabr_account"
                v-validate="'required'"
                aria-describedby="email"
                class="form-control "
                v-model="grabrAccount"
                :maxlength="50"
              >
              
            </div>

            <span
              v-show="errors.has('grabr_account')"
              class="text-danger"
            >{{ errors.first('grabr_account') }}</span>

          </div>

          <div class="form-group">

            <label >Link de compra propuesta en Grabr (Opcional)</label>

            <div class="input-group">
              <input
                name="purchase_link_optional"
                aria-describedby="email"
                v-validate="{required: false}"
                class="form-control "
                v-model="newLinkBuying"
              >
              
            </div>

            <span
              v-show="errors.has('purchase_link_optional')"
              class="text-danger"
            >{{ errors.first('purchase_link_optional') }}</span>

          </div>

          <div class="form-group">

            <label >Ciudad de origen</label>

            <div class="input-group">

              <select
                class="form-control form-control-lg sen-form-input-with-tooltip"
                name="origin_city"
                v-validate="'required'"
                v-model="newCityIni"
              >
                <option disabled value>Selecciona</option>
                <option
                  :value="cityOrigin"
                  v-for="cityOrigin of listCityOrigin"
                  :key="cityOrigin.id"
                >{{cityOrigin.attributes.name}}</option>
              </select>
              
            </div>

            <span
              v-show="errors.has('origin_city')"
              class="text-danger"
            >{{ errors.first('origin_city') }}</span>

          </div>

          <div class="form-group">

            <label >Ciudad de destino</label>

            <div class="input-group">
              <select
                class="form-control form-control-lg sen-form-input-with-tooltip"
                name="destination_city"
                v-validate="'required'"
                v-model="newCityEnd"
              >
                <option disabled value>Selecciona</option>
                <option
                  :value="cityDestiny"
                  v-for="cityDestiny of listCityDestiny"
                  :key="cityDestiny.id"
                >{{cityDestiny.attributes.name}}</option>
              </select>

            </div>

            <span
              v-show="errors.has('destination_city')"
              class="text-danger"
            >{{ errors.first('destination_city') }}</span>

          </div>

          <div class="form-group">

            <label >Fecha de posible entrega</label>

            <div class="input-group">
              <input
                type="date"
                name="possible_delivery_date"
                v-validate="'required'"
                aria-describedby="email"
                class="form-control "
                v-model="newDatePromise"
              >
              
            </div>

            <span
              v-show="errors.has('possible_delivery_date')"
              class="text-danger"
            >{{ errors.first('possible_delivery_date') }}</span>
          </div>

          <div class="form-group text-right">

            <a
              href="#"
              class="btn btn-primary btn-lg btn-edit"
              @click="validateThirdFormAdvanced"
            >Continuar</a>

          </div>
         
        </div>

        <div v-if="grabr.id  == 2">
         
          <div class="formTitle">
            <h1>Datos de compra</h1>
          </div>
       
          <div class="form-group">
            <label >Precio (USD)</label>
            <div class="input-group">
              <input
                type="text"
                id="Nombre"
                name="price"
                v-validate="{required: grabr.id  == 2}"
                aria-describedby="email"
                class="form-control "
                v-model="newCostV2"
                v-floatonly
                @keyup="setNewTax()"
                :maxlength="7"
              >
              
            </div>

            <span v-show="errors.has('price')" class="text-danger">{{ errors.first('price') }}</span>

          </div>

          <div class="form-group">
            <div style="display: flex;width: 250px;">
              <label >Impuesto (USD)</label>
              <label style="font-style: italic;
                            font-size:12px;
                            cursor:pointer;
                            color: cornflowerblue;
                            text-decoration: underline"
                @click="resetImpuesto"
                >(Limpiar campos)</label> 
            </div>
            <div class="input-group">
              
              <input
                type="text"
                id="email"
                name="tax"
                v-validate="{required: grabr.id  == 2}"
                aria-describedby="email"
                class="form-control "
                v-model="newTaxV2"
                v-floatonly
              >
              
            </div>

            <span v-show="errors.has('tax')" class="text-danger">{{ errors.first('tax') }}</span>

          </div>

          <div class="form-group">

            <label >Costo de envío (USD)</label>

            <div class="input-group">

              <input
                type="text"
                id="email"
                name="shipping_cost"
                v-validate="{required: grabr.id  == 2}"
                aria-describedby="email"
                class="form-control "
                v-model="newCostPostV2"
                v-floatonly
              >
              
            </div>

            <span
              v-show="errors.has('shipping_cost')"
              class="text-danger"
            >{{ errors.first('shipping_cost') }}</span>

          </div>

          <div class="form-group">

            <label >Link de compra {{grabr.id==1?'(Opcional)':''}}</label>

            <div class="input-group">
              <input
                id="email"
                aria-describedby="email"
                name="purchase_link"
                v-validate="{required:grabr.id == 2,url:true}"
                class="form-control "
                v-model="newLinkBuyingV2"
                :maxlength="200"
              >
              
            </div>

            <span
              v-show="errors.has('purchase_link')"
              class="text-danger"
            >{{ errors.first('purchase_link') }}</span>

          </div>

          <div class="form-group">

            <label >Ciudad de origen</label>

            <div class="input-group">
              <select
                class="form-control form-control-lg sen-form-input-with-tooltip"
                name="origin_city"
                v-validate="{required: grabr.id  == 2}"
                v-model="newCityIni"
                @change="filtrar"
              >
                <option disabled value>Selecciona</option>
                <option
                  :value="cityOrigin"
                  v-for="cityOrigin of listCityOrigin"
                  :key="cityOrigin.id"
                >{{cityOrigin.attributes.name}}</option>
              </select>

            </div>

            <span
              v-show="errors.has('origin_city')"
              class="text-danger"
            >{{ errors.first('origin_city') }}</span>

          </div>

          <div class="form-group">

            <label >Ciudad de destino</label>

            <div class="input-group">

              <select
                class="form-control form-control-lg sen-form-input-with-tooltip"
                name="destination_city"
                v-validate="{required: grabr.id  == 2}"
                v-model="newCityEnd"
              >
                <option disabled value>Selecciona</option>
                <option
                  :value="cityDestiny"
                  v-for="cityDestiny of listCityDestinyFilter"
                  :key="cityDestiny.id"
                >{{cityDestiny.attributes.name}}</option>
              </select>
              
            </div>

            <span
              v-show="errors.has('destination_city')"
              class="text-danger"
            >{{ errors.first('destination_city') }}</span>

          </div>

          <div class="form-group text-right">

            <a
              href="#"
              class="btn btn-primary btn-lg btn-edit"
              @click="validateThirdFormAdvanced"
            >Continuar</a>

          </div>
         
        </div>

      </div>

      <!-- ///////////////////// Fomulario paso 4 (Resumen) ///////////////////// -->

      <div v-if="state4 === 1" class="">
        
        <div v-if="grabr.id  == 1">

          <div class="form-block-text">
            
            <span>Resumen de la orden de compra</span>

          </div>

          <div class="form-content-info-resume">

            <div class="form-content-block form-resume-subtitle">
                 
              <span class="form-content-block-item">Datos del cliente</span>

            </div>

            <div class="form-content-block">

              <span class="form-content-block-item">Nombres y apellidos:</span>
             
              <span class="form-content-block-item form-content-block-ellipsis">{{newName}}</span>

            </div>

            <div class="form-content-block" v-if="typeId==1">

              <span class="form-content-block-item">Número de documento:</span>

              <span class="form-content-block-item form-content-block-ellipsis">{{numberId}}</span>

            </div>

            <div class="form-content-block" v-if="typeId==2" >
           
              <span class="form-content-block-item">ID del cliente:</span>
          
              <span class="form-content-block-item form-content-block-ellipsis">{{idClient}}</span>
             
            </div>

            <div class="form-content-block">

              <span class="form-content-block-item">Número telefónico:</span>
 
              <span class="form-content-block-item form-content-block-ellipsis">{{numberPhone}}</span>
             
            </div>

          </div>

          <div class="form-content-info-resume">

            <div class="form-content-block form-content-block form-resume-subtitle">
            
              <span class="form-content-block-item form-content-block-ellipsis">Datos del artículo:</span>

            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Empaque:</span>
          
              <span class="form-content-block-item form-content-block-ellipsis">{{packaged==1?"Sin especificar":(packaged == 2?"Sí":"No")}}</span>
              
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Número de orden de compra:</span>

              <span class="form-content-block-item form-content-block-ellipsis">{{newNumbOrder}}</span>
              
            </div>

            <div class="form-content-block">
            
              <span class="form-content-block-item">Título de la orden de compra:</span>
            
              <span class="form-content-block-item form-content-block-ellipsis">{{newInfoProduct}}</span>
              
            </div>

            <div class="form-content-block">
            
              <span class="form-content-block-item">Descripción del producto:</span>
            
              <span class="form-content-block-item form-content-block-ellipsis">{{newDescriptionProduct}}</span>
              
            </div>

            <div class="form-content-block">
            
              <span class="form-content-block-item">Número de ejemplares:</span>
          
              <span class="form-content-block-item form-content-block-ellipsis">{{newStockProduct}}</span>
             
            </div>

            <div class="form-content-block">

              <span class="form-content-block-item">Nro. de chat Grabr;</span>
           
              <span class="form-content-block-item form-content-block-ellipsis"><a :href="newLinkChat">{{newLinkChat}}</a></span>
             
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Fecha de orden de compra:</span>
           
              <span class="form-content-block-item form-content-block-ellipsis">{{newDateOffer|spanishDate}}</span>
             
            </div>

          </div>

          <div class="form-content-info-resume">
            
            <div class="form-content-block form-content-block form-resume-subtitle">

              <span class="form-content-block-item">Datos de compra:</span>

            </div>

            <div class="form-content-block">
              
              <span class="form-content-block-item">Precio:</span>
          
              <span class="form-content-block-item form-content-block-ellipsis">{{newCost}}</span>
              
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Impuesto (USD):</span>
            
              <span class="form-content-block-item form-content-block-ellipsis">{{Number(Math.round( parseFloat(newTax) +'e2')+'e-2').toFixed(2)}}</span>
             
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Fee (USD):</span>
           
              <span class="form-content-block-item form-content-block-ellipsis">{{Number(Math.round( parseFloat(newCostPost) +'e2')+'e-2').toFixed(2)}}</span>
              
            </div>

            <div class="form-content-block">
              
              <span class="form-content-block-item" v-if="grabr.id==1">Link de compra propuesta en Grabr:</span>

              <span  class="form-content-block-item" v-else>Link de compra:</span>

              <span  class="form-content-block-item form-content-block-ellipsis" v-if="grabr.id==1 &&newLinkBuying!=null && newLinkBuying !=''" > <a :href="newLinkBuying">{{newLinkBuying}}</a></span>

              <span class="form-content-block-item form-content-block-ellipsis" v-else-if="grabr.id==2 &&newLinkBuyingV2!=null && newLinkBuyingV2 !=''"><a :href="newLinkBuyingV2">{{newLinkBuyingV2}}</a>
              </span>

              <span class="form-content-block-item form-content-block-ellipsis" v-else>No definido</span>

            </div>

            <div class="form-content-block" v-if="travelNumber!=null" >
             
              <span class="form-content-block-item">Número de viaje:</span>
            
              <span class="form-content-block-item form-content-block-ellipsis">{{travelNumber}}</span>
              
            </div>

            <div class="form-content-block" v-if="grabrAccount!=null" >

              <span class="form-content-block-item">Cuenta en Grabr</span>
          
              <span class="form-content-block-item form-content-block-ellipsis" >{{grabrAccount}}</span>
              
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Ciudad de origen:</span>
            
              <span class="form-content-block-item form-content-block-ellipsis">{{newCityIni.attributes.name}}</span>
              
            </div>

            <div class="form-content-block">

              <span class="form-content-block-item">Ciudad de destino:</span>

              <span class="form-content-block-item form-content-block-ellipsis">{{newCityEnd.attributes.name}}</span>
             
            </div>

            <div class="form-content-block">

              <span class="form-content-block-item">Fecha de posible entrega:</span>
           
              <span class="form-content-block-item form-content-block-ellipsis">{{newDatePromise|spanishDate}}</span>
             
            </div>

          </div>

          <div class="form-content-info-resume text-right">

            <button type="button" class="btn btn-primary btn-edit" @click="sendCompleteForm" >Crear orden Grabr</button>
           
          </div>

        </div>

        <div v-if="grabr.id  == 2">

          <div class="form-block-text">
            
            <span>Resumen de la orden de compra</span>

          </div>
            
          <div class="form-content-info-resume">

            <div class="form-content-block form-content-block form-resume-subtitle">

              <span class="form-content-block-item">Datos del cliente</span>

            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Número de documento:</span>
            
              <span class="form-content-block-item form-content-block-ellipsis">{{userValidated.attributes.profile.attributes.document_number}}</span>
             
            </div>

            <div class="form-content-block">
              
              <span class="form-content-block-item">Nombre del cliente:</span>

              <span class="form-content-block-item form-content-block-ellipsis">{{userValidated.attributes.profile.attributes.name}}</span>
             
            </div>

            <div class="form-content-block">
              
              <span class="form-content-block-item">Apellido del cliente:</span>
          
              <span class="form-content-block-item form-content-block-ellipsis">{{userValidated.attributes.profile.attributes.surnames}}</span>
              
            </div>

          </div>

          <div class="form-content-info-resume">

            <div class="form-content-block form-content-block form-resume-subtitle">

              <span>Datos del artículo</span>

            </div>

            <div class="form-content-block">
              
              <span class="form-content-block-item">Empaque:</span>
          
              <span class="form-content-block-item form-content-block-ellipsis">{{packaged==1?"Sin especificar":(packaged == 2?"Sí":"No")}}</span>
              
            </div>

            <div class="form-content-block">
           
              <span class="form-content-block-item">Título de la orden de compra:</span>
            
              <span class="form-content-block-item form-content-block-ellipsis">{{newInfoProductV2}}</span>
             
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Descripción del producto:</span>

              <span class="form-content-block-item form-content-block-ellipsis">{{newDescriptionProductV2}}</span>
             
            </div>

            <div class="form-content-block">
            
              <span class="form-content-block-item">Número de ejemplares:</span>
           
              <span class="form-content-block-item form-content-block-ellipsis">{{newStockProductV2}}</span>
             
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Peso de la orden:</span>
       
              <span class="form-content-block-item form-content-block-ellipsis">{{Number(Math.round( parseFloat(newWeight) +'e2')+'e-2').toFixed(2)}}</span>
         
            </div>

            <div class="form-content-block">
            
              <span class="form-content-block-item">Unidad de medida del peso:</span>
          
              <span class="form-content-block-item form-content-block-ellipsis">{{unitWeight.attributes.name}}</span>
             
            </div>

          </div>

          <div class="form-content-info-resume">

            <div class="form-content-block form-resume-subtitle">

              <span >Datos de compra</span>

            </div>

            <div class="form-content-block">
              
              <span class="form-content-block-item">Precio real:</span>

              <span class="form-content-block-item form-content-block-ellipsis">{{Number(Math.round( parseFloat(newCostV2) +'e2')+'e-2').toFixed(2)}}</span>
         
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Impuesto real:</span>
           
              <span class="form-content-block-item form-content-block-ellipsis">{{Number(Math.round( parseFloat(newTaxV2) +'e2')+'e-2').toFixed(2)}}</span>
             
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item form-content-block-ellipsis">Costo de envío real:</span>
           
              <span class="form-content-block-item">{{Number(Math.round( parseFloat(newCostPostV2) +'e2')+'e-2').toFixed(2)}}</span>
          
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Link real de compra:</span>

              <span class="form-content-block-item form-content-block-ellipsis"><a :href="newLinkBuyingV2">{{newLinkBuyingV2}}</a></span>
          
            </div>

            <div class="form-content-block">

              <span class="form-content-block-item">Ciudad de origen:</span>
          
              <span class="form-content-block-item form-content-block-ellipsis">{{newCityIni.attributes.name}}</span>
            
            </div>

            <div class="form-content-block">
             
              <span class="form-content-block-item">Ciudad de destino:</span>
           
              <span class="form-content-block-item form-content-block-ellipsis">{{newCityEnd.attributes.name}}</span>
              
            </div>

          </div>
            
          <div class="form-content-info-resume text-right">

            <button type="button" class="btn btn-primary btn-edit" @click="sendCompleteForm" >Crear orden Direct</button>
           
          </div>
          
        </div>

      </div>

    </div>

    <!-- ///////////////////// Modal validacion ///////////////////// -->

    <b-modal
      @hide="toNextView()"
      hide-footer
      hide-header
      id="validacionmodal"
      ref="validacionmodal"
      centered
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle"></h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            block
            @click="hideModal"
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
          <button type="button" class="btn btn-primary btn-edit" block @click="hideModal">Continuar</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import spanish from 'vee-validate/dist/locale/es'
import axios from 'axios'
import { mapState } from 'vuex'
import breadcrumb from '@/components/prefab/structures/breadcrumb.vue'
import { log } from 'util';
export default {
  props: [
    'grabr',
    'oldID',
    'client',
    'externalClientDni',
    'grabrClientId',
    'externalClientCellphone',
    'externalClientName'
  ],
  components: {
    breadcrumb
  },

  data: () => ({
    locale: 'en'
  }),
  data() {
    return {
      state1: 1,
      state2: 0,
      state3: 0,
      state4: 0,
      newName: '',
      newLastname: '',
      typeId: '1',
      idClient: '',
      numberId: '',
      numberPhone: '',
      statusForm1: 0,
      newImageProduct: null,
      newImageName: '',
      newNumbOrder: '',
      newInfoProduct: '',
      newDescriptionProduct: '',
      newStockProduct: '1',
      packaged: 1,
      travelNumber: '',
      grabrAccount: '',

      newLinkChat: '',
      newDateOffer: '',
      statusForm2: 0,
      newCost: '',
      newTax: '',
      newCostPost: '',
      newLinkBuying: '',
      newCityIni: '',
      newCityEnd: '',
      newDatePromise: '',
      statusForm3: 0,
      listCityOrigin: [],
      listCityDestiny: [],
      listCityDestinyFilter: [],
      listUnits: [],
      userFinding: '',
      userValidated: null,
      mesageVerifUser: '',
      newImageProductV2: null,
      newInfoProductV2: '',
      newDescriptionProductV2: '',
      newStockProductV2: '1',
      newWeight: '',
      unitWeight: '',
      newCostV2: '',
      newTaxV2: '',
      newCostPostV2: '',
      newLinkBuyingV2: '',

      orderData: {},
      saveOk: false,

      nameSection: 'Crear orden de compra',
      listRoutes: [
        { nameRoute: 'Orders', titleRoute: 'Órdenes de compra' },
        { nameRoute: 'add-purchase-order', titleRoute: this.grabr.id==1?'Crear orden de compra Grabr':'Crear orden de compra Direct' }
      ]
    }
  },

  created() {
    window.addEventListener('beforeunload', this.setWindowListener)

    this.$validator.localize('es', {
      messages: spanish.messages,
      attributes: {
        fullname: 'nombre completo',
        document_number: 'número de documento',
        phone_number: 'número de celular',
        price: 'precio',
        tax: 'impuesto',
        travel_number: 'Número de viaje',
        grabr_account: 'Nombre de usuario de grabr',
        product_image: 'imagen del artículo',
        purchase_order_number: 'número de orden de compra',
        product_information: 'información del producto',
        number_of_items: 'número de ejemplares',

        purchase_chat_link: 'número de chat en Grabr',
        purchase_order_date: 'fecha de asignación al viajero',
        origin_city: 'ciudad de origen',
        destination_city: 'ciudad de destino',
        possible_delivery_date: 'fecha posible de entrega',
        document_number_nograbr: 'número de documento',
        product_information_2: 'información del producto',
        number_of_items_2: 'número de ejemplares',
        order_weight_2: 'peso de la orden',
        weight_units_2: 'unidades de peso',
        shipping_cost: 'costo de envío',
        purchase_link: 'link de compra'
      }
    })
    // start with spanish locale.
    this.$validator.localize('es')
    if (!this.grabr) {
      this.$router.push('/orders')
      return
    }
    if (this.oldID != null) {
      console.log('Viene para un reemplazo')
      // viene para ser un reemplazo
      this.state1 = 0
      this.state2 = 1
      if (this.grabr.id == 1) {
        // es de grabr
        console.log('es de Grabr')
        this.newName = this.externalClientName
        this.numberPhone = this.externalClientCellphone
        if (this.externalClientDni != null) {
          this.typeId = 1
          this.numberId = this.externalClientDni
        } else {
          this.typeId = 2
          this.clientId = this.grabrClientId
        }
      } else {
        // no es de grabr
        console.log('no es de Grabr')
        this.setUserChoosed(this.client)
      }
    } else {
      console.log('No viene para un reemplazo')
    }
    this.listAllCity(1, this.getCityOrigin)
    this.listAllCity(2, this.getCityDestiny)
    this.listUnitWeight(this.getListUnits)
  },
  methods: {
    cleanDocumentNumbers() {
      if (this.typeId == 1) {
        this.idClient = ''
      } else if (this.typeId == 2) {
        this.numberId = ''
      } else {
        this.numberId = ''
        this.idClient = ''
      }
    },
    setWindowListener(event) {
      console.log('Estamos en setWindoesListener')
      event.returnValue = 'Write something'
    },

    setNewTax() {
      let price = (this.grabr.id == 1) ? this.newCost : this.newCostV2;
      let tax = (this.grabr.id == 1) ? this.newTax : this.newTaxV2;

      if (isNaN(price) || price === '' || price === null) {
        tax = 0
      } else {
        tax = Number(
          Math.round(parseFloat(0.07 * parseFloat(price)) + 'e2') + 'e-2'
        )
          .toFixed(2)
          .toString()
      }
      if(this.grabr.id == 1) {
        this.newCost = price
        this.newTax = tax
      } else {
        this.newCostV2 = price
        this.newTaxV2 = tax
      }
    },

    changeFormView(event) {
      if (event === 1) {
        this.state1 = 1
        this.state2 = 0
        this.state3 = 0
        this.state4 = 0
      } else if (event === 2) {
        this.state1 = 2
        this.state2 = 1
        this.state3 = 0
        this.state4 = 0
      } else if (event === 3) {
        this.state1 = 2
        this.state2 = 2
        this.state3 = 1
        this.state4 = 0
      } else if (event === 4) {
        this.state1 = 2
        this.state2 = 2
        this.state3 = 2
        this.state4 = 1
      }
    },
    handleValidationErrorAdvanced() {
      const firstField = Object.keys(this.errors.collect())[0]
      if (firstField) {
        var elements = document.getElementsByName(firstField)
        console.log('Failed validation of field: '.concat(firstField))
        elements[0].scrollIntoView()
      } else console.log('Could not find elements with errors.')
    },
    validateFirstFormAdvanced() {
      this.$validator.validate().then(result => {
        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          this.statusForm1 = 1
          if (this.statusForm1) {
            this.changeFormView(2)
          }
        }
      })
    },
    validateSecondFormAdvanced() {
      this.$validator.validate().then(result => {
        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          this.statusForm2 = 1
          if (this.statusForm2) {
            this.changeFormView(3)
          }
        }
      })
    },

    validateThirdFormAdvanced() {
      this.$validator.validate().then(result => {
        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          console.log('Passed validations of validateThirdFormAdvanced')
          this.statusForm3 = 1
          if (this.statusForm3) {
            this.changeFormView(4)
          }
        }
      })
    },
    validateFistFormV2() {
      this.$validator.validate().then(result => {
        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          if (!this.userValidated) {
            return this.handleValidationErrorAdvanced()
          }
          this.statusForm1 = 1
          if (this.statusForm1) {
            this.changeFormView(2)
          }
        }
      })
      //   if (this.userValidated == null || this.userValidated == '') {
      //     alert('Valide un DNI existente')
      //     this.statusForm1 = 0
      //     return
      //   }
      //   this.statusForm1 = 1
      //   if (this.statusForm1) {
      //     this.changeFormView(2)
      //   }
    },

    sendCompleteForm() {
      // eslint-disable-next-line no-unreachable
      if (this.statusForm3 && this.statusForm2 && this.statusForm1) {
        let auxObject
        if (this.grabr.id == 1) {
          auxObject = new Object()
          auxObject.external_client_name = this.newName
          auxObject.external_client_lastname = this.newLastname
          if (this.typeId == 1) {
            auxObject.external_client_dni = this.numberId
          }
          if (this.typeId == 2) {
            auxObject.client_grabr_id = this.idClient
          }
          console.log(this.$store.state.user)

          auxObject.external_client_cellphone = this.numberPhone
          auxObject.grabr_order_number = this.newNumbOrder
          auxObject.product_info = this.newInfoProduct
          auxObject.description = this.newDescriptionProduct
          auxObject.product_specimens = this.newStockProduct
          console.log("que pasa");

          auxObject.admin_id =  this.$store.state.user.type =='Admin'?this.$store.state.user.id:null
          console.log("prueba");

          auxObject.grabr_chat_link = this.newLinkChat
          auxObject.grabr_offer_date = this.newDateOffer
          auxObject.grabr_price = this.newCost
          auxObject.grabr_tax = this.newTax
          auxObject.grabr_fee = this.newCostPost
          auxObject.grabr_purchase_link = this.newLinkBuying
          auxObject.origin_id = this.newCityIni.id
          auxObject.destination_id = this.newCityEnd.id
          auxObject.promised_delivery_date = this.newDatePromise
          auxObject.product_image = this.newImageProduct
          auxObject.travel_number = this.travelNumber
          auxObject.grabr_account = this.grabrAccount

          auxObject.packaged =
            this.packaged == 2 ? 1 : this.packaged == 3 ? 0 : null

          if (this.oldID) {
            auxObject.purchase_order_old_id = this.oldID
          }
          console.log(auxObject)

          this.createBuyingOrderGrabr(auxObject)
        }
        else if (this.grabr.id == 2) {
          auxObject = new Object()
          auxObject.product_info = this.newInfoProductV2
          auxObject.description = this.newDescriptionProductV2
          auxObject.product_specimens = this.newStockProductV2
          auxObject.weight = this.newWeight
          auxObject.weight_unit_id = this.unitWeight.id
          auxObject.client_id = this.userValidated.id
          auxObject.origin_id = this.newCityIni.id
          auxObject.admin_id =  this.$store.state.user.type =='Admin'?this.$store.state.user.id:null
          auxObject.destination_id = this.newCityEnd.id
          auxObject.real_purchase_link = this.newLinkBuyingV2
          auxObject.real_price = this.newCostV2
          auxObject.real_tax = this.newTaxV2
          auxObject.real_shipping = this.newCostPostV2
          auxObject.product_image = this.newImageProductV2

          auxObject.packaged =
            this.packaged == 2 ? 1 : this.packaged == 3 ? 0 : null

          if (this.oldID) {
            auxObject.purchase_order_old_id = this.oldID
          }
          this.createBuyingOrderNoGrabr(auxObject)
        }
      }
    },
    listAllCity(indx, callback) {
      let url = process.env.API_URL + '/api/city/list?type=' + indx
      axios
        .get(url)
        .then(response => {
          let data = response.data.body.cities_list
          callback(data)
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    listUnitWeight(callback) {
      let url = process.env.API_URL + '/api/weightUnit/list'
      axios
        .get(url)
        .then(response => {
          let data = response.data.body
          callback(data)
        })
        .catch(errors => {
          console.log(errors)
        })
    },
    createBuyingOrderGrabr(data) {
      let url =
        process.env.API_URL + '/api/purchaseOrder/create-purchase-order-grabr'
      axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            this.orderData = response.data.body

            this.saveOk = true
            this.$refs.validacionmodal.show()
          }
        })
        .catch(error => {
          console.log(error.response.data)
        })
    },
    createBuyingOrderNoGrabr(data) {
      let url =
        process.env.API_URL +
        '/api/purchaseOrder/create-purchase-order-no-grabr'
      axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            this.orderData = response.data.body
            this.saveOk = true
            this.$refs.validacionmodal.show()
          }
        })
        .catch(error => {
          console.log('Error')
          console.log(error.response.data)
          return
        })
    },
    toNextView() {
      let data = this.orderData
      this.$router.push({
        name: 'show-purchase-order',
        params: {
          id: data.id,
          orderData: data
        }
      })
    },
    getCityDestiny(data) {
      this.listCityDestiny = data
    },
    getCityOrigin(data) {
      this.listCityOrigin = data
    },
    getListUnits(data) {
      this.listUnits = data
      this.listUnits.forEach(unit => {
        if (unit.attributes.key_name == 'lb') {
          this.originWeightUnit = unit
        }
      })
    },
    uploadImage(e) {
      const image = e.target.files[0]
      var idxDot = image.name.lastIndexOf('.') + 1
      var extFile = image.name.substr(idxDot, image.name.length).toLowerCase()
      if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        if (this.grabr.id == 1) {
          this.newImageName = image.name
          reader.onload = e => {
            this.newImageProduct = e.target.result
          }
        }
        if (this.grabr.id == 2) {
          this.newImageName = image.name
          reader.onload = e => {
            this.newImageProductV2 = e.target.result
          }
        }
      } else {
        alert('Solo se permite formato PNG, JPG o JPEG')
      }
    },
    hideModal() {
      this.$refs.validacionmodal.hide()
    },
    setUserChoosed(data) {
      this.userValidated = data
      this.mesageVerifUser =
        'Cliente encontrado: ' +
        this.userValidated.attributes.profile.attributes.name +
        ' ' +
        this.userValidated.attributes.profile.attributes.surnames
    },
    validateUserById(id, callback) {
      console.log('Entre a la funcion valdateUserById');
      let url = process.env.API_URL + '/api/client/getByDocumentNumber/' + id
      axios
        .get(url)
        .then(response => {
          let data = response.data.body
          console.log(data);
          callback(data)
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 404) {
              this.userValidated = null
              this.mesageVerifUser = 'Cliente no existe en el sistema'
              self.response = 'Error 404'
            }
            console.log(error)
          }
        })
    },
    resetImpuesto(){
      console.log('limpiará camps');
      this.newTaxV2 = '';
    },
    filtrar(){
      this.listCityDestinyFilter = this.listCityDestiny.filter(city => city.attributes.name !== this.newCityIni.attributes.name);
    }
  
  },
  computed: {
    shortNewLinkBuying: function() {
      if (this.newLinkBuying != '' && this.newLinkBuying != null) {
        let str = this.newLinkBuying

        let pos = str.indexOf('.com')
        let result
        if (pos == -1) {
          result = str.substring(0, pos + 4)
        } else {
          result = str.substring(0, pos + 4)
        }

        console.log(pos)
      }
      return ''
    },
    shortNewLinkBuyingV2: function() {
      if (this.newLinkBuyingV2 != '' && this.newLinkBuyingV2 != null) {
      }
      return ''
    }
  },
  watch: {
    userFinding: function(newValue) {
      if (newValue == '') {
        this.mesageVerifUser = ''
      }
    }
  },

  beforeDestroy: function() {
    window.removeEventListener('beforeunload', this.setWindowListener)
  },

  beforeRouteLeave(to, from, next) {
    let askFlag = true
    console.log("************************")
    console.log(this.saveOk)


    console.log(document.readyState)

    if (document.readyState == 'loading') {
      askFlag = false
    } else if (document.readyState == 'complete') {
      askFlag = !this.saveOk
    }
    console.log(askFlag);


    if (askFlag) {
      const answer = window.confirm(
        'No se han guardado los cambios, ¿está seguro de salir?'
      )
      if (answer) {
        next()
        return
      } else {
        next(false)
        return
      }
    }
    next()
  }
}
</script>
