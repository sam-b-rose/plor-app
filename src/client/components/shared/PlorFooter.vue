<template>
  <div class="columns is-gapless">
    <div class="column">
      <nav class="navbar has-text-weight-bold is-spaced">
        <div class="container">
          <div class="navbar-brand">
            <nuxt-link class="logo navbar-item is-primary is-size-4" to="/">
              Plor
            </nuxt-link>
            <div class="navbar-item">
              <!-- Redirect to EA for now -->
              <a class="button is-text" @click.prevent="$emit('open')">
                Sign up
              </a>
              <!-- <nuxt-link
                class="button is-text"
                to="/auth/register">
                Sign up
              </nuxt-link> -->
            </div>
            <div class="navbar-item">
              <nuxt-link class="button is-text" to="/about"> About </nuxt-link>
            </div>
            <div class="navbar-item">
              <nuxt-link class="button is-text" to="/contact">
                Contact
              </nuxt-link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlorFooter'
};
</script>
