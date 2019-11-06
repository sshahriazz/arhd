<template>
  <b-container class="mb-3">
    <b-row>
      <b-col sm="6" md="6" lg="6">
        <legend>Add Product:</legend>

        <ValidationObserver ref="observer" v-slot="{ passes }">
          <b-form @submit.prevent="passes(onSubmit)" @reset="resetForm">
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="ProductName"
            >
              <b-form-group
                label="Product Name:"
                label-for="productNameInput"
                description="Enter your Furniture name."
              >
                <b-form-input
                  v-model="form.productName"
                  type="text"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Enter Product Name"
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">{{
                  errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="Description"
            >
              <b-form-group
                label="Product Description:"
                label-for="productDescriptionInput"
                description="Describe your Furniture."
              >
                <b-form-input
                  v-model="form.productDescription"
                  type="text"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Description Detailed"
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">{{
                  errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="ShortDescription"
            >
              <b-form-group
                label="Short Description:"
                label-for="productShortDescInput"
                description="As short as possible, under 100 charecter."
              >
                <b-form-input
                  v-model="form.productShortDesc"
                  type="text"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Short description."
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">{{
                  errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="Price"
            >
              <b-form-group
                label="Price:"
                label-for="PriceInput"
                description="Enter the product price numeric."
              >
                <b-form-input
                  v-model="form.productPrice"
                  type="number"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Price."
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">{{
                  errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ valid, errors }"
              rules
              name="DiscountRate"
            >
              <b-form-group
                label="Discount:"
                label-for="DiscountInput"
                description="Enter the product Discount Rate in percent."
              >
                <b-form-input
                  v-model="form.discountRate"
                  type="number"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Discount."
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">{{
                  errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ valid, errors }"
              name="Category"
              rules="required"
            >
              <b-form-group
                id="Category"
                label="ProductCategory:"
                label-for="productCategory"
              >
                <b-form-select
                  id="productCategory"
                  v-model="form.productCategory"
                  :state="errors[0] ? false : valid ? true : null"
                >
                  <option value>None</option>
                  <option
                    v-for="category in categorys"
                    :key="category.id"
                    value="categoryName"
                    >{{ category.name }}</option
                  >
                </b-form-select>
                <b-form-invalid-feedback id="inputLiveFeedback">{{
                  errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ valid, errors }"
              rules
              name="DiscountRate"
            >
              <b-form-group
                label="Quantity:"
                label-for="Quantity"
                description="How many?."
              >
                <b-form-input
                  v-model="form.quantity"
                  type="number"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Quantity."
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">{{
                  errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <b-button class="mr-2" type="submit" variant="primary"
              >Submit</b-button
            >
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </ValidationObserver>
      </b-col>
      <b-col sm="6" md="6" lg="6">
        <legend>Products:</legend>
        <p>Hit refresh to view new products..</p>
        <b-list-group>
          <b-list-group-item
            v-for="(data, index) in datas"
            :key="data.productName"
            class="mb-1"
            href="#"
          >
            {{ index + 1 }}. {{ data.productName }} - {{ data.productPrice }}$
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import firebase from 'firebase/app'

export default {
  name: 'AddProductForm',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    form: {
      productAuthor: '',
      productName: '',
      productDescription: '',
      productShortDesc: '',
      productPrice: 0.0,
      discountRate: null,
      productCategory: [],
      quantity: 0
    },
    userData: null,
    datas: [],

    categorys: [
      { id: 0, name: 'c1' },
      { id: 1, name: 'c2' },
      { id: 2, name: 'c3' }
    ]
  }),
  mounted() {
    const db = firebase.firestore()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.userData = user
        this.form.productAuthor = user.uid
        db.collection('crap')
          .where('productAuthor', '==', this.userData.uid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.datas.push(doc.data())
              console.log(doc.id, ' => ', this.datas)
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
  },

  methods: {
    onSubmit() {
      const db = firebase.firestore()
      db.collection('crap')
        .add(this.form)
        .then(docRef => {
          console.log('document written: ', docRef.id)
        })
        .catch(error => {
          console.error('Error adding document: ', error)
        })
    },
    resetForm() {
      this.form.productName = ''
      this.form.productDescription = ''
      this.form.productShortDesc = ''
      this.form.productPrice = 0
      this.form.discountRate = 0
      this.form.productCategory = []
      this.form.quantity = 0
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>
