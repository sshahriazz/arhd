<template>
  <div v-if="networkOnLine">
    <h1>From auth profile page.</h1>
    <CustomerProfile></CustomerProfile>
    <SellerProfile></SellerProfile>
  </div>
</template>

<script>
import CustomerProfile from '@/components/customer/CustomerProfile'
import SellerProfile from '@/components/seller/SellerProfile'
import { mapState } from 'vuex'

export default {
  components: {
    CustomerProfile,
    SellerProfile
  },
  data() {
    return {
      offline: true
    }
  },
  computed: mapState('app', ['networkOnLine'])
}
</script>

<style scoped></style>
