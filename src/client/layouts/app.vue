<template>
  <div class="columns is-gapless">
    <PlorSidenav class="sidebar column" />
    <main class="main column">
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

<style lang="scss">
.button {
  @include app-button;
}

.sidebar {
  flex: 0 0 auto;
  width: 224px;
  max-height: 100vh;
}

.main {
  max-height: 100vh;
  overflow: auto;
}

.container.is-fluid {
  max-width: 864px;
  margin: 0 auto;
}

.column--fixed {
  flex: 0 0 auto;
  width: 264px;
}
</style>
