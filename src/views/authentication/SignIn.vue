<template>
  <b-container fluid>
    <h1 class="login-page-title">Login page</h1>
    <!-- Loader -->
    <div v-show="user === undefined" data-test="loader">Authenticating...</div>

    <!-- Offline instruction -->
    <div v-show="!networkOnLine" data-test="offline-instruction">
      Please check your connection, login feature is not available offline.
    </div>

    <p v-if="loginError">{{ loginError }}</p>
    <!-- Auth ui -->
    <ValidationObserver ref="observer" v-slot="{ passes }">
      <b-form
        v-show="user !== undefined && !user && networkOnLine"
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

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </ValidationObserver>
    <b-button variant="primary" @click="loginWithGoogle">Google Login</b-button>
  </b-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { mapState, mapMutations } from 'vuex'
import { isNil } from 'lodash'
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
    async LoginWithEmail() {
      this.loginError = null
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user)
        })
      this.setUser(undefined)
    },
    onSubmit() {
      console.log('Form submitted yay!')
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
