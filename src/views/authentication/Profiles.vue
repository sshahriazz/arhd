<template>
  <b-container>
    <b-row>
      <b-col v-if="userData.profile" sm-4 md-4 lg-4>
        <b-card body img-alt="Image" img-top>
          <template v-slot:header>
            <h4 class="mb-0">Name: {{ userData.profile.firstName }}</h4>
          </template>

          <b-card-body>
            <b-img
              fluid
              height="300px"
              width="250px"
              :src="userData.profile.profileImagesUrl"
            ></b-img>
            <b-card-title>About You</b-card-title>

            <b-card-text>{{ userData.profile.bio }}</b-card-text>
          </b-card-body>


          <b-card-body>
            <router-link to="/inventory" class="card-link"
              >Inventroy</router-link
            >
            <router-link to="/addproduct" class="card-link"
              >Add product</router-link
            >
            <router-link to="/updateprofile" class="card-link"
              >Edit Profile</router-link
            >
          </b-card-body>
        </b-card>
      </b-col>
      <b-col v-else sm-4 md-4 lg-4>
        <router-link to="/updateprofile" class="card-link">
          <p>You dont have a profile update profile</p>
          <b-btn block variant="primary">Edit Profile</b-btn>
        </router-link>
      </b-col>
      <b-col sm-6 md-6 lg-6> </b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

export default {
  data() {
    return {
      userData: null
    }
  },
  beforeMount() {
    const db = firebase.firestore()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        db.collection('profiles')
          .doc(user.uid)
          .onSnapshot(doc => {
            console.log(doc)
            this.userData = { profile: doc.data(), user: user }
            console.log(this.userData)
          })
      } else {
        console.log('no user')
      }
    })
  }
}
</script>

<style></style>
