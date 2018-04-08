<template>
  <div>
    <h1>
      {{ error.statusCode }}
    </h1>
    <h2>
      {{ error.message }}
    </h2>
    <nuxt-link
      class="button"
      to="/app"
      v-if="error.statusCode === 404">
      Home
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
