<template>
 
  <b-pagination
    v-if="pagination.total > 0"
    v-model="currentPage"
    :total-rows="this.pagination.total"
    :per-page="pagination.perPage"
    aria-controls="my-table"
  ></b-pagination>
</template>

<script>

export default {
  props: ['pagination'],
  created() {
    console.log('This is pagination component')
    console.log('per page: ' + this.pagination.perPage)
    console.log('current page: ' + this.pagination.currentPage)
    console.log('rows: ' + this.pagination.total)

    this.perPage = this.pagination.perPage
    this.currentPage = this.pagination.currentPage
    this.rows = this.pagination.total
  },
  
  data() {
    return {
      perPage: this.pagination.perPage,
      currentPage: this.pagination.currentPage,
      rows: this.pagination.total
    }
  },

  watch: {
    currentPage: function() {
      console.log('cambio')
      console.log(this.currentPage)
      this.$emit('changePagination', this.currentPage)
    }
  }
}
</script>
