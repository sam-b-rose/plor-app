<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">Queue</h3>
      <div class="columns">
        <div class="column column--stacked">
          <PlorPost />
          <PlorDeck v-if="queue.length" :deck="queue" />
          <PlorEmpty v-else :title="emptyTitle" :message="emptyMessage" />
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

import PlorPost from '@/components/app/PlorPost';
import PlorDeck from '@/components/app/PlorDeck';
import PlorEmpty from '@/components/app/PlorEmpty';
import PlorFilter from '@/components/shared/PlorFilter';

export default {
  layout: 'app',
  transition: 'rise-up',
  middleware: 'authenticated',
  components: {
    PlorPost,
    PlorDeck,
    PlorEmpty,
    PlorFilter
  },
  async fetch({ store }) {
    await store.dispatch('posts/fetchPosts');
  },
  computed: {
    ...mapState(['filterItems']),
    ...mapState('posts', ['queue'])
  },
  data() {
    return {
      emptyTitle: 'Ahem... your audience is awaiting!',
      emptyMessage:
        'Think about it for a bit, but not for too long. Then come back and draft up a post.'
    };
  }
};
</script>
