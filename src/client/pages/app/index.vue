<template>
  <section class="section">
    <nav
      class="navbar"
      role="navigation"
      ria-label="secondary navigation">
      <div class="navbar-start">
        <h3 class="title is-4">Posts</h3>
      </div>
      <div class="navbar-end">
        <nuxt-link
          class="navbar-item is-tab is-active"
          to="/">
          Queue
        </nuxt-link>
        <nuxt-link
          class="navbar-item is-tab"
          to="/">
          Drafts
        </nuxt-link>
        <nuxt-link
          class="navbar-item is-tab"
          to="/">
          History
        </nuxt-link>
      </div>
    </nav>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical is-3">
        <PlorList
          class="tile is-child"
          :items="filterItems" />
      </div>
      <div class="tile is-parent is-vertical is-6">
        <PlorPost class="tile is-child" />
        <PlorDeck class="tile is-child" />
      </div>
      <div class="tile is-parent is-vertical is-3">
        <div class="tile is-child notification">
          <button class="delete" />
          <small>Try <strong class="has-text-info">adding networks</strong> to help spread the word about your awesome sock business!</small>
        </div>
        <PlorList
          class="tile is-child"
          :items="connectionItems" />
      </div>
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
  data() {
    return {
      posts: [],
      filterItems: [
        { text: 'Tags', icon: ['far', 'tag'] },
        { text: 'Social Accounts', icon: ['far', 'comment'] },
        { text: 'Members', icon: ['far', 'users'] },
        { text: 'Media', icon: ['far', 'images'] }
      ],
      connectionItems: [
        {
          text: 'Connect to Facebook',
          icon: ['fab', 'facebook'],
          color: '#3B5998'
        },
        {
          text: 'Connect to Twitter',
          icon: ['fab', 'twitter'],
          color: '#1DA1F2'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 3rem;
}

.navbar {
  margin-bottom: 2rem;
  border-bottom: 1px solid $light;
}
</style>
