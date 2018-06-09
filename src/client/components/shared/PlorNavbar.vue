<template>
  <nav class="navbar has-text-weight-bold is-spaced">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link
          class="logo navbar-item is-bold is-size-4"
          to="/">
          Plor
          <span class="beta">beta</span>
        </nuxt-link>
        <div class="navbar-burger burger">
          <span />
          <span />
          <span />
        </div>
      </div>

      <div class="navbar-menu">
        <div class="navbar-start" />
        <div class="navbar-end">
          <div class="navbar-item">
            <!-- Redirect to EA for now -->
            <a
              class="button is-text"
              @click.prevent="$emit('open')">
              Login
            </a>
            <!-- <nuxt-link
              class="button is-text"
              to="/app">
              Login
            </nuxt-link> -->
          </div>
          <div class="navbar-item">
            <!-- Redirect to EA for now -->
            <a
              class="button is-link is-outlined"
              @click.prevent="$emit('open')">
              Sign up
            </a>
            <!-- <nuxt-link
              class="button is-link is-outlined"
              to="/auth/register">
              Sign up
            </nuxt-link> -->
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'PlorNavbar'
};
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.navbar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: transparent;
}

.logo {
  position: relative;
  color: $blue-dark;
}

.beta {
  position: absolute;
  top: 50%;
  left: 90%;
  padding: 0.05rem 0.3rem;
  transform: translateY(-100%);
  border-radius: 4px;
  background-color: $orange;
  color: $white;
  font-size: $size-7;
  font-style: italic;
  font-weight: 700;
}
</style>
