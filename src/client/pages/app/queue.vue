<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">Queue</h3>
      <div class="columns">
        <div class="column">
          <PlorPost />
          <PlorDeck :deck="queue"/>
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

import PlorPost from '@/components/app/PlorPost';
import PlorDeck from '@/components/app/PlorDeck';
import PlorFilter from '@/components/shared/PlorFilter';

export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    PlorPost,
    PlorDeck,
    PlorFilter
  },
  async fetch({ store }) {
    await store.dispatch('posts/fetchPosts');
  },
  computed: {
    ...mapState(['filterItems']),
    ...mapState('posts', ['queue'])
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
