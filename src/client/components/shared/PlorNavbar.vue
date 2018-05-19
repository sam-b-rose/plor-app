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
            <div class="field is-grouped">
              <p class="control">
                <nuxt-link
                  class="button is-white is-text login"
                  to="/app">
                  Login
                </nuxt-link>
              </p>
              <p class="control">
                <nuxt-link
                  class="button is-link is-outlined"
                  to="/auth/register">
                  Sign up
                </nuxt-link>
              </p>
            </div>
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
  left: 0;
  right: 0;
  top: 0;
  background-color: transparent;
}

.navbar-brand > .navbar-item,
.navbar-brand > .navbar-item:hover {
  color: $blue-dark;
}

.logo {
  position: relative;
}

.beta {
  position: absolute;
  top: 50%;
  left: 90%;
  padding: 0.05rem 0.3rem;
  transform: translateY(-100%);
  color: $white;
  font-style: italic;
  font-weight: 700;
  font-size: $size-7;
  border-radius: 4px;
  background-color: $orange;
}

.button.login {
  // color: white;
  background-color: transparent;
  text-decoration: none;
}
</style>
