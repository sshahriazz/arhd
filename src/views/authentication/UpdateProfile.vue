<template>
  <b-container class="mb-3">
    <b-row>
      <b-col sm="6" md="6" lg="6" offset-lg="3" offset-md="3">
        <legend>Add Product:</legend>

        <b-card title="Profile Photo" class="mb-2">
          <b-form @submit.prevent="uploadImage">
            <b-form-group
              label="Images:"
              description="You can add multiple at a time, Only upload jpg"
            >
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

        <ValidationObserver ref="observer" v-slot="{ passes }">
          <b-form @submit.prevent="passes(onSubmit)" @reset="resetForm">
            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="FirstName"
            >
              <b-form-group
                label="First Name:"
                label-for="FirstNameInput"
                description="Enter Your First Name."
              >
                <b-form-input
                  v-model="form.firstName"
                  type="text"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Enter First Name"
                ></b-form-input>
                <b-form-invalid-feedback id="inputLiveFeedback">{{
                  errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ valid, errors }"
              rules="required"
              name="LastName"
            >
              <b-form-group
                label="Last Name:"
                label-for="LastNameInput"
                description="Enter Your Last Name."
              >
                <b-form-input
                  v-model="form.lastName"
                  type="text"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="Enter Last Name"
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
                label="Bio:"
                label-for="BioInput"
                description="Write shomething about you."
              >
                <b-form-textarea
                  v-model="form.bio"
                  type="text"
                  :state="errors[0] ? false : valid ? true : null"
                  placeholder="wiete something about you"
                ></b-form-textarea>
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
              >Upload image first</b-tooltip
            >
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </ValidationObserver>
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
    progress: false,
    form: {
      firstName: '',
      lastName: '',
      bio: '',
      profileImagesUrl: []
    }
  }),
  mounted() {},

  methods: {
    onSubmit() {
      this.addToDatabase()
      this.resetForm()
    },
    addToDatabase() {
      const db = firebase.firestore()
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user
          db.collection('profiles')
            .doc(user.uid)
            .set(this.form)
            .then(() => {
              console.log('data writen')
            })
            .catch(err => console.log(err))
        } else {
          console.log('no user')
        }
      })
    },
    uploadImage() {
      const file = this.images
      for (const image in file) {
        const storageRef = firebase
          .storage()
          .ref('profileImages/' + file[image].name)
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
              this.form.profileImagesUrl.push(downloadURL)
              console.log('url: ', this.form.profileImagesUrl)
            })
          }
        )
      }
      this.resetForm()
    },
    resetForm() {
      this.form.firstName = ''
      this.form.lastName = ''
      this.form.bio = ''
      this.images = []
      this.form.profileImagesUrl = []
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>
