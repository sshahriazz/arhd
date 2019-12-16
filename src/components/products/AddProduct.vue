<template>
  <b-container class="mb-3">
    <b-row>
      <b-col sm="6" md="6" lg="6">
        <legend>Add Product:</legend>

        <b-card title="Upload the image first" class="mb-2">
          <b-form @submit.prevent="uploadImage">
            <b-form-group label="Images:" description="Only upload jpg">
              <b-form-file
                v-model="images"
                multiple
                :state="Boolean(images)"
                placeholder="Choose a file..."
              >
                <template slot="file-name" slot-scope="{ names }">
                  <b-badge variant="dark">{{ names[0] }}</b-badge>
                  <b-badge v-if="names.length > 1" variant="dark" class="ml-1"
                    >+ {{ names.length - 1 }} More files</b-badge
                  >
                </template>
              </b-form-file>
              <b-btn class="mt-2" type="submit" variant="success">Upload</b-btn>
            </b-form-group>
          </b-form>
        </b-card>

        <b-card title="Upload 3d models in .gltf Format">
          <b-form @submit.prevent="uploadModels">
            <b-form-group label="3D Models:" description="Only upload jpg">
              <b-form-file
                v-model="models"
                multiple
                :state="Boolean(models)"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
              >
                <template slot="file-name" slot-scope="{ names }">
                  <b-badge variant="dark">{{ names[0] }}</b-badge>
                  <b-badge v-if="names.length > 1" variant="dark" class="ml-1"
                    >+ {{ names.length - 1 }} More files</b-badge
                  >
                </template>
              </b-form-file>
              <b-btn class="mt-2" type="submit" variant="success">Upload</b-btn>
            </b-form-group>
          </b-form>
        </b-card>
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
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
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
                <b-form-textarea
                  v-model="form.productDescription"
                  type="text"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Description Detailed"
                ></b-form-textarea>
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
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
                <b-form-textarea
                  v-model="form.productShortDesc"
                  type="text"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Short description."
                ></b-form-textarea>
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
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
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
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
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
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
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
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
                <b-form-invalid-feedback id="inputLiveFeedback">
                  {{ errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <span id="disabled-wrapper" class="d-inline-block" tabindex="0">
              <b-button
                :disabled="!progress && !progress1"
                class="mr-2"
                type="submit"
                variant="primary"
                >Submit</b-button
              >
            </span>
            <b-tooltip v-if="!progress" target="disabled-wrapper"
              >Upload image first</b-tooltip
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
            v-for="(product, index) in datas"
            :key="product.id"
            class="mb-1"
            href="#"
          >
            {{ index + 1 }}. {{ product.data.productName }} -
            {{ product.data.productPrice }}$
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  name: 'AddProductForm',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    images: [],
    userData: null,
    datas: [],
    progress: false,
    progress1: false,
    models: [],
    categorys: [
      { id: 0, name: 'c1' },
      { id: 1, name: 'c2' },
      { id: 2, name: 'c3' }
    ],
    form: {
      productAuthor: '',
      productName: '',
      productDescription: '',
      productShortDesc: '',
      productPrice: 0.0,
      discountRate: null,
      productCategory: [],
      quantity: 0,
      imageUrl: [],
      ArModelUrl: []
    }
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
              this.datas.push({ id: doc.id, data: doc.data() })
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
      this.addToDatabase()
      this.resetForm()
    },
    addToDatabase() {
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
    uploadImage() {
      const file = this.images
      for (const image in file) {
        const storageRef = firebase
          .storage()
          .ref('productimages/' + file[image].name)
        const uploadTask = storageRef.put(file[image])

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            if (progress == 100) {
              this.progress = true
            }
            console.log('Uplaoding', progress)
          },
          error => {
            this.console.log('Ooops...' + error.message)
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log('download url:', downloadURL)
              this.form.imageUrl.push(downloadURL)
              console.log('url: ', this.form.imageUrl)
            })
          }
        )
      }
    },
    uploadModels() {
      const file = this.models
      for (const model in file) {
        const storageRef = firebase
          .storage()
          .ref('3dmodels/' + file[model].name)
        const uploadTask = storageRef.put(file[model])

        uploadTask.on(
          'state_changed',
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            if (progress == 100) {
              this.progress1 = true
            }
            console.log('Uplaoding', progress)
          },
          error => {
            this.console.log('Ooops...' + error.message)
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              console.log('download url:', downloadURL)
              this.form.ArModelUrl.push(downloadURL)
              console.log('Arurl: ', this.form.ArModelUrl)
            })
          }
        )
      }
    },
    resetForm() {
      this.form.productName = ''
      this.form.productDescription = ''
      this.form.productShortDesc = ''
      this.form.productPrice = 0
      this.form.discountRate = 0
      this.form.productCategory = []
      this.form.quantity = 0
      this.images = []
      this.form.imageUrl = []
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>
