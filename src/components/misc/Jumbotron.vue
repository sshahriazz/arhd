<template>
  <b-jumbotron>
    <template v-slot:header
      >Augmented Reality Home Decorator</template
    >

    <template v-slot:lead>
      See exactly what a new piece of furniture or design will look like in your
      home before you buy
    </template>

    <hr class="my-4" />

    <p>Join the community or view products by tapping the buttons below.</p>

    <b-button class="mr-2" variant="primary" href="/products">Product</b-button>
    <b-button variant="success" href="/signin">Login</b-button>
  </b-jumbotron>
</template>

<script>
export default {
  components: {}
}
</script>
<style></style>
