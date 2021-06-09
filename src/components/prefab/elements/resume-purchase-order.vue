<template lang="html">

  <div class="card-body" v-if="orderDataShow.attributes.is_from_grabr_flag || orderDataShow.attributes.is_from_linio_flag || orderDataShow.attributes.is_from_meli_flag ">

    <div v-if="orderDataShow.attributes.is_from_grabr_flag" class="msj-inversion">

      <span>Inviertes {{orderDataShow.attributes.real_price+orderDataShow.attributes.real_tax+orderDataShow.attributes.real_shipping+orderDataShow.attributes.cut|currency }}
      y ganas {{orderDataShow.attributes.evaluation_info.attributes.grabr_total + orderDataShow.attributes.grabrOrder.attributes.debit - (orderDataShow.attributes.evaluation_info.attributes.real_total_cost)|currency}}.
      Un  {{(( (orderDataShow.attributes.evaluation_info.attributes.grabr_total + orderDataShow.attributes.grabrOrder.attributes.debit - (orderDataShow.attributes.evaluation_info.attributes.real_total_cost)) * 100 )/ (orderDataShow.attributes.real_price+orderDataShow.attributes.real_tax+orderDataShow.attributes.real_shipping+orderDataShow.attributes.cut)) |currency}}% respecto a tu inversión.</span>

    </div>

    <div v-else-if ="orderDataShow.attributes.is_from_grabr_flag" class="msj-inversion">
      <span>Inviertes {{orderDataShow.attributes.real_price+orderDataShow.attributes.real_tax+orderDataShow.attributes.real_shipping+orderDataShow.attributes.cut|currency }}
      y ganas {{orderDataShow.attributes.linio_evaluation_info.attributes.linio_total + orderDataShow.attributes.linioOrder.attributes.debit - (orderDataShow.attributes.linio_evaluation_info.attributes.real_total_cost)|currency}}.
      Un  {{(( (orderDataShow.attributes.linio_evaluation_info.attributes.linio_total + orderDataShow.attributes.linioOrder.attributes.debit - (orderDataShow.attributes.linio_evaluation_info.attributes.real_total_cost)) * 100 )/ (orderDataShow.attributes.real_price+orderDataShow.attributes.real_tax+orderDataShow.attributes.real_shipping+orderDataShow.attributes.cut)) |currency}}% respecto a tu inversión.</span>
    </div>

    <div class="card-content-details-container">

      <div class="card-content-details-block">

        <div class="card-content-details">

          <div class="details-title-container">

            <div class="details-title-block details-summary-item" style="justify-content: center">

              <span class="details-title-item" v-if="orderDataShow.attributes.is_from_grabr_flag" style="font-weight: bold; text-decoration: underline;">Datos sugeridos por web de Grabr</span>
              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag" style="font-weight: bold; text-decoration: underline;">Datos sugeridos por web de Linio</span>
              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_meli_flag" style="font-weight: bold; text-decoration: underline;">Datos sugeridos por web de Meli</span>

            </div>

            <div class="details-title-block details-summary-item">

              <span class="details-title-item">Precio</span>

              <span class="details-title-item" v-if="orderDataShow.attributes.is_from_grabr_flag">$ {{orderDataShow.attributes.grabrOrder.attributes.grabr_price_rechecked|currency}}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">$ {{orderDataShow.attributes.linioOrder.attributes.linio_price_rechecked|currency}}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">$ {{orderDataShow.attributes.meliOrder.attributes.meli_price_rechecked|currency}}</span>

            </div>

            <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.reward_discount!=null">
              <span class="details-title-item">Reward / Discount</span>
              <span class="details-title-item">$ 0</span>
            </div>

            <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.reward_discount!=null">
              <span class="details-title-item">Reward / Discount</span>
              <span class="details-title-item">$ 0</span>
            </div>

            <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.reward_discount!=null">
              <span class="details-title-item">Reward / Discount</span>
              <span class="details-title-item">$ 0</span>
            </div>

            <div class="details-title-block details-summary-item">

              <span class="details-title-item" >Tax</span>

              <span class="details-title-item" v-if="orderDataShow.attributes.is_from_grabr_flag">$ {{orderDataShow.attributes.grabrOrder.attributes.grabr_tax_rechecked|currency }}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">$ {{orderDataShow.attributes.linioOrder.attributes.linio_tax_rechecked|currency }}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">$ {{orderDataShow.attributes.meliOrder.attributes.meli_tax_rechecked|currency }}</span>

            </div>

            <div class="details-title-block details-summary-item">

              <span class="details-title-item">Shipping</span>

              <span class="details-title-item" v-if="orderDataShow.attributes.is_from_grabr_flag">$ {{orderDataShow.attributes.grabrOrder.attributes.grabr_shipping_web|currency}}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">$ {{orderDataShow.attributes.linioOrder.attributes.linio_shipping_web|currency}}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">$ {{orderDataShow.attributes.meliOrder.attributes.meli_shipping_web|currency}}</span>

            </div>

            <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_grabr_flag">

              <span class="details-title-item">Adeudo</span>

              <span class="details-title-item">$ {{orderDataShow.attributes.grabrOrder.attributes.debit|currency}}</span>

              <!--<span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">$ {{orderDataShow.attributes.linioOrder.attributes.debit|currency}}</span>-->

            </div>

            <div class="details-title-block details-summary-item">

              <span class="details-title-item">Fob (Subtotal)</span>

              <span class="details-title-item" v-if="orderDataShow.attributes.is_from_grabr_flag">$ {{orderDataShow.attributes.grabrOrder.attributes.grabr_price_rechecked+orderDataShow.attributes.grabrOrder.attributes.grabr_tax_rechecked+orderDataShow.attributes.grabrOrder.attributes.grabr_shipping_web|currency}}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">$ {{orderDataShow.attributes.linioOrder.attributes.linio_price_rechecked+orderDataShow.attributes.linioOrder.attributes.linio_tax_rechecked+orderDataShow.attributes.linioOrder.attributes.linio_shipping_web|currency}}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">$ {{orderDataShow.attributes.meliOrder.attributes.meli_price_rechecked+orderDataShow.attributes.meliOrder.attributes.meli_tax_rechecked+orderDataShow.attributes.meliOrder.attributes.meli_shipping_web|currency}}</span>

            </div>

            <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_linio_flag">
              <span class="details-title-item">Seguro</span>
              <span class="details-title-item">$ {{orderDataShow.attributes.linioOrder.attributes.linio_security_cost|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">
              <span class="details-title-item">Seguro</span>
                <span class="details-title-item">$ {{orderDataShow.attributes.meliOrder.attributes.meli_security_cost|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_linio_flag">
              <span class="details-title-item">Flete</span>
              <span class="details-title-item">$ {{orderDataShow.attributes.linioOrder.attributes.linio_flete_cost|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">
              <span class="details-title-item">Flete</span>
              <span class="details-title-item">$ {{orderDataShow.attributes.meliOrder.attributes.meli_flete_cost|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_linio_flag">
              <span class="details-title-item">CIF (Subtotal 2)</span>
              <span class="details-title-item">$ {{orderDataShow.attributes.linioOrder.attributes.cif|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">
              <span class="details-title-item">CIF (Subtotal 2)</span>
              <span class="details-title-item">$ {{orderDataShow.attributes.meliOrder.attributes.cif|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_linio_flag">
              <span class="details-title-item"
                v-b-popover.hover.top="
                'Ad Valorem: $ ' + orderDataShow.attributes.linioOrder.attributes.linio_ad_valorem +
                '\nIGV: $ ' + orderDataShow.attributes.linioOrder.attributes.linio_igv +
                '\nIPM: $ ' + orderDataShow.attributes.linioOrder.attributes.linio_ipm">Impuestos</span>
              <span class="details-title-item">$ {{orderDataShow.attributes.linioOrder.attributes.linio_ad_valorem + orderDataShow.attributes.linioOrder.attributes.linio_igv + orderDataShow.attributes.linioOrder.attributes.linio_ipm|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">
              <span class="details-title-item"
                v-b-popover.hover.top="
                'Ad Valorem: $ ' + orderDataShow.attributes.meliOrder.attributes.meli_ad_valorem +
                '\nIGV: $ ' + orderDataShow.attributes.meliOrder.attributes.meli_igv +
                '\nIPM: $ ' + orderDataShow.attributes.meliOrder.attributes.meli_ipm">Impuestos</span>
              <span class="details-title-item">$ {{orderDataShow.attributes.meliOrder.attributes.meli_ad_valorem + orderDataShow.attributes.meliOrder.attributes.meli_igv + orderDataShow.attributes.meliOrder.attributes.meli_ipm|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item">
              <span class="details-title-item"
                v-b-popover.hover.top="'Guía: $8.00' + '\nIGV: $1.44'">Trámite Aduanero</span>
              <span class="details-title-item">$ {{customsProcedureConstant}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_linio_flag">
              <span class="details-title-item">Costo Total</span>
              <span class="details-title-item">$ {{orderDataShow.attributes.linioOrder.attributes.cif + (orderDataShow.attributes.linioOrder.attributes.linio_ad_valorem + orderDataShow.attributes.linioOrder.attributes.linio_igv + orderDataShow.attributes.linioOrder.attributes.linio_ipm) + customsProcedureConstant|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">
              <span class="details-title-item">Costo Total</span>
              <span class="details-title-item">$ {{orderDataShow.attributes.meliOrder.attributes.cif + (orderDataShow.attributes.meliOrder.attributes.meli_ad_valorem + orderDataShow.attributes.meliOrder.attributes.meli_igv + orderDataShow.attributes.meliOrder.attributes.meli_ipm) + customsProcedureConstant|currency}}</span>
            </div>

            <div v-if="orderDataShow.attributes.is_from_grabr_flag" class="details-title-block details-summary-item">

              <span class="details-title-item" v-b-popover.hover.top="Number(Math.round(parseFloat((( orderDataShow.attributes.evaluation_info.attributes.grabr_total + orderDataShow.attributes.grabrOrder.attributes.debit - (orderDataShow.attributes.evaluation_info.attributes.web_total_cost))*100)/(orderDataShow.attributes.grabrOrder.attributes.grabr_price+orderDataShow.attributes.grabrOrder.attributes.grabr_tax+orderDataShow.attributes.grabrOrder.attributes.grabr_fee + orderDataShow.attributes.grabrOrder.attributes.debit)) + 'e2') + 'e-2').toFixed(2).toString() + '%'">Utilidad
              </span>

              <span class="details-title-item">$ {{orderDataShow.attributes.evaluation_info.attributes.grabr_total + orderDataShow.attributes.grabrOrder.attributes.debit - (orderDataShow.attributes.evaluation_info.attributes.web_total_cost)|currency}}</span>

            </div>

            <div v-else-if="orderDataShow.attributes.is_from_linio_flag" class="details-title-block details-summary-item">

              <span class="details-title-item" v-b-popover.hover.top="Number(Math.round(parseFloat(((orderDataShow.attributes.linio_evaluation_info.attributes.linio_total +
                orderDataShow.attributes.linioOrder.attributes.debit -
                (orderDataShow.attributes.linio_evaluation_info.attributes.web_total_cost))*100)
                /(orderDataShow.attributes.linioOrder.attributes.linio_price
                + orderDataShow.attributes.linioOrder.attributes.debit)) + 'e2') + 'e-2').toFixed(2).toString() + '%'">
                Utilidad
              </span>

              <span class="details-title-item">$ {{orderDataShow.attributes.linioOrder.attributes.linio_price - (orderDataShow.attributes.linioOrder.attributes.cif + (orderDataShow.attributes.linioOrder.attributes.linio_ad_valorem + orderDataShow.attributes.linioOrder.attributes.linio_igv + orderDataShow.attributes.linioOrder.attributes.linio_ipm) + customsProcedureConstant)|currency}}</span>

            </div>

            <div v-else-if="orderDataShow.attributes.is_from_meli_flag" class="details-title-block details-summary-item">

              <span class="details-title-item" v-b-popover.hover.top="Number(Math.round(parseFloat(((orderDataShow.attributes.meli_evaluation_info.attributes.meli_total +
                orderDataShow.attributes.meliOrder.attributes.debit -
                (orderDataShow.attributes.meli_evaluation_info.attributes.web_total_cost))*100)
                /(orderDataShow.attributes.meliOrder.attributes.meli_price_dollar
                + orderDataShow.attributes.meliOrder.attributes.debit)) + 'e2') + 'e-2').toFixed(2).toString() + '%'">
                Utilidad
              </span>

              <span class="details-title-item">$ {{orderDataShow.attributes.meliOrder.attributes.meli_price_dollar - (orderDataShow.attributes.meliOrder.attributes.cif + (orderDataShow.attributes.meliOrder.attributes.meli_ad_valorem + orderDataShow.attributes.meliOrder.attributes.meli_igv + orderDataShow.attributes.meliOrder.attributes.meli_ipm) + customsProcedureConstant)|currency}}</span>

            </div>

          </div>

          <div class="details-title-container">

            <div class="details-title-block details-summary-item summary-block-total">

              <span class="details-title-item">Total</span>

              <span class="details-title-item" v-if="orderDataShow.attributes.is_from_grabr_flag">$ {{orderDataShow.attributes.evaluation_info.attributes.web_total_cost|currency}}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_linio_flag">$ {{orderDataShow.attributes.linioOrder.attributes.linio_price_dollar|currency}}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">$ {{orderDataShow.attributes.meliOrder.attributes.meli_price_dollar|currency}}</span>

            </div>

          </div>

        </div>

      </div>

      <div class="card-content-details-block">

        <div class="card-content-details">

          <div class="details-title-container">

            <div class="details-title-block details-summary-item" style="justify-content: center">

                <span class="details-title-item" style="font-weight: bold; text-decoration: underline;">Datos reales</span>

            </div>

            <div class="details-title-block details-summary-item">

              <span class="details-title-item">Precio</span>

              <span class="details-title-item">$ {{orderDataShow.attributes.real_price|currency}}</span>

            </div>

            <div class="details-title-block details-summary-item" v-if="orderDataShow.attributes.is_from_grabr_flag && orderDataShow.attributes.grabrOrder.attributes.reward_discount!=null">

              <span class="details-title-item">Reward / Discount</span>

              <span class="details-title-item">$ {{orderDataShow.attributes.grabrOrder.attributes.reward_discount|currency}}</span>

            </div>

            <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_linio_flag && orderDataShow.attributes.linioOrder.attributes.reward_discount!=null">

              <span class="details-title-item">Reward / Discount</span>

              <span class="details-title-item">$ {{orderDataShow.attributes.linioOrder.attributes.reward_discount|currency}}</span>

            </div>

            <div class="details-title-block details-summary-item" v-else-if="orderDataShow.attributes.is_from_meli_flag && orderDataShow.attributes.meliOrder.attributes.reward_discount!=null">

              <span class="details-title-item">Reward / Discount</span>

              <span class="details-title-item">$ {{orderDataShow.attributes.meliOrder.attributes.reward_discount|currency}}</span>

            </div>

            <div class="details-title-block details-summary-item">

              <span class="details-title-item">Tax</span>

              <span class="details-title-item">$ {{orderDataShow.attributes.real_tax|currency }}</span>

            </div>

            <div class="details-title-block details-summary-item">

              <span class="details-title-item">Shipping</span>

              <span class="details-title-item">$ {{orderDataShow.attributes.real_shipping|currency}}</span>

            </div>

            <div class="details-title-block details-summary-item">

              <span class="details-title-item">Fob (Subtotal)</span>

              <span class="details-title-item">$ {{fob|currency}}</span>

            </div>

            <div class="details-title-block details-summary-item" v-if="">
              <span class="details-title-item">Seguro</span>
              <span class="details-title-item">$ {{securityCost|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-if="">
              <span class="details-title-item">Flete</span>
              <div v-if="!this.costingMethodFlag">
                <span></span>
                <span class="details-title-item">$ {{fleteCost|currency}}</span>
              </div>
              <div style="width:25%" v-else>
                <input
                class="form-control null"
                v-model="fleteCost"
                v-floatonly
                @keyup.enter="updatePurchaseOrder"
                @keyup="calculated()">
              </div>
            </div>

            <div class="details-title-block details-summary-item" v-if="">
              <span class="details-title-item">CIF (Subtotal 2)</span>
              <span class="details-title-item">$ {{cif|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-if="">
              <span class="details-title-item"
                v-b-popover.hover.top="'Ad Valorem: $ ' + adValorem +
                                      '\nIGV: $ ' + igv +
                                      '\nIPM: $ ' + ipm">Impuestos</span>
              <span class="details-title-item">$ {{adValorem + igv + ipm|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item">
              <span class="details-title-item"
                v-b-popover.hover.top="'Guía: $8.00' + '\nIGV: $1.44'">Trámite Aduanero</span>
              <span class="details-title-item">$ {{customsProcedure|currency}}</span>
            </div>

            <div class="details-title-block details-summary-item" v-if="">
              <span class="details-title-item">Costo Total</span>
              <span class="details-title-item">$ {{costoTotal|currency}}</span>
            </div>

            <div v-if="orderDataShow.attributes.is_from_grabr_flag" class="details-title-block details-summary-item">

              <span class="details-title-item" v-b-popover.hover.top="Number(Math.round(parseFloat(((orderDataShow.attributes.evaluation_info.attributes.grabr_total + orderDataShow.attributes.grabrOrder.attributes.debit - (orderDataShow.attributes.evaluation_info.attributes.real_total_cost))*100)/(orderDataShow.attributes.grabrOrder.attributes.grabr_price+orderDataShow.attributes.grabrOrder.attributes.grabr_tax+orderDataShow.attributes.grabrOrder.attributes.grabr_fee + orderDataShow.attributes.grabrOrder.attributes.debit)) + 'e2') + 'e-2').toFixed(2).toString() + '%'">Utilidad</span>

              <span class="details-title-item">$ {{orderDataShow.attributes.evaluation_info.attributes.grabr_total + orderDataShow.attributes.grabrOrder.attributes.debit - (orderDataShow.attributes.evaluation_info.attributes.real_total_cost)|currency}}</span>

            </div>

            <div v-else-if="orderDataShow.attributes.is_from_linio_flag" class="details-title-block details-summary-item">

              <span class="details-title-item" v-b-popover.hover.top="Number(Math.round(parseFloat(((orderDataShow.attributes.linio_evaluation_info.attributes.linio_total + orderDataShow.attributes.linioOrder.attributes.debit - (orderDataShow.attributes.linio_evaluation_info.attributes.real_total_cost))*100)/(orderDataShow.attributes.linioOrder.attributes.linio_price + orderDataShow.attributes.linioOrder.attributes.debit)) + 'e2') + 'e-2').toFixed(2).toString() + '%'">Utilidad</span>

              <span class="details-title-item">$ {{orderDataShow.attributes.linioOrder.attributes.linio_price_dollar - (cif + (adValorem + igv + ipm) + customsProcedure)|currency}}</span>

            </div>

            <div v-else-if="orderDataShow.attributes.is_from_meli_flag" class="details-title-block details-summary-item">

              <span class="details-title-item" v-b-popover.hover.top="Number(Math.round(parseFloat(((orderDataShow.attributes.meli_evaluation_info.attributes.meli_total + orderDataShow.attributes.meliOrder.attributes.debit - (orderDataShow.attributes.meli_evaluation_info.attributes.real_total_cost))*100)/(orderDataShow.attributes.meliOrder.attributes.meli_price_dollar + orderDataShow.attributes.meliOrder.attributes.debit)) + 'e2') + 'e-2').toFixed(2).toString() + '%'">Utilidad</span>

              <span class="details-title-item">$ {{orderDataShow.attributes.meliOrder.attributes.meli_price_dollar - (cif + (adValorem + igv + ipm) + customsProcedure)|currency}}</span>

            </div>

          </div>

          <div class="details-title-container">

            <div class="details-title-block details-summary-item summary-block-total">

              <span class="details-title-item">Total</span>

              <span class="details-title-item" v-if="orderDataShow.attributes.is_from_linio_flag">$ {{orderDataShow.attributes.linioOrder.attributes.linio_price_dollar|currency}}</span>

              <span class="details-title-item" v-else-if="orderDataShow.attributes.is_from_meli_flag">$ {{orderDataShow.attributes.meliOrder.attributes.meli_price_dollar|currency}}</span>

            </div>

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
  props: ['orderDataShow'],
  data() {
    return {
      realPrice: '',
      realTax: '',
      realShipping: '',
      fob:'',
      securityCost: '',
      fleteCost: '',
      cif: '',
      adValorem: '',
      igv: '',
      ipm: '',
      customsProcedure: '',
      customsProcedureConstant:9.44, 
      costoTotal: '',
      costingMethodFlag: false,
      costingMethod: '',
    }
  },
  created(){
    // Listening del método de costeo
    eventBus.$on('costing-method', this.setData);
    // Listening del método de costeo al guardar cambios
    eventBus.$on('updatePurchaseOrder', this.updatePurchaseOrder);
    this.initTableResume();
    eventBus.$on('change-cancel', this.changeCancel);
  },
  methods: {
    initTableResume(){
      this.realPrice = this.orderDataShow.attributes.real_price;
      this.realTax = this.orderDataShow.attributes.real_tax;
      this.realShipping = this.orderDataShow.attributes.real_shipping;
      this.fob = this.orderDataShow.attributes.fob;
      this.securityCost = this.orderDataShow.attributes.security_cost;
      this.fleteCost = this.orderDataShow.attributes.flete_cost;
      this.cif = this.orderDataShow.attributes.cif;
      this.adValorem = this.orderDataShow.attributes.ad_valorem;
      this.igv = this.orderDataShow.attributes.igv;
      this.ipm = this.orderDataShow.attributes.ipm;
      this.customsProcedure =this.orderDataShow.attributes.customs_procedure;
      this.costoTotal = this.orderDataShow.attributes.cif + (this.orderDataShow.attributes.ad_valorem +
                        this.orderDataShow.attributes.igv + this.orderDataShow.attributes.ipm) +
                        this.orderDataShow.attributes.customs_procedure;
      this.costingMethodFlag = false;
      this.costingMethod = this.orderDataShow.attributes.costing_method;
    },
    // esto se dará cuando se optimice el código
    /*validate(){
      if(this.orderDataShow.attributes.is_from_linio_flag) {
        this.securityCostStore = this.orderDataShow.attributes.linioOrder.attributes.linio_security_cost;
      } else if(this.orderDataShow.attributes.is_from_meli_flag) {
        this.securityCostStore = this.orderDataShow.attributes.meliOrder.attributes.meli_security_cost;
      }
    },*/
    setData(newCostingMethod){
      if(newCostingMethod == 1){
        this.costingMethodFlag = false;
        this.costingMethod = newCostingMethod;

        this.securityCost = Number(Math.round((0.0075 * this.fob)+ 'e2') + 'e-2');
        this.fleteCost = 7 * this.orderDataShow.attributes.weight_kg;
        this.cif = this.fob + this.securityCost + Number(this.fleteCost);
        this.adValorem = Number(Math.round(0.04 * this.cif));
        this.igv = Number(Math.round(0.16 * this.cif + this.adValorem));
        this.ipm = Number(Math.round(0.02 * this.cif + this.adValorem));
        this.customsProcedure = 9.44;
        this.costoTotal = this.cif + (this.adValorem + this.igv + this.ipm) + this.customsProcedure;

      } else if(newCostingMethod == 2 || newCostingMethod == 3) {
        this.costingMethodFlag = true;
        this.costingMethod = newCostingMethod;

        this.securityCost = 0;
        this.fleteCost = 0;
        this.cif = this.fob + this.fleteCost + this.securityCost;
        this.adValorem = 0;
        this.igv = 0;
        this.ipm = 0;
        this.customsProcedure = 0;
        this.costoTotal = this.cif + this.customsProcedure; // + advalorem+igv+ipm que son 0
      }
    },
    calculated(){
      this.cif = this.fob + this.securityCost + Number(this.fleteCost);
      this.costoTotal = this.cif + (this.adValorem + this.igv + this.ipm) + this.customsProcedure;
    },
    async updatePurchaseOrder(){
      let purchaseOrder = new Object();
      purchaseOrder.costing_method = this.costingMethod;
      purchaseOrder.security_cost = this.securityCost;
      purchaseOrder.flete_cost = this.fleteCost;
      purchaseOrder.customs_procedure =  this.customsProcedure;
      purchaseOrder.adValorem = this.adValorem;
      purchaseOrder.igv = this.igv;
      purchaseOrder.ipm = this.ipm;
      let resp = await ordersService.updateBuyingOrderNoGrabr(
        this.orderDataShow.attributes.order_code,
        purchaseOrder
      )
      this.$emit('inicialize-data');
      this.costingMethodFlag=false;
      // avisa al componente order-important que quite el input de costingMethod
      eventBus.$emit('changeFlag');
    },
    changeCancel(){
      this.initTableResume();
      this.costingMethodFlag = false
    }
  }
}
</script>
