<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">Drafts</h3>
      <div class="columns">
        <div class="column">
          <PlorPost />
          <PlorDeck
            v-if="drafts.length"
            :deck="drafts"/>
          <PlorEmpty
            v-else
            :title="emptyTitle"
            :message="emptyMessage" />
        </div>
        <div class="column column--fixed">
          <!-- <PlorFilter :items="filterItems"/> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import PlorDeck from '@/components/app/PlorDeck';
import PlorEmpty from '@/components/app/PlorEmpty';
import PlorPost from '@/components/app/PlorPost';
import PlorFilter from '@/components/shared/PlorFilter';

export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    PlorDeck,
    PlorEmpty,
    PlorPost,
    PlorFilter
  },
  async fetch({ store }) {
    await store.dispatch('posts/fetchDrafts');
  },
  computed: {
    ...mapState(['filterItems']),
    ...mapState('posts', ['drafts'])
  },
  data() {
    return {
      emptyTitle: 'You have no drafts',
      emptyMessage:
        'Try creating a post and save it as a draft so you can tweak it later.'
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
