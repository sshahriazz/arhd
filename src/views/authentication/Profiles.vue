<template>
  <div v-if="networkOnLine">
    <CustomerProfile v-if="!user.isSeller"></CustomerProfile>
    <SellerProfile v-if="user.isSeller"></SellerProfile>
    <ProductForm />
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
  computed: {
    ...mapState('app', ['networkOnLine']),
    ...mapState('authentication', ['user'])
  }
}
</script>

<style scoped></style>
