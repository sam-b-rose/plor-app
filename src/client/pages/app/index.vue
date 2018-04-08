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
        <nuxt-link class="navbar-item is-tab is-active" to="/">Queue</nuxt-link>
        <nuxt-link class="navbar-item is-tab" to="/">Drafts</nuxt-link>
        <nuxt-link class="navbar-item is-tab" to="/">History</nuxt-link>
      </div>
    </nav>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical is-3">
        <list class="tile is-child" :items="filterItems"/>
      </div>
      <div class="tile is-parent is-vertical is-6">
        <post class="tile is-child" />
        <deck class="tile is-child" />
      </div>
      <div class="tile is-parent is-vertical is-3">
        <div class="tile is-child notification">
          <button class="delete" />
          <small>Try <strong class="has-text-info">adding networks</strong> to help spread the word about your awesome sock business!</small>
        </div>
        <list class="tile is-child" :items="connectionItems" />
      </div>
    </div>
  </section>
</template>

<script>
import post from '../../components/app/post';
import deck from '../../components/app/deck';
import list from '../../components/shared/list';

export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    post,
    deck,
    list
  },
  fetch({ store }) {
    const { email } = store.state.user;
    return store.dispatch('posts/fetchPosts', { email });
  },
  data() {
    return {
      filterItems: [
        { text: 'Tags', icon: 'far fa-tag' },
        { text: 'Social Accounts', icon: 'far fa-comment' },
        { text: 'Members', icon: 'far fa-users' },
        { text: 'Media', icon: 'far fa-images' }
      ],
      connectionItems: [
        {
          text: 'Connect to Facebook',
          icon: 'fab fa-facebook',
          color: '#3B5998'
        },
        { text: 'Connect to Twitter', icon: 'fab fa-twitter', color: '#1DA1F2' }
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
