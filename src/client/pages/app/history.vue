<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">History</h3>
      <div class="columns">
        <div class="column">
          <PlorDeck
            :deck="history"
            :most-recent="true" />
        </div>
        <div class="column column--fixed">
          <PlorFilter :items="filterItems"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import PlorDeck from '@/components/app/PlorDeck';
import PlorFilter from '@/components/shared/PlorFilter';

export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    PlorDeck,
    PlorFilter
  },
  async fetch({ store }) {
    await store.dispatch('posts/fetchHistory');
  },
  computed: {
    ...mapState(['filterItems']),
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
