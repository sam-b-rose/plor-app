<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">Queue</h3>
      <PlorPost />
      <PlorDeck />
    </div>
  </section>
</template>

<script>
import PlorPost from '@/components/app/PlorPost';
import PlorDeck from '@/components/app/PlorDeck';
import PlorList from '@/components/shared/PlorList';

export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    PlorPost,
    PlorDeck,
    PlorList
  },
  async fetch({ store }) {
    await store.dispatch('posts/fetchPosts');
  },
  data() {
    return {
      posts: [],
      filterItems: [
        { text: 'Tags' },
        { text: 'Social Accounts' },
        { text: 'Members' },
        { text: 'Media' }
      ]
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
