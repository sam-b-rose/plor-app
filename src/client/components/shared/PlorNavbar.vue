<template>
  <nav class="navbar is-transparent is-fixed-top has-text-weight-bold">
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
                class="button is-text"
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
  </nav>
</template>

<script>
export default {
  name: 'PlorNavbar'
};
</script>

<style lang="scss">
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
</style>
