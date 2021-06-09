<template>

  <div class="main-content">

    <breadcrumb :nameSection="nameSection" :listRoutes="listRoutes" :activeRoute="activeRoute"></breadcrumb>

    <!--<circle-spin v-if="!orderDataShow"></circle-spin>-->

    <div v-if="orderDataShow">

      <div class="card-status-content">

        <div class="card-status-block">

          <button  type="button" class="btn btn-line" @click="backPage"><i class="fas fa-long-arrow-alt-left"></i>Volver</button>

          <span v-if="orderDataShow.attributes.status >= 1 && orderDataShow.attributes.status <= 3" class="btn statusInit" >Inicializando</span>

          <span v-if="orderDataShow.attributes.status >= 4 && orderDataShow.attributes.status <= 7" class="btn statusProgress" >En proceso</span>

          <span v-if="orderDataShow.attributes.status == 8" class="btn statusProgress">Finalizado</span>

          <span v-if=" orderDataShow.attributes.status == 10" class="btn statusCancel">Cancelado</span>

          <span v-if="orderDataShow.attributes.status == 1" class="card-status-message">En re-evaluación inicial</span>

          <span v-if="orderDataShow.attributes.status == 2" class="card-status-message">Re-evaluado esperando confirmación</span>

          <span v-if="orderDataShow.attributes.status == 3" class="card-status-message">Completando información de compra</span>

          <span v-if="orderDataShow.attributes.status == 4" class="card-status-message">Comprado y en camino a dirección de origen</span>

          <span v-if="orderDataShow.attributes.status == 5" class="card-status-message">Recibido en dirección de origen y en evaluación</span>

          <span v-if="orderDataShow.attributes.status == 6" class="card-status-message">Listo para embarque</span>

          <span v-if="orderDataShow.attributes.status == 7" class="card-status-message">En embarque</span>

          <span v-if="orderDataShow.attributes.status == 8" class="card-status-message">Entregado correctamente</span>

          <span v-if="orderDataShow.attributes.status == 10 && orderDataShow.attributes.cancelled_reason_flag==1" class="card-status-message">Por decisión propia</span>

          <span v-if="orderDataShow.attributes.status == 10 && orderDataShow.attributes.cancelled_reason_flag==2" class="card-status-message">Por incidente en tracking</span>

          <span v-if="orderDataShow.attributes.status == 10 && orderDataShow.attributes.cancelled_reason_flag==3" class="card-status-message">Por no autorizar reposición de items</span>

        </div>

      </div>

      <div class="m">

        <div class="nm n-1">

          <div class="details-collapse">

            <orderImportantInfo
              v-bind:orderDataShow="orderDataShow"
              v-bind:fromDetail="true"
              v-bind:fromTracking="false"
              @inicialize-data="inicializeDataFromImportantInfo"></orderImportantInfo>

            <div v-if="orderDataShow.attributes.status == 1 && ((orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag == 0) || (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag == 0) || (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag == 0))" class="card card-standby collapsed" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

              <div class="card-content-container">

                <div class="card-content-block">

                  <span>Oferta por evaluar</span>

                </div>

                <div class="card-content-block">

                  <b-button v-b-modal.modalReevaluation class="btn btn-primary btn-lg" :disabled="noEvaluationFlag" >Evaluar</b-button>

                </div>

              </div>

              <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion" v-if="((orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0) || (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0) || (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0))">

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

              </div>

            </div>

            <div v-if="orderDataShow.attributes.status == 2 && ((orderDataShow.attributes.is_from_grabr_flag &&  orderDataShow.attributes.grabrOrder.attributes.approved_flag == 3) || ( orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag == 3) || (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag == 3))" class="card card-cancel collapsed" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" >

              <div class="card-content-container">

                <div class="card-content-block">

                  <span>Oferta no aprobada</span>

                </div>

                <div class="card-content-block">

                  <b-button v-b-modal.modalReevaluation class="btn btn-primary btn-lg" :disabled="noEvaluationFlag">Re-evaluar</b-button>

                  <button v-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.confirmation_flag == 0" class="btn btn-primary btn-lg" @click="ProcessService(id)">{{orderDataShow.attributes.grabrOrder.attributes.approved_flag==1?'Reafirmar aprobación':'Forzar aprobación'}}
                  </button>

                  <button v-else-if="orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.confirmation_flag == 0" class="btn btn-primary btn-lg" @click="ProcessService(id)">{{orderDataShow.attributes.linioOrder.attributes.approved_flag==1?'Reafirmar aprobación':'Forzar aprobación'}}</button>

                  <button v-else-if="orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.confirmation_flag == 0" class="btn btn-primary btn-lg" @click="ProcessService(id)">{{orderDataShow.attributes.meliOrder.attributes.approved_flag==1?'Reafirmar aprobación':'Forzar aprobación'}}</button>

                  <button v-if="orderDataShow.attributes.is_from_grabr_flag && this.orderDataShow.attributes.grabrOrder.attributes.confirmation_flag != 0" class="btn btn-primary btn-lg" @click="ProcessService(id)" >Procesar </button>

                  <button v-else-if="(orderDataShow.attributes.is_from_linio_flag && this.orderDataShow.attributes.linioOrder.attributes.confirmation_flag != 0) || orderDataShow.attributes.is_from_meli_flag &&  this.orderDataShow.attributes.meliOrder.attributes.confirmation_flag != 0" class="btn btn-primary btn-lg" @click="ProcessService(id)"
                  >Procesar </button>

                </div>

              </div>

              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion" v-if="(orderDataShow.attributes.is_from_grabr_flag &&  orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0 ) || ( orderDataShow.attributes.is_from_linio_flag &&  orderDataShow.attributes.linioOrder.attributes.approved_flag != 0 ) || ( orderDataShow.attributes.is_from_meli_flag &&  orderDataShow.attributes.meliOrder.attributes.approved_flag != 0 )">

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow" @inicialize-data="inicializeDataFromImportantInfo"></resumePurchaseOrder>

              </div>

            </div>

            <div v-if="orderDataShow.attributes.status == 2 && ((orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag == 1) || (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag == 1) || (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag == 1))" class="card card-correct" id="headingThree">

              <div class="card-content-container">
                <div class="card-content-block">
                  <span>Oferta aprobada</span>
                </div>

                <div class="card-content-block">

                  <b-button v-b-modal.modalReevaluation class="btn btn-primary btn-lg">Re-evaluar</b-button>

                  <button v-if="orderDataShow.attributes.is_from_grabr_flag &&  orderDataShow.attributes.grabrOrder.attributes.confirmation_flag == 0" class="btn btn-primary btn-lg" @click="ProcessService(id)">{{orderDataShow.attributes.grabrOrder.attributes.approved_flag==1?'Reafirmar aprobación':'Forzar aprobación'}}</button>

                  <button v-else-if="orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.confirmation_flag == 0" class="btn btn-primary btn-lg"  @click="ProcessService(id)">{{orderDataShow.attributes.linioOrder.attributes.approved_flag==1?'Reafirmar aprobación':'Forzar aprobación'}}</button>

                  <button v-else-if="orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.confirmation_flag == 0" class="btn btn-primary btn-lg"  @click="ProcessService(id)">{{orderDataShow.attributes.meliOrder.attributes.approved_flag==1?'Reafirmar aprobación':'Forzar aprobación'}}</button>

                  <button v-if="orderDataShow.attributes.is_from_grabr_flag &&  this.orderDataShow.attributes.grabrOrder.attributes.confirmation_flag != 0" class="btn btn-primary btn-lg" @click="ProcessService(id)">Procesar</button>

                  <button v-else-if="orderDataShow.attributes.is_from_linio_flag && this.orderDataShow.attributes.linioOrder.attributes.confirmation_flag != 0" class="btn btn-primary btn-lg" @click="ProcessService(id)" >Procesar</button>

                  <button v-else-if="orderDataShow.attributes.is_from_meli_flag && this.orderDataShow.attributes.meliOrder.attributes.confirmation_flag != 0" class="btn btn-primary btn-lg" @click="ProcessService(id)" >Procesar</button>

                  <div class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree" style="cursor: pointer">
                    <div class="details-text up-arrow"></div>
                  </div>
                </div>

              </div>

              <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow" @inicialize-data="inicializeDataFromImportantInfo"></resumePurchaseOrder>

              </div>

            </div>

            <div v-if="orderDataShow.attributes.status == 2 && ((orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag == 2) || (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag == 2))" class="card card-standby card-wait collapsed" id="headinFour" data-toggle="collapse" data-target="#collapsenFour" aria-expanded="true" aria-controls="collapseFour" >

              <div class="card-content-container">

                <div class="card-content-block">

                  <span>Esperando revisión del administrador</span>

                </div>

                <div class="card-content-block">

                  <b-button v-b-modal.modalReevaluation class="btn btn-primary btn-lg">Re-evaluar</b-button>

                  <button v-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.confirmation_flag == 0" class="btn btn-primary btn-lg" @click="ProcessService(id)" >{{orderDataShow.attributes.grabrOrder.attributes.approved_flag==1?'Reafirmar aprobación':'Forzar aprobación'}}Forzar aprobación </button>

                  <button v-else-if="orderDataShow.attributes.is_from_linio_flag &&  orderDataShow.attributes.linioOrder.attributes.confirmation_flag == 0" class="btn btn-primary btn-lg" @click="ProcessService(id)" >{{orderDataShow.attributes.linioOrder.attributes.approved_flag==1?'Reafirmar aprobación':'Forzar aprobación'}}Forzar aprobación </button>

                  <button v-else-if="orderDataShow.attributes.is_from_meli_flag &&  orderDataShow.attributes.meliOrder.attributes.confirmation_flag == 0" class="btn btn-primary btn-lg" @click="ProcessService(id)" >{{orderDataShow.attributes.meliOrder.attributes.approved_flag==1?'Reafirmar aprobación':'Forzar aprobación'}}Forzar aprobación </button>

                  <button v-if="orderDataShow.attributes.is_from_grabr_flag && this.orderDataShow.attributes.grabrOrder.attributes.confirmation_flag != 0" class="btn btn-primary btn-lg" @click="ProcessService(id)">Procesar
                  </button>

                  <button v-else-if="orderDataShow.attributes.is_from_linio_flag && this.orderDataShow.attributes.linioOrder.attributes.confirmation_flag != 0" class="btn btn-primary btn-lg" @click="ProcessService(id)" >Procesar
                  </button>

                  <button v-else-if="orderDataShow.attributes.is_from_meli_flag && this.orderDataShow.attributes.meliOrder.attributes.confirmation_flag != 0" class="btn btn-primary btn-lg" @click="ProcessService(id)" >Procesar
                  </button>

                  <div class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree" style="cursor: pointer">
                    <div class="details-text up-arrow"></div>
                  </div>
                </div>

              </div>

              <div id="collapsenFour" class="collapse" aria-labelledby="headingnFour" data-parent="#accordion">

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow" @inicialize-data="inicializeDataFromImportantInfo"></resumePurchaseOrder>

              </div>

            </div>

            <div v-if="orderDataShow.attributes.status == 3 &&
            (
              (!orderDataShow.attributes.is_from_grabr_flag && !orderDataShow.attributes.is_from_linio_flag & !orderDataShow.attributes.is_from_meli_flag) ||
              (orderDataShow.attributes.is_from_grabr_flag && (orderDataShow.attributes.grabrOrder.attributes.approved_flag !== 0 && ( orderDataShow.attributes.grabrOrder.attributes.confirmation_flag ===1 || orderDataShow.attributes.grabrOrder.attributes.confirmation_flag === 2))) ||
              (orderDataShow.attributes.is_from_linio_flag && (orderDataShow.attributes.linioOrder.attributes.approved_flag !== 0 && (orderDataShow.attributes.linioOrder.attributes.confirmation_flag ===1 || orderDataShow.attributes.linioOrder.attributes.confirmation_flag === 2))) ||
              (orderDataShow.attributes.is_from_meli_flag && (orderDataShow.attributes.meliOrder.attributes.approved_flag !== 0 && (orderDataShow.attributes.meliOrder.attributes.confirmation_flag ===1 || orderDataShow.attributes.meliOrder.attributes.confirmation_flag === 2)))
            )"
            class="card card-standby card-wait" id="headingTwo">

              <div class="card-content-container">

                <div class="card-content-block">

                  <span>Esperando revisión del administrador</span>

                </div>

                <div class="card-content-block">

                  <button class="btn btn-primary btn-lg" @click="ProcessService(id)" :disabled="orderDataShow.attributes.payed == 1">Completar información</button>

                  <div v-if="orderDataShow.attributes.status == 3 &&
                  (orderDataShow.attributes.is_from_linio_flag && (orderDataShow.attributes.linioOrder.attributes.approved_flag !== 0 && (orderDataShow.attributes.linioOrder.attributes.confirmation_flag === 1 || orderDataShow.attributes.linioOrder.attributes.confirmation_flag === 2))) ||
                  (orderDataShow.attributes.is_from_meli_flag && (orderDataShow.attributes.meliOrder.attributes.approved_flag !== 0 && (orderDataShow.attributes.meliOrder.attributes.confirmation_flag === 1 || orderDataShow.attributes.meliOrder.attributes.confirmation_flag === 2)))"
                  class="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" style="cursor: pointer">
                    <div class="details-text up-arrow"></div>
                  </div>

                </div>

              </div>

              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion" v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0 ) || (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0 ) || (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0 )">

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

              </div>

            </div>

            <div v-if="orderDataShow.attributes.status == 4" class="card card-correct collapsed" id="headinThree">

              <div class="card-content-container">

                <div class="card-content-block">

                  <span>Listo para el flujo de tracking</span>

                </div>

                <div class="card-content-block">

                  <button class="btn btn-primary btn-lg" @click="toTrackingView(orderDataShow)" >Ir al tracking</button>

                  <div v-if="(orderDataShow.attributes.is_from_linio_flag && (orderDataShow.attributes.linioOrder.attributes.approved_flag !== 0 && (orderDataShow.attributes.linioOrder.attributes.confirmation_flag === 1 || orderDataShow.attributes.linioOrder.attributes.confirmation_flag === 2)) ||
                  orderDataShow.attributes.is_from_meli_flag && (orderDataShow.attributes.meliOrder.attributes.approved_flag !== 0 && (orderDataShow.attributes.meliOrder.attributes.confirmation_flag === 1 || orderDataShow.attributes.meliOrder.attributes.confirmation_flag === 2)))"
                  class="collapsed" data-toggle="collapse" data-target="#collapsenThree" aria-expanded="true" aria-controls="collapseThree" style="cursor: pointer">
                    <div class="details-text up-arrow"></div>
                  </div>
                </div>

              </div>

              <div id="collapsenThree" class="collapse" aria-labelledby="headingnThree"
              data-parent="#accordion" v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0) ||
              (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0) ||
              (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0)">

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

              </div>

            </div>

            <div v-if="orderDataShow.attributes.status == 5 && orderDataShow.attributes.warning_expired_flag == 0" class="card card-correct" id="headinThree">

              <div class="card-content-container">

                <div class="card-content-block">

                  <span>En proceso de tracking</span>

                </div>

                <div class="card-content-block">

                  <button class="btn btn-primary btn-lg" @click="toTrackingView(orderDataShow)" >Ir al tracking</button>

                  <div v-if="orderDataShow.attributes.is_from_linio_flag && (orderDataShow.attributes.linioOrder.attributes.approved_flag !== 0 && (orderDataShow.attributes.linioOrder.attributes.confirmation_flag === 1 || orderDataShow.attributes.linioOrder.attributes.confirmation_flag === 2)) ||
                  orderDataShow.attributes.is_from_meli_flag && (orderDataShow.attributes.meliOrder.attributes.approved_flag !== 0 && (orderDataShow.attributes.meliOrder.attributes.confirmation_flag === 1 || orderDataShow.attributes.meliOrder.attributes.confirmation_flag === 2))"
                  class="collapsed" data-toggle="collapse" data-target="#collapsenThree" aria-expanded="true" aria-controls="collapseThree" style="cursor: pointer">
                    <div class="details-text up-arrow"></div>
                  </div>

                </div>

              </div>

              <div id="collapsenThree" class="collapse" aria-labelledby="headingnThree" data-parent="#accordion" v-if="(orderDataShow.attributes.is_from_linio_flag &&  orderDataShow.attributes.linioOrder.attributes.approved_flag != 0) || (orderDataShow.attributes.is_from_meli_flag &&  orderDataShow.attributes.meliOrder.attributes.approved_flag != 0)">

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

              </div>

            </div>

            <div v-if="orderDataShow.attributes.status== 5 && orderDataShow.attributes.warning_expired_flag == 1" class="card card-warning collapsed" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >

              <div class="card-content-container" >

                <div class="card-content-block">

                  <span>En proceso de tracking con retraso</span>

                </div>

                <div class="card-content-block">

                  <button class="btn btn-primary btn-lg" @click="toTrackingView(orderDataShow)" >Ir al tracking</button>

                </div>

              </div>

              <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion" v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0) ||
              (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0) ||
              (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0)" >

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

              </div>

            </div>

            <div v-if="orderDataShow.attributes.status== 5 && orderDataShow.attributes.warning_expired_flag == 0"
              class="card card-correct collapsed" id="headingTwo" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">

              <div class="card-content-container">

                <div class="card-content-block">

                  <span>Recibido y completando datos de recepción</span>

                </div>

              </div>

              <div id="collapsenThree" class="collapse" aria-labelledby="headingnThree" data-parent="#accordion" v-if="(orderDataShow.attributes.is_from_grabr_flag &&  orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0 ) ||
              (orderDataShow.attributes.is_from_linio_flag &&  orderDataShow.attributes.linioOrder.attributes.approved_flag != 0) ||
              (orderDataShow.attributes.is_from_meli_flag &&  orderDataShow.attributes.meliOrder.attributes.approved_flag != 0)">

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

              </div>

            </div>

            <div v-if="orderDataShow.attributes.status == 6" class="card card-correct" id="headinThree">

              <div class="card-content-container">

                <div class="card-content-block">

                  <span>Listo para embarcar</span>

                </div>

                <div class="card-content-block">

                  <div v-if="orderDataShow.attributes.is_from_linio_flag && (orderDataShow.attributes.linioOrder.attributes.approved_flag !== 0 && (orderDataShow.attributes.linioOrder.attributes.confirmation_flag === 1 || orderDataShow.attributes.linioOrder.attributes.confirmation_flag === 2)) ||
                  orderDataShow.attributes.is_from_meli_flag && (orderDataShow.attributes.meliOrder.attributes.approved_flag !== 0 && (orderDataShow.attributes.meliOrder.attributes.confirmation_flag === 1 || orderDataShow.attributes.meliOrder.attributes.confirmation_flag === 2) )"
                  class="collapsed" data-toggle="collapse" data-target="#collapsenThree" aria-expanded="true" aria-controls="collapseThree" style="cursor: pointer">
                    <div class="details-text up-arrow"></div>
                  </div>

                </div>

              </div>

              <div id="collapsenThree" class="collapse" aria-labelledby="headingnThree" data-parent="#accordion" v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0 )||
              (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0) ||
              (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0 )">

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

              </div>

            </div>

            <div v-if="orderDataShow.attributes.status== 10 && orderDataShow.attributes.cancelled == 1 " class="card card-cancel collapsed" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo" >

              <div class="card-content-container" >

                <div class="card-content-block">

                  <span v-if=" orderDataShow.attributes.cancelled_reason_flag == 1"
                  >Cancelado por decision propia</span>

                  <span v-else-if=" orderDataShow.attributes.cancelled_reason_flag == 2"
                  >Cancelado por incidente en tracking</span>

                  <span v-else-if=" orderDataShow.attributes.cancelled_reason_flag == 3"
                  >Cancelado por no autorizar reposición de items</span>

                </div>

                <div class="card-content-block">

                  <button @click="toTrackingView(orderDataShow)" class="btn btn-primary btn-lg" >Ir al tracking</button>

                </div>

              </div>

              <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">

                <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

              </div>

            </div>

          </div>

          <div class="details-title-separator">
            <span>Información de la orden</span>
          </div>

          <div class="details-content">

            <div id="accordion">

              <div class="details-content-title collapsed " id="headingclient" data-toggle="collapse" data-target="#collapseclient" aria-expanded="false" aria-controls="collapseclient">

                <span>Datos del cliente</span>

                <div class="details-text up-arrow"></div>

              </div>

              <div id="collapseclient" class=" collapse" aria-labelledby="headingclient"><!--data-parent="#accordion"-->

                <div class="details-content-info">

                  <div class="details-title-block">

                    <span class="details-title-item" v-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.client_grabr_id!=null">ID de cliente:</span>

                    <span class="details-title-item" v-else>Código:</span>
                    <span class="details-title-item" v-if="orderDataShow.attributes.is_from_meli_flag" >{{orderDataShow.attributes.meliOrder.attributes.customer_id}} </span>

                    <span class="details-title-item" v-else-if="(orderDataShow.attributes.is_from_grabr_flag &&  orderDataShow.attributes.grabrOrder.attributes.client_grabr_id==null) || ( orderDataShow.attributes.is_from_linio_flag) ">{{orderDataShow.attributes.external_client_dni!=null?orderDataShow.attributes.external_client_dni:'No definido'}} </span>

                    <span class="details-title-item" v-else-if="!orderDataShow.attributes.is_from_grabr_flag && !orderDataShow.attributes.is_from_linio_flag && !orderDataShow.attributes.is_from_meli_flag"> {{orderDataShow.attributes.client.attributes.profile.attributes.document_number}}</span>

                    <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.client_grabr_id!=null" >

                      <a :href="'https://grabr.io/es/users/'+orderDataShow.attributes.grabrOrder.attributes.client_grabr_id" target="_blank" >
                        {{orderDataShow.attributes.grabrOrder.attributes.client_grabr_id}}
                      </a>

                    </span>

                  </div>

                  <div class="details-title-block">

                    <span class="details-title-item">Nombres y apellidos:</span>

                    <span class="details-title-item" v-if="orderDataShow.attributes.is_from_grabr_flag" >{{orderDataShow.attributes.external_client_name}}</span>

                    <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">{{orderDataShow.attributes.linioOrder.attributes.customer_first_name + " " + orderDataShow.attributes.linioOrder.attributes.customer_last_name}}</span>

                    <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">{{orderDataShow.attributes.meliOrder.attributes.customer_first_name + " " + orderDataShow.attributes.meliOrder.attributes.customer_last_name}}</span>

                    <span class="details-title-item" v-else>{{orderDataShow.attributes.client.attributes.profile.attributes.name +" "+ orderDataShow.attributes.client.attributes.profile.attributes.surnames }}</span>

                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.is_from_meli_flag">

                    <span class="details-title-item">Nickname:</span>
                    <span class="details-title-item" >{{orderDataShow.attributes.meliOrder.attributes.customer_nickname}}</span>

                  </div>

                  <div class="details-title-block" >

                    <span class="details-title-item" >Número telefónico:</span>
                    <span class="details-title-item"  v-if="orderDataShow.attributes.is_from_meli_flag">{{orderDataShow.attributes.meliOrder.attributes.customer_phone}}</span>

                    <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_grabr_flag || orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag">
                    {{orderDataShow.attributes.external_client_cellphone!=null?orderDataShow.attributes.external_client_cellphone:'No definido'}} </span>

                    <span class="details-title-item" v-else>{{orderDataShow.attributes.client.attributes.profile.attributes.cellphone}}</span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div class="details-content" v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag">

            <div id="accordion">

              <div class="details-content-title collapsed " id="headingshipping" data-toggle="collapse" data-target="#collapseshipping" aria-expanded="false" aria-controls="collapseshipping">

                <span>Datos de envío</span>

                <div class="details-text up-arrow"></div>

              </div>

              <div id="collapseshipping" class=" collapse" aria-labelledby="headingshipping"><!--data-parent="#accordion"-->

                <div class="details-content-info" v-if="orderDataShow.attributes.hasshipping">

                  <div class="details-title-block" v-if="orderDataShow.attributes.is_from_meli_flag">

                    <span class="details-title-item" >Código de envío: </span>
                    <span class="details-title-item" >{{orderDataShow.attributes.meliOrder.attributes.shipping_id}}</span>
                  </div>

                  <div class="details-title-block">

                    <span class="details-title-item">Dirección 1: </span>

                    <span class="details-title-item" v-if="orderDataShow.attributes.is_from_meli_flag">{{orderDataShow.attributes.meliOrder.attributes.shipping_address != null ? orderDataShow.attributes.meliOrder.attributes.shipping_address: 'No definido'}}</span>
                    <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">{{orderDataShow.attributes.linioOrder.attributes.shipping_address!=null?orderDataShow.attributes.linioOrder.attributes.shipping_address:'No definido'}}</span>

                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.is_from_meli_flag">

                    <span class="details-title-item">Dirección 2: </span>

                    <span class="details-title-item">{{orderDataShow.attributes.meliOrder.attributes.shipping_comment != null ? orderDataShow.attributes.meliOrder.attributes.shipping_comment: 'No definido'}}</span>

                  </div>

                  <div class="details-title-block">

                    <span class="details-title-item">Distrito: </span>

                    <span class="details-title-item" v-if="orderDataShow.attributes.is_from_meli_flag">{{orderDataShow.attributes.meliOrder.attributes.shipping_neighborhood != null ? orderDataShow.attributes.meliOrder.attributes.shipping_neighborhood: 'No definido'}}</span>
                    <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">{{orderDataShow.attributes.linioOrder.attributes.shipping_neighborhood!=null?orderDataShow.attributes.linioOrder.attributes.shipping_neighborhood:'No definido'}}</span>
                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.is_from_meli_flag">

                    <span class="details-title-item">Ciudad: </span>

                    <span class="details-title-item">{{orderDataShow.attributes.meliOrder.attributes.shipping_city != null ? orderDataShow.attributes.meliOrder.attributes.shipping_city: 'No definido'}}</span>

                  </div>

                </div>
                <div class="details-content-info" v-else>

                  <div class="details-title-block" >

                    <span class="details-title-item" >Método de entrega: </span>
                    <span class="details-title-item">Recojo en oficina</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          <div class="details-content" >

            <div id="accordion">

              <div class="details-content-title collapsed " id="headingorder" data-toggle="collapse" data-target="#collapseorder" aria-expanded="false" aria-controls="collapseorder">

                <span>Datos de compra</span>

                <div class="details-text up-arrow"></div>

              </div>

              <div id="collapseorder" class="collapse" aria-labelledby="headingorder"><!--data-parent="#accordion"-->

                <div class="details-content-info">

                  <div class="details-title-block" v-if="orderDataShow.attributes.is_from_grabr_flag">

                    <span class="details-title-item">ID de chat en Grabr:</span>

                    <span class="details-title-item">{{orderDataShow.attributes.is_from_grabr_flag ? orderDataShow.attributes.grabrOrder.attributes.grabr_chat_link: ''}}</span>

                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.is_from_grabr_flag">

                    <span class="details-title-item">Link de compra propuesta en Grabr:</span>

                    <span class="details-title-item">{{ orderDataShow.attributes.grabrOrder.attributes.grabr_purchase_link!==null?orderDataShow.attributes.grabrOrder.attributes.grabr_purchase_link:"No definido"}}</span>

                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.is_from_linio_flag">

                    <span class="details-title-item">Link de compra propuesta en Linio:</span>

                    <span class="details-title-item">{{ orderDataShow.attributes.linioOrder.attributes.linio_purchase_link!==null?orderDataShow.attributes.linioOrder.attributes.linio_purchase_link:"No definido"}}</span>

                  </div>

                  <div class="details-title-block" v-else-if="orderDataShow.attributes.is_from_meli_flag">

                    <span class="details-title-item">Link de compra propuesta en Mercado Libre:</span>

                    <!-- <span class="details-title-item">{{ orderDataShow.attributes.meliOrder.attributes.meli_purchase_link!==null?orderDataShow.attributes.meliOrder.attributes.meli_purchase_link:"No definido"}}</span> -->

                  <span id="order-code" class="code-order grabr-code enlace color"   v-if="orderDataShow.attributes.is_from_meli_flag">{{orderDataShow.attributes.meliOrder.attributes.seller_sku}}</span>
                  </div>

                  <div class="details-title-block">

                    <span class="details-title-item">Link de compra final:</span>

                    <span class="details-title-item"><a :href="orderDataShow.attributes.real_purchase_link !==null?orderDataShow.attributes.real_purchase_link:'No definido'" target="_blank">{{ orderDataShow.attributes.real_purchase_link !==null?orderDataShow.attributes.real_purchase_link:"No definido"}}</a></span>

                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.travel_number">

                    <span class="details-title-item">ID de viaje en Grabr:</span>

                    <span class="details-title-item"><a :href="'https://grabr.io/es/trips/'+orderDataShow.attributes.grabrOrder.attributes.travel_number" target="_blank">{{ orderDataShow.attributes.grabrOrder.attributes.travel_number}}</a></span>

                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.grabr_account">

                    <span class="details-title-item">Cuenta de Grabr:</span>

                    <span class="details-title-item">{{ orderDataShow.attributes.grabrOrder.attributes.grabr_account}}</span>

                  </div>

                  <div class="details-title-block" v-else-if="orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.linio_account">

                    <span class="details-title-item">Cuenta de Linio:</span>

                    <span class="details-title-item">{{ orderDataShow.attributes.linioOrder.attributes.linio_account}}</span>

                  </div>

                  <div class="details-title-block" v-else-if="orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.meli_account">

                    <span class="details-title-item">Cuenta de Mercado Libre:</span>

                    <span class="details-title-item">{{ orderDataShow.attributes.meliOrder.attributes.meli_account}}</span>

                  </div>

                  <div class="details-title-block">

                    <span class="details-title-item">Ciudad de origen:</span>

                    <span class="details-title-item">{{orderDataShow.attributes.origin!=undefined?orderDataShow.attributes.origin.attributes.name:"No definido (*)"}}</span>

                  </div>

                  <div class="details-title-block">

                    <span class="details-title-item">Ciudad de destino:</span>

                    <span class="details-title-item">{{orderDataShow.attributes.destination!=undefined?orderDataShow.attributes.destination.attributes.name:"No definido (*)"}}</span>

                  </div>

                  <div class="details-title-block">

                    <span class="details-title-item">Fecha de llegada al origen:</span>

                    <span class="details-title-item" v-if="orderDataShow.attributes.promised_origin_arrival_date!=null">{{orderDataShow.attributes.promised_origin_arrival_date|spanishDate}}</span>

                    <span class="details-title-item" v-else>No definido</span>

                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.real_origin_arrival_date!=null">

                    <span class="details-title-item">Fecha real de llegada al origen:</span>

                    <span class="details-title-item">{{orderDataShow.attributes.real_origin_arrival_date|spanishDate}}</span>

                  </div>

                  <div class="details-title-block">

                    <span class="details-title-item">Fecha de llegada al cliente:</span>

                    <span class="details-title-item">{{orderDataShow.attributes.promised_delivery_date|spanishDate}}</span>

                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.real_delivery_date!=null">

                    <span class="details-title-item">Fecha real de llegada al cliente:</span>

                    <span class="details-title-item">{{orderDataShow.attributes.real_delivery_date|spanishDate}}</span>

                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.carrier_name!=null">

                    <span class="details-title-item">Transportista:</span>

                    <span class="details-title-item">{{orderDataShow.attributes.carrier_name}}</span>

                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.shopping_order_number!=null">

                    <span class="details-title-item">Número de compra:</span>

                    <span class="details-title-item">{{orderDataShow.attributes.shopping_order_number}}</span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          <div class="details-content">

            <div id="accordion">

              <div class="details-content-title collapsed " id="headingclient" data-toggle="collapse" data-target="#collapsePago" aria-expanded="false" aria-controls="collapseclient">
                <span>Datos de Pago</span>

                <div class="details-text up-arrow"></div>

              </div>

              <div id="collapsePago" class=" collapse" aria-labelledby="headingclient"><!--data-parent="#accordion"-->

                <div class="details-content-info">

                  <div class="details-title-block" >
                    <span class="details-title-item" >Fecha de aprobación:</span>
                    <span class="details-title-item" v-if="orderDataShow.attributes.is_from_meli_flag" >{{orderDataShow.attributes.meliOrder.attributes.payment_date_approved}} </span>
                    <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">{{orderDataShow.attributes.linioOrder.attributes.linio_offer_date}} </span>
                  </div>

                  <div class="details-title-block">
                    <span class="details-title-item">Método de pago:</span>
                    <span class="details-title-item" v-if="orderDataShow.attributes.is_from_meli_flag" >{{orderDataShow.attributes.meliOrder.attributes.payment_method}} </span>
                    <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">{{orderDataShow.attributes.linioOrder.attributes.payment_method}} </span>
                  </div>

                  <div class="details-title-block" v-if="orderDataShow.attributes.is_from_meli_flag" >
                    <span class="details-title-item">Tipo de pago:</span>
                    <span class="details-title-item" >{{orderDataShow.attributes.meliOrder.attributes.payment_type}} </span>
                  </div>

                  <div class="details-title-block" >
                    <span class="details-title-item">Monto de pago:</span>
                    <span class="details-title-item" v-if="orderDataShow.attributes.is_from_meli_flag" >S/ {{orderDataShow.attributes.meliOrder.attributes.meli_price}} </span>
                    <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag" >S/ {{orderDataShow.attributes.linioOrder.attributes.linio_price}} </span>
                  </div>

                </div>

              </div>

            </div>

          </div>



          <div class="details-title-separator">
            <span>Comentarios</span>
          </div>

          <div class="details-content" v-if="true">

            <div class="details-content-comments" v-if="!(orderDataShow.attributes.cancelled == 1 && orderDataShow.attributes.status == 10)">

              <textarea type="text"
                v-model="currentContent"
                aria-describedby="email"
                class="form-control"
                :maxlength="1000"
                :disabled="!createCommentFlag"
                rows="1"
                placeholder="Deja tu comentario...">

              </textarea>

              <div class="text-right">

                <div class="btn-wrap" v-if="currentContent!=''">
                  <button class="btn btn-primary btn-block btn-round" @click="createComment">Enviar</button>
                </div>

                <div class="btn-wrap" v-else>
                  <button class="btn btn-primary btn-block btn-round">Enviar</button>
                </div>

              </div>

            </div>

              <comment-component
                v-for="(comment,index) in comments  "
                :key="index"
                v-bind:comment="comment"
                v-bind:orderCancelledFlag="orderDataShow.attributes.status==10 && orderDataShow.attributes.cancelled == 1"
                @in-edition="disableEditComments"
                @cancel-edition="enableEditComments"
                @display-comments="displayComments"
                @comment-deleted="displayComments"
              ></comment-component>

          </div>

        </div>

        <div class="nm n-2" id="fixedElement">

          <div class="details-content ">

            <div class="details-title-container">

              <div class="details-title-block details-summary-item">

                <div class="details-title-item">

                  <span v-if="orderDataShow.attributes.is_from_grabr_flag">Precio Grabr</span>

                  <span v-else-if="orderDataShow.attributes.is_from_linio_flag">Precio linio</span>

                  <span v-else-if="orderDataShow.attributes.is_from_meli_flag">Precio Mercado Libre</span>

                  <span v-else>Precio</span>

                  <div class="dropdown show help-q">

                    <img  src="/static/img/info-q.svg" alt="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    <div class="dropdown-menu sendi-tool" aria-labelledby="dropdownMenuLink">

                      <div class="sendi-tool-content">

                        <span class="link-tool">

                            <span class="link-tool-title">Precio</span>

                        </span>

                        <span class="link-tool" >

                            <span class="link-tool-subtitle">This device is carrier-unlocked and should work fully with the carriers</span>

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                <span class="details-title-item" v-if="orderDataShow.attributes.is_from_grabr_flag">$ {{orderDataShow.attributes.grabrOrder.attributes.grabr_price|currency}}</span>

                <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">S/ {{orderDataShow.attributes.linioOrder.attributes.linio_price|currency}}</span>

                <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">S/ +{{orderDataShow.attributes.meliOrder.attributes.meli_price|currency}}</span>

                <span class="details-title-item" v-else>$ {{totalPrice|currency}}</span>

              </div>

              <div v-if="orderDataShow.attributes.is_from_grabr_flag" class="details-title-block details-summary-item">

                <div class="details-title-item">

                  <span>Impuesto Grabr</span>

                  <div class="dropdown show help-q">

                    <img  src="/static/img/info-q.svg" alt="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    <div class="dropdown-menu sendi-tool" aria-labelledby="dropdownMenuLink">

                      <div class="sendi-tool-content">

                        <span class="link-tool">

                            <span class="link-tool-title">Impuesto</span>

                        </span>

                        <span class="link-tool" >

                            <span class="link-tool-subtitle">This device is carrier-unlocked and should work fully with the carriers</span>

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                <span class="details-title-item">{{orderDataShow.attributes.grabrOrder.attributes.grabr_tax|currency}}</span>

              </div>

              <div v-else-if="isDirect && orderDataShow.attributes.real_tax!=null" class="details-title-block details-summary-item">

                <div class="details-title-item">

                  <span>Impuesto</span>

                  <div class="dropdown show help-q">

                    <img  src="/static/img/info-q.svg" alt="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    <div class="dropdown-menu sendi-tool" aria-labelledby="dropdownMenuLink">

                      <div class="sendi-tool-content">

                        <span class="link-tool">

                            <span class="link-tool-title">Impuesto</span>

                        </span>

                        <span class="link-tool" >

                            <span class="link-tool-subtitle">This device is carrier-unlocked and should work fully with the carriers</span>

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                <span class="details-title-item">$ {{orderDataShow.attributes.real_tax|currency}}</span>

              </div>

              <div v-if="orderDataShow.attributes.is_from_grabr_flag" class="details-title-block details-summary-item">

                <div class="details-title-item">

                  <span>Recompensa Grabr</span>

                  <div class="dropdown show help-q">

                    <img  src="/static/img/info-q.svg" alt="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    <div class="dropdown-menu sendi-tool" aria-labelledby="dropdownMenuLink">

                      <div class="sendi-tool-content">

                        <span class="link-tool">

                            <span class="link-tool-title">Recompensa Grabr</span>

                        </span>

                        <span class="link-tool" >

                            <span class="link-tool-subtitle">This device is carrier-unlocked and should work fully with the carriers</span>

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                <span class="details-title-item">$ {{orderDataShow.attributes.grabrOrder.attributes.grabr_fee|currency}}</span>

              </div>

              <div v-else-if="isDirect && orderDataShow.attributes.real_shipping!=null" class="details-title-block details-summary-item">

                <div class="details-title-item">

                  <span>Costo de envío</span>

                  <div class="dropdown show help-q">

                    <img  src="/static/img/info-q.svg" alt="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    <div class="dropdown-menu sendi-tool" aria-labelledby="dropdownMenuLink">

                      <div class="sendi-tool-content">

                        <span class="link-tool">

                            <span class="link-tool-title">Costo de envío</span>

                        </span>

                        <span class="link-tool" >

                            <span class="link-tool-subtitle">This device is carrier-unlocked and should work fully with the carriers</span>

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                <span class="details-title-item">$ {{orderDataShow.attributes.real_shipping|currency}}</span>

              </div>

              <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag">

                <div class="details-title-item">

                  <span>Adeudo</span>

                  <div class="dropdown show help-q">

                    <img  src="/static/img/info-q.svg" alt="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    <div class="dropdown-menu sendi-tool" aria-labelledby="dropdownMenuLink">

                      <div class="sendi-tool-content">

                        <span class="link-tool">

                            <span class="link-tool-title">Adeudo</span>

                        </span>

                        <span class="link-tool" >

                            <span class="link-tool-subtitle">This device is carrier-unlocked and should work fully with the carriers</span>

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                <span class="details-title-item">${{orderDataShow.attributes.grabrOrder.attributes.debit|currency }}</span>

              </div>

              <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag">

                <a class="adeudo" v-if ="orderDataShow.attributes.grabrOrder.attributes.debit_url!=null"  :href="orderDataShow.attributes.grabrOrder.attributes.debit_url" target="_blank">
                  <button  class="btn  btn-lg btn-block btn-adeudo" >Pagar con<img class="paypal-img"  src="/static/img/paypal.svg" height="30" alt="USA flag"></button>
                </a>

              </div>

              <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag">

                <a class="adeudo" v-if ="orderDataShow.attributes.linioOrder.attributes.debit_url!=null"  :href="orderDataShow.attributes.linioOrder.attributes.debit_url" target="_blank">
                  <button  class="btn  btn-lg btn-block btn-adeudo" >Pagar con<img class="paypal-img"  src="/static/img/paypal.svg" height="30" alt="USA flag"></button>
                </a>

              </div>

              <!--<div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag">

                <div class="details-title-item">

                  <span>Adeudo</span>

                  <div class="dropdown show help-q">

                    <img  src="/static/img/info-q.svg" alt="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    <div class="dropdown-menu sendi-tool" aria-labelledby="dropdownMenuLink">

                      <div class="sendi-tool-content">

                        <span class="link-tool">

                            <span class="link-tool-title">Adeudo</span>

                        </span>

                        <span class="link-tool" >

                            <span class="link-tool-subtitle">This device is carrier-unlocked and should work fully with the carriers</span>

                        </span>

                      </div>

                    </div>

                  </div>

                </div>

                <span class="details-title-item">S/{{orderDataShow.attributes.linioOrder.attributes.debit|currency }}</span>

              </div>-->

              <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">
                <span class="details-title-item">Comisión (9%)</span>
                <span v-if="orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ -{{0.09 * totalPrice|currency}}</span>
              </div>

            </div>

            <div class="details-title-container" v-if="orderDataShow.attributes.is_from_meli_flag">
              <div class="details-title-block details-summary-item">
                <span class="details-title-item">Rebate Bruto</span>
                <span v-if="orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ +{{orderDataShow.attributes.meliOrder.attributes.rebate!=null?orderDataShow.attributes.meliOrder.attributes.rebate:0|currency}}</span>
              </div>
              <div class="details-title-block details-summary-item">
                <span class="details-title-item">Comisión Rebate (9%)</span>
                <span v-if="orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ -{{0.09 * orderDataShow.attributes.meliOrder.attributes.rebate|currency}}</span>
              </div>
              <div class="details-title-block details-summary-item">
                <span class="details-title-item">REBATE NETO</span>
                <span v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ {{orderDataShow.attributes.meliOrder.attributes.rebate - (0.09 * orderDataShow.attributes.meliOrder.attributes.rebate)|currency}}</span>
              </div>
            </div>

            <div class="details-title-container">

              <div class="details-title-block details-summary-item">
                <div class="details-title-item">
                  <span v-if="orderDataShow.attributes.is_from_grabr_flag">Total Grabr</span>
                  <span v-else-if="orderDataShow.attributes.is_from_linio_flag">Total Linio</span>
                  <span v-else-if="orderDataShow.attributes.is_from_meli_flag">Total Mercado Libre</span>
                  <span v-else>Total</span>
                  <div class="dropdown show help-q">

                    <img  src="/static/img/info-q.svg" alt="" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                    <div class="dropdown-menu sendi-tool" aria-labelledby="dropdownMenuLink">

                      <div class="sendi-tool-content">

                        <span class="link-tool">

                            <span class="link-tool-title">Total</span>

                        </span>

                        <span class="link-tool" >

                            <span class="link-tool-subtitle">This device is carrier-unlocked and should work fully with the carriers</span>

                        </span>

                      </div>

                    </div>

                  </div>
                </div>
                <span v-if="orderDataShow.attributes.is_from_linio_flag" class="details-title-item">S/ {{totalPrice|currency}}</span>
                <span v-else-if="orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ {{totalMeli|currency}}</span>
                <span v-else class="details-title-item">$ {{totalPrice|currency}}</span>
              </div>

              <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_meli_flag">
                <span class="details-title-item">Total comisiones</span>
                <span class="details-title-item">S/ {{totalCommissions|currency}}</span>
              </div>

              <div class="details-title-block summary-block-total details-summary-item" v-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag">

                <span class="details-title-item">Total</span>

                <span class="details-title-item">$ {{orderDataShow.attributes.grabrOrder.attributes.grabr_price+orderDataShow.attributes.grabrOrder.attributes.grabr_tax+orderDataShow.attributes.grabrOrder.attributes.grabr_fee + orderDataShow.attributes.grabrOrder.attributes.debit|currency }}</span>

              </div>

              <div class="details-title-block summary-block-total details-summary-item" v-else-if="orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag">

                <span class="details-title-item">Total</span>

                <span class="details-title-item">S/ {{orderDataShow.attributes.linioOrder.attributes.linio_price + orderDataShow.attributes.linioOrder.attributes.debit|currency }}</span>

              </div>

              <div class="details-title-block summary-block-total details-summary-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">
                <span class="details-title-item">Total</span>
                <span class="details-title-item">S/ {{totalNeto|currency }}</span>
              </div>

              <div v-if="orderDataShow.attributes.payed == 1 && orderDataShow.attributes.status <= 7" class="details-title-container">

                <button type="button" class="btn btn-danger"  @click="confirmPendientOrder()"  >Confirmar pago</button>

              </div>

              <div v-if="orderDataShow.attributes.status <= 7" class="details-title-container">

                <button type="button" class="btn btn-danger"  @click="showModalConfirmation()"  >Cancelar orden</button>

              </div>

            </div>

          </div>

          <!--<div class="details-content" v-if="orderDataShow.attributes.is_from_meli_flag">
            <div class="details-title-container" v-if="orderDataShow.attributes.is_from_meli_flag">
              <div class="details-title-block details-summary-item">
                <span class="details-title-item">Precio Mercado Libre</span>
                <span v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ +{{totalPrice|currency}}</span>
              </div>
              <div class="details-title-block details-summary-item">
                <span class="details-title-item">Comisión (9%)</span>
                <span v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ -{{0.09 * totalPrice|currency}}</span>
              </div>
            </div>

            <div class="details-title-container" v-if="orderDataShow.attributes.is_from_meli_flag">
              <div class="details-title-block details-summary-item">
                <span class="details-title-item">Rebate Bruto</span>
                <span v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ +{{orderDataShow.attributes.meliOrder.attributes.rebate!=null?orderDataShow.attributes.meliOrder.attributes.rebate:0|currency}}</span>
              </div>
              <div class="details-title-block details-summary-item">
                <span class="details-title-item">Comisión Rebate (9%)</span>
                <span v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ -{{0.09 * orderDataShow.attributes.meliOrder.attributes.rebate|currency}}</span>
              </div>
              <div class="details-title-block details-summary-item">
                <span class="details-title-item">REBATE NETO</span>
                <span v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ {{orderDataShow.attributes.meliOrder.attributes.rebate - (0.09 * orderDataShow.attributes.meliOrder.attributes.rebate)|currency}}</span>
              </div>
            </div>

            <div class="details-title-container" v-if="orderDataShow.attributes.is_from_meli_flag">
              <div class="details-title-block details-summary-item">
                <span class="details-title-item">Total Mercado Libre</span>
                <span v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ {{totalMeli|currency}}</span>
              </div>
              <div class="details-title-block details-summary-item">
                <span class="details-title-item">Total comisiones</span>
                <span v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ {{totalCommissions|currency}}</span>
              </div>
              <div class="details-title-block summary-block-total details-summary-item">
                <span class="details-title-item">TOTAL</span>
                <span v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="details-title-item">S/ {{totalNeto|currency}}</span>
              </div>
            </div>
          </div>-->

        </div>

      </div>

      <b-modal
        hide-footer
        hide-header
        centered
        id="modalAuthorizeReposition"
        ref="modalAuthorizeReposition"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Autorización de reposición del paquete</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              block
              @click="hideModalAuthorizeReposition"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body" id="modal-body">
            <label for class="float-left">
              ¿Desea autorizar la reposición de ejemplares de un paquete a otro en la presente orden de compra?

            </label>
            <input type="radio" id="one" value="1" v-model="authorizationOption">
            <label for="one">Sí</label>

            <input type="radio" id="two" value="2" v-model="authorizationOption">
            <label for="two">No</label>
            <br><br>
            <span>Opción elegida: {{ authorizationOption }}</span>
            <button  @click= "authorizeReposition" >Enviar decisión</button>

          </div>

        </div>

      </b-modal>

      <b-modal
        v-if="orderDataShow.attributes.reposition.attributes.used_items!= null && orderDataShow.attributes.reposition.attributes.used_items > 0"
        hide-footer
        hide-header
        id="modalRepositionDetail"
        ref="modalRepositionDetail"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Detalle de reposición</h5>
          </div>

          <div class="modal-body modal-scroll" id="modal-body">
            <span>
              <b>Items totales en la reposición: {{orderDataShow.attributes.reposition.attributes.used_items}}</b>
            </span>
            <br>
            <span>Items pendientes de reposición: {{orderDataShow.attributes.reposition.attributes.pendient_items}}</span>
            <br>
            <span>Items repuestos: {{orderDataShow.attributes.reposition.attributes.used_items-orderDataShow.attributes.reposition.attributes.pendient_items}}</span>
            <br>
            <p
              v-if="orderDataShow.attributes.reposition.attributes.child_id!=null"
            >Ver reposición de items nuevamente incidentados en reposición de ID: {{orderDataShow.attributes.reposition.attributes.child_id}}</p>
            <hr>
            <span>Incidencias por cantidades menores a lo solicitado:</span>

            <ul>
              <li v-for="packageRepo of packageRepositions" :key="packageRepo.id">
                <span>ID Paquete</span>
                <p>{{packageRepo.package_id}}</p>

                <span>ID Incidente</span>
                <p>{{packageRepo.attributes.different_quantity_incident.attributes.packageIncident.id}}</p>
                <span>Items que debieron ser correctos</span>
                <p>{{packageRepo.attributes.quantity+packageRepo.attributes.different_quantity_incident.attributes.correct_items}}</p>
                <span>Items realmente correctos</span>
                <p>{{packageRepo.attributes.different_quantity_incident.attributes.correct_items}}</p>
                <span>Items en déficit</span>
                <p>{{packageRepo.attributes.quantity}}</p>
                <span>Enlace a embarque que perteneció el paquete:</span>
                <p>Enlace a embarque de ID {{packageRepo.attributes.different_quantity_incident.attributes.packageIncident.attributes.package.attributes.boarding_id}}</p>
              </li>
            </ul>
          </div>
        </div>
      </b-modal>

      <b-modal hide-footer hide-header centered id="modalConfirmationReposition" ref="modalConfirmationReposition">
      <div class="modal-Content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Confirmar acción:</h5>
          <button type="button" class="close" aria-label="Close" @click="hideModalConfirmationReposition">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="modal-body">
          <div class="text-center">
            <p>¿Estás seguro que deseas completar esta acción?</p>
          </div>
        </div>

        <div class="modal-footer text-center">
          <button type="button" class="btn btn-primary btn-lg" @click="authorizeReposition()">Aceptar</button>
          <button
            type="button"
            class="btn btn-primary btn-lg"
            @click="hideModalConfirmationReposition()"
          >Cancelar</button>
        </div>
      </div>
      </b-modal>

      <b-modal hide-footer hide-header centered id="modalReevaluation" ref="modalReevaluation">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Evaluación de la orden de compra</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hideModalReevaluetion"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-tab">
            <ul class="nav nav-pills nav-fill" id="myTab" role="tablist">
              <li class="nav-item">
                <a
                  v-if="flagFormEvaluetionPurchaseOrder != 'toFill'"
                  class="nav-link"
                  :class="{active: controllSwithPurchaseOrder == 1}"
                  @click="modalControllPurchaseOrder(2)"
                >Datos web</a>
                <p
                  v-if="flagFormEvaluetionPurchaseOrder == 'toFill'"
                  class="nav-link active"
                >Datos web</p>
              </li>

              <li class="nav-item">
                <a
                  v-if="flagFormEvaluetionPurchaseOrder != 'toFill'"
                  class="nav-link"
                  :class="{active: controllSwithPurchaseOrder == 2}"
                  @click="modalControllPurchaseOrder(2)"
                >Datos reales</a>
                <p
                  v-if="flagFormEvaluetionPurchaseOrder == 'toFill'"
                  class="nav-link inactive"
                >Datos reales</p>
              </li>
            </ul>
          </div>

          <div class="modal-body modal-scroll modal-tabs" id="modal-body">
            <div class="form-login">
              <div class="tab-content" id="myTabContent">
                <div v-if="controllSwithPurchaseOrder == 1">
                  <div v-if="flagFormEvaluetionPurchaseOrder == 'toFill'">
                    <div class="form-group">
                      <label v-if ="!orderDataShow.attributes.is_from_linio_flag || !orderDataShow.attributes.is_from_meli_flag" for class="float-left">Precio de la web (USD)</label>
                      <label v-else for class="float-left">Precio de la web (USD)</label>
                      <input
                        class="form-control null sen-form-input-with-tooltip"
                        name="precio_web"
                        v-model="costGrabr"
                        @keyup="setTaxGrabr()"
                        v-validate="{required: controllSwithPurchaseOrder==1 && flagFormEvaluetionPurchaseOrder == 'toFill' && readyToProcessIncompleteData!=true  && this.orderDataShow.attributes.status != 3}"
                        v-floatonly
                        :maxlength="7"
                      >

                      <div class="sen-tooltip sen-tooltip-modal">
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                      </div>

                      <span
                        v-show="errors.has('precio_web')"
                        class="text-danger"
                      >{{ errors.first('precio_web') }}</span>
                    </div>

                    <div class="form-group">
                      <div style="display: flex;width: 390px;">
                        <label v-if="!orderDataShow.attributes.is_from_linio_flag || !orderDataShow.attributes.is_from_meli_flag" for class="float-left">Impuesto de la web (USD)</label>
                        <label v-else for class="float-left">Impuesto de la web (USD)</label>
                        <label style="font-style: italic;
                              font-size:12px;
                              cursor:pointer;
                              color: cornflowerblue;
                              text-decoration: underline"
                          @click="resetImpuestoWeb">(Limpiar campos)</label>
                      </div>
                      <input
                        type="text"
                        aria-describedby="email"
                        name="impuesto_web"
                        class="form-control null sen-form-input-with-tooltip"
                        v-validate ="{required: this.controllSwithPurchaseOrder==1 && this.flagFormEvaluetionPurchaseOrder == 'toFill' && this.readyToProcessIncompleteData!=true && this.orderDataShow.attributes.status != 3}"
                        v-model="taxGrabr"
                        v-floatonly
                        :maxlength="7"
                      >

                      <div class="sen-tooltip sen-tooltip-modal">
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                      </div>

                      <span
                        v-show="errors.has('impuesto_web')"
                        class="text-danger"
                      >{{ errors.first('impuesto_web') }}</span>
                    </div>

                    <div class="form-group">
                      <label v-if="!orderDataShow.attributes.is_from_linio_flag || !orderDataShow.attributes.is_from_meli_flag" for class="float-left">Costo de envío de la web (USD)</label>
                      <label v-else for class="float-left">Costo de envío de la web (USD)</label>
                      <input
                        type="text"
                        aria-describedby="email"
                        name="costo_envio_web"
                        class="form-control null sen-form-input-with-tooltip"
                        v-validate="{required: controllSwithPurchaseOrder==1 && flagFormEvaluetionPurchaseOrder == 'toFill' && readyToProcessIncompleteData!=true && this.orderDataShow.attributes.status != 3}"
                        v-model="shippingGrabr"
                        v-floatonly
                      >

                      <div class="sen-tooltip sen-tooltip-modal">
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                      </div>

                      <span
                        v-show="errors.has('costo_envio_web')"
                        class="text-danger"
                      >{{ errors.first('costo_envio_web') }}</span>
                    </div>

                    <div class="form-group adeudo-cal" v-if="orderDataShow.attributes.is_from_grabr_flag">
                      <label for class="float-left">

                        <a
                          class="adeudo-link"
                          :href="'http://paypal.me/EnviosDeUsa/'+Number(Math.round( parseFloat(debitCalculated*1.07) +'e2')+'e-2').toFixed(2).toString()"
                          target="_blank"
                        >Adeudo calculado (USD) : {{Number(Math.round( parseFloat(debitCalculated) +'e2')+'e-2').toFixed(2)}}</a>
                      </label>

                    </div>
                    <!--<div class="form-group adeudo-cal" v-else-if="orderDataShow.attributes.is_from_linio_flag">
                      <label for class="float-left">

                        <a
                          class="adeudo-link"
                          :href="'http://paypal.me/EnviosDeUsa/'+Number(Math.round( parseFloat(debitCalculated*1.07) +'e2')+'e-2').toFixed(2).toString()"
                          target="_blank"
                        >Adeudo calculado (S/) : {{Number(Math.round( parseFloat(debitCalculated) +'e2')+'e-2').toFixed(2)}}</a>
                      </label>

                    </div>-->

                    <div class="form-group">
                      <label for class="float-left">Unidades de peso</label>
                      <select
                        class="form-control form-control-lg sen-form-input-with-tooltip"
                        name="unidad_peso"
                        v-validate="{required: controllSwithPurchaseOrder==1 && flagFormEvaluetionPurchaseOrder == 'toFill' && readyToProcessIncompleteData!=true &&  this.orderDataShow.attributes.status != 3}"
                        v-model="unitWeight"
                      >
                        <option disabled value>Seleccionar</option>
                        <option
                          :value="units"
                          v-for="units of listUnits"
                          :key="units.id"
                        >{{units.attributes.name}}</option>
                      </select>

                      <div class="sen-tooltip sen-tooltip-modal">
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                      </div>

                      <span
                        v-show="errors.has('unidad_peso')"
                        class="text-danger"
                      >{{ errors.first('unidad_peso') }}</span>
                    </div>

                    <div class="form-group">
                      <label for class="float-left">Peso de la orden</label>
                      <input
                        aria-describedby="email"
                        name="peso_orden"
                        class="form-control null sen-form-input-with-tooltip"
                        v-validate="{required: controllSwithPurchaseOrder==1 && flagFormEvaluetionPurchaseOrder == 'toFill' && readyToProcessIncompleteData!=true  && this.orderDataShow.attributes.status != 3}"
                        v-model="weightGrabr"
                        v-floatonly
                        :maxlength="8"
                      >

                      <div class="sen-tooltip sen-tooltip-modal">
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                      </div>
                      <span
                        v-show="errors.has('peso_orden')"
                        class="text-danger"
                      >{{ errors.first('peso_orden') }}</span>
                    </div>
                  </div>
                  <div v-if="flagFormEvaluetionPurchaseOrder == 'toShow'">
                    <div class="form-group">
                      <label v-if="!orderDataShow.attributes.is_from_linio_flag || !orderDataShow.attributes.is_from_meli_flag" for class="float-left">Precio de la web (USD)</label>
                      <label v-else for class="float-left">Precio de la web (USD)</label>
                      <input class="form-control null" v-model="costGrabr" disabled>
                    </div>

                    <div class="form-group">
                      <label v-if="!orderDataShow.attributes.is_from_linio_flag || !orderDataShow.attributes.is_from_meli_flag" for class="float-left">Impuesto de la web (USD)</label>
                      <label v-else for class="float-left">Impuesto de la web (USD)</label>
                      <input type="text" class="form-control null" v-model="taxGrabr" disabled>
                    </div>

                    <div class="form-group">
                      <label v-if="!orderDataShow.attributes.is_from_linio_flag || !orderDataShow.attributes.is_from_meli_flag" for class="float-left">Costo de envío de la web (USD)</label>
                      <label v-else for class="float-left">Costo de envío de la web (USD)</label>

                      <input type="text" class="form-control null" v-model="shippingGrabr" disabled>
                    </div>

                    <!--<div class="form-group">
                      <label
                        v-if="!orderDataShow.attributes.is_from_linio_flag"
                        for
                        class="float-left"
                      >Adeudo calculado (USD) : {{Number(Math.round( parseFloat(debitCalculated) +'e2')+'e-2').toFixed(2)}}</label>
                      <label
                        v-else
                        for
                        class="float-left"
                      >Adeudo calculado (S/) : {{Number(Math.round( parseFloat(debitCalculated) +'e2')+'e-2').toFixed(2)}}</label>
                    </div>-->

                    <div class="form-group">
                      <label for class="float-left">Unidades de peso</label>
                      <select
                        class="form-control form-control-lg sen-form-input-with-tooltip"
                        v-model="unitWeight.attributes.name"
                        disabled
                      >
                        <option selected>{{unitWeight.attributes.name}}</option>
                      </select>

                      <div class="sen-tooltip sen-tooltip-modal">
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for class="float-left">Peso de la orden</label>
                      <input class="form-control null" v-model="weightGrabr" disabled>
                    </div>
                  </div>
                </div>

                <div v-if="controllSwithPurchaseOrder == 2">
                  <div class="form-group">
                    <label v-if="!orderDataShow.attributes.is_from_linio_flag || !orderDataShow.attributes.is_from_meli_flag" for class="float-left">Precio real (USD)</label>
                    <label v-else  for class="float-left">Precio real (USD)</label>
                    <input
                      aria-describedby="email"
                      name="costo_real"
                      class="form-control null sen-form-input-with-tooltip"
                      v-validate="{required: controllSwithPurchaseOrder == 2 && flagFormEvaluetionPurchaseOrder == 'toShow'}"
                      @keyup="setTaxReal()"
                      v-model="CostReal"
                      v-floatonly
                      :maxlength="7"
                    >

                    <div class="sen-tooltip sen-tooltip-modal">
                      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                    </div>

                    <span
                      v-show="errors.has('costo_real')"
                      class="text-danger"
                    >{{ errors.first('costo_real') }}</span>
                  </div>

                  <div class="form-group">
                    <input type="checkbox" id="rewardFlag" v-model="rewardFlag" v-on:click="cambiarReward()">

                    <label for class="reward-label">Ingresar Reward / Discount</label>

                    <div class="sen-tooltip sen-tooltip-modal">
                      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                    </div>
                  </div>

                  <div class="form-group" v-if="rewardFlag">
                    <label v-if="!orderDataShow.attributes.is_from_linio_flag || !orderDataShow.attributes.is_from_meli_flag" for class="float-left">Reward / Discount (USD)</label>
                    <label v-else for class="float-left">Reward / Discount (S/)</label>
                    <input
                      id="email"
                      name="rewardDiscount"
                      v-validate="{required: controllSwithPurchaseOrder == 2 && flagFormEvaluetionPurchaseOrder == 'toShow'}"
                      aria-describedby="email"
                      class="form-control null sen-form-input-with-tooltip"
                      v-model="rewardDiscount"
                      v-floatonly
                      :maxlength="7"
                      @keyup="setTaxReal()"
                    >

                    <div class="sen-tooltip sen-tooltip-modal">
                      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                    </div>
                  </div>

                  <div class="form-group">
                    <div style="display: flex;width: 310px;">
                      <label v-if="!orderDataShow.attributes.is_from_linio_flag || !orderDataShow.attributes.is_from_meli_flag" for class="float-left">Impuesto real (USD)</label>
                      <label v-else for class="float-left">Impuesto real (USD)</label>
                      <label style="font-style: italic;
                                font-size:12px;
                                cursor:pointer;
                                color: cornflowerblue;
                                text-decoration: underline"
                            @click="resetImpuestoReal">(Limpiar campos)</label>
                      </div>
                      <input
                        id="email"
                        name="real_tax"
                        v-validate="{required: controllSwithPurchaseOrder == 2 && flagFormEvaluetionPurchaseOrder == 'toShow'}"
                        aria-describedby="email"
                        class="form-control null sen-form-input-with-tooltip"
                        v-model="TaxReal"
                        v-floatonly
                        :maxlength="7"
                      >

                    <div class="sen-tooltip sen-tooltip-modal">
                      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                    </div>

                    <span
                      v-show="errors.has('real_tax')"
                      class="text-danger"
                    >{{ errors.first('real_tax') }}</span>
                  </div>

                  <div class="form-group">
                    <label v-if="!orderDataShow.attributes.is_from_linio_flag || !orderDataShow.attributes.is_from_meli_flag" for class="float-left">Costos de envío real (USD)</label>
                    <label v-else for class="float-left">Costos de envío real (USD)</label>
                    <input
                      id="email"
                      name="real_delivery_cost"
                      v-validate="{required: controllSwithPurchaseOrder == 2 && flagFormEvaluetionPurchaseOrder == 'toShow'}"
                      aria-describedby="email"
                      class="form-control null sen-form-input-with-tooltip"
                      v-model="shippingReal"
                      v-floatonly
                      :maxlength="7"
                    >

                    <div class="sen-tooltip sen-tooltip-modal">
                      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                    </div>

                    <span
                      v-show="errors.has('real_delivery_cost')"
                      class="text-danger"
                    >{{ errors.first('real_delivery_cost') }}</span>
                  </div>



                  <div class="form-group">
                    <label for class="float-left">Link de compra final</label>
                    <input
                      type="text"
                      aria-describedby="email"
                      name="link_compra_final"
                      v-validate="{required: this.orderDataShow.attributes.status === 3 && orderDataShow.attributes.is_from_grabr_flag, url:true}"
                      class="form-control null sen-form-input-with-tooltip"
                      :maxlength="200"
                      v-model="finalBuyingLink"
                    >

                    <div class="sen-tooltip sen-tooltip-modal">
                      <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                    </div>

                    <!-- <span
                      v-show="errors.has('real_delivery_cost')"
                      class="text-danger"
                    >{{ errors.first('real_delivery_cost') }}</span>-->
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer text-right">
            <a
              v-if="orderDataShow.attributes.is_from_grabr_flag"
              :href="'https://grabr.io/account/conversations/'+orderDataShow.attributes.grabrOrder.attributes.grabr_chat_link"
              target="_blank"
            >
              <span v-b-popover.hover.top="'Link chat de compra'" class="hiper-eva btn-primary">
                <i class="far fa-comment-dots"></i>
              </span>
            </a>

            <a
              v-if="orderDataShow.attributes.is_from_grabr_flag"
              :href="'https://grabr.io/es/grabs/'+orderDataShow.attributes.grabrOrder.attributes.grabr_order_number"
              target="_blank"
            >
              <span v-b-popover.hover.top="'Link orden de compra'" class="hiper-eva btn-primary">
                <i class="fas fa-shopping-cart"></i>
              </span>
            </a>
            <!--<a
              v-else-if="orderDataShow.attributes.is_from_linio_flag"
              :href="'https://grabr.io/es/grabs/'+orderDataShow.attributes.linioOrder.attributes.linio_order_link"
              target="_blank"
            >
              <span v-b-popover.hover.top="'Link orden de compra'" class="hiper-eva btn-primary">
                <i class="fas fa-shopping-cart"></i>
              </span>
            </a>-->

            <button
              v-if="controllSwithPurchaseOrder == 1"
              class="btn btn-primary btn-lg"
              @click="updateEvaluation"
            >Guardar cambios</button>

            <button
              v-if=" controllSwithPurchaseOrder == 2"
              type="button"
              class="btn btn-primary btn-lg"
              @click="sendEvaluation(id)"
            >Evaluar</button>
            <button
              v-if="controllSwithPurchaseOrder == 1"
              class="btn btn-primary btn-lg"
              @click="modalControllPurchaseOrder(1)"
            >Continuar</button>
          </div>
        </div>
      </b-modal>

      <b-modal hide-footer hide-header centered id="modalProcess" ref="modalProcess">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="orderDataShow.attributes.is_from_grabr_flag" class="modal-title" id="exampleModalLongTitle">Datos de compra adicional de orden Grabr</h5>
            <h5 v-else-if="orderDataShow.attributes.is_from_linio_flag" class="modal-title" id="exampleModalLongTitle">Datos de compra adicional de orden Linio</h5>
            <h5 v-else-if="orderDataShow.attributes.is_from_meli_flag" class="modal-title" id="exampleModalLongTitle">Datos de compra adicional de orden Mercado Libre</h5>

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hideModalProcess"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body modal-scroll" id="modal-body">
            <div class="form-login" id="infoextra">
              <div class="form-group">
                <label for class="float-left">Link de compra final</label>
                <input
                  type="text"
                  aria-describedby="email"
                  name="link_compra_final"
                  v-validate="{required: this.orderDataShow.attributes.status === 3 && orderDataShow.attributes.is_from_grabr_flag && sendProcessFlag , url:this.orderDataShow.attributes.status === 3 && orderDataShow.attributes.is_from_grabr_flag && sendProcessFlag}"
                  class="form-control null sen-form-input-with-tooltip"
                  :maxlength="200"
                  v-model="finalBuyingLink"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('link_compra_final')"
                  class="text-danger"
                >{{ errors.first('link_compra_final') }}</span>
              </div>

              <div class="form-group">
                <label for class="float-left">Código de compra</label>
                <input
                  type="text"
                  aria-describedby="email"
                  name="codigo_compra"
                  v-validate="{required: this.orderDataShow.attributes.status === 3 &&  sendProcessFlag }"
                  class="form-control null sen-form-input-with-tooltip"
                  :maxlength="20"
                  v-model="finalBuyingCode"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('codigo_compra')"
                  class="text-danger"
                >{{ errors.first('codigo_compra') }}</span>
              </div>

              <div class="form-group">
                <div v-if="!otherCarrierFlag">
                  <label for class="float-left">Seleccionar Carrier</label>

                  <select
                    class="form-control form-control-lg sen-form-input-with-tooltip"
                    name="transportista"
                    v-validate="{required: this.orderDataShow.attributes.status === 3 && sendProcessFlag }"
                    v-model="carrier"
                  >
                    <option  :value="''">Selecciona</option>

                    <option
                      :value="`${index}`"
                      v-for="(carrier, index) in carrier_list"
                      :key="`${index}`"
                    >{{carrier.name}}</option>
                  </select>

                  <div class="sen-tooltip sen-tooltip-modal">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                  </div>

                  <a
                    class="link-trans"
                    v-if="false && carrier!='' && carrier_list[carrier].url!='' "
                    :href="carrier_list[carrier].url"
                  >{{carrier_list[carrier].name}}</a>
                </div>

                <div v-else>
                  <label for class="float-left">Ingresa el nombre del transportista</label>

                  <input
                    type="text"
                    aria-describedby="email"
                    name="other_carrier_name"
                    v-validate="{required: this.orderDataShow.attributes.status === 3  && sendProcessFlag }"
                    class="form-control null sen-form-input-with-tooltip"
                    :maxlength="20"
                    v-model="otherCarrierName"
                  >

                  <div class="sen-tooltip sen-tooltip-modal">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <input
                  type="checkbox"
                  class="checkbox-style"
                  id="otherCarrierFlag"
                  v-model="otherCarrierFlag"
                >

                <span class="reward-label">Otro transportista</span>

                <span
                  v-show="errors.has('transportista')"
                  class="text-danger"
                >{{ errors.first('transportista') }}</span>
              </div>

              <div class="form-group">
                <label for class="float-left">Número de tracking</label>
                <input
                  type="text"
                  aria-describedby="email"
                  name="numero_tracking"
                  v-validate="{required: this.orderDataShow.attributes.status === 3 && sendProcessFlag }"
                  class="form-control null sen-form-input-with-tooltip"
                  :maxlength="30"
                  v-model="numberTracking"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('numero_tracking')"
                  class="text-danger"
                >{{ errors.first('numero_tracking') }}</span>
              </div>

              <div class="form-group">
                <label for class="float-left">Fecha de llegada al origen</label>
                <input
                  type="date"
                  aria-describedby="email"
                  name="fecha_llegada_origen"
                  v-validate="{required: this.orderDataShow.attributes.status === 3 && sendProcessFlag }"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="postingDate"
                  max="2100-01-01"
                  min="1900-01-01"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('fecha_llegada_origen')"
                  class="text-danger"
                >{{ errors.first('fecha_llegada_origen') }}</span>
              </div>

              <div class="form-group">
                <label for class="float-left">Seleccionar operador de envío</label>
                <select
                  class="form-control form-control-lg sen-form-input-with-tooltip"
                  name="operador_envio"
                  v-validate="{required: this.orderDataShow.attributes.status === 3 && sendProcessFlag }"
                  v-model="operatorOrigin"
                >
                  <option :value="''">Selecciona</option>
                  <option
                    :value="operator.id"
                    v-for="operator of listOperators"
                    :key="operator.id"
                  >{{operator.attributes.username}} </option>
                </select>

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('operador_envio')"
                  class="text-danger"
                >{{ errors.first('operador_envio') }}</span>
              </div>
            </div>
          </div>

          <div class="modal-footer text-right">
            <button
              class="btn btn-primary btn-lg"
              @click="updateIncompleOrderData"
              :disabled="!readyToSaveIncompleteData"
            >Guardar cambios</button>

            <button type="button" class="btn btn-primary btn-lg" :disabled="!readyToProcessIncompleteData"
              @click="sendProcess(id)">Procesar</button>
          </div>
        </div>
      </b-modal>

      <b-modal hide-footer hide-header centered id="modalProcessNoGrabr" ref="modalProcessNoGrabr">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Datos de compra adicional de orden Direct</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="hideModalProcessNoGrabr"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body modal-scroll" id="modal-body">
            <div class="form-login" id="infoextra">
              <div class="form-group">
                <label for class="float-left">Código de compra</label>
                <input
                  type="text"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  name="codigo_compra"
                  v-validate="{required: this.orderDataShow.attributes.status === 3 && sendProcessFlag }"
                  v-model="finalBuyingCode"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('codigo_compra')"
                  class="text-danger"
                >{{ errors.first('codigo_compra') }}</span>
              </div>

              <div class="form-group">
                <div v-if="!otherCarrierFlag">
                  <label for class="float-left">Seleccionar transportista</label>

                  <select
                    class="form-control form-control-lg sen-form-input-with-tooltip"
                    name="transportista"
                    v-validate="{required: this.orderDataShow.attributes.status === 3 && sendProcessFlag }"
                    v-model="carrier"
                  >
                    <option :value="''">Selecciona</option>

                    <option
                      :value="`${index}`"
                      v-for="(carrier, index) in carrier_list"
                      :key="`${index}`"
                    >{{carrier.name}}</option>
                  </select>

                  <div class="sen-tooltip sen-tooltip-modal">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                  </div>

                  <a
                    class="link-trans"
                    v-if="carrier!=''  "
                    :href="carrier_list[carrier].url"
                  >Enlace a {{carrier_list[carrier].name}}</a>
                </div>

                <div v-else>
                  <label for class="float-left">Ingresa el nombre del transportista</label>

                  <input
                    type="text"
                    aria-describedby="email"
                    name="other_carrier_name"
                    v-validate="{required: this.orderDataShow.attributes.status === 3 && sendProcessFlag }"
                    class="form-control null sen-form-input-with-tooltip"
                    :maxlength="20"
                    v-model="otherCarrierName"
                  >

                  <div class="sen-tooltip sen-tooltip-modal">
                    <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <input
                  type="checkbox"
                  class="checkbox-style"
                  id="otherCarrierFlag"
                  v-model="otherCarrierFlag"
                >

                <span class="reward-label">Otro transportista</span>

                <span
                  v-show="errors.has('transportista')"
                  class="text-danger"
                >{{ errors.first('transportista') }}</span>
              </div>

              <div class="form-group">
                <!-- Acá debería ir el autocompletado o no del tracking  -->
                <label for class="float-left">Número de tracking</label>
                <input
                  type="text"
                  aria-describedby="email"
                  name="numero_tracking"
                  v-validate="{required: this.orderDataShow.attributes.status === 3 && sendProcessFlag }"
                  class="form-control null sen-form-input-with-tooltip"
                  :maxlength="30"
                  v-model="numberTracking"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('numero_tracking')"
                  class="text-danger"
                >{{ errors.first('numero_tracking') }}</span>
              </div>

              <div class="form-group">
                <label for class="float-left">Fecha de llegada al origen</label>
                <input
                  type="date"
                  aria-describedby="email"
                  name="fecha_llegada_origen"
                  v-validate="{required: this.orderDataShow.attributes.status === 3 && sendProcessFlag }"
                  class="form-control null sen-form-input-with-tooltip"
                  max="2100-01-01"
                  min="1900-01-01"
                  v-model="postingDate"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('fecha_llegada_origen')"
                  class="text-danger"
                >{{ errors.first('fecha_llegada_origen') }}</span>
              </div>

              <div class="form-group">
                <label for class="float-left">Fecha de llegada al cliente</label>
                <input
                  type="date"
                  aria-describedby="email"
                  name="fecha_llegada_cliente"
                  v-validate="{required: this.orderDataShow.attributes.status === 3 &&
                                          sendProcessFlag }"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="sendingDate"
                  max="2100-01-01"
                  min="1900-01-01"
                  @change="validar"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('fecha_llegada_cliente')"
                  class="text-danger"
                >{{ errors.first('fecha_llegada_cliente') }}</span>
              </div>

              <div class="form-group">
                <label for class="float-left">Seleccionar operador de envío</label>
                <select
                  class="form-control form-control-lg sen-form-input-with-tooltip"
                  name="operador_envio"
                  v-validate="{required: this.orderDataShow.attributes.status === 3 && sendProcessFlag }"
                  v-model="operatorOrigin"
                >
                  <option :value="''">Selecciona</option>
                  <option
                    :value="operator.id"
                    v-for="operator of listOperators"
                    :key="operator.id"
                  >{{operator.attributes.username}} </option>
                </select>

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('operador_envio')"
                  class="text-danger"
                >{{ errors.first('operador_envio') }}</span>
              </div>
            </div>
          </div>

          <div class="modal-footer text-right">
            <button

              class="btn btn-primary btn-lg"
              @click="updateIncompleOrderData"
              :disabled="!readyToSaveIncompleteData"
            >Guardar cambios</button>
            <button type="button" class="btn btn-primary btn-lg" :disabled="!readyToProcessIncompleteData"
              @click="sendProcess(id)">Procesar</button>
          </div>
        </div>
      </b-modal>

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
              centered
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body modal-scroll modal-correcto text-center">
            <div class="validacion-body">
              <h1></h1>
            </div>
          </div>
          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-success"
              block
              @click="hideModalValidation"
            >Continuar</button>
          </div>
        </div>
      </b-modal>

      <b-modal hide-footer hide-header centered id="cancelOrdermodal" ref="cancelOrdermodal">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle"></h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              block
              @click="hideCancelValidation"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body modal-scroll modal-no-correcto text-center">
            <div class="validacion-body">
              <h1></h1>
            </div>
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
          <div class="modal-body modal-scroll" id="modal-body">
            <div class="text-center">
              <p>Recuerda! Antes de continuar debes de cancelar la orden en Grabr</p>
            </div>
          </div>

          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              @click="cancelatePurchaseOrder(id)"
            >Confirmar</button>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              @click="hideModalConfirmation()"
            >Cancelar</button>
          </div>
        </div>
      </b-modal>
      <!-- ZONA DE TRABAJO -->
      <!-- <b-modal hide-footer hide-header centered id="modalCompleteLinio" ref="modalCompleteLinio">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" >Completar Orden de Coompra Linio </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModalCompleteLinio">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body modal-scroll" id="modal-body">
            <div class="form-login" id="infoextra">
              <div class="form-group">
                <label for class="float-left">Impuesto linio</label>
                <input
                  type="text"
                  aria-describedby="email"
                  name="linio_tax"
                  v-validate="{required: noEvaluationFlag}"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="taxLinio"
                >
                <span
                  v-show="errors.has('linio_tax')"
                  class="text-danger"
                >{{ errors.first('linio_tax') }}</span>
              </div>
              <div class="form-group">
                <label for class="float-left">Recompensa linio</label>
                <input
                  type="text"
                  aria-describedby="email"
                  name="linio_reward"
                  v-validate="{required: noEvaluationFlag}"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="rewardLinio"
                >
                <span
                  v-show="errors.has('linio_reward')"
                  class="text-danger"
                >{{ errors.first('linio_reward') }}</span>
              </div>
              <div class="input-group">



                <select class="form-control form-control-lg sen-form-input-with-tooltip" name="linio_origin_city" v-validate="{required: noEvaluationFlag}" v-model="LinioCityOrigin">
                  <option disabled value>Selecciona</option>
                  <option :value="cityOrigin" v-for="cityOrigin of listCities">{{cityOrigin.attributes.name}}</option>
                </select>

                <div class="sen-tooltip">
                  <span>Es la ciudad origen del embarque</span>
                </div>

                <span v-show="errors.has('linio_origin_city')" class="text-danger">{{ errors.first('linio_origin_city') }}</span>

              </div>
              <div class="input-group">



                <select class="form-control form-control-lg sen-form-input-with-tooltip" name="linio_destiny_city" v-validate="{required: noEvaluationFlag}" v-model="LinioCityDestiny">
                  <option disabled value>Selecciona</option>
                  <option :value="cityDestiny" v-for="cityDestiny of listCities">{{cityDestiny.attributes.name}}</option>
                </select>

                <div class="sen-tooltip">
                  <span>Es la ciudad destino del embarque</span>
                </div>

                <span v-show="errors.has('linio_destiny_city')" class="text-danger">{{ errors.first('linio_destiny_city') }}</span>

              </div>
            </div>
          </div>
          <div class="modal-footer text-right">

          </div>
        </div>
      </b-modal> -->

    </div>

  </div>

</template>

<script>
import breadcrumb from '@/components/prefab/structures/breadcrumb.vue'
import spanish from 'vee-validate/dist/locale/es'
import axios from 'axios'
import resumePurchaseOrder from '@/components/prefab/elements/resume-purchase-order'
import cardEvaluateOrders from "@/components/prefab/items/card-evaluate-orders.vue"
import { ordersService } from '@/services/orders.service'
import { commentsService } from '@/services/comments.service'
import { packagesService } from '@/services/packages.service'
import orderImportantInfo from '@/components/prefab/elements/order-important-info'
import commentComponent from '@/components/prefab/items/comment-component'
import moment from 'moment'

export default {
  components: {
    resumePurchaseOrder,
    breadcrumb,
    orderImportantInfo,
    commentComponent,
    cardEvaluateOrders
  },
  props: ['id', 'orderData'],
  data() {
    return {
      locale: 'en',
      sendProcessFlag :false,
      currentContent: '',
      orderDataShow: null,
      unitWeight: '',
      weightGrabr: '',
      costGrabr: '',
      taxGrabr: '',
      shippingGrabr: '',
      CostReal: '',
      TaxReal: '',
      shippingReal: '',
      finalBuyingLink: '',
      finalBuyingCode: '',
      numberTracking: '',
      postingDate: '',
      sendingDate: '',
      operatorOrigin: '',
      carrier: '',
      otherCarrierName: '',
      listUnits: [],
      listOperators: [],
      flagFormEvaluetionPurchaseOrder: 'toFill',
      controllSwithPurchaseOrder: 1,
      rewardDiscount: '',
      rewardFlag: false,
      packaged: 1,
      otherCarrierFlag: false,
      editPackagedFlag: false,
      packageRepositions: [],
      createCommentFlag : true,
      authorizationOption: null,

      carrier_list: [
        { name: 'FedEx', url: 'https://www.fedex.com/en-us/home.html' },
        { name: 'USPS', url: 'https://tools.usps.com/go/TrackConfirmAction_input'},
        { name: 'UPS', url: 'https://www.ups.com/us/en/Home.page' },
        { name: 'DHL', url: 'https://www.dhl.com/en/express/tracking.html' },
        { name: 'AMAZON_US', url: '' }
      ],
      nameSection: 'Visualizar orden de compra',
      listRoutes: [{ nameRoute: 'Orders', titleRoute: 'Órdenes de compra' }],
      activeRoute: '',
      comments: [],
      packages:[],
      // listCities: [],
      // taxLinio: '0',
      // rewardLinio: '0',
      // LinioCityOrigin: '',
      // LinioCityDestiny : ''
    }
  },
  created() {
    this.$validator.localize('es', {
      messages: spanish.messages,
      attributes: {
        fullname: 'nombre completo',
        document_number: 'número de documento',
        phone_number: 'número de celular',
        price: 'precio',
        tax: 'impuesto',
        product_image: 'imagen del artículo',
        purchase_order_number: 'número de orden de compra',
        product_information: 'información del producto',
        purchase_order_link: 'link de orden de compra',
        purchase_chat_link: 'link de chat de compra',
        purchase_order_date: 'fecha de asignación al viajero',
        origin_city: 'ciudad de origen',
        destination_city: 'ciudad de destino',
        possible_delivery_date: 'fecha posible de entrega',
        precio_web: 'precio de la web',
        impuesto_web: ' impuesto de la web',
        costo_envio_web: 'costo de envío de la web',
        peso_orden: 'peso de la orden',
        unidad_peso: 'unidad de peso',
        costo_real: 'precio real',
        real_tax: 'impuesto real',
        real_delivery_cost: 'costo de envío real',
        link_compra_final: 'link de compra final',
        codigo_compra: 'código de compra',
        numero_tracking: 'número de tracking',
        fecha_llegada_origen: 'fecha de llegada al origen',
        operador_envio: 'operador de envío',
        transportista: 'transportista',
        fecha_llegada_cliente: 'fecha de llegada al cliente',
        // linio_tax: 'taza linio',
        // linio_reward: 'recompensa linio'
      }
    })

    // start with spanish locale.
    this.$validator.localize('es')
    // this.orderDataShow = this.orderData

    console.log('obtendremos de nuevo la data')
    this.inicializeData(this.id, this.setData)
    this.displayComments()

  },
  methods: {
    async authorizeReposition() {
      let data = new Object()
      data.authorized = parseInt(this.authorizationOption) == 1

      this.responseEvaluation = await ordersService.authorizeReposition(
        this.orderDataShow.id,
        data
      )

      this.hideModalConfirmationReposition();
      this.hideModalAuthorizeReposition();

      if(!this.responseEvaluation){
        alert('no se pudo enviar la solicitud');
      }else{
        this.inicializeData(this.id, this.setData)
        // this.refreshPackageSection()
      }
    },
    refreshPackageSection(){
      var accordionElement = document.getElementById("collapseEight")
      console.log(accordionElement);

      accordionElement.setAttribute("class","collapse show")
      packagesService.getPackagesByOrderId(this.id, this.setPackages)
    },
    disablingEvaluationButton(){
      console.log("Vamos a deshabilitar el botón de evaluar")

    },
    getPackages(){
      console.log("entro");

      var accordionElement = document.getElementById("collapseEight")
      console.log(accordionElement)

      var accordionClass = accordionElement.getAttribute('class')
      var isExpanded = accordionClass=='collapse show'
      if (!isExpanded){
        console.log("get packages")
        packagesService.getPackagesByOrderId(this.id, this.setPackages)
      }


    },
    // getListCities(list) {
    //   this.listCities = list
    //
    // },
    inicializeDataFromImportantInfo() {
      this.inicializeData(this.id, this.setData)
    },
    setPackages(retrievedPackages){
      console.log("set packages")

      this.packages =  retrievedPackages
    },

    disableEditComments(exceptId) {
      console.log('No se pueden editar otros comentarios')
      console.log(exceptId)
      this.createCommentFlag = false

      this.comments.forEach(comment => {
        if (comment.id != exceptId) {
          comment.enable = false
        }
      })
    },

    enableEditComments() {
      this.createCommentFlag = true
      this.comments.forEach(comment => {
        comment.enable = true
      })
    },

    displayComments() {
      console.log('En display comments')

      commentsService.listCommentsByOrderId(this.id, this.setComments)
    },
    async createComment(cancelled = 0) {
      let commentData = {}
      if (this.currentContent != '') {
        commentData.content = this.currentContent
        commentData.purchaseorder_id = parseInt(this.id)
        console.log(this.$store.state.user)

        commentData.writer_id = this.$store.state.user.attributes.profile.id
        console.log(commentData)
        if (cancelled == 1) commentData.cancelled = 1

        let res = await commentsService.createComment(commentData)

        if (res) {
          this.currentContent = ''
          this.displayComments()
        }
      }
    },
    setComments(comments) {
      console.log('Estamos en set comments')
      console.log(comments)

      comments.forEach(comment => {
        comment.enable = true
      })
      this.comments = comments
    },
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
      this.inicializeData(this.id, this.setData)
      this.editPackagedFlag = false
    },

    showRepositionDetail() {},
    setTaxGrabr() {
      console.log('Ok')
      this.taxGrabr = Number(
        Math.round(parseFloat(0.07 * parseFloat(this.costGrabr)) + 'e2') + 'e-2'
      )
        .toFixed(2)
        .toString()
      console.log(this.taxGrabr)
    },
    setTaxReal() {
      console.log('Ok')
      let rewardDiscount
      if(this.rewardDiscount == ''){
        rewardDiscount = 0
      }
      else rewardDiscount =  this.rewardDiscount
      this.TaxReal = Number(
        Math.round(parseFloat(0.07 * parseFloat(this.CostReal -rewardDiscount)) + 'e2') + 'e-2'
      )
        .toFixed(2)
        .toString()
    },
    reinicialize_variables() {
      this.unitWeight = ''
      this.weightGrabr = ''
      this.costGrabr = ''
      this.taxGrabr = ''
      this.shippingGrabr = ''
      this.CostReal = ''
      this.TaxReal = ''
      this.shippingReal = ''
      this.finalBuyingLink = ''
      this.finalBuyingCode = ''
      this.numberTracking = ''
      this.postingDate = ''
      this.sendingDate = ''
      this.operatorOrigin = ''
      this.flagFormEvaluetionPurchaseOrder = 'toFill'
      this.controllSwithPurchaseOrder = 1
    },
    inicializeData(id, callback) {
      let url = process.env.API_URL + '/api/purchaseOrder/get/' + id
      axios
        .get(url)
        .then(response => {
          let data = response.data.body
          console.log('Estamos en obtener orden de compra: ', data);
          callback(data)
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 404) {
              self.response = 'Error 404'
            }
            console.log(error)
          }
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
    listOperatorOrigin(id, callback) {
      let url = process.env.API_URL + '/api/operator/get-operators-origin/' + id
      axios
        .get(url)
        .then(response => {
          let data = response.data.body
          console.log(data)
          callback(data)
        })
        .catch(errors => {
          console.log(errors.response)
          return
        })
    },

    handleValidationErrorAdvanced() {
      const firstField = Object.keys(this.errors.collect())[0]
      if (firstField) {
        var elements = document.getElementsByName(firstField)
        console.log('Failed validation of field: '.concat(firstField))
        elements[0].scrollIntoView()
      } else console.log('Could not find elements with errors')
    },

    modalControllPurchaseOrder(state) {
      if (state == 1) {
        this.$validator.validate().then(result => {
          if (!result) {
            return this.handleValidationErrorAdvanced()
          } else {
            console.log('PASSED STATE = 1')
            this.flagFormEvaluetionPurchaseOrder = 'toShow'
            this.controllSwithPurchaseOrder = 2
          }
        })
      }
      if (state == 2) {
        // validar la segunda parte
        console.log('PASSED STATE = 2')
        if (this.controllSwithPurchaseOrder == 1) {
          this.controllSwithPurchaseOrder = 2
        } else {
          this.controllSwithPurchaseOrder = 1
        }
      }
    },

    async updateEvaluation() {
      this.$validator.validate().then(async result => {
        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          var auxObject = new Object()
          let resp
          auxObject.weight = this.weightGrabr
          auxObject.weight_unit_id = this.unitWeight.id

          if (this.orderDataShow.attributes.is_from_grabr_flag)
          {
            auxObject.grabr_price_rechecked = this.costGrabr
            auxObject.grabr_tax_rechecked = this.taxGrabr
            auxObject.grabr_shipping_web = this.shippingGrabr
            resp = await ordersService.updateBuyingOrder(
              this.orderDataShow.attributes.order_code,
              auxObject
            )
          }
          else if (this.orderDataShow.attributes.is_from_linio_flag){
            auxObject.linio_price_rechecked = this.costGrabr
            auxObject.linio_tax_rechecked = this.taxGrabr
            auxObject.linio_shipping_web = this.shippingGrabr
            resp = await ordersService.updateBuyingLinioOrder(
              this.orderDataShow.attributes.order_code,
              auxObject
            )
          }
          else if (this.orderDataShow.attributes.is_from_meli_flag){
            auxObject.meli_price_rechecked = this.costGrabr
            auxObject.meli_tax_rechecked = this.taxGrabr
            auxObject.meli_shipping_web = this.shippingGrabr
            resp = await ordersService.updateBuyingMeliOrder(
              this.orderDataShow.attributes.order_code,
              auxObject
            )
          }
          this.hideModalReevaluetion();
          console.log('Resp:');
          console.log(resp);

          if (resp) {
            console.log('Resp 2:')
            console.log(resp)
            // this.$refs.validacionmodal.show()
            this.inicializeData(this.id, this.setData)
          }
        }
      })
    },

    async updateIncompleOrderData() {

      this.$validator.validate().then(async result => {
        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          var auxObject = new Object()
          console.log('está validado')
          if (this.finalBuyingLink!='') auxObject.real_purchase_link = this.finalBuyingLink
          if (this.finalBuyingCode!='') auxObject.shopping_order_number = this.finalBuyingCode

          if (this.otherCarrierName != '') {
            auxObject.carrier_name = this.otherCarrierName
            auxObject.carrier_url = ''
          } else {
            if (this.carrier!=''){
              auxObject.carrier_name = this.carrier_list[this.carrier].name
              auxObject.carrier_url = this.carrier_list[this.carrier].url
            }

          }
          if (this.numberTracking!='')
            auxObject.tracking_number = this.numberTracking

          if (this.postingDate!='' && !this.orderDataShow.attributes.is_from_grabr_flag)
            auxObject.promised_origin_arrival_date = this.postingDate

          if (this.operatorOrigin!='') auxObject.sender_operator_id = this.operatorOrigin

          if (this.sendingDate!='' && !this.orderDataShow.attributes.is_from_grabr_flag)
            auxObject.promised_delivery_date = this.sendingDate

          console.log("DAta:")
          console.log(auxObject)
          console.log(this.orderDataShow.attributes.order_code);

          let resp = await ordersService.updateBuyingOrderNoGrabr(
            this.orderDataShow.attributes.order_code,
            auxObject
          )
          this.hideModalReevaluetion()
          console.log('Resp:')
          console.log(resp)

          if (resp) {
            if (this.orderDataShow.attributes.is_from_grabr_flag){
              this.$refs.modalProcess.hide()
            }
            else{
              this.$refs.modalProcessNoGrabr.hide()
            }

            this.inicializeData(this.id, this.setData)
          }
        }
      })
    },

    async sendEvaluation(id) {
      this.$validator.validate().then( async result =>{
        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          console.log(
            'PASSED VALIDATIONS OF SEND EVALUATION WITH ID: '.concat(id)
          )
          var auxObject = new Object()
          if (this.orderDataShow.attributes.is_from_grabr_flag)
          {
            auxObject.grabr_price_rechecked = this.costGrabr
            auxObject.grabr_tax_rechecked = this.taxGrabr
            auxObject.grabr_shipping_web = this.shippingGrabr
          }
          else if (this.orderDataShow.attributes.is_from_linio_flag){
            auxObject.linio_price_rechecked = this.costGrabr
            auxObject.linio_tax_rechecked = this.taxGrabr
            auxObject.linio_shipping_web = this.shippingGrabr
          }

          else if (this.orderDataShow.attributes.is_from_meli_flag){
            auxObject.meli_price_rechecked = this.costGrabr
            auxObject.meli_tax_rechecked = this.taxGrabr
            auxObject.meli_shipping_web = this.shippingGrabr
          }

          auxObject.weight = this.weightGrabr
          auxObject.weight_unit_id = this.unitWeight.id
          auxObject.real_price = this.CostReal
          auxObject.real_tax = this.TaxReal
          auxObject.real_shipping = this.shippingReal
          auxObject.real_purchase_link = this.finalBuyingLink
          if (this.rewardDiscount != '') {
            auxObject.reward_discount = this.rewardDiscount
          }
          console.log(auxObject)

          let resp
          if (this.orderDataShow.attributes.is_from_grabr_flag){
            console.log("grabr");
            resp = await this.registerCostBuyingOrder(this.id, auxObject)
          }
          else if (this.orderDataShow.attributes.is_from_linio_flag){
            console.log("linio");
            resp = await this.registerCostBuyingLinioOrder(this.id, auxObject)
          }
          else if (this.orderDataShow.attributes.is_from_meli_flag){
            console.log("meli");
            resp = await this.registerCostBuyingMeliOrder(this.id, auxObject)
          }


          if (resp){
            console.log("OK")

            this.hideModalReevaluetion()
            this.inicializeData(this.id, this.setData)
          }
          else{
            console.log("Error al registrar la data de evaluación")

          }

        }
      })
    },
    ProcessService(id) {
      console.log('process service')
      if (
        this.orderDataShow.attributes.is_from_grabr_flag &&
        this.orderDataShow.attributes.grabrOrder.attributes.confirmation_flag === 0
      ){
        console.log('Es una orden GRABR')
        this.confirmApprovedPurchaseOrder(id)
      }
      else if (
        this.orderDataShow.attributes.is_from_linio_flag &&
        this.orderDataShow.attributes.linioOrder.attributes.confirmation_flag === 0
        ){
        console.log("Es una orden LINIOO")
        this.confirmApprovedLinioPurchaseOrder(id)
      }
      else if (
        this.orderDataShow.attributes.is_from_meli_flag &&
        this.orderDataShow.attributes.meliOrder.attributes.confirmation_flag === 0
        ){
        console.log("Es una orden Meli")
        this.confirmApprovedMeliPurchaseOrder(id)
      }

      if (
          (this.orderDataShow.attributes.is_from_grabr_flag &&
          (this.orderDataShow.attributes.grabrOrder.attributes.confirmation_flag === 1 ||
          this.orderDataShow.attributes.grabrOrder.attributes.confirmation_flag === 2))
        ||
        (!this.orderDataShow.attributes.is_from_grabr_flag &&
          this.orderDataShow.attributes.status === 3)
      ) {
        console.log("Es una orden DIRECT")
        let idOrigin = this.orderDataShow.attributes.origin.id
        this.listOperatorOrigin(idOrigin, this.getListOperators)
        if (this.orderDataShow.attributes.is_from_grabr_flag) {
          this.showNodalProcess()
        } else {
          this.showNodalProcessNoGrabr()
        }
      }
      else if (
        (this.orderDataShow.attributes.is_from_linio_flag &&
          (this.orderDataShow.attributes.linioOrder.attributes
            .confirmation_flag === 1 ||
            this.orderDataShow.attributes.linioOrder.attributes
              .confirmation_flag === 2)) ||
        (!this.orderDataShow.attributes.is_from_linio_flag &&
          this.orderDataShow.attributes.status === 3)
      ) {
        let idOrigin = this.orderDataShow.attributes.origin.id
        this.listOperatorOrigin(idOrigin, this.getListOperators)
        if (this.orderDataShow.attributes.is_from_linio_flag) {
          this.showNodalProcess()
        } else {
          this.showNodalProcessNoGrabr()
        }
      }
      else if (
        (this.orderDataShow.attributes.is_from_meli_flag &&
          (this.orderDataShow.attributes.meliOrder.attributes
            .confirmation_flag === 1 ||
            this.orderDataShow.attributes.meliOrder.attributes
              .confirmation_flag === 2)) ||
        (!this.orderDataShow.attributes.is_from_meli_flag &&
          this.orderDataShow.attributes.status === 3)
      ) {
        let idOrigin = this.orderDataShow.attributes.origin.id
        this.listOperatorOrigin(idOrigin, this.getListOperators)
        if (this.orderDataShow.attributes.is_from_meli_flag) {
          this.showNodalProcess()
        } else {
          this.showNodalProcessNoGrabr()
        }
      }
    },
    sendProcess(id) {
      this.sendProcessFlag = true
      this.$validator.validate().then(result => {
        if (!result) {
          console.log("baaaad")

          return this.handleValidationErrorAdvanced()
        } else {
          console.log(
            'PASSED VALIDATIONS FROM SENDPROCESS WITH ID: '.concat(id)
          )

          if (this.orderDataShow.attributes.is_from_grabr_flag || this.orderDataShow.attributes.is_from_linio_flag || this.orderDataShow.attributes.is_from_meli_flag) {
            this.hideModalProcess()
          } else {
            this.hideModalProcessNoGrabr()
          }
          let auxObject = new Object()
          auxObject.shopping_order_number = this.finalBuyingCode
          auxObject.tracking_number = this.numberTracking
          auxObject.promised_origin_arrival_date = this.postingDate
          auxObject.operator_id = this.operatorOrigin
          if (this.otherCarrierName != '') {
            auxObject.carrier_name = this.otherCarrierName
          } else {
            auxObject.carrier_name = this.carrier_list[this.carrier].name
            auxObject.carrier_url = this.carrier_list[this.carrier].url
          }

          if (this.orderDataShow.attributes.is_from_grabr_flag || this.orderDataShow.attributes.is_from_linio_flag || this.orderDataShow.attributes.is_from_meli_flag) {
            auxObject.real_purchase_link = this.finalBuyingLink
          } else {
            auxObject.promised_delivery_date = this.sendingDate
          }

          if (this.orderDataShow.attributes.is_from_grabr_flag ){
            this.completeDataToGrabrPurchaseOrder(this.id, auxObject)
          }
          else if (this.orderDataShow.attributes.is_from_linio_flag){
            console.log("linio");
            this.completeDataToLinioPurchaseOrder(this.id, auxObject)
          }
          else if (this.orderDataShow.attributes.is_from_meli_flag){
            console.log("meli");
            this.completeDataToMeliPurchaseOrder(this.id, auxObject)
          }
          else{
            this.completeDataToDirectPurchaseOrder(this.id, auxObject)
          }

          this.reinicialize_variables()
          this.inicializeData(this.id, this.setData)
        }
      })
    },
    setData(data) {
      console.log('set data oficial')
      console.log(data)

      this.orderDataShow = data

      if (
        this.orderDataShow.attributes.is_from_grabr_flag &&
        this.orderDataShow.attributes.grabrOrder.attributes.grabr_price_rechecked != null
      ) {
        this.costGrabr = this.orderDataShow.attributes.grabrOrder.attributes.grabr_price_rechecked
        console.log(this.costGrabr)
      }
      else if (
        this.orderDataShow.attributes.is_from_linio_flag &&
        this.orderDataShow.attributes.linioOrder.attributes.linio_price_rechecked != null
      ) {
        this.costGrabr = this.orderDataShow.attributes.linioOrder.attributes.linio_price_rechecked
        console.log(this.costGrabr)
      }
      else if (
        this.orderDataShow.attributes.is_from_meli_flag &&
        this.orderDataShow.attributes.meliOrder.attributes.meli_price_rechecked != null
      ) {
        this.costGrabr = this.orderDataShow.attributes.meliOrder.attributes.meli_price_rechecked
        console.log(this.costGrabr)
      }
      console.log("PASAMOS -1");

      if (
        this.orderDataShow.attributes.is_from_grabr_flag &&
        this.orderDataShow.attributes.grabrOrder.attributes.grabr_tax_rechecked != null
      ) {
        this.taxGrabr = parseFloat(this.orderDataShow.attributes.grabrOrder.attributes.grabr_tax_rechecked).toFixed(2)
        console.log(this.taxGrabr)
      }
      else if (
        this.orderDataShow.attributes.is_from_linio_flag &&
        this.orderDataShow.attributes.linioOrder.attributes.linio_tax_rechecked != null
      ) {
        this.taxGrabr = parseFloat(this.orderDataShow.attributes.linioOrder.attributes.linio_tax_rechecked).toFixed(2)
        console.log(this.taxGrabr)
      }
      else if (
        this.orderDataShow.attributes.is_from_meli_flag &&
        this.orderDataShow.attributes.meliOrder.attributes.meli_tax_rechecked != null
      ) {
        this.taxGrabr = parseFloat(this.orderDataShow.attributes.meliOrder.attributes.meli_tax_rechecked).toFixed(2)
        console.log(this.taxGrabr)
      }
      console.log("PASAMOS 0");

      if (
        this.orderDataShow.attributes.is_from_grabr_flag &&
        this.orderDataShow.attributes.grabrOrder.attributes.grabr_shipping_web != null
      ) {
        this.shippingGrabr = this.orderDataShow.attributes.grabrOrder.attributes.grabr_shipping_web
        console.log(this.grabr_shipping_web)
      }
      else if (
        this.orderDataShow.attributes.is_from_linio_flag &&
        this.orderDataShow.attributes.linioOrder.attributes.linio_shipping_web != null
      ) {
        this.shippingGrabr = this.orderDataShow.attributes.linioOrder.attributes.linio_shipping_web
        console.log(this.linio_shipping_web)
      }
      else if (
        this.orderDataShow.attributes.is_from_meli_flag &&
        this.orderDataShow.attributes.meliOrder.attributes.meli_shipping_web != null
      ) {
        this.shippingGrabr = this.orderDataShow.attributes.meliOrder.attributes.meli_shipping_web
        console.log(this.meli_shipping_web)
      }
      console.log("PASAMOS 1");

      if (this.orderDataShow.attributes.real_price != null) {
        this.CostReal = this.orderDataShow.attributes.real_price
      }
      if (this.orderDataShow.attributes.real_tax != null) {
        this.TaxReal = this.orderDataShow.attributes.real_tax
      }
      if (this.orderDataShow.attributes.real_shipping != null) {
        this.shippingReal = this.orderDataShow.attributes.real_shipping
      }

      if (
        this.orderDataShow.attributes.is_from_grabr_flag &&
        this.orderDataShow.attributes.grabrOrder.attributes.reward_discount != null
      ) {
        this.rewardFlag = true
        this.rewardDiscount = this.orderDataShow.attributes.grabrOrder.attributes.reward_discount
      }
      else if (
        this.orderDataShow.attributes.is_from_linio_flag &&
        this.orderDataShow.attributes.linioOrder.attributes.reward_discount != null
      ) {
        this.rewardFlag = true
        this.rewardDiscount = this.orderDataShow.attributes.linioOrder.attributes.reward_discount
      }
      else if (
        this.orderDataShow.attributes.is_from_meli_flag &&
        this.orderDataShow.attributes.meliOrder.attributes.reward_discount != null
      ) {
        this.rewardFlag = true
        this.rewardDiscount = this.orderDataShow.attributes.meliOrder.attributes.reward_discount
      }

      if (this.orderDataShow.attributes.weight != null) {
        this.weightGrabr = this.orderDataShow.attributes.weight
      }

      if (this.orderDataShow.attributes.weight_unit_id != null) {
        this.unitWeight = this.orderDataShow.attributes.weight_unit
      }

      if (this.orderDataShow.attributes.real_purchase_link != null) {
        this.finalBuyingLink = this.orderDataShow.attributes.real_purchase_link
      }

      if (this.orderDataShow.attributes.promised_delivery_date != null) {
        this.sendingDate = this.orderDataShow.attributes.promised_delivery_date
      }

      if (this.orderDataShow.attributes.shopping_order_number != null) {
        this.finalBuyingCode = this.orderDataShow.attributes.shopping_order_number
      }
      if (this.orderDataShow.attributes.tracking_number != null) {
        this.numberTracking = this.orderDataShow.attributes.tracking_number
      }
      if (this.orderDataShow.attributes.promised_origin_arrival_date != null) {
        this.postingDate = this.orderDataShow.attributes.promised_origin_arrival_date
      }

      if (this.orderDataShow.attributes.sender_operator_id != null) {
        this.operatorOrigin = this.orderDataShow.attributes.sender_operator_id
      }
      console.log("PASAMOS 2");

      if (this.orderDataShow.attributes.carrier_name != null) {
        let taken= false
        this.carrier_list.forEach( (carrier, index )=> {
          if (carrier.name == this.orderDataShow.attributes.carrier_name ){
            this.otherCarrierFlag = false
            this.carrier = index
            taken =  true
          }
        })

        if (!taken){
          console.log("no taken");
          console.log(this.orderDataShow.attributes.carrier_name)

          this.otherCarrierFlag = true
          this.otherCarrierName = this.orderDataShow.attributes.carrier_name
          console.log(this.otherCarrierName)
        }
      }

      console.log("PASAMOS 3");
      this.calculateSkuUrl()
      try {
        this.packageRepositions = this.orderDataShow.attributes.reposition.attributes.package_repositions
      } catch (error) {
        this.packageRepositions = []
      }
      this.listUnitWeight(this.getListUnits)
      this.listOperatorOrigin(
        this.orderDataShow.attributes.origin.id,
        this.getListOperators
      )
      this.activeRoute =
        'Orden Nro.# ' +
        this.orderDataShow.attributes.grabrOrder.attributes.grabr_order_number
      console.log("NUMBER TRACKING")
      console.log(this.numberTracking)

    },
    async confirmPendientOrder(){
      console.log("Vamos a confirmar el pago");

      var response = await ordersService.updateBuyingOrderNoGrabr(this.orderDataShow.attributes.order_code, {'payed':3})
      console.log(response);
      if (response){
        this.inicializeData(this.id, this.setData)
      }
      else{
        alert("Service fail")
      }

    },
    getListUnits(data) {
      this.listUnits = data
      this.listUnits.forEach(unit => {
        if (unit.attributes.key_name == 'lb') {
          this.unitWeight = unit
        }
      })
    },
    getListOperators(data) {
      this.listOperators = data
    },
    backPage() {
      this.$router.go(-1)
    },
    hideModalValidation() {
      this.$refs.validacionmodal.hide()
    },
    hideCancelValidation() {
      this.$refs.cancelOrdermodal.hide()
    },
    hideModalAuthorizeReposition() {
      this.$refs.modalAuthorizeReposition.hide()
    },
    hideModalReevaluetion() {
      //this.reinicialize_variables()
      this.$refs.modalReevaluation.hide()
    },
    hideModalProcess() {
      this.$refs.modalProcess.hide()
    },
    hideModalProcessNoGrabr() {
      this.$refs.modalProcessNoGrabr.hide()
    },
    hideModalConfirmationReposition() {
      this.$refs.modalConfirmationReposition.hide()
    },
    showNodalProcess() {
      this.$refs.modalProcess.show()
    },
    showNodalProcessNoGrabr() {
      this.$refs.modalProcessNoGrabr.show()
    },
    hideModalConfirmation() {
      this.$refs.modalConfirmation.hide()
    },
    showModalConfirmation() {
      this.$refs.modalConfirmation.show()
    },

    // hideModalCompleteLinio() {
    //   this.$refs.modalCompleteLinio.hide()
    // },
    // showModalCompleteLinio() {
    //   this.$refs.modalCompleteLinio.show()
    // },
    async registerCostBuyingOrder(id, data) {
      let url =
        process.env.API_URL +
        '/api/purchaseOrder/' +
        id +
        '/register-cost-grabr-info'

      let resp = await axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            this.orderDataShow = response.data.body
            this.$refs.validacionmodal.show()
            return true
          } else {
            console.log('Algo raro paso')
            return false
          }
        })
        .catch(error => {
          console.log(error.response)
          return false
        })

        return resp
    },
    async registerCostBuyingLinioOrder(id, data) {
      let url =
        process.env.API_URL +
        '/api/purchaseOrder/' +
        id +
        '/register-cost-linio-info'
      console.log(url)
      console.log(data)
      let resp = await axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            console.log("Exito")
            console.log(response.data)

            // this.orderDataShow = response.data.body
            this.$refs.validacionmodal.show()
            return true
          } else {
            console.log('Algo raro paso')
            return false
          }
        })
        .catch(error => {
          console.log(error.response)
          return false
        })

        return resp
    },
    async registerCostBuyingMeliOrder(id, data) {
      let url =
        process.env.API_URL +
        '/api/purchaseOrder/' +
        id +
        '/register-cost-meli-info'
      console.log(url)
      console.log(data)
      let resp = await axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            console.log("Exito")
            console.log(response.data)

            // this.orderDataShow = response.data.body
            this.$refs.validacionmodal.show()
            return true
          } else {
            console.log('Algo raro paso')
            return false
          }
        })
        .catch(error => {
          console.log(error.response)
          return false
        })

        return resp
    },
    completeDataToDirectPurchaseOrder(id, data) {

      let url =
        process.env.API_URL + '/api/purchaseOrder/' + id + '/complete-final-info-no-grabr'
      console.log('URL de completar informacion de orden de compra')
      console.log(url)
      console.log('data:')
      console.log(data)


      axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            console.log("success")
            console.log(response.data.body)
            console.log("-----------------------")

            this.orderDataShow = response.data.body
            this.$refs.validacionmodal.show()
            console.log(this.orderDataShow)
            console.log('validacion modal')
          }
        })
        .catch(error => {
          console.log(error)
          console.log(error.response)
        })
    },
    completeDataToGrabrPurchaseOrder(id, data) {


      let url =
        process.env.API_URL + '/api/purchaseOrder/' + id + '/complete-final-info-grabr'
      console.log('URL de completar informacion de orden de compra')
      console.log(url)
      console.log('data:')
      console.log(data)

      axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            this.orderDataShow = response.data.body
            this.$refs.validacionmodal.show()
            console.log(this.orderDataShow)
            console.log('validacion modal')
          }
        })
        .catch(error => {
          console.log(error)
          console.log(error.response)
        })
    },
    completeDataToLinioPurchaseOrder(id, data) {
      let url =
      process.env.API_URL + '/api/purchaseOrder/' + id + '/complete-final-info-linio'
      console.log('URL de completar informacion de orden de compra')
      console.log(url)
      console.log('data:')
      console.log(data)
      axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            this.orderDataShow = response.data.body
            this.$refs.validacionmodal.show()
            console.log(this.orderDataShow)
            console.log('validacion modal')
            this.hideModalProcessNoGrabr();
          }
        })
        .catch(error => {
          console.log(error)
          console.log(error.response)
        })
    },
    completeDataToMeliPurchaseOrder(id, data) {

      let url =
      process.env.API_URL + '/api/purchaseOrder/' + id + '/complete-final-info-meli'
      console.log('URL de completar informacion de orden de compra')
      console.log(url)
      console.log('data:')
      console.log(data)
      axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            this.orderDataShow = response.data.body
            this.calculateSkuUrl()
            this.$refs.validacionmodal.show()
            console.log(this.orderDataShow)
            console.log('validacion modal')
            this.hideModalProcessNoGrabr();
          }
        })
        .catch(error => {
          console.log(error)
          console.log(error.response)
        })
    },
    confirmApprovedPurchaseOrder(id) {
      let url =
        process.env.API_URL +
        '/api/purchaseOrder/' +
        id +
        '/confirm-approved-flag'
      let data = new Object()
      data.confirmation_flag = 1
      axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            console.log("ok")
            console.log(response.data)


            this.orderDataShow = response.data.body
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    confirmApprovedLinioPurchaseOrder(id) {
      let url =
        process.env.API_URL +
        '/api/purchaseOrder/' +
        id +
        '/confirm-linio-approved-flag'
      let data = new Object()
      data.confirmation_flag = 1
      axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            console.log("ok")
            console.log(response.data)
            this.orderDataShow = response.data.body
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    confirmApprovedMeliPurchaseOrder(id) {
      let url =
        process.env.API_URL +
        '/api/purchaseOrder/' +
        id +
        '/confirm-meli-approved-flag'
      let data = new Object()
      data.confirmation_flag = 1
      axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            console.log("ok")
            this.orderDataShow = response.data.body
            this.calculateSkuUrl()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancelatePurchaseOrder(id) {

      this.hideModalConfirmation()
      let status = this.orderDataShow.attributes.status
      let url, data
      if (status == 2) {
        // Si está esperando la confirmación
        console.log('Va a cancelar desconfirmando el confirmed approved flag')

        url =
          process.env.API_URL +
          '/api/purchaseOrder/' +
          id +
          '/confirm-approved-flag'
        data = new Object()
        data.confirmation_flag = 2
        axios
          .post(url, data)
          .then(response => {
            if (response.data.status) {
              console.log(response.data)
              // this.orderDataShow = response.data.body
              this.$refs.cancelOrdermodal.show()
              this.inicializeData(this.id, this.setData)
            }
          })
          .catch(error => {
            console.log(error)
            console.log(error.response)
            console.log(error.response.data)
          })
      } else if (status <= 7 && status != 2) {
        console.log('Va a cancelar directo')

        url = process.env.API_URL + '/api/purchaseOrder/cancel/' + id
        data = new Object()
        axios
          .put(url, data)
          .then(response => {
            if (response.data.status) {
              console.log(response.data)

              // this.orderDataShow = response.data.body
              this.$refs.cancelOrdermodal.show()
              this.inicializeData(this.id, this.setData)
            }
          })
          .catch(error => {
            console.log(error)
            console.log(error.response);

          })
      } else {
        alert('Esta en un estado en el que no debería poder cancelar')
        return
      }

      this.cancellationComment()
    },
    cancellationComment(){
      // Creamos el comentario de cancelación

      this.currentContent = "Orden cancelada por "  +
      this.$store.state.user.attributes.profile.attributes.name +" "+
      this.$store.state.user.attributes.profile.attributes.surnames + " (" +
      (this.$store.state.user.attributes.profile.attributes.userable_type == 'admin' ? 'Administrador general':
        (this.$store.state.user.attributes.profile.attributes.userable_type == 'client'? 'Cliente':
          (this.$store.state.user.attributes.operator_type == 1? 'Operador de envío':'Operador de recepción')))
      +") con fecha y hora "

      console.log(this.currentContent)


      let currentDateTime =  new Date()
      console.log(currentDateTime)


      this.currentContent = this.currentContent + moment(String(currentDateTime)).format('DD/MM/YYYY - HH:mm')
      console.log(this.currentContent)
      this.createComment(1)
      // Fin de comentario de cancelación
    },
    toTrackingView(data) {
      console.log(data)
      this.$router.push({
        name: 'show-tracking-order',
        params: {
          id: data.id,
          orderData: data
        }
      })
    },
    validar(){
      console.log(this.postingDate);
      console.log(this.sendingDate);
      if(this.postingDate==this.sendingDate || this.postingDate>this.sendingDate){
        console.log('Son fechas iguales');
      }
    },
    resetImpuestoWeb(){;
      this.taxGrabr = '';
    },
    resetImpuestoReal(){
      this.TaxReal = '';
    },
    cambiarReward(){
      if(this.rewardFlag){
        this.rewardDiscount = '';
        this.TaxReal = Number(
          Math.round(parseFloat(0.07 * parseFloat(this.CostReal)) + 'e2') + 'e-2'
        )
          .toFixed(2)
          .toString()
      }
    },
    calculateSkuUrl(){
      var sku=''
      var publication_code_link = ''
      var hasshipping = true
      if (this.orderDataShow.attributes.is_from_meli_flag) {
        sku = this.orderDataShow.attributes.meliOrder.attributes.seller_sku
        var pub = this.orderDataShow.attributes.meliOrder.attributes.publication_code
        publication_code_link= 'https://articulo.mercadolibre.com.pe/'+pub.substr(0,3)+'-'+pub.substr(3)+'-_JM'
        this.orderDataShow.attributes.meliOrder.attributes.publication_code_link=publication_code_link
        if(this.orderDataShow.attributes.meliOrder.attributes.shipping_id==null){
          hasshipping = false
        }
      }else if (this.orderDataShow.attributes.is_from_linio_flag){
        sku = this.orderDataShow.attributes.linioOrder.attributes.seller_sku
      }else {sku=null}
      this.orderDataShow.attributes.sku=sku
      this.orderDataShow.attributes.hasshipping=hasshipping
      if(sku!=null){
        if(sku.search("DELETED")!=-1){
          sku = sku.split('_')[0]
          this.orderDataShow.attributes.linksku='#'
        }else if(sku.search("Z-")==0){
          this.orderDataShow.attributes.linksku='https://www.zappos.com/product/'+sku.split('-')[1]
        }else if(sku.search("-REG")!=-1 || sku.search("-GREY")!=-1 || sku.search("-USA")!=-1){
          this.orderDataShow.attributes.linksku='https://www.bhphotovideo.com/c/product/'+sku
        }else if(sku.length==7){
          this.orderDataShow.attributes.linksku='https://www.6pm.com/product/'+sku
        }else if(sku.length==10){
          this.orderDataShow.attributes.linksku='https://www.amazon.com/dp/'+sku
        }else if(sku.length==12){
          this.orderDataShow.attributes.linksku='https://www.ebay.com/itm/'+sku
        }else{
          var letters="abcdefghyjklmnñopqrstuvwxyz";
          var found;
          for(i=0; i<sku.length; i++){
            if (letters.indexOf(sku.charAt(i),0)!=-1) found=true
          }
          this.orderDataShow.attributes.linksku= (found) ? 'https://www.nike.com/t/'+sku : 'https://www.footlocker.com/product/~/'+sku
        }
      }
    }
  },
  computed: {
    totalPrice(){
      if (this.orderDataShow.attributes.is_from_grabr_flag){
        return this.orderDataShow.attributes.grabrOrder.attributes.grabr_price+ this.orderDataShow.attributes.grabrOrder.attributes.grabr_tax + this.orderDataShow.attributes.grabrOrder.attributes.grabr_fee
      }
      else if (this.orderDataShow.attributes.is_from_linio_flag){
        return this.orderDataShow.attributes.linioOrder.attributes.linio_price
      }
      else if (this.orderDataShow.attributes.is_from_meli_flag){
        return this.orderDataShow.attributes.meliOrder.attributes.meli_price
      }
      else{
        // return this.orderDataShow.attributes.real_price + this.orderDataShow.attributes.real_tax + this.orderDataShow.attributes.real_shipping
        return this.orderDataShow.attributes.client_flete_cost + this.orderDataShow.attributes.client_arancel_cost + this.orderDataShow.attributes.real_price*this.orderDataShow.attributes.product_specimens + this.orderDataShow.attributes.payment_method_cost
      }
    },

    isDirect(){
      return !this.orderDataShow.attributes.is_from_grabr_flag && !this.orderDataShow.attributes.is_from_linio_flag && !this.orderDataShow.attributes.is_from_meli_flag
    },

    readyToSaveIncompleteData(){
      if (this.finalBuyingLink!='' || this.finalBuyingCode!='' ||
          this.otherCarrierName != '' || this.carrier !='' ||
          this.numberTracking!='' || this.postingDate!='' ||
          this.operatorOrigin!='' ||
          (!this.orderDataShow.attributes.is_from_grabr_flag && this.sendingDate!='')
        ){
        return true
      }
        return false
    },

    readyToProcessIncompleteData(){
      console.log( this.otherCarrierName != '' || this.carrier !='')
      //verdadero
      if (
        (
          this.orderDataShow.attributes.is_from_grabr_flag && this.finalBuyingLink!='' && this.finalBuyingCode!='' && (this.otherCarrierName != '' || this.carrier !=='')
          && this.numberTracking!='' && this.postingDate!='' && this.operatorOrigin!=''
        )
        ||
        (
          !this.orderDataShow.attributes.is_from_grabr_flag && this.sendingDate!='' && this.finalBuyingCode!=''
          && (this.otherCarrierName !== '' || this.carrier !=='')
          && this.numberTracking!='' && this.postingDate!='' && this.operatorOrigin!=''
        )
      )
      {
        return true
      }
        return false
    },

    debitCalculated () {
      console.log('Estamos en calculate debit')
      let costGrabr, taxGrabr, shippingGrabr
      if (this.costGrabr == '')  costGrabr = 0
      else costGrabr = parseFloat(this.costGrabr)

      if (this.taxGrabr == '')  taxGrabr = 0
      else taxGrabr = parseFloat(this.taxGrabr)

      if (this.shippingGrabr == '')  shippingGrabr = 0
      else shippingGrabr = parseFloat(this.shippingGrabr)

      console.log("Precio de la web: ")
      console.log(costGrabr)
      console.log("Impuesto de la web: ")
      console.log(taxGrabr)
      console.log("Costo de envío de la web")
      console.log(shippingGrabr)

      let subtotal1, subtotal2
      subtotal1 = 0
      subtotal2 = 0
      if (this.orderDataShow.attributes.is_from_grabr_flag)
      {
        console.log("Precio Grabr")
        console.log(this.orderDataShow.attributes.grabrOrder.attributes.grabr_price)

        console.log("Impuesto Grabr")
        console.log(this.orderDataShow.attributes.grabrOrder.attributes.grabr_tax)

        subtotal1 =
          this.orderDataShow.attributes.grabrOrder.attributes.grabr_price <=
          costGrabr
            ? costGrabr - this.orderDataShow.attributes.grabrOrder.attributes.grabr_price
            : 0
        console.log(subtotal1);

        subtotal2 =
          this.orderDataShow.attributes.grabrOrder.attributes.grabr_tax <=
          taxGrabr
            ? taxGrabr - this.orderDataShow.attributes.grabrOrder.attributes.grabr_tax
            : 0
        console.log(subtotal2);

      }
      else if (this.orderDataShow.attributes.is_from_linio_flag){
        console.log("Precio Linio")
        console.log(this.orderDataShow.attributes.linioOrder.attributes.linio_price)

        subtotal1 =
          this.orderDataShow.attributes.linioOrder.attributes.linio_price <=
          costGrabr
            ? costGrabr - this.orderDataShow.attributes.linioOrder.attributes.linio_price
            : 0
        console.log(subtotal1);

        subtotal2 = taxGrabr
        console.log(subtotal2)
      }
      else if (this.orderDataShow.attributes.is_from_meli_flag){
        console.log("Precio meli")
        console.log(this.orderDataShow.attributes.meliOrder.attributes.meli_price)

        subtotal1 =
          this.orderDataShow.attributes.meliOrder.attributes.meli_price <=
          costGrabr
            ? costGrabr - this.orderDataShow.attributes.meliOrder.attributes.meli_price
            : 0
        console.log(subtotal1);

        subtotal2 = taxGrabr
        console.log(subtotal2)
      }

      return (
          parseFloat(subtotal1) +
          parseFloat(subtotal2) +
          parseFloat(shippingGrabr)
        )
    },
    formatPostingDate() {
      if (!this.postingDate) return '2000-01-01'
      let postingDate2 = new Date(this.postingDate)
      console.log('Habia postingDate: '.concat(postingDate2))
      let formatted_month = ('0' + (postingDate2.getMonth() + 1)).slice(-2)
      let formatted_day = ('0' + (postingDate2.getDate() + 1)).slice(-2)
      let formatted_date =
        postingDate2.getFullYear() + '-' + formatted_month + '-' + formatted_day
      console.log('Formatted date: '.concat(formatted_date))
      return formatted_date
    },
    formatSendingDate() {
      if (!this.sendingDate) return '2000-01-01'
      let sendingDate2 = new Date(this.sendingDate)
      console.log('Habia postingDate: '.concat(sendingDate2))
      let formatted_month = ('0' + (sendingDate2.getMonth() + 1)).slice(-2)
      let formatted_day = ('0' + (sendingDate2.getDate() + 1)).slice(-2)
      let formatted_date =
        sendingDate2.getFullYear() + '-' + formatted_month + '-' + formatted_day
      console.log('Formatted date: '.concat(formatted_date))
      return formatted_date
    },
    packagedRealValue: function() {
      let packagedAux = this.orderDataShow.attributes.packaged
      console.log('estoy en computed')

      if (packagedAux == null) {
        return 1
      } else if (packagedAux == 1) {
        return 2
      } else {
        return 3
      }
    },

    repositionAuthorizedFlag: function() {
      try {
        return  this.orderDataShow.attributes.reposition.attributes.authorized
      } catch (error) {
        return null
      }


    },

    noEvaluationFlag: function() {
      let flag = false
      if (this.orderDataShow.attributes.status!=1) return false
      if (this.orderDataShow.attributes.is_from_grabr_flag){
        flag = this.orderDataShow.attributes.grabrOrder.attributes.grabr_tax == null ||
        this.orderDataShow.attributes.grabrOrder.attributes.grabr_fee == null ||
        this.orderDataShow.attributes.origin_id == null ||
        this.orderDataShow.attributes.destination_id == null
      }
      else if (this.orderDataShow.attributes.is_from_linio_flag ||
                this.orderDataShow.attributes.is_from_meli_flag){
        flag = this.orderDataShow.attributes.origin_id == null ||
                this.orderDataShow.attributes.destination_id == null
      }
      return flag
    },
    totalMeli(){
      return this.totalPrice + this.orderDataShow.attributes.meliOrder.attributes.rebate;
    },
    totalCommissions(){
      return (0.09 * this.totalPrice) + (0.09 * this.orderDataShow.attributes.meliOrder.attributes.rebate)
    },
    totalNeto(){
      return this.totalMeli - this.totalCommissions;
    }
  },
  watch: {
    otherCarrierFlag: function(newFlag) {
      console.log('estamos cambiando de valor')
      if (!newFlag) this.otherCarrierName = ''
      if (newFlag) this.carrier =''
    }
  }
}
</script>
