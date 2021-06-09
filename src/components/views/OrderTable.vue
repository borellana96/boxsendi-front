<template>

  <div class="main-content">

    <breadcrumb :nameSection="nameSection" :listRoutes="listRoutes"></breadcrumb>

    <div class="form-content">

      <div class="form-content-title">

        <div class="form-content-title-block form-title">

          <div class="form-title-block form-title-principal">

            <span>Órdenes de compra</span>

          </div>

          <div class="form-title-block" v-if="$store.state.user.attributes.permissions_keys.includes(8)">

            <b-button v-b-modal.formmodal class="btn btn-primary" ><i class="fas fa-plus"></i>Nueva orden</b-button>

          </div>

        </div>

        <div class="form-content-title-block filter-container">

          <div class="filter-block filter-block-various">

              <label>Buscar por:</label>

              <div class="filter-block-content">
                 <select
                  id="select-search"
                  class="form-control"
                  v-model="tableData.filterBy"
                  @change="cleanInput()"
                >
                  <option value="all">Todos</option>
                  <option
                    :value="option.name"
                    v-for="(option) in filterColumns"
                    :key="option.id"
                  >{{option.label}}</option>
                </select>

                <input
                  id="search-bar"
                  type="search"
                  class="form-control"
                  v-model="tableData.filterValue"
                  placeholder="Buscar..."
                  @keyup="getPurchaseOrdersByPage()"
                >
              </div>
          </div>

          <div class="filter-block filter-block-alone">

            <label>Estado:</label>

            <div class="multiselect form-control" id="checkboxes2">

              <div class="selectBox" @click="showCheckboxes" >
                <select class="kt-form__label">
                  <option>Seleccionar</option>
                </select>

                <div class="overSelect"></div>
              </div>

              <div id="checkboxes">
                <label class="check-filter" for="one">
                  <input
                    type="checkbox"
                    class="checkbox-style box-check"
                    v-model="tableData.statusFlag.initialize"
                    @change="getPurchaseOrdersByPage()"
                  >Inicializando
                </label>
                <label class="check-filter" for="two">
                  <input
                    type="checkbox"
                    class="checkbox-style box-check"
                    v-model="tableData.statusFlag.in_proccess"
                    @change="getPurchaseOrdersByPage()"
                  >En proceso
                </label>
                <label class="check-filter" for="three">
                  <input
                    type="checkbox"
                    class="checkbox-style box-check"
                    v-model="tableData.statusFlag.finished"
                    @change="getPurchaseOrdersByPage()"
                  >Finalizado
                </label>
                <label class="check-filter" for="four">
                  <input
                    type="checkbox"
                    class="checkbox-style box-check"
                    v-model="tableData.statusFlag.cancelled"
                    @change="getPurchaseOrdersByPage()"
                  >Cancelado
                </label>
              </div>

            </div>

          </div>

          <div class="filter-bloc filter-block-alone">
              <label>Tipo de orden:</label>
              <select
                class="form-control"
                v-model="tableData.order_type"
                @change="getPurchaseOrdersByPage()"
              >
                <option :value="5" selected>Todo</option>
                <option
                  :value="1"
                  data-content="<span class='badge badge-info'>Ofertas de Grabr</span>"
                >Grabr</option>
                <option
                  :value="2"
                  data-content="<span class='badge badge-warning'>Ofertas no Grabr</span>"
                >Direct</option>
                <option
                  :value="3"
                  data-content="<span class='badge badge-warning'>Ofertas no Grabr</span>"
                >Linio</option>
                <option
                  :value="4"
                  data-content="<span class='badge badge-warning'>Ofertas no Grabr</span>"
                >Meli</option>
              </select>
          </div>
        </div>

         <div class="filter-bloc " v-if="tableData.order_type === 4">
              <div class="wrap">
                <form action="" class="formulario">
                  <div class="radio">


                    <input type="radio"  id="todo" :value="null"  v-model="tableData.store" @change="getPurchaseOrdersByPage()">
                    <label for="todo">Todo</label>

                    <input type="radio"  id="electro" :value="'electro'" v-model="tableData.store" @change="getPurchaseOrdersByPage()">
                    <label for="electro">Electro</label>

                    <input type="radio"  id="clothing" :value="'clothing'" v-model="tableData.store" @change="getPurchaseOrdersByPage()">
                    <label for="clothing">Clothing</label>

                    <input type="radio"  id="homegarden" :value="'homegarden'" v-model="tableData.store" @change="getPurchaseOrdersByPage()">
                    <label for="homegarden">Homegarden</label>


                  </div>
                </form>
              </div>
          </div>
</div>

      <!--circle-spin v-if="is_loading"></circle-spin>-->

      <div class="table-orders">

        <data-table
          :columns="columns"
          :sortKey="sortKey"
          :sortOrders="sortOrders"
          @sort="sortBy"
          v-if="is_loading == false"
        >
          <tbody v-if="purchaseOrders!=null && purchaseOrders.length > 0" >

            <router-link :to="{ name: 'show-purchase-order',params: { id: purchaseOrder.id, orderData: purchaseOrder }}" v-for="(purchaseOrder) in purchaseOrders" :key="purchaseOrder.id">

              <tr>

                <td>

                    <div class="image-table">

          <img v-if="purchaseOrder.attributes.product_image_url==null && purchaseOrder.attributes.is_from_meli_flag" :src="'https://pngimage.net/wp-content/uploads/2018/06/producto-icono-png-3.png'" width="180px" height="260px" >
          <img v-else-if="purchaseOrder.attributes.product_image_url==null && purchaseOrder.attributes.is_from_linio_flag" src="/static/img/linio-logo.png" width="180px" height="260px" >
          <img v-else :src="purchaseOrder.attributes.product_image_url" width="180px" height="260px" >

                    </div>

                    <div class="description-title">

                      <span class="description-title-principal">{{purchaseOrder.attributes.product_info}}</span>

                      <!-- <div>
                        <span class="code-order system-code">SB #{{purchaseOrder.attributes.order_code}}</span>

                        <span class="code-order grabr-code" v-if="purchaseOrder.attributes.is_from_linio_flag"> #{{purchaseOrder.attributes.linioOrder.attributes.linio_order_id}}</span>

                        <span class="code-order grabr-code" v-else-if="purchaseOrder.attributes.is_from_meli_flag"> #{{purchaseOrder.attributes.meliOrder.attributes.meli_order_id}}</span>
                      </div> -->

                      <!-- <div v-if="purchaseOrder.attributes.is_from_grabr_flag" class="grabr-des">

                        <span class="badge badge-primary badge-grabr">Grabr</span>

                        <span class="code-order grabr-code" @click="toGrabrDetail(purchaseOrder.attributes.grabrOrder.attributes.grabr_order_number)" >{{purchaseOrder.attributes.grabrOrder.attributes.grabr_order_number}}</span>

                      </div> -->

                      <!-- <div v-else-if="purchaseOrder.attributes.is_from_linio_flag" class="grabr-des"> -->

                        <!-- <span class="badge badge-primary badge-linio">Linio</span> -->

                        <!-- <span class="code-order grabr-code" v-b-popover.hover.top="'Codigo del Partner' " @click="toGrabrDetail(purchaseOrder.attributes.grabrOrder.attributes.grabr_order_number)" >{{purchaseOrder.attributes.grabrOrder.attributes.grabr_order_number}}</span> -->

                      <!-- </div> -->

                      <!-- <div v-else-if="purchaseOrder.attributes.is_from_meli_flag" class="grabr-des">

                        <span class="badge badge-primary badge-meli  ">Mercado libre</span>
                        <span class="badge badge-primary badge-store bg-primary" v-if="purchaseOrder.attributes.meliOrder.attributes.store ==='electro'">{{purchaseOrder.attributes.meliOrder.attributes.store}} </span>
                        <span class="badge badge-primary badge-store bg-success" v-if="purchaseOrder.attributes.meliOrder.attributes.store ==='homegarden'">{{purchaseOrder.attributes.meliOrder.attributes.store}} </span>
                        <span class="badge badge-primary badge-store brown" v-if="purchaseOrder.attributes.meliOrder.attributes.store ==='clothing'">{{purchaseOrder.attributes.meliOrder.attributes.store}} </span>
                      </div> -->

                    </div>

                </td>

                <td>

                  <span class="">{{purchaseOrder.attributes.product_specimens}}</span>

                </td>

                <td v-if="purchaseOrder.attributes.origin != undefined && purchaseOrder.attributes.destination!= undefined">

                  <div class="ruta-order-container">

                    <div class="ruta-order-block ruta-order-image">

                      <img src="/static/img/ruta.svg" alt="">

                    </div>

                    <div class="ruta-order-block ">

                        <div class="ruta-order-content">
                          <span>{{purchaseOrder.attributes.origin.attributes.name}}</span>
                        </div>

                        <div class="ruta-order-content">
                          <span>{{purchaseOrder.attributes.destination.attributes.name}}</span>
                        </div>

                      </div>

                  </div>

                </td>

                <td v-else>

                  <span class="ruta-order">No se ha definido</span>

                </td>

                <td>

                  <!-- <div class="order-tag-container">

                    <span class="order-tag order-init" v-if="purchaseOrder.attributes.status >=1 && purchaseOrder.attributes.status <= 3" >Inicializando</span>

                    <span class="order-tag order-process" v-else-if="purchaseOrder.attributes.status > 3 && purchaseOrder.attributes.status < 10" >En proceso</span>

                    <span class="order-tag order-cancel" v-else-if="purchaseOrder.attributes.status == 10" >Cancelado</span>

                    <span class="order-tag order-message" v-if="purchaseOrder.attributes.status < 10 && purchaseOrder.attributes.status != 4">{{statusArray[purchaseOrder.attributes.status]}}</span>

                    <span class="order-tag order-message" v-if="purchaseOrder.attributes.status < 10 && purchaseOrder.attributes.status == 4" >{{purchaseOrder.attributes.origin != undefined ? statusArray[purchaseOrder.attributes.status] +" ("+ purchaseOrder.attributes.origin.attributes.name +")" :"Ciudad origen no definida"}}</span>

                    <span class="" v-else>{{cancelledReasonFlagArray[purchaseOrder.attributes.cancelled_reason_flag]}}</span>

                  </div> -->

                </td>

                <td v-if="purchaseOrder.attributes.hasOwnProperty('promised_delivery_date')">

                  <span class="">{{purchaseOrder.attributes.promised_delivery_date|spanishDate}}</span>

                </td>

                <td v-else>

                  <span class="">No definido</span>

                </td>

              </tr>

            </router-link>

          </tbody>

          <tbody  v-else>

            <div class="no-results">

              <h1>No se encontraron resultados</h1>

            </div>

          </tbody>

        </data-table>

      </div>

    </div>

      <pagination
        :pagination="pagination"
        @changePagination="getPurchaseOrdersByPage"
        v-if="is_loading == false"
      ></pagination>

      <!-- //////////////////////modal////////////////////// -->
      <b-modal id="formmodal" ref="formmodal" centered hide-footer hide-header>
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">Nueva oferta de compra</h5>
          <button type="button" class="close" aria-label="Close" block @click="hideModal">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" id="modal-body">
          <div class="form-login text-title">
            <div class="form-group">
              <label for class="float-left">Seleccione de donde proviene la oferta</label>
              <select class="form-control form-control-lg" v-model="grabr.id">
                <option
                  v-if="$store.state.user.attributes.permissions_keys.includes(6)"
                  value="1"
                >Órdenes GRABR</option>
                <option
                  v-if="$store.state.user.attributes.permissions_keys.includes(7)"
                  value="2"
                >Órdenes DIRECT</option>
              </select>
            </div>
            <!-- <div class="check-grabr">
                    <label for class="float-left">
                      Seleccione tipo de subida
                      <i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip "></i>
                    </label>
                    <div class="form-check check-2">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1">
                      <label class="form-check-label" for="exampleCheck1">Subida manual</label>
                    </div>
                    <div class="form-check check-2">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1">
                      <label class="form-check-label" for="exampleCheck1">Subida masiva (Excel)</label>
                    </div>
            </div>-->
          </div>
        </div>
        <div class="modal-footer text-right">
          <router-link :to="{ name: 'add-purchase-order', params: { grabr: grabr, oldID: null } }">
            <button type="button" class="btn btn-primary">Continuar</button>
          </router-link>
        </div>
      </b-modal>

  </div>
</template>

<script>
import breadcrumb from '@/components/prefab/structures/breadcrumb.vue'
import DataTable from './DataTable.vue'
import Pagination from './Pagination.vue'
import axios from 'axios'
export default {
  components: { DataTable, Pagination, breadcrumb },
  created() {
    if (!this.$store.state.user.attributes.permissions_keys.includes(6)) {
      this.grabr.id = '2'
    }
    if (this.purchaseOrders == null) {
      this.is_loading = true
    }
    this.getPurchaseOrders()
  },
  data() {
    // eslint-disable-next-line no-unused-vars
    let statusGroupArray = {
      1: 'Todos',
      10: 'Inicializando',
      20: 'En proceso',
      30: 'Cancelado',
      40: 'Finalizado'
    }
    // eslint-disable-next-line no-unused-vars
    let statusArray = {
      1: 'En evaluación',
      2: 'Esperando confirmación de evaluación',
      3: 'Completando información adicional',
      4: 'En camino a origen',
      5: 'En origen y evaluación de recepción',
      6: 'Listo para embarcar',
      7: 'En embarque',
      8: 'Entregado correctamente',
      9: '',
      10: 'Cancelado'
    }
    // eslint-disable-next-line no-unused-vars
    let cancelledReasonFlagArray = {
      1: 'Por decisión propia',
      2: 'Por incidencia de tracking'
    }
    let sortOrders = {}
    let columns = [
      //{ label: 'Imagen', name: 'product_image_url', visible: true },
      { label: 'Código SB', name: 'order_code', visible: false },
      { label: 'Código Partner', name: 'grabr_code', visible: false },
      { label: 'Nombre de cliente', name: 'client_name', visible: false },
      { label: 'DNI Cliente', name: 'client_dni', visible: false },
      { label: 'ID Cliente Grabr', name: 'grabr_client_id', visible: false },
      { label: 'Producto', name: 'product_info', visible: true },
      { label: 'Cant.', name: 'product_specimens', visible: true },
      { label: 'Ruta', name: 'route', visible: true },
      { label: 'Destino', name: 'destination', visible: false },
      { label: 'Estado', name: 'status', visible: true },
      { label: 'Nro. Tracking', name: 'tracking_number', visible: false },
      { label: 'Fecha de entrega', name: 'promised_delivery_date', visible: true }
    ]
    columns.forEach(column => {
      sortOrders[column.name] = -1
    })
    return {
      purchaseOrders: null,
      columns,
      statusGroupArray,
      statusArray,
      cancelledReasonFlagArray,
      sortKey: 'promised_delivery_date',
      sortOrders: sortOrders,
      filterKey: '',
      expanded: false,
      tableData: {
        statusFlag: { initialize: true, in_proccess: true, cancelled: true, finished:true }, // 0: Inicializando, 1: En proceso, 2: Cancelado, 3: Finalizado
        draw: 0,
        length: 10,
        status: '',
        orderBy: 'promised_delivery_date',
        dir: 'desc',
        filterBy: 'all',
        page: 1,
        filterValue: null, // no hay ningun valor por el cual filtrar
        order_type: 5 // órdenes de Grabr y no Grabr
      },
      pagination: {
        lastPage: '',
        currentPage: '',
        total: '',
        lastPageUrl: '',
        nextPageUrl: '',
        prevPageUrl: '',
        from: '',
        to: ''
      },
      grabr: {
        id: '1'
      },
      is_loading: true,
      nameSection: 'Órdenes de compra',
      listRoutes: [{ nameRoute: 'Orders', titleRoute: 'Órdenes de compra' }]
    }
  },
  methods: {

    toGrabrDetail(code){
      console.log("hacia el detalle de grabr")
      let linkToGrabr = 'https://grabr.io/es/grabs/'+code
      window.location = linkToGrabr


    },
    showCheckboxes() {
      var checkboxes = document.getElementById('checkboxes')
      if (!this.expanded) {
        checkboxes.style.display = 'block'
        this.expanded = true

      } else {
        checkboxes.style.display = 'none'
        this.expanded = false

      }
      window.addEventListener('click', function(e){
          if (document.getElementById('checkboxes2').contains(e.target)){
              checkboxes.style.display = 'block'
          } else{
              checkboxes.style.display = 'none'
          }
        })
    },
    getPurchaseOrders(url = '', fromPagination = false) {
      // 1: Ver todas las órdenes de compra, 2: Ver todas las órdenes de compra por operador, 3: Ver todas las órdenes de compra por cliente
      console.log('Cargando todas las PurchasOrders')
      this.is_loading = true
      this.tableData.draw++
      let permissions = this.$store.state.user.attributes.permissions_keys
      if (!fromPagination) {
        if (permissions.includes(1)) {
          url = process.env.API_URL + '/api/purchaseOrder/list-orders-all'
        } else if (permissions.includes(2)) {
          url =
            process.env.API_URL +
            '/api/purchaseOrder/' +
            this.$store.state.user.id +
            '/list-orders-by-operator'
        } else if (permissions.includes(3)) {
          url =
            process.env.API_URL +
            '/api/purchaseOrder/' +
            this.$store.state.user.id +
            '/list-orders-by-client'
        } else {
          alert('El usuario no tiene permisos para ver órdenes de compra')
          return
        }
      }
      console.log('URL: ' + url)
      console.log('Viene de una paginación? : ' + fromPagination)
      console.log('Table data : ')
      this.tableData.status = this.statusComputed
      console.log(this.tableData)
      // eslint-disable-next-line no-unreachable
      axios
        .get(url, { params: fromPagination ? {} : this.tableData })
        .then(response => {
          let data = response.data
          console.log(data)
          if (this.tableData.draw === data.meta.draw || fromPagination) {
            console.log('there are sync or if from pagination')
            this.purchaseOrders = data.data
            this.configPagination(data)
            this.is_loading = false
          } else {
            console.log('out of sync')
            this.is_loading = false
          }
        })
        .catch(errors => {
          console.log(errors)
          console.log(errors.response)
          console.log('error')
          // alert('No se obtuvieron resultados')
          this.purchaseOrders = null
          this.is_loading = false
          return
        })
    },
    getPurchaseOrdersByPage(page = 1) {
      // 1: Ver todas las órdenes de compra,
      // 2: Ver todas las órdenes de compra por operador
      // 3: Ver todas las órdenes de compra por cliente
      console.log('getPurchaseOrders')
      this.is_loading = true
      this.tableData.draw++
      this.tableData.page = page

      let permissions = this.$store.state.user.attributes.permissions_keys
      let url = ''
      if (permissions.includes(1)) {
        url = process.env.API_URL + '/api/purchaseOrder/list-orders-all'
      } else if (permissions.includes(2)) {
        url =
          process.env.API_URL +
          '/api/purchaseOrder/' +
          this.$store.state.user.id +
          '/list-orders-by-operator'
      } else if (permissions.includes(3)) {
        url =
          process.env.API_URL +
          '/api/purchaseOrder/' +
          this.$store.state.user.id +
          '/list-orders-by-client'
      } else {
        // alert('El usuario no tiene permisos para ver órdenes de compra')
        return
      }
      this.tableData.status = this.statusComputed



      // eslint-disable-next-line no-unreachable
      axios
        .get(url, { params: this.tableData })
        .then(response => {
          let data = response.data

          if (this.tableData.draw === data.meta.draw) {
            console.log('RESPONSE:')

            console.log('there are sync')
            console.log('Table data : ')
            console.log(this.tableData)
            console.log(data)

            console.log('=======================')

            this.purchaseOrders = data.data
            this.configPagination(data)
            this.is_loading = false
            console.log('FIN RESPONSE')
          } else {
            console.log('ERROR:')

            console.log('out of sync')

            console.log(this.tableData)
            this.is_loading = false
            console.log('FIN ERROR')
          }
        })
        .catch(errors => {
          console.log(errors)
          console.log(errors.response)
          console.log('error')
          // alert('No se obtuvieron resultados')
          this.purchaseOrders = null
          this.is_loading = false
          return
        })
    },
    cleanInput() {
      this.tableData.filterValue = ''
      if (this.tableData.filterBy == 'all') {
        this.getPurchaseOrders()
      }
    },
    configPagination(data) {
      this.pagination.lastPage = data.meta.last_page
      this.pagination.currentPage = data.meta.current_page
      this.pagination.total = data.meta.total
      this.pagination.lastPageUrl = data.links.last
      this.pagination.nextPageUrl = data.links.next
      this.pagination.prevPageUrl = data.links.prev
      this.pagination.from = data.meta.from
      this.pagination.to = data.meta.to
      this.pagination.perPage = this.tableData.length
    },
    sortBy(key) {
      console.log('entro al sort', key)
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
      this.tableData.orderBy = this.sortKey
      /* this.tableData.orderBy = this.getIndex(this.columns, 'name', key) */
      console.log(
        'tableData.orderBy',
        this.tableData.orderBy,
        'tableData.dir',
        this.tableData.dir,
        this.sortOrders[key]
      )
      this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc'
      console.log(
        'tableData.orderBy',
        this.tableData.orderBy,
        'tableData.dir',
        this.tableData.dir
      )
      this.getPurchaseOrders()
      console.log('paso la peticion api')
    },
    getIndex(array, key, value) {
      return array.findIndex(i => i[key] === value)
    },
    hideModal() {
      this.$refs.formmodal.hide()
    }
    // toDetailView(data) {
    //   console.log(data)
    //   this.$router.push({
    //     name: 'show-purchase-order',
    //     params: { id: data.id, orderData: data }
    //   })
    // }
  },
  computed: {
    filterColumns() {
      let activeFilterColumns = [
        'product_info',
        'destination',
        'order_code',
        'tracking_number',
        'grabr_code',
        'client_name',
        'client_dni',
        'grabr_client_id'
      ]
      return this.columns.filter(i => activeFilterColumns.indexOf(i.name) > -1)
    },
    statusComputed() {
      console.log('statuscomputed')
      return JSON.stringify([this.tableData.statusFlag.initialize,this.tableData.statusFlag.in_proccess,this.tableData.statusFlag.cancelled,this.tableData.statusFlag.finished])
    }
  }
}
</script>

<style >
.brown{
  background: #6D4C41;
}
/* ----- ----- ----- ----- */


.formulario {
  /* --------------------------------------- */
  /* ----- Radio Button */
  /* --------------------------------------- */
  /* --------------------------------------- */
  /* ----- Checkbox */
  /* --------------------------------------- */ }
  .formulario h2 {
    font-size: 16px;
    color: #001F3F;
    margin-bottom: 20px;
    margin-left: 20px; }
  .formulario .radio label,
  .formulario .checkbox label {
    display: inline-block;
    cursor: pointer;
    position: relative;
    padding: 5px 15px 5px 51px;
    font-size: 1em;
    border-radius: 5px;
    -webkit-transition: all 0.3s ease;
    -o-transition: all 0.3s ease;
    transition: all 0.3s ease; }
    .formulario .radio label:hover,
    .formulario .checkbox label:hover {
      background: rgba(240, 235, 235, 0.1); }
    .formulario .radio label:before,
    .formulario .checkbox label:before {
      content: "";
      display: inline-block;
      width: 17px;
      height: 17px;
      position: absolute;
      left: 15px;
      border-radius: 50%;
      background: none;
      border: 3px solid  }
  .formulario input[type="radio"] {
    display: none; }
    .formulario input[type="radio"]:checked + label:before {
      display: none; }
    .formulario input[id="todo"]:checked + label {
      padding: 5px 15px;
      background: #b3a72b;
      border-radius: 2px;
      color: #fff; }
    .formulario input[id="electro"]:checked + label {
      padding: 5px 15px;
      background: #007bff;
      border-radius: 2px;
      color: #fff; }
          .formulario input[id="clothing"]:checked + label {
      padding: 5px 15px;
      background: #6D4C41;
      border-radius: 2px;
      color: #fff; }
          .formulario input[id="homegarden"]:checked + label {
      padding: 5px 15px;
      background: #28a745;
      border-radius: 2px;
      color: #fff; }

/*# sourceMappingURL=estilos.css.map */

</style>
