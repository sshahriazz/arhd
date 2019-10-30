<template>
  <ValidationObserver ref="observer" v-slot="{ passes }">
    <b-form @submit.prevent="passes(onSubmit)" @reset="resetForm">
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

      <ValidationProvider
        v-slot="{ valid, errors }"
        rules="required|confirmed:password"
        name="Password confirmation"
      >
        <b-form-group label="Confirm Password:" label-for="exampleInput1">
          <b-form-input
            v-model="confirmation"
            type="password"
            :state="errors[0] ? false : valid ? true : null"
            placeholder="Confirm Password"
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
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  name: 'BootstrapForm',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    email: '',
    password: '',
    confirmation: ''
  }),
  methods: {
    onSubmit() {
      console.log('Form submitted yay!')
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
