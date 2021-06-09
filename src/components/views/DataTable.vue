<template>
 
  <table class="table ">
    <thead>
      <tr>
        <th
          v-for="(column) in filteredColumns"
          :key="column.name"
          
          :style="'width:' + column.width + ';' + 'cursor:pointer;'"
        ><span @click="$emit('sort', column.name)" :class="sortKey === column.name ? (sortOrders[column.name] > 0 ? 'sorting_asc' : 'sorting_desc') : 'sorting'">{{column.label}}</span></th>
      </tr>
    </thead>
    <slot></slot>
  </table>

</template>

<script>
export default {
  props: ['columns', 'sortKey', 'sortOrders'],
  computed: {
    filteredColumns() {
      return this.columns.filter(x => x.visible)
    }
  }
}
</script>

<style>
</style>
