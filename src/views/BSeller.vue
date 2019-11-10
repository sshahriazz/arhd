<template>
  <b-container class="mb-3">
    <legend>Become one of our proud seller:</legend>
    <hr />

    <b-card title="Upload the image first">
      <b-form @submit.prevent="uploadImage">
        <b-form-group label="Licence:" description="Only upload jpg">
          <b-form-file
            v-model="licence"
            :state="Boolean(licence)"
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

    <ValidationObserver ref="observer" v-slot="{ passes }">
      <b-form @submit.prevent="passes(onSubmit)" @reset="resetForm">
        <ValidationProvider
          v-slot="{ valid, errors }"
          rules="required"
          name="shopname"
        >
          <b-form-group
            label="Shop Name:"
            label-for="shopNameInput"
            description="Enter your Shop name."
          >
            <b-form-input
              v-model="form.shopName"
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
            label="Shop Description:"
            label-for="shopDescriptionInput"
            description="Describe your Shop."
          >
            <b-form-textarea
              v-model="form.shopDescription"
              type="text"
              :state="errors[0] ? false : valid ? true : null"
              placeholder="Description Detailed"
            ></b-form-textarea>
            <b-form-invalid-feedback id="inputLiveFeedback">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>

        <ValidationProvider
          v-slot="{ valid, errors }"
          rules="required"
          name="selloptions"
        >
          <b-form-group
            label="What you wnat to sell:"
            label-for="selloptions"
            description="As short as possible, under 100 charecter."
          >
            <b-form-input
              v-model="form.sellOptions"
              type="text"
              :state="errors[0] ? false : valid ? true : null"
              placeholder="Few product name."
            ></b-form-input>
            <b-form-invalid-feedback id="inputLiveFeedback">{{
              errors[0]
            }}</b-form-invalid-feedback>
          </b-form-group>
        </ValidationProvider>
        <span id="disabled-wrapper" class="d-inline-block" tabindex="0">
          <b-button
            :disabled="!progress"
            class="mr-2"
            type="submit"
            variant="primary"
            >Submit</b-button
          >
        </span>
        <b-tooltip v-if="!progress" target="disabled-wrapper"
          >Uploading</b-tooltip
        >
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </ValidationObserver>
  </b-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  name: 'BecomeSeller',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    licence: null,
    progress: false,
    form: {
      shopName: '',
      shopDescription: '',
      sellOptions: '',
      shopLicenseImgUrl: ''
    }
  }),

  methods: {
    onSubmit() {
      this.addToDatabase()
    },
    addToDatabase() {
      const db = firebase.firestore()
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          db.collection('sellerInfo')
            .doc(user.uid)
            .set(this.form)
            .then(docRef => {
              console.log('document written: ', docRef.id)
            })
            .catch(error => {
              console.error('Error adding document: ', error)
            })
        } else {
          console.log('no user')
        }
      })
    },
    uploadImage() {
      const file = this.licence
      if (file) {
        const storageRef = firebase.storage().ref('bsellerimages/' + file.name)
        const uploadTask = storageRef.put(file)

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
              this.form.shopLicenseImgUrl = downloadURL
              console.log('url: ', this.form.shopLicenseImgUrl)
            })
          }
        )
      } else {
        console.log('File is null')
      }
    },
    resetForm() {
      this.form.shopDescription = ''
      this.form.sellOptions = ''
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>
