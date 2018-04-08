<template>
  <div class="columns is-gapless">
    <sidebar class="sidebar column is-one-quarter" />
    <main class="column">
      <nuxt></nuxt>
    </main>
  </div>
</template>

<script>
import sidebar from '~/components/shared/sidebar'

export default {
  components: {
    sidebar
  },
  data () {
    return { }
  }
}
</script>

<style>
.sidebar {
  max-width: 300px;
}
</style>
