<template>
  <b-container>
    <h5>Add product to your Inventory.</h5>
    <b-button variant="outline-info" class="mb-2 mr-2">
      <router-link to="/addproduct">Add Product</router-link>
    </b-button>

    <b-button variant="outline-info" class="mb-2">
      <router-link to="/addproduct">Add new category</router-link>
    </b-button>
    <b-list-group>
      <b-list-group-item
        v-for="product in products"
        :key="product.id"
        class="mb-2"
      >
        {{ product.data.productName }} ({{ product.data.quantity }})
        <b-button-group class="ml-5 mr-4">
          <b-button variant="outline-success">
            <router-link to="#">Update</router-link>
          </b-button>
          <b-button variant="outline-danger" @click="deleteProduct(product.id)"
            >Delete</b-button
          >
        </b-button-group>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>
import firebase from 'firebase/app'

export default {
  data() {
    return {
      products: []
    }
  },
  computed: {},
  mounted() {
    this.getData()
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
    },
    getData() {
      const db = firebase.firestore()
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          db.collection('crap')
            .where('productAuthor', '==', user.uid)
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
        } else {
          console.log('no user')
        }
      })
    }
  }
}
</script>
<style scoped>
a {
  text-decoration: none;
  color: black;
}
</style>
