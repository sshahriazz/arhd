<template>
  <b-container>
    <b-row>
      <b-col v-if="userData.profile" sm-4 md-4 lg-4>
        <b-card
          no-body
          img-src="https://placekitten.com/380/200"
          img-alt="Image"
          img-top
        >
          <template v-slot:header>
            <h4 class="mb-0">{{ userData.profile.firstName }}</h4>
          </template>

          <b-card-body>
            <b-card-title>Bio</b-card-title>
            <b-card-sub-title class="mb-2"
              >Show the people what you are</b-card-sub-title
            >
            <b-card-text>{{ userData.profile.bio }}</b-card-text>
          </b-card-body>

          <!-- <b-list-group flush>
            <b-list-group-item>Cras justo odio</b-list-group-item>
            <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
            <b-list-group-item>Vestibulum at eros</b-list-group-item>
          </b-list-group>-->

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
      <b-col sm-6 md-6 lg-6>
        <b-card-group deck>
          <b-card
            border-variant="primary"
            header="Primary"
            header-bg-variant="primary"
            header-text-variant="white"
            align="center"
          >
            <b-card-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </b-card-text>
          </b-card>
        </b-card-group>
      </b-col>
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
