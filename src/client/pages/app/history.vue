<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">History</h3>
      <div class="columns">
        <div class="column">
          <PlorDeck
            v-if="false"
            :deck="history"
            :most-recent="true" />
          <PlorEmpty
            v-else
            :title="emptyTitle"
            :message="emptyMessage" />
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
import PlorEmpty from '@/components/app/PlorEmpty';
import PlorFilter from '@/components/shared/PlorFilter';

export default {
  layout: 'app',
  transition: 'rise-up',
  middleware: 'authenticated',
  components: {
    PlorDeck,
    PlorEmpty,
    PlorFilter
  },
  async fetch({ store }) {
    await store.dispatch('posts/fetchHistory');
  },
  computed: {
    ...mapState(['filterItems']),
    ...mapState('posts', ['history'])
  },
  data() {
    return {
      emptyTitle: 'Your history is empty',
      emptyMessage: 'When you publish a post, you will be able to see it here.'
    };
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
