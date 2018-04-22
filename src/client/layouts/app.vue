<template>
  <div class="columns is-gapless">
    <PlorSidenav class="sidebar column is-one-fifth" />
    <main class="column">
      <nuxt />
    </main>
  </div>
</template>

<script>
import PlorSidenav from '~/components/shared/PlorSidenav';

export default {
  data() {
    return {};
  },
  components: {
    PlorSidenav
  }
};
</script>

<style>
.sidebar {
  max-width: 300px;
}
</style>
