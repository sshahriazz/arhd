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
        <b-form-group label="Confirm Password:" label-for="exampleInput1">
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

      <ValidationProvider
        v-slot="{ valid, errors }"
        name="Subject"
        rules="required"
      >
        <b-form-group
          id="exampleInputGroup3"
          label="Subject:"
          label-for="exampleInput3"
        >
          <b-form-select
            id="exampleInput3"
            v-model="subject"
            :state="errors[0] ? false : valid ? true : null"
          >
            <option value>None</option>
            <option value="S1">Subject 1</option>
            <option value="S2">Subject 2</option>
          </b-form-select>
          <b-form-invalid-feedback id="inputLiveFeedback">
            {{ errors[0] }}
          </b-form-invalid-feedback>
        </b-form-group>
      </ValidationProvider>

      <ValidationProvider
        v-slot="{ valid, errors }"
        name="Drink"
        rules="required|length:2"
      >
        <b-form-group id="exampleGroup4">
          <b-form-checkbox-group
            id="exampleChecks"
            v-model="choices"
            :state="errors[0] ? false : valid ? true : null"
          >
            <b-form-checkbox value="Coffee">Coffe</b-form-checkbox>
            <b-form-checkbox value="Tea">Tea</b-form-checkbox>
            <b-form-checkbox value="Soda">Soda</b-form-checkbox>
          </b-form-checkbox-group>
          <b-form-invalid-feedback id="inputLiveFeedback">
            {{ errors[0] }}
          </b-form-invalid-feedback>
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
    confirmation: '',
    subject: '',
    choices: []
  }),
  methods: {
    onSubmit() {
      console.log('Form submitted yay!')
    },
    resetForm() {
      this.email = ''
      this.password = ''
      this.confirmation = ''
      this.subject = ''
      this.choices = []
      requestAnimationFrame(() => {
        this.$refs.observer.reset()
      })
    }
  }
}
</script>
