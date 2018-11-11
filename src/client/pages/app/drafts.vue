<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">Drafts</h3>
      <div class="columns">
        <div class="column column--stacked">
          <PlorPost />

          <PlorDeck
            v-if="drafts.length"
            :deck="drafts" />

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
import PlorPost from '@/components/app/PlorPost';
import PlorFilter from '@/components/shared/PlorFilter';

export default {
  layout: 'app',
  transition: 'rise-up',
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
