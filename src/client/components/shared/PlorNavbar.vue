<template>
  <nav class="navbar is-primary is-fixed-top">
    <div class="navbar-brand">
      <nuxt-link
        class="navbar-item is-size-4"
        to="/">
        plor
      </nuxt-link>
      <div class="navbar-burger burger">
        <span />
        <span />
        <span />
      </div>
    </div>

    <div class="navbar-menu">
      <div class="navbar-start">
        <nuxt-link
          class="navbar-item"
          to="/site/about">
          About
        </nuxt-link>
        <nuxt-link
          class="navbar-item"
          to="/site/contact">
          Contact
        </nuxt-link>
        <nuxt-link
          class="navbar-item"
          to="/site/updates">
          Updates
        </nuxt-link>
      </div>

      <div class="navbar-end">
        <nuxt-link
          class="navbar-item"
          to="/app">
          Login
        </nuxt-link>
        <nuxt-link
          class="navbar-item"
          to="/auth/login">
          Sign up
        </nuxt-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'PlorNavbar'
};
</script>

<style lang="scss">
.navbar-brand .navbar-item {
  color: $blue-dark;
}
</style>
