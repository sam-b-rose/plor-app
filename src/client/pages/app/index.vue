<template>
  <section class="section">
    <nav class="navbar" role="navigation" aria-label="secondary navigation">
      <div class="navbar-brand">
        <h3 class="title">Posts</h3>
      </div>
      <div class="navbar-tabs navbar-end">
        <nuxt-link class="navbar-item is-tab is-active" to="/">Queue</nuxt-link>
        <nuxt-link class="navbar-item is-tab" to="/">Drafts</nuxt-link>
        <nuxt-link class="navbar-item is-tab" to="/">History</nuxt-link>
      </div>
    </nav>
    <div class="container">
      <deck-filter />
      <post />
      <deck />
    </div>
  </section>
</template>

<script>
import deckFilter from '../../components/app/deck-filter'
import post from '../../components/app/post'
import deck from '../../components/app/deck'

export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    deckFilter,
    post,
    deck
  },
  fetch ({ store }) {
    const { email } = store.state.user
    return store.dispatch('posts/fetchPosts', { email })
  }
}
</script>
