<template>
  <b-container fluid>
    <b-row>
      <b-col sm="6" md="6" lg="6" offset-lg="1">
        <b-card title="Login" sub-title="Login with your email">
          <!-- Loader -->

          <!-- Offline instruction -->
          <div v-show="!networkOnLine" data-test="offline-instruction">
            Please check your connection, login feature is not available
            offline.
          </div>

          <p v-if="loginError">{{ loginError }}</p>
          <!-- Auth ui -->
          <ValidationObserver ref="observer" v-slot="{ passes }">
            <b-form
              v-show="networkOnLine"
              @submit.prevent="passes(LoginWithEmail)"
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
                  <b-form-invalid-feedback id="inputLiveFeedback">{{
                    errors[0]
                  }}</b-form-invalid-feedback>
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
                  <b-form-invalid-feedback id="inputLiveFeedback">{{
                    errors[0]
                  }}</b-form-invalid-feedback>
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
          <b-button variant="outline-warning" block @click="loginWithGoogle"
            >Google Login</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapState } from 'vuex'
import firebase from 'firebase/app'
import { desktop as isDekstop } from 'is_js'

export default {
  name: 'LoginForm',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    loginError: null,
    email: '',
    password: ''
  }),
  head: function() {
    return {
      title: {
        inner: 'Login'
      },
      meta: [
        {
          name: 'description',
          content: `Sign in or sign up to ${this.appTitle}`,
          id: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapState('app', ['networkOnLine', 'appTitle'])
  },

  methods: {
    async loginWithGoogle() {
      this.loginError = null
      const provider = new firebase.auth.GoogleAuthProvider()

      try {
        isDekstop()
          ? await firebase.auth().signInWithPopup(provider)
          : await firebase.auth().signInWithRedirect(provider)
        this.$router.push('/products')
      } catch (err) {
        this.loginError = err
      }
    },
    async LoginWithEmail() {
      this.loginError = null
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push('/products')
          console.log(user)
        })
    },
    resetForm() {
      this.email = ''
      this.password = ''
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>
