<template>
  <b-container>
    <b-row>
      <b-col sm="6" md="6" lg="6" offset-lg="1">
        <b-card title="Register" sub-title="Register with your email">
          <ValidationObserver ref="observer" v-slot="{ passes }">
            <b-form
              @submit.prevent="passes(SignupWithEmail)"
              @reset="resetForm"
            >
              <ValidationProvider
                v-slot="{ valid, errors }"
                rules="required|email"
                name="Email"
              >
                <b-form-group
                  label="Email address:"
                  label-for="exampleInput1"
                  description="We'll never share your email with anyone else."
                >
                  <b-form-input
                    v-model="email"
                    type="email"
                    :state="errors[0] ? false : valid ? true : null"
                    placeholder="Enter email"
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ valid, errors }"
                rules="required"
                name="Password"
                vid="password"
              >
                <b-form-group
                  label="Password:"
                  description="We'll never share your password with anyone else."
                >
                  <b-form-input
                    v-model="password"
                    type="password"
                    :state="errors[0] ? false : valid ? true : null"
                    placeholder="Enter password"
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ valid, errors }"
                rules="required|confirmed:password"
                name="Password confirmation"
              >
                <b-form-group
                  label="Confirm Password:"
                  label-for="exampleInput1"
                >
                  <b-form-input
                    v-model="confirmation"
                    type="password"
                    :state="errors[0] ? false : valid ? true : null"
                    placeholder="Confirm Password"
                  ></b-form-input>
                  <b-form-invalid-feedback id="inputLiveFeedback">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
                </b-form-group>
              </ValidationProvider>

              <b-button class="mr-2" type="submit" variant="outline-success"
                >Submit</b-button
              >
              <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
          </ValidationObserver>
        </b-card>
      </b-col>
      <b-col sm="4" md="4" lg="4">
        <b-card title="Social Login">
          <b-button block variant="outline-warning" @click="loginWithGoogle"
            >Google Login</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapState, mapMutations } from 'vuex'
import { isNil } from 'lodash'
import firebase from 'firebase/app'
import { desktop as isDekstop } from 'is_js'

export default {
  name: 'Signup',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    email: '',
    password: '',
    confirmation: ''
  }),
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle'])
  },
  watch: {
    user: {
      handler(user) {
        if (!isNil(user)) {
          const redirectUrl = isNil(this.$route.query.redirectUrl)
            ? '/products'
            : this.$route.query.redirectUrl
          this.$router.push(redirectUrl)
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapMutations('authentication', ['setUser']),
    async loginWithGoogle() {
      this.loginError = null
      const provider = new firebase.auth.GoogleAuthProvider()
      this.setUser(undefined)

      try {
        // Firebase signin with popup is faster than redirect
        // but we can't use it on mobile because it's not well supported
        // when app is running as standalone on ios & android
        isDekstop()
          ? await firebase.auth().signInWithPopup(provider)
          : await firebase.auth().signInWithRedirect(provider)
      } catch (err) {
        this.loginError = err
        this.setUser(null)
      }
    },
    async SignupWithEmail() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user)
        })
        .catch(err => {
          alert(err.message)
        })
    },
    resetForm() {
      this.email = ''
      this.password = ''
      this.confirmation = ''
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>
