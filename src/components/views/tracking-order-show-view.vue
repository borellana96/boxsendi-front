<template>

  <div class="main-content">

    <breadcrumb :nameSection="nameSection" :listRoutes="listRoutes" :activeRoute="activeRoute"></breadcrumb>

    <!--<circle-spin v-if="!orderDataShow"></circle-spin>-->

    <div v-if="orderDataShow && orderDataShow.attributes.status >= 4">

      <div class="card-status-content">

        <div class="card-status-block">

          <a
            v-if="orderDataShow.attributes.status == 5"
            href="#"
            class="btn btn-primary"
            @click="confirmArrivalPurchaseOrderToOrigin(id)"
          >Confirmar correcta recepción</a>

          <button  type="button" class="btn btn-line"  @click="backToDetail()"><i class="fas fa-long-arrow-alt-left"></i>Volver al detalle</button>

          <span v-if="orderDataShow.attributes.status >= 1 && orderDataShow.attributes.status <= 3" class="btn statusInit" >Inicializando</span>

          <span v-if="orderDataShow.attributes.status >= 4 && orderDataShow.attributes.status <= 7" class="btn statusProgress" >En proceso</span>

          <span v-if="orderDataShow.attributes.status == 8" class="btn  statusProgress">Finalizado</span>

          <span v-if=" orderDataShow.attributes.status == 10" class="btn  statusCancel">Cancelado</span>

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

          <orderImportantInfo
          v-bind:orderDataShow="orderDataShow"
          v-bind:fromDetail="false"
          v-bind:fromTracking="true"
          ></orderImportantInfo>

          <div class="card-container">

        <div v-if="orderDataShow.attributes.status == 4 && orderDataShow.attributes.warning_expired_flag == 0" class="card card-correct">

          <div class="card-content-container" id="headingOne">

            <div class="card-content-block">

              <span>Comprado y en camino a dirección de origen</span>

            </div>

            <div class="card-content-block">

              <b-button  @click="activate_modalNewTracking_flag" v-b-modal.modalNewTracking class="btn btn-primary btn-lg">Evaluar</b-button>

              <b-button @click="activate_modalTypeReplacement_flag" v-b-modal.modalTypeReplacement class="btn btn-primary btn-lg">Generar incidencia</b-button>

              <div v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style="cursor: pointer">
                <div class="details-text up-arrow"></div>
              </div>

            </div>

          </div>

          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion" v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0 ) || (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0 ) || (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0 )"
          >

            <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

          </div>

        </div>

        <div v-if="orderDataShow.attributes.status == 5 && orderDataShow.attributes.warning_expired_flag == 0" class="card card-correct">

          <div class="card-content-container collapsed" id="headingTwo">

            <div class="card-content-block">
              <span>Recibido y completando datos de recepción</span>
            </div>


            <div class="card-content-block">

             <b-button v-b-modal.modalNewTracking class="btn btn-primary btn-lg">Re-evaluar</b-button>

              <b-button @click="activate_modalTypeReplacement_flag" v-b-modal.modalTypeReplacement class="btn btn-primary btn-lg">Generar incidencia</b-button>

            <div v-if="(orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0) || (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0)" class="collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"  aria-controls="collapseTwo" style="cursor: pointer">
              <div class="details-text up-arrow"></div>
            </div>
            </div>
          </div>

          <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion" v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0) || (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0) || (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0)"
          >
            <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

          </div>

        </div>

        <div v-if="orderDataShow.attributes.status== 6 " class="card card-correct">

          <div class="card-content-container" id="headinThree">

            <div class="card-content-block">

              <span v-if="orderDataShow.attributes.warning_expired_flag ==0">Listo para embarcar</span>

              <span v-else-if="orderDataShow.attributes.warning_expired_flag ==1">Listo para embarcar con retraso</span>

            </div>

            <div class="card-content-block">

              <div v-if="orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag" class="collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree" style="cursor: pointer">
                <div class="details-text up-arrow"></div>
              </div>

            </div>

          </div>

          <div id="collapseThree" class="collapse" aria-labelledby="headinThree" data-parent="#accordion">

            <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

          </div>

        </div>

        <div v-if="orderDataShow.attributes.status== 4 && orderDataShow.attributes.warning_expired_flag == 1" class="card card-warning">

          <div class="card-header collapsed" id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

            <div class="card-content">

              <h1>Oferta de compra retrasada</h1>

            </div>

          </div>

          <div class="text-right">

            <b-button v-b-modal.modalNewTracking href="#" class="btn btn-primary btn-lg">Evaluar</b-button>
            <b-button v-b-modal.modalTypeReplacement  href="#" class="btn btn-primary btn-lg">Generar incidencia</b-button>

          </div>

          <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion" v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0 ) || (orderDataShow.attributes.is_from_linio_flag &&  orderDataShow.attributes.linioOrder.attributes.approved_flag != 0 ) || (orderDataShow.attributes.is_from_meli_flag &&  orderDataShow.attributes.meliOrder.attributes.approved_flag != 0 )">

            <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>

          </div>

        </div>

        <div
          v-if="orderDataShow.attributes.status== 5 && orderDataShow.attributes.warning_expired_flag == 1"
          class="card card-warning"
        >
          <div
            class="card-header collapsed"
            id="headingOne"
            data-toggle="collapse"
            data-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <div class="card-content">
              <ul>
                <li>
                  <p></p>
                </li>
                <li>
                  <h1>Recicibido con retraso y completando datos de recepción</h1>

                </li>
              </ul>
            </div>
          </div>

          <div class="text-right">
            <b-button v-b-modal.modalNewTracking href="#" class="btn btn-primary btn-lg">Evaluar</b-button>
            <b-button
              v-b-modal.modalTypeReplacement
              href="#"
              class="btn btn-primary btn-lg"
            >Generar incidencia</b-button>
          </div>

          <div
            id="collapseOne"
            class="collapse"
            aria-labelledby="headingOne"
            data-parent="#accordion"
            v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0 ) ||
            (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0 ) ||
            (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0 )"
          >
            <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>
          </div>
        </div>

        <div
          v-if="orderDataShow.attributes.status== 10 && orderDataShow.attributes.cancelled == 1 && ( orderDataShow.attributes.cancelled_reason_flag == 1||orderDataShow.attributes.cancelled_reason_flag == 3)"
          class="card card-cancel"
        >
          <div
            class="card-header collapsed"
            id="headingTwo"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <div class="card-content">
              <ul>
                <li>
                  <p></p>
                </li>
                <li>
                  <h1
                    v-if=" orderDataShow.attributes.cancelled_reason_flag == 1"
                  >Cancelado por decision propia</h1>



                  <h1
                    v-else-if=" orderDataShow.attributes.cancelled_reason_flag == 3"
                  >Cancelado por no autorizar reposición de items</h1>
                </li>
              </ul>
            </div>
          </div>

          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
          >
            <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>
          </div>
        </div>

        <div
          v-if="orderDataShow.attributes.status== 10 && orderDataShow.attributes.cancelled == 1 && orderDataShow.attributes.cancelled_reason_flag == 2 &&
                orderDataShow.attributes.has_replacement_flag == false && orderDataShow.attributes.has_active_refund_flag == false && orderDataShow.attributes.trackingIncident.attributes.type == 1"
          class="card card-cancel"
        >
          <div
            class="card-header collapsed"
            id="headinTwo"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <div class="card-content">
              <ul>
                <li>
                  <p></p>
                </li>
                <li>
                  <h1>Cancelado por incidente en tracking: Retraso</h1>
                </li>
              </ul>
            </div>
          </div>

          <div class="text-right">
            <b-button
              @click="activate_modalReplacement_flag"
              v-b-modal.modalReplacement
              class="btn btn-primary btn-lg"
            >Generar reemplazo</b-button>
          </div>
          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordion"
            v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0 ) ||
            (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0 ) ||
            (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0 )"
          >
            <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>
          </div>
        </div>

        <div
          v-if="orderDataShow.attributes.status== 10 && orderDataShow.attributes.cancelled == 1 && orderDataShow.attributes.cancelled_reason_flag == 2 && orderDataShow.attributes.trackingIncident.attributes.type == 2 "
          class="card card-cancel"
        >
          <div
            class="card-header collapsed"
            id="headinTwo"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <div class="card-content">
              <ul>
                <li>
                  <p></p>
                </li>
                <li>
                  <h1>Cancelado por incidente en tracking: Pérdida</h1>
                </li>
              </ul>
            </div>
          </div>

          <div class="text-right">
            <b-button
              v-if="orderDataShow.attributes.has_active_refund_flag == true"
              v-b-modal.modalRefund
              href="#"
              class="btn btn-primary btn-lg"
            >Completar rembolso</b-button>
            <a
              v-if="orderDataShow.attributes.has_replacement_flag == false && !orderDataShow.attributes.is_from_linio_flag && !orderDataShow.attributes.is_from_meli_flag"
              href="#"
              class="btn btn-primary btn-lg"
              @click="redirectToCreatePurchaseOrder"
            >Crear reemplazo</a>
            <a
              v-else-if="orderDataShow.attributes.has_replacement_flag == false && orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.is_from_meli_flag"
              href="#"
              class="btn btn-primary btn-lg"
              @click="redirectToCreatePurchaseOrder"
            >Crear reemplazo (Es linio no deberia hacerlo)</a>
          </div>

          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headinTwo"
            data-parent="#accordion"
            v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0 ) ||
            (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0 ) ||
            (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0 )"
          >
            <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>
          </div>
        </div>

        <div
          v-if="orderDataShow.attributes.status== 10 && orderDataShow.attributes.cancelled == 1 && orderDataShow.attributes.cancelled_reason_flag == 2 && orderDataShow.attributes.has_replacement_flag == 1"
          class="card card-cancel"
        >
          <div
            class="card-header collapsed"
            id="headinTwo"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <div class="card-content">
              <ul>
                <li>
                  <p></p>
                </li>
                <li v-if="orderDataShow.attributes.replacementPurchaseOrder">
                  <h1>
                    Orden cancelada por reemplazo, ver
                    <span
                      @click="referenceToNewPurchaseOrder()"
                    >nueva orden aqui</span>
                  </h1>
                </li>
              </ul>
            </div>
          </div>

          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headinTwo"
            data-parent="#accordion"
            v-if="(orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.approved_flag != 0 ) ||
            (orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.approved_flag != 0 ) ||
            (orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.approved_flag != 0 )"
          >
            <resumePurchaseOrder v-bind:orderDataShow="orderDataShow"></resumePurchaseOrder>
          </div>

        </div>
      </div>


      <div class="orden-subtitulo text-title">
        <h1>Detalles de la orden</h1>
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

                <div class="details-content-info">

                  <div class="details-title-block" >

                    <span class="details-title-item" >Código de envío: </span>

                    <span class="details-title-item" v-if="orderDataShow.attributes.is_from_meli_flag">{{orderDataShow.attributes.meliOrder.attributes.shipping_id}}</span>
                    <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">{{orderDataShow.attributes.linioOrder.attributes.shipping_id!=null?orderDataShow.attributes.linioOrder.attributes.shipping_id:'No definido'}}</span>

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

                    <span class="details-title-item">{{ orderDataShow.attributes.meliOrder.attributes.meli_purchase_link!==null?orderDataShow.attributes.meliOrder.attributes.meli_purchase_link:"No definido"}}</span>

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
      <div class="orden-subtitulo text-title" v-if="true">
        <h1>Comentarios</h1>
      </div>

               <div class="details-content" v-if="true">

            <div class="details-content-comments" v-if="!(orderDataShow.attributes.cancelled == 1 && orderDataShow.attributes.status == 10)">

              <textarea type="text"
                v-model="currentContent"
                aria-describedby="email"
                class="form-control"
                :maxlength="1000"
                rows="1"
                placeholder="Deja tu comentario...">

              </textarea>
  <!-- :disabled="!createCommentFlag" -->
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

        </div>

      </div>

      <b-modal hide-footer hide-header centered id="validacionmodal" ref="validacionmodal">
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
          <div class="modal-body modal-scroll modal-correcto text-center" id="modal-body">
            <div class="validacion-body">
              <h1></h1>
            </div>
          </div>
          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-primary btn-edit"
              block
              @click="hideModalValidation"
            >Continuar</button>
          </div>
        </div>
      </b-modal>

      <b-modal hide-footer hide-header id="cancelOrdermodal" ref="cancelOrdermodal">
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
            <div class="cancel-body">
              <h1></h1>
            </div>
          </div>
          <div class="modal-footer text-center">
            <button
              type="button"
              class="btn btn-success btn-edit"
              block
              @click="hideCancelValidation"
            >Continuar</button>
          </div>
        </div>
      </b-modal>

      <b-modal hide-footer hide-header centered id="modalNewTracking" ref="modalNewTracking">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Evaluación del tracking</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModalNewTracking">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body modal-scroll" id="modal-body">
            <div class="form-login text-title" id="infoextra">
              <div class="form-group">
                <label for class="float-left">Fecha real de llegada</label>
                <input
                  type="date"
                  id="email"
                  name="real_arrival_date"
                  v-validate="{required: this.modalNewTracking_flag==true}"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="realDateArrive"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('real_arrival_date')"
                  class="text-danger"
                >{{ errors.first('real_arrival_date') }}</span>
              </div>

              <div class="form-group">
                <label for class="float-left">Peso registrado</label>
                <input
                  type="text"
                  id="email"
                  name="origin_order_weight"
                  v-validate="{required: this.modalNewTracking_flag==true}"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="weightOrder"
                  v-floatonly
                  :maxlength="8"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('origin_order_weight')"
                  class="text-danger"
                >{{ errors.first('origin_order_weight') }}</span>
              </div>
              <div class="form-group">
                <label for class="float-left">Unidades de peso</label>
                <select
                  class="form-control form-control-lg sen-form-input-with-tooltip"
                  name="weight_units"
                  v-validate="{required: this.modalNewTracking_flag==true}"
                  v-model="originWeightUnit"
                >
                  <option disabled value>Seleccionar</option>
                  <option :value="units" v-for="units of listUnits" :key="units.id">{{units.attributes.name}}</option>
                </select>

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('weight_units')"
                  class="text-danger"
                >{{ errors.first('weight_units') }}</span>
              </div>

              <div v-if="!oldOrderNumber" class="form-group">
                <label for class="float-left">Número de tracking</label>
                <input
                  type="text"
                  id="email"
                  minlength="5"
                  name="tracking_number"
                  v-validate="{required: this.modalNewTracking_flag==true}"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  :maxlength="30"
                  v-model="newOrderNumber"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('tracking_number')"
                  class="text-danger"
                >{{ errors.first('tracking_number') }}</span>
              </div>

              <div class="form-group">
                <label for class="float-left">Número de control</label>
                <input
                  type="text"
                  id="controlNumber"
                  name="control_number"
                  v-validate="{required: this.modalNewTracking_flag==true}"
                  aria-describedby="controlNumber"
                  class="form-control null sen-form-input-with-tooltip"
                  :maxlength="10"
                  v-model="controlNumber"
                  v-digitsonly
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('control_number')"
                  class="text-danger"
                >{{ errors.first('control_number') }}</span>
              </div>
              <!--
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  v-model="oldOrderNumber"
                >
                <label
                  v-if=" orderDataShow.attributes.is_from_grabr_flag == true"
                  class="form-check-label"
                  for="exampleCheck1"
                >
                  Usar el nro de tracking original:
                  <span>{{orderDataShow.attributes.grabrOrder.attributes.grabr_order_number}}</span>
                </label>

                <label
                  v-if=" orderDataShow.attributes.is_from_grabr_flag == false"
                  class="form-check-label"
                  for="exampleCheck1"
                >
                  Usar el nro de tracking original:
                  <span>{{orderDataShow.attributes.order_code}}</span>
                </label>
              </div>-->
            </div>
          </div>

          <div class="modal-footer text-right">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              @click="purchaseOrderEvaluation(id)"
            >Guardar</button>
          </div>
        </div>
      </b-modal>

      <b-modal
        hide-footer
        hide-header
        centered
        id="modalTypeReplacement"
        ref="modalTypeReplacement"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Selecciona el tipo de incidencia</h5>
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="hideModalTypeReplacement"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body modal-scroll" id="modal-body">
            <div class="form-login text-title">
              <div class="form-group">
                <select
                  class="form-control form-control-lg sen-form-input-with-tooltip"
                  name="incidence_type"
                  v-validate="{required: this.modalTypeReplacement_flag==true}"
                  v-model="storeType"
                >
                  <option
                    v-if="orderDataShow.attributes.warning_expired_flag || !orderDataShow.attributes.warning_expired_flag"
                    value="1"
                  >Por retraso</option>
                  <option value="2">Por pérdida</option>
                </select>

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>
              </div>
              <span
                v-show="errors.has('incidence_type')"
                class="text-danger"
              >{{ errors.first('incidence_type') }}</span>
              <div v-if="storeType == 2" class="form-group">
                <label for="exampleFormControlTextarea1">Tipo de reemplazo</label>
                <select
                  class="form-control form-control-lg sen-form-input-with-tooltip"
                  name="tipo_reemplazo"
                  v-validate="{required: storeType==2}"
                  v-model="replacementType"
                >
                  <option selected value="1">Misma tienda</option>
                  <option value="2">Otra tienda</option>
                </select>

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>
              </div>
              <span
                v-show="errors.has('tipo_reemplazo')"
                class="text-danger"
              >{{ errors.first('tipo_reemplazo') }}</span>

              <div class="form-group">
                <label for="exampleFormControlTextarea1">Descripción</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  name="incidence_description"
                  v-validate="{required: this.modalTypeReplacement_flag==true}"
                  v-model="descriptionIncidence"
                ></textarea>
              </div>
              <span
                v-show="errors.has('incidence_description')"
                class="text-danger"
              >{{ errors.first('incidence_description') }}</span>
            </div>
          </div>

          <div class="modal-footer text-right">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              @click="generateIncidence"
            >Continuar</button>
          </div>
        </div>
      </b-modal>

      <b-modal
        hide-footer
        hide-header
        centered
        id="modalReplacement"
        ref="modalReplacement"
        @shown="inicialiceModalReplacement"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Datos de reemplazo</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModalReplacement">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body modal-scroll" id="modal-body">
            <div class="form-login text-title" id="infoextra">
              <div class="form-group">
                <label for class="float-left">Número de compra</label>
                <input
                  type="text"
                  id="email"
                  name="order_number"
                  v-validate="{required: this.modalReplacement_flag && this.modalNewTracking_flag}"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="orderNumber"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>
              </div>
              <span
                v-show="errors.has('order_number')"
                class="text-danger"
              >{{ errors.first('order_number') }}</span>

              <div class="form-group">
                <label for class="float-left">Número de tracking</label>
                <input
                  type="text"
                  id="email"
                  name="tracking_number_replacement"
                  v-validate="{required: this.modalReplacement_flag}"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="trackingNumber"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>
              </div>
              <span
                v-show="errors.has('tracking_number_replacement')"
                class="text-danger"
              >{{ errors.first('tracking_number_replacement') }}</span>

              <div class="form-group">
                <label for class="float-left">Link de compra</label>
                <input
                  type="text"
                  id="email"
                  name="purchase_link_replacement"
                  v-validate="{required: this.modalReplacement_flag, url:true}"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="purchaseLink"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>
              </div>
              <span
                v-show="errors.has('purchase_link_replacement')"
                class="text-danger"
              >{{ errors.first('purchase_link_replacement') }}</span>

              <div class="form-group">
                <label for class="float-left">Fecha de llegada al origen</label>
                <input
                  type="date"
                  id="email"
                  name="arrival_date_replacement"
                  v-validate="{required: this.modalReplacement_flag}"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="dateArriveOrigin"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>
              </div>
              <span
                v-show="errors.has('arrival_date_replacement')"
                class="text-danger"
              >{{ errors.first('arrival_date_replacement') }}</span>

              <div class="form-group">
                <label for class="float-left">Fecha de llegada al cliente</label>
                <input
                  type="date"
                  id="email"
                  name="arrival_date_client_replacement"
                  v-validate="{required: this.modalReplacement_flag}"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="dateArriveClient"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>
              </div>
              <span
                v-show="errors.has('arrival_date_client_replacement')"
                class="text-danger"
              >{{ errors.first('arrival_date_client_replacement') }}</span>

              <div class="form-group">
                <label for class="float-left">Precio real (USD)</label>
                <input
                  aria-describedby="email"

                  class="form-control null sen-form-input-with-tooltip"
                  v-validate="{required: this.modalReplacement_flag}"
                  v-model="newRealPrice"
                  v-floatonly
                  :maxlength="7"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>
                <span
                  v-show="errors.has('new_real_price')"
                  class="text-danger"
                >{{ errors.first('new_real_price') }}</span>


              </div>

              <div class="form-group">
                <label for class="float-left">Impuesto real (USD)</label>
                <input
                  aria-describedby="email"

                  class="form-control null sen-form-input-with-tooltip"
                  v-validate="{required: this.modalReplacement_flag}"
                  v-model="newRealTax"
                  v-floatonly
                  :maxlength="7"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('new_real_tax')"
                  class="text-danger"
                >{{ errors.first('new_real_tax') }}</span>


              </div>

              <div class="form-group">
                <label for class="float-left">Costo de envío real (USD)</label>
                <input
                  aria-describedby="email"

                  class="form-control null sen-form-input-with-tooltip"
                  v-validate="{required: this.modalReplacement_flag}"
                  v-model="newRealShipping"
                  v-floatonly
                  :maxlength="7"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>

                <span
                  v-show="errors.has('new_real_shipping')"
                  class="text-danger"
                >{{ errors.first('new_real_shipping') }}</span>


              </div>
            </div>
          </div>

          <div class="modal-footer text-right">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              @click="generateReplacement"
            >Continuar</button>
          </div>
        </div>
      </b-modal>

      <b-modal hide-footer hide-header centered id="modalRefund" ref="modalRefund">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Datos de reembolso</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModalRefund">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body modal-scroll" id="modal-body">
            <div class="form-login text-title" id="infoextra">
              <div class="form-group">
                <label for class="float-left">Monto</label>
                <input
                  type="text"
                  id="email"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="mountNew"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>
              </div>

              <div class="form-group">
                <label for class="float-left">Fecha de reembolso</label>
                <input
                  type="date"
                  id="email"
                  aria-describedby="email"
                  class="form-control null sen-form-input-with-tooltip"
                  v-model="refundDate"
                >

                <div class="sen-tooltip sen-tooltip-modal">
                  <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates quod ut, aperiam laboriosa</span>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer text-right">
            <button type="button" class="btn btn-primary btn-lg" @click="completeRefund()">Guardar</button>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              @click="endRefundByTrakingIncidentID(orderDataShow.attributes.trackingIncident.id )"
            >Finalizar</button>
          </div>
        </div>
      </b-modal>

      <b-modal hide-footer hide-header centered id="modalConfirmationV2" ref="modalConfirmationV2">
        <div class="modal-Content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Confirmar accion:</h5>
            <button type="button" class="close" aria-label="Close" @click="hideModalConfirmationV2">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body modal-scroll">
            <div class="text-center">
              <p>¿Estás seguro que deseas completar esta acción?</p>
            </div>
          </div>

          <div class="modal-footer text-right">
            <button type="button" class="btn btn-primary btn-lg" @click="notfound()">Continuar</button>
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
              <p>¿Estás seguro que deseas completar esta acción?</p>
            </div>
          </div>

          <div class="modal-footer text-center">
            <button type="button" class="btn btn-primary btn-lg" @click="confirmFormModal()">Aceptar</button>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              @click="hideModalConfirmation()"
            >Cancelar</button>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import breadcrumb from '@/components/prefab/structures/breadcrumb.vue'
import spanish from 'vee-validate/dist/locale/es'
import axios from 'axios'
import resumePurchaseOrder from '@/components/prefab/elements/resume-purchase-order'
import orderImportantInfo from '@/components/prefab/elements/order-important-info'
import commentComponent from '@/components/prefab/items/comment-component'
import { commentsService } from '@/services/comments.service'
import moment from 'moment'

export default {
  components: {
    resumePurchaseOrder,
    breadcrumb,
    orderImportantInfo,
    commentComponent
  },
  props: ['id', 'orderData'],
  data() {
    return {
      locale: 'en',
      orderDataShow: null,
      realDateArrive: new Date().toISOString().split('T')[0],
      weightOrder: '',
      newOrderNumber: '',
      currentContent: '',
      oldOrderNumber: false,
      storeType: 1,
      replacementType: 1,
      descriptionIncidence: '',
      controlNumber: '',
      orderNumber: '',
      trackingNumber: '',
      purchaseLink: '',
      dateArriveOrigin: '',
      dateArriveClient: '',
      originWeightUnit: '',
      mountNew: '',
      refundDate: '',
      confirmForm: '',
      auxData: null,
      listUnits: [],
      // listOperators: []

      nameSection: 'Gestión del tracking',
      listRoutes: [{ nameRoute: 'Orders', titleRoute: 'Órdenes de compra' }],
      activeRoute: '',

      modalReplacement_flag: false,
      modalTypeReplacement_flag: false,
      modalNewTracking_flag: false,
      comments: [],

      newRealPrice:'',
      newRealTax:'',
      newRealShipping:'',
    }
  },
  created() {
    this.$validator.localize('es', {
      messages: spanish.messages,
      attributes: {
        real_arrival_date: 'fecha real de llegada',
        origin_order_weight: 'peso de la orden en el origen',
        weight_units: 'unidades de peso',
        tracking_number: 'número de tracking',
        control_number: 'número de control',
        incidence_description: 'descripción',
        order_number: 'número de orden',
        tracking_number_replacement: 'número de tracking',
        purchase_link_replacement: 'link de compra',
        arrival_date_replacement: 'fecha de llegada al origen',
        arrival_date_client_replacement: 'fecha de llegada al cliente',
        new_real_price: 'precio real',
        new_real_tax: 'impuesto real',
        new_real_shipping: 'costo de envío real'
      }
    })
    // start with spanish locale.
    this.$validator.localize('es')

    this.orderDataShow = this.orderData
    // if (this.orderDataShow) {
    //   this.listUnitWeight(this.getListUnits)
    // }
    if (!this.orderDataShow) {
      this.inicializeData(this.id, this.setData)
    } else {
      console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeey")

      if (this.orderDataShow.attributes.real_origin_arrival_date != null) {
        this.realDateArrive = this.orderDataShow.attributes.real_origin_arrival_date
      }
      if (this.orderDataShow.attributes.origin_weight != null) {
        this.weightOrder = this.orderDataShow.attributes.origin_weight
      }
      if (this.orderDataShow.attributes.origin_weight_unit != null) {
        this.originWeightUnit = this.orderDataShow.attributes.origin_weight_unit
      }
      console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeey2")
      if (this.orderDataShow.attributes.status == 4) {
        this.newOrderNumber = this.orderDataShow.attributes.tracking_number
      } else if (this.orderDataShow.attributes.status == 5) {
        this.newOrderNumber = this.orderDataShow.attributes.final_tracking_number
      }
      if (this.orderDataShow.attributes.control_number != null) {
        this.controlNumber = this.orderDataShow.attributes.control_number
      }
      if (this.orderDataShow.attributes.trackingIncident!= null && this.orderDataShow.attributes.trackingIncident.attributes.refundTrackingIncident!= null )
      {
        if (this.orderDataShow.attributes.trackingIncident.attributes.refundTrackingIncident.attributes.amount){
          this.mountNew = this.orderDataShow.attributes.trackingIncident.attributes.refundTrackingIncident.attributes.amount
        }

        if (this.orderDataShow.attributes.trackingIncident.attributes.refundTrackingIncident.attributes.refund_date){
          this.refundDate = this.orderDataShow.attributes.trackingIncident.attributes.refundTrackingIncident.attributes.refund_date
        }

      }
      console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeey3")


      if (this.orderDataShow.attributes.is_from_grabr_flag){
        this.activeRoute = 'Orden Nro.#' + this.orderDataShow.attributes.grabrOrder.attributes.grabr_order_number
      }
      else if (this.orderDataShow.attributes.is_from_linio_flag){
        this.activeRoute = 'Orden Nro.#' + this.orderDataShow.attributes.linioOrder.attributes.linio_order_number
      }
      else if (this.orderDataShow.attributes.is_from_meli_flag){
        this.activeRoute = 'Orden Nro.#' + this.orderDataShow.attributes.meliOrder.attributes.meli_order_id
      }

    }
    this.displayComments()
    this.listUnitWeight(this.getListUnits)
  },
  methods: {
    cancellationComment(sinceTracking = false ){
      // Creamos el comentario de cancelación

      if (sinceTracking){
        this.currentContent = "Orden cancelada por generación de incidencia en tacking hecha por "
      }
      else{
        this.currentContent = "Orden cancelada por "
      }
      this.currentContent = this.currentContent  +
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
    disableEditComments(exceptId) {
      console.log('No se pueden editar otros comentarios')
      console.log(exceptId)

      this.comments.forEach(comment => {
        if (comment.id != exceptId) {
          comment.enable = false
        }
      })
    },

    enableEditComments() {
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
    //   estos flags se usarán para hacer que las validaciones en los respectivos modals sean requeridas sólo cuando se haya activado alguna de estas
    activate_modalReplacement_flag: function(event) {
      this.modalReplacement_flag = true
      this.modalTypeReplacement_flag = false
      this.modalNewTracking_flag = false
      console.log('Se activo el flag modalReplacement_flag')
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
    activate_modalTypeReplacement_flag: function(event) {
      this.modalTypeReplacement_flag = true
      this.modalNewTracking_flag = false
      this.modalReplacement_flag = false
      console.log(
        'Se activo el flag modalTypeReplacement_flag y se desactivo modalNewTracking_flag'
      )
    },
    activate_modalNewTracking_flag: function(event) {
      this.modalNewTracking_flag = true
      this.modalTypeReplacement_flag = false
      this.modalReplacement_flag = false
      console.log(
        'Se activo el flag modalNewTracking_flag y se desactivo modalTypeReplacement_flag'
      )
    },
    reinicialize_variables() {
      this.realDateArrive = ''
      this.weightOrder = ''
      this.newOrderNumber = ''
      this.oldOrderNumber = false
      this.orderNumber = ''
      this.trackingNumber = ''
      this.purchaseLink = ''
      this.dateArriveOrigin = ''
      this.dateArriveClient = ''
      this.storeType = 1
      this.descriptionIncidence = ''
      this.replacementType = 1
      this.mountNew = ''
      this.refundDate = ''
      this.confirmForm = ''
      this.auxData = null
    },
    inicializeData(id, callback) {
      let url = process.env.API_URL + '/api/purchaseOrder/get/' + id
      axios
        .get(url)
        .then(response => {
          console.log('De nuevo aqui')

          let purchaseOrder = response.data.body
          console.log(purchaseOrder)

          if (purchaseOrder.attributes.real_origin_arrival_date != null) {
            this.realDateArrive =
              purchaseOrder.attributes.real_origin_arrival_date
          }
          if (purchaseOrder.attributes.origin_weight != null) {
            this.weightOrder = purchaseOrder.attributes.origin_weight
          }
          if (purchaseOrder.attributes.origin_weight_unit != null) {
            this.originWeightUnit = purchaseOrder.attributes.origin_weight_unit
          }
          if (purchaseOrder.attributes.status == 4) {
            this.newOrderNumber = purchaseOrder.attributes.tracking_number
          } else if (purchaseOrder.attributes.status == 5) {
            this.newOrderNumber = purchaseOrder.attributes.final_tracking_number
          }

          console.log('esta es data')
          console.log(purchaseOrder)

          callback(purchaseOrder)
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

    setData(data) {
      console.log('En set data')

      this.orderDataShow = data
      console.log(this.orderDataShow)

      if (this.orderDataShow.attributes.trackingIncident!= null && this.orderDataShow.attributes.trackingIncident.attributes.refundTrackingIncident!= null )
      {
        if (this.orderDataShow.attributes.trackingIncident.attributes.refundTrackingIncident.attributes.amount){
          this.mountNew = this.orderDataShow.attributes.trackingIncident.attributes.refundTrackingIncident.attributes.amount
        }

        if (this.orderDataShow.attributes.trackingIncident.attributes.refundTrackingIncident.attributes.refund_date){
          this.refundDate = this.orderDataShow.attributes.trackingIncident.attributes.refundTrackingIncident.attributes.refund_date
        }

      }
      this.activeRoute =
        'Orden Nro.#' +
        this.orderDataShow.attributes.grabrOrder.attributes.grabr_order_number

      // this.listUnitWeight(this.getListUnits)
    },
    getListUnits(data) {
      this.listUnits = data
      this.listUnits.forEach(unit => {
        if (unit.attributes.key_name == 'lb') {
          this.originWeightUnit = unit
        }
      })
    },
    // getListOperators(data) {
    //   this.listOperators = data
    // },
    backToDetail() {
      this.$router.push({
        name: 'show-purchase-order',
        params: { id: this.id }
      })
    },
    hideModalValidation() {
      this.$refs.validacionmodal.hide()
    },
    hideCancelValidation() {
      this.$refs.cancelOrdermodal.hide()
    },
    showModalValidation() {
      this.$refs.validacionmodal.show()
    },
    hideModalNewTracking() {
      this.$refs.modalNewTracking.hide()
    },
    showModalNewTracking() {
      this.$refs.modalNewTracking.show()
    },
    hideModalTypeReplacement() {
      this.$refs.modalTypeReplacement.hide()
    },
    showModalTypeReplacement() {
      this.$refs.modalTypeReplacement.show()
    },
    hideModalReplacement() {
      this.$refs.modalReplacement.hide()
    },
    showModalReplacement() {
      this.$refs.modalReplacement.show()
    },
    hideModalConfirmation() {
      this.$refs.modalConfirmation.hide()
      this.reinicialize_variables()
    },
    showModalConfirmation() {
      this.$refs.modalConfirmation.show()
    },
    hideModalConfirmationV2() {
      this.$refs.modalConfirmationV2.hide()
      this.reinicialize_variables()
    },
    showModalConfirmationV2() {
      this.$refs.modalConfirmationV2.show()
    },
    hideModalRefund() {
      this.$refs.modalRefund.hide()
    },
    showModalRefund() {
      this.$refs.modalRefund.show()
    },
    handleValidationErrorAdvanced() {
      const firstField = Object.keys(this.errors.collect())[0]
      if (firstField) {
        var elements = document.getElementsByName(firstField)
        console.log('Failed validation of field: '.concat(firstField))
        elements[0].scrollIntoView()
      } else console.log('Could not find elements with errors.')
    },
    purchaseOrderEvaluation(id) {
      this.$validator.validate().then(result => {
        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          console.log(
            'Passed validations of purchaseOrderEvaluation with ID: '.concat(id)
          )

          if (this.oldOrderNumber) {
            if (this.orderDataShow.attributes.is_from_grabr_flag == true) {
              this.newOrderNumber = this.orderDataShow.attributes.grabrOrder.attributes.grabr_order_number
            }
            if (this.orderDataShow.attributes.is_from_grabr_flag == false) {
              this.newOrderNumber = this.orderDataShow.attributes.order_code
            }
          }

          let auxObject = new Object()
          auxObject.real_origin_arrival_date = this.realDateArrive
          auxObject.origin_weight = this.weightOrder
          auxObject.origin_weight_unit_id = this.originWeightUnit.id
          auxObject.final_tracking_number = this.newOrderNumber
          auxObject.control_number = this.controlNumber
          // console.log(auxObject)
          // return
          // // eslint-disable-next-line no-unreachable
          this.hideModalNewTracking()
          this.postDataToCorrectReceptionPurchaseOrder(id, auxObject)

          return    $router.push({name: 'show-tracking-order',params: {id: data.id, orderData: data} })


        }
      })

    },
    generateIncidence(id) {
      this.$validator.validate().then(result => {
        console.log("Estamos en validar")

        console.log(result)


        if (!result) {
          return this.handleValidationErrorAdvanced()
        } else {
          console.log(
            'Passed validations of generateIncidence with ID: '.concat(id)
          )
          this.hideModalTypeReplacement()
          let auxObject = new Object()
          auxObject.type = this.storeType
          auxObject.description = this.descriptionIncidence
          if (this.storeType == 2) {
            auxObject.replacement_type = this.replacementType
          }

          this.showModalConfirmation()
          this.auxData = auxObject
          this.confirmForm = 'generateIncidence'
        }
      })

    },
    generateReplacement() {
      this.$validator.validate().then(result => {
        if (!result) {

          return this.handleValidationErrorAdvanced()
        } else {

          console.log('Passed validations of generateReplacement')
          this.modalReplacement_flag = false
          this.hideModalReplacement()
          let auxObject = new Object()
          auxObject.shopping_order_number = this.orderNumber
          auxObject.tracking_number = this.trackingNumber
          auxObject.real_purchase_link = this.purchaseLink
          auxObject.promised_origin_arrival_date = this.dateArriveOrigin
          auxObject.promised_delivery_date = this.dateArriveClient
          auxObject.real_price = this.newRealPrice
          auxObject.real_tax = this.newRealTax
          auxObject.real_shipping = this.newRealShipping
          console.log(auxObject)
          console.log("---------------------------------")
          this.showModalConfirmation()
          this.auxData = auxObject
          console.log("aux data:")
          console.log(this.auxData);


          this.confirmForm = 'generateReplacement'
        }
      })

    },
    completeRefund() {
      if (
        this.mountNew == null ||
        this.mountNew == '' ||
        this.mountNew.length == 0 ||
        /^\s+$/.test(this.mountNew)
      ) {
        alert('Ingrese un monto')
        return
      }
      if (
        this.refundDate == null ||
        this.refundDate == '' ||
        /^\s+$/.test(this.refundDate)
      ) {
        alert('Ingrese la fecha de reembolso')
        return
      }

      if (this.originWeightUnit == null || this.originWeightUnit == '') {
        alert('Seleccione la unidad de medida del peso')

        return
      }

      this.hideModalRefund()

      let id = this.orderDataShow.attributes.trackingIncident.id
      let auxObject = new Object()
      auxObject.amount = this.mountNew
      auxObject.refund_date = this.refundDate

      this.updateDataRefundByTrakingIncidentID(id, auxObject)
    },

    postDataToCorrectReceptionPurchaseOrder(id, data) {
      let url =
        process.env.API_URL +
        '/api/purchaseOrder/' +
        id +
        '/complete-reception-info'
      axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            this.orderDataShow = response.data.body
            this.realDateArrive = this.orderDataShow.attributes.real_origin_arrival_date
            this.weightOrder = this.orderDataShow.attributes.origin_weight
            this.originWeightUnit = this.orderDataShow.attributes.origin_weight_unit
            this.newOrderNumber = this.orderDataShow.attributes.final_tracking_number
            this.controlNumber = this.orderDataShow.attributes.control_number

            this.showModalValidation()
          }
        })
        .catch(error => {
          console.log(error)
          console.log(error.response)

          return
        })
    },
    confirmArrivalPurchaseOrderToOrigin(id) {
      let url =
        process.env.API_URL + '/api/purchaseOrder/' + id + '/reception-ok'
      axios
        .post(url)
        .then(response => {
          if (response.data.status) {
            this.orderDataShow = response.data.body
            this.showModalValidation()
          }
        })
        .catch(error => {
          console.log(error)
          console.log(error.response);

        })
    },
    async generateIncidenceOfTrackingInitial(id, data) {
      let url =
        process.env.API_URL +
        '/api/purchaseOrder/' +
        id +
        '/generate-tracking-incident'
        console.log(url)

      let resp =  await axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            // this.orderDataShow = response.data.body;
            this.inicializeData(this.id, this.setData)
            return true
          }
          return false
        })
        .catch(error => {

          console.log(error)
          console.log(error.response)
          return false
        })
      return resp
    },
    async createPurchaseOrderToReplacementToIncideceSameShop(id, data) {
      let url =
        process.env.API_URL +
        '/api/purchaseOrder/' +
        id +
        '/create-replacement-purchase-order'
      let resp =  await axios
        .post(url, data)
        .then(response => {
          if (response.data.status) {
            console.log(response.data.body)

            this.inicializeData(this.id, this.setData)
            return true
          }
          return false
        })
        .catch(error => {
          console.log(error)
          console.log(error.response)


          return false
        })
      return resp
    },
    updateDataRefundByTrakingIncidentID(id, data) {
      let url =
        process.env.API_URL +
        '/api/trackingIncident/' +
        id +
        '/update-refund-data'
      axios
        .put(url, data)
        .then(response => {
          if (response.data.status) {
            this.showModalValidation()
            this.inicializeData(this.id, this.setData)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    endRefundByTrakingIncidentID(id) {
      this.hideModalRefund()

      let url =
        process.env.API_URL + '/api/trackingIncident/' + id + '/finish-refund'
      axios
        .post(url)
        .then(response => {
          if (response.data.status) {
            this.showModalValidation()
            this.inicializeData(this.id, this.setData)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    cancelatePurchaseOrder(id) {
      let status = this.orderDataShow.attributes.status
      let url, data
      if (status == 2) {
        //Si está esperando la confirmación
        console.log('Va a cancilar desconfirmando el confirmed approved flag')

        url =
          process.env.API_URL +
          '/api/purchaseOrder/' +
          id +
          '/confirm-approved-flag'
        data = new Object()
        data.confirmation_flag = 0
        axios
          .post(url, data)
          .then(response => {
            if (response.data.status) {
              console.log(response.data)
              //this.orderDataShow = response.data.body
              this.$refs.cancelOrdermodal.show()
              this.inicializeData(this.id, this.setData)
            }
          })
          .catch(error => {
            console.log(error)
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
          })
      } else {
        alert('Esta en un estado en el que no debería poder cancelar')
      }
    },
    redirectToCreatePurchaseOrder() {
      let auxId,
        client,
        externalClientDni,
        grabrClientId,
        externalClientName,
        externalClientCellphone

      if (this.orderDataShow.attributes.is_from_grabr_flag) {
        auxId = '1'
        externalClientDni = grabrClientId = null
        if (this.orderDataShow.attributes.external_client_dni != null) {
          externalClientDni = this.orderDataShow.attributes.external_client_dni
        } else {
          grabrClientId = this.orderDataShow.attributes.grabrOrder.attributes.client_grabr_id
        }
        externalClientName = this.orderDataShow.attributes.external_client_name
        externalClientCellphone = this.orderDataShow.attributes
          .external_client_cellphone
      } else {
        auxId = '2'
        client = this.orderDataShow.attributes.client
      }
      let grabr = {
        id: auxId
      }
      let oldID = this.id

      this.$router.push({
        name: 'add-purchase-order',
        params: {
          grabr: grabr,
          oldID: oldID,
          client: client,
          externalClientDni: externalClientDni,
          grabrClientId: grabrClientId,
          externalClientName: externalClientName,
          externalClientCellphone: externalClientCellphone
        }
      })
    },
    inicialiceModalReplacement() {
      console.log('Esta pasando esto')
      this.modalReplacement_flag = true
      this.modalTypeReplacement_flag = false
      this.modalNewTracking_flag = false
      if (this.orderDataShow.attributes.promised_origin_arrival_date) {
        this.dateArriveOrigin = this.orderDataShow.attributes.promised_origin_arrival_date
      }
      if (this.orderDataShow.attributes.promised_delivery_date) {
        this.dateArriveClient = this.orderDataShow.attributes.promised_delivery_date
      }
      if (this.orderDataShow.attributes.real_purchase_link) {
        this.purchaseLink = this.orderDataShow.attributes.real_purchase_link
      }
      if (this.orderDataShow.attributes.shopping_order_number) {
        this.orderNumber = this.orderDataShow.attributes.shopping_order_number
      }
      if (this.orderDataShow.attributes.tracking_number) {
        this.trackingNumber = this.orderDataShow.attributes.tracking_number
      }
      if (this.orderDataShow.attributes.real_price) {
        this.newRealPrice = this.orderDataShow.attributes.real_price
      }
      if (this.orderDataShow.attributes.real_tax) {
        this.newRealTax = this.orderDataShow.attributes.real_tax
      }
      if (this.orderDataShow.attributes.real_shipping) {
        this.newRealShipping = this.orderDataShow.attributes.real_shipping
      }

    },
    referenceToNewPurchaseOrder() {
      this.$router.push({
        name: 'show-purchase-order',
        params: {
          id: this.orderDataShow.attributes.replacementPurchaseOrder.id,
          orderData: this.orderDataShow.attributes.replacementPurchaseOrder
        }
      })
    },
    async confirmFormModal() {
      console.log(this.auxData);


      if (this.confirmForm == 'generateIncidence') {

        let resp =  await this.generateIncidenceOfTrackingInitial(this.id, this.auxData)
        this.hideModalConfirmation()
        if (resp){
          this.cancellationComment(true)
          this.showModalValidation()
        }
        else{
          alert("Error al generar la incidencia de tracking")
        }

      }
      if (this.confirmForm == 'generateReplacement') {




        console.log(this.auxData)

        let resp = await this.createPurchaseOrderToReplacementToIncideceSameShop(
          this.id,
          this.auxData
        )
        this.hideModalConfirmation()
        if (resp)
        {
          this.showModalValidation()
        }
        else{
          alert("Error al generar el reemplazo")
        }

      }
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
