<template>
  <div>
    <navbar />
    <main>
      <nuxt></nuxt>
    </main>
  </div>
</template>

<script>
import navbar from '~/components/shared/navbar'

export default {
  components: {
    navbar
  },
  data () {
    return { }
  }
}
</script>

<style scoped>
main {
  margin-top: 4rem;
}
</style>

