<template>
  <b-container>
    <b-row>
      <b-col sm="6" md="6" lg="6" offset-md="3" offset-lg="3">
        <b-card title="Product View" sub-title="Take a look">
          <b-img height="200px" width="200px" :src="data.imageUrl[0]"></b-img>
          <b-card-text>Product Name: {{ data.productName }}</b-card-text>

          <b-card-text>Description: {{ data.productDescription }}</b-card-text>
          <b-card-text>Price: {{ data.productPrice }} Bdt</b-card-text>
          <b-card-text>Quantity: {{ data.quantity }}</b-card-text>

          <a href="/products" class="card-link">Go Back</a>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'ProductView',
  props: {
    id: String
  },
  data() {
    return {
      data: {}
    }
  },
  beforeCreate() {
    const db = firebase.firestore()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const productInfo = db.collection('crap').doc(this.id)
        productInfo.get().then(doc => {
          if (doc.exists) {
            this.data = doc.data()
            console.log('data:', doc.data())
          } else {
            console.log('No data')
          }
        })
      } else {
        // No user is signed in.
      }
    })
  }
}
</script>

<style></style>
