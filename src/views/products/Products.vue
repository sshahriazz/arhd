<template>
  <div>
    <div v-if="!user.isSeller">You dont have the permission.</div>
    <AddProduct v-if="user.isSeller && networkOnLine" />
  </div>
</template>

<script>
import AddProduct from '@/components/products/AddProduct'
import { mapState } from 'vuex'

export default {
  components: { AddProduct },
  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapState('authentication', ['user'])
  }
}
</script>

<style></style>
