<template>
  <section class="columns is-centered">
    <aside class="column is-half is-hidden-touch v-center">
      <div class="hero is-fullheight">
        <div class="hero-body">
          <img
            class="artwork"
            src="/images/building.jpg"
            alt="Tools designed for you">
        </div>
      </div>
    </aside>
    <main class="column is-half-desktop is-two-thirds-tablet">
      <div class="hero is-fullheight">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">Build your audience by socializing smarter</h1>
            <p>Spread the word without a hassle so you and your team can get back to business.</p>
            <p>Plor takes the stress of managing all those social media accounts off your shoulders. Less time posting or tweeting and more time relaxing.</p>
            <button
              class="button button--long is-link is-outlined"
              @click="$emit('open')">
              Get early access
            </button>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import PlorEarlyAccessModal from '@/components/landing/PlorEarlyAccess/PlorEarlyAccessModal';

export default {
  name: 'PlorBuild',
  components: {
    PlorEarlyAccessModal
  },
  data() {
    return {
      modalActive: false
    };
  }
};
</script>


<style lang="scss" scoped>
.hero-body {
  padding: 3rem;
}

.v-center {
  display: flex;
  align-items: center;
}

.artwork {
  width: 100%;
  margin: 0 auto;
}

.title {
  font-size: 2.75rem;
  font-weight: 400;
}
</style>

