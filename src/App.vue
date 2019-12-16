<template>
  <div id="app">
    <nav-bar></nav-bar>
    <br />
    <router-view />

    <new-content-available-toastr
      v-if="newContentAvailable"
      class="new-content-available-toastr"
      :refreshing-app="refreshingApp"
      @refresh="serviceWorkerSkipWaiting"
    ></new-content-available-toastr>
    <apple-add-to-home-screen-modal
      v-if="showAddToHomeScreenModalForApple"
      class="apple-add-to-home-screen-modal"
      @close="closeAddToHomeScreenModalForApple(false)"
    ></apple-add-to-home-screen-modal>
  </div>
</template>
<script>
import NavBar from '@/components/NavBar'
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import { mapState, mapActions, mapGetters } from 'vuex'
import 'firebase/firestore'

export default {
  components: { NavBar, NewContentAvailableToastr, AppleAddToHomeScreenModal },
  data() {
    return {
      user: ''
    }
  },
  computed: {
    ...mapGetters('app', ['newContentAvailable']),
    ...mapState('app', ['showAddToHomeScreenModalForApple', 'refreshingApp'])
  },
  // beforeCreate() {
  //   const db = firebase.firestore()
  //   console.log('nothing gets called before me')
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       const userInfo = db.collection('users').doc(user.uid)
  //       userInfo.get().then(doc => {
  //         if (doc.exists) {
  //           this.user = doc.data()
  //           console.log('Document:', this.user)
  //         } else {
  //           console.log('No data')
  //         }
  //       })
  //     } else {
  //       // No user is signed in.
  //     }
  //   })
  // },
  methods: {
    ...mapActions('app', [
      'closeAddToHomeScreenModalForApple',
      'serviceWorkerSkipWaiting'
    ])
  }
}
</script>

<style lang="scss"></style>
