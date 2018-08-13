<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">History</h3>
      <PlorDeck :deck="history"/>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import PlorDeck from '@/components/app/PlorDeck';

export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    PlorDeck
  },
  async fetch({ store }) {
    await store.dispatch('posts/fetchHistory');
  },
  computed: {
    ...mapState('posts', ['history'])
  }
};
</script>

<style lang="scss" scoped>
$navbar-min-height: 3rem;

.navbar {
  min-height: $navbar-min-height;
  margin-bottom: 2rem;
  border-bottom: 1px solid $light;
}

.navbar-item {
  &.is-tab {
    min-height: $navbar-min-height;
  }
}
</style>
