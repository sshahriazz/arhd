<template>
  <ProductList />
</template>

<script>
import { mapState } from 'vuex'
import ProductList from '@/components/products/ProductList'

export default {
  components: { ProductList },
  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapState('authentication', ['user'])
  }
}
</script>

<style></style>
