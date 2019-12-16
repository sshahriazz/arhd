<template>
  <b-navbar toggleable="md" type="light" variant="light">
    <router-link to="/home">
      <b-navbar-brand>
        <img
          height="24px"
          padding-right="8px"
          alt="logo-bento"
          class="logo"
          src="@/assets/img/bento-starter.svg"
        />
        <span class="site-name title-desktop">{{ appTitle }}</span>
      </b-navbar-brand>
    </router-link>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/products">Products</router-link>
        </b-nav-item>
        <b-nav-item v-if="user.isSeller">
          <router-link to="/inventory">Inventory</router-link>
        </b-nav-item>
        <b-nav-item v-if="!user.isSeller && user">
          <router-link to="/bseller">Become a seller</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="user && networkOnLine" @click="logout"
          >Logout</b-nav-item
        >
        <b-nav-item v-if="!user && networkOnLine">
          <router-link to="/signin">Signin</router-link>
        </b-nav-item>
        <b-nav-item v-if="!user && networkOnLine">
          <router-link to="/signup">Register</router-link>
        </b-nav-item>
        <div v-if="!networkOnLine" class="nav-item offline-label">Offline</div>
        <b-nav-item>
          <router-link to="/profile">
            <b-img
              v-if="user && networkOnLine"
              width="35"
              height="35"
              class="m1"
              rounded="circle"
              :src="user.photoURL"
              alt="Avatar"
            />
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      user: ''
    }
  },
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle'])
  },
  beforeCreate() {
    const db = firebase.firestore()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userInfo = db.collection('users').doc(user.uid)
        userInfo.get().then(doc => {
          if (doc.exists) {
            this.user = doc.data()
            console.log('Document:', this.user)
          } else {
            console.log('No data')
          }
        })
      } else {
        // No user is signed in.
      }
    })
  },

  methods: {
    async logout() {
      this.user = ''
      await firebase.auth().signOut()
      this.$router.push('/signin')
    }
  }
}
</script>
