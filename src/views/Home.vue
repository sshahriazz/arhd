<template>
  <b-container fluid class="p-3 bg-light">
    <b-row>
      <b-col sm="12" md="12" lg="8" offset-lg="2">
        <carousel />
      </b-col>
    </b-row>
    <br />
    <legend>Menus</legend>
    <hr />
    <Menus />
  </b-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Carousel from '@/components/misc/Carousel.vue'
import Menus from '@/components/misc/Menus.vue'

export default {
  components: { Carousel, Menus },
  data() {
    return {}
  },
  head: function() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapState('app', ['appTitle']),
    ...mapState('authentication', ['user']),
    ...mapGetters('authentication', ['isUserLoggedIn'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';
</style>
