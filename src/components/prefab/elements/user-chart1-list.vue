<template lang="html">
  <div class="">
    <div class="tableFilters" id="icon-search">

        <div class="form-content-title-block filter-container">

          <div class="filter-block filter-block-various">

            <label>Buscar por</label>

            <div class="filter-block-content">

                <select
                  id="select-search"
                  class="form-control form-search"
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
                  class="input form-control"
                  v-model="tableData.filterValue"
                  placeholder="Buscar..."
                  @keyup="getUsers()"
                >

            </div>
          </div>

        </div>

      <!-- <div class="filter filter-status status-ship">
        <div class="kt-form__label">
          <label>Estado:</label>
        </div>

        <div class="r">
          <select class="form-control" v-model="tableData.status" @change="getUsers()">
            <option
                :value="index"
                v-for="(option,index) in statusGroupArray"
                :key="index"
              >{{statusGroupArray[index]}}</option>
          </select>
        </div>
      </div> -->


    </div>

    <circle-spin v-if="is_loading"></circle-spin>

    <div class="table-ship" >

      <data-table :columns="columns" :sortKey="sortKey" :sortOrders="sortOrders" @sort="sortBy" v-if="is_loading == false">
        <tbody >
          <tr v-for="(user) in users" :key="user.id">
            <td><span>{{user.attributes.profile.attributes.document_number}}</span></td>
            <td><span>{{user.attributes.email}}</span></td>
            <td><span>{{user.attributes.profile.attributes.name}} {{user.attributes.profile.attributes.surnames}}</span></td>
            <td v-if="user.attributes.profile.attributes.gender === 'M'" >Masculino</span><span  v-if="user.attributes.profile.attributes.gender === 'F'" >Femenino</span></td>
            <td><span>{{user.attributes.profile.attributes.cellphone}}</span></td>
            <td><span>{{user.attributes.profile.attributes.birthdate}}</span></td>

          </tr>
        </tbody>

      </data-table>

    </div>

    <pagination
      :pagination="pagination"
      @changePagination="getUsers"
      v-if="is_loading == false"
    ></pagination>
  </div>
</template>

<script>
import DataTable from '@/components/views/DataTable.vue'
import Pagination from '@/components/views/Pagination.vue'
import axios from 'axios'
export default {
  components: { DataTable, Pagination },
  created() {
    this.getUsers()
  },
  data() {

    let sortOrders = {}
    let columns = [
      { label: 'Número de documento', name: 'document_number', visible: true },
      { label: 'Correo ', name: 'email', visible: true },
      { label: 'Nombres y apellidos', name: 'fullname', visible: true },
      { label: 'Género', name: 'gender', visible: true },
      { label: 'Número de celular', name: 'cellphone', visible: true },
      { label: 'Fecha de nacimiento', name: 'birthdate', visible: true }
    ]
    columns.forEach(column => {
      sortOrders[column.name] = -1
    })
    return {
      users: null,
      columns,
      sortKey: 'updated_at',
      sortOrders: sortOrders,
      filterKey: '',
      tableData: {
        draw: 1,
        length: 10,
        status: 1,
        orderBy: 'email',
        dir: 'asc',
        filterBy: 'all',
        filterValue: '', // no hay ningun valor por el cual filtrar
        page: 1
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
      is_loading: true,

    }
  },
  methods: {
    getUsers(page) {
      this.is_loading = true
      this.tableData.draw++
      this.tableData.page = page

      let url = process.env.API_URL + '/api/client/list'

      // eslint-disable-next-line no-unreachable
      axios
        .get(url, { params: this.tableData })
        .then(response => {
          let data = response.data

          if (this.tableData.draw === data.meta.draw) {
            this.users = data.data.clients_list
            console.log(this.users)

            this.configPagination(data)
            this.is_loading = false
          } else {
            console.log('out of sync')
            this.is_loading = false
          }
        })
        .catch(errors => {
          console.log(errors.response)
          alert('No se obtuvieron resultados')
          this.is_loading = false
          return
        })
    },
    cleanInput() {
      this.tableData.filterValue = ''
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
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
      this.tableData.orderBy = this.sortKey
      /* this.tableData.orderBy = this.getIndex(this.columns, 'name', key) */

      this.tableData.dir = this.sortOrders[key] === 1 ? 'asc' : 'desc'

      this.getUsers()
    },
    getIndex(array, key, value) {
      return array.findIndex(i => i[key] === value)
    },

  },
  computed: {
    filterColumns() {
      let activeFilterColumns = ['document_number', 'email','fullname','cellphone']
      return this.columns.filter(i => activeFilterColumns.indexOf(i.name) > -1)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
