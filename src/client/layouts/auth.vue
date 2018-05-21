<template>
  <div class="columns is-centered is-gapless">
    <main class="column is-half">
      <section class="hero is-fullheight">
        <div class="hero-body">
          <nuxt class="container" />
        </div>
      </section>
    </main>
    <aside class="column is-half is-hidden-touch artwork"/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.artwork {
  background: $primary;
}

.container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
