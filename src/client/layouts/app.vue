<template>
  <div class="columns is-gapless">
    <PlorSidenav class="sidebar column is-one-fifth" />
    <main class="column">
      <nuxt />
    </main>
    <div class="modal">
      <div class="modal-background" />
      <div class="modal-content">
        <portal-target name="plor-modal" />
      </div>
      <button
        class="modal-close is-large"
        aria-label="close" />
    </div>
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
