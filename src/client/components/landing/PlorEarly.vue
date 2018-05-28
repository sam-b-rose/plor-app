<template>
  <div class="columns is-gapless">
    <div class="column is-half">
      <section class="hero is-halfheight">
        <div class="hero-body">
          <div class="container">
            <div class="content">
              <div class="section-title">Get early access</div>
              <p>We are currently building Plor to be totally rad. Sign up and we'll let you know when we are ready for your greatness. We promise absolutely no spam.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="column is-half is-hidden-touch">
      <section class="hero is-halfheight">
        <div class="hero-body">
          <div class="container">
            <button
              class="button button--long is-link is-outlined"
              @click="$emit('open')">
              Get early access
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlorEarly'
};
</script>

