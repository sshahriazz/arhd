<template>
  <b-container>
    <legend>All Products:</legend>
    <hr />

    <b-card-group deck>
      <b-row>
        <b-col v-for="product in products" :key="product.id" sm-4 lg-4 md-4>
          <b-card>
            <b-row>
              <b-col sm-6 md-6 lg-6>
                <img height="150" width="150" :src="product.data.imageUrl[0]" />
                <h4>{{ product.data.productName }}</h4>
                <b-card-text>{{ product.data.productDescription }}</b-card-text>
              </b-col>
            </b-row>
            <b-button href="#" variant="primary">Go somewhere</b-button>
          </b-card>
        </b-col>
      </b-row>
    </b-card-group>
  </b-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  data() {
    return {
      products: []
    }
  },
  computed: {},
  mounted() {
    const db = firebase.firestore()

    db.collection('crap')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.products.push({ id: doc.id, data: doc.data() })
          console.log(doc.id, ' => ', this.products)
        })
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error)
      })
    // console.log('User data: ',this.userData)
  },

  methods: {
    deleteProduct(id) {
      const db = firebase.firestore()
      db.collection('crap')
        .doc(id)
        .delete()
        .then(function() {
          console.log('Document successfully deleted!')
        })
        .catch(function(error) {
          console.error('Error removing document: ', error)
        })
      console.log('Product deleted.', id)
    }
  }
}
</script>
<style scoped></style>
