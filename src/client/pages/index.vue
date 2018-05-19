<template>
  <div class="landing">
    <div class="container">
      <PlorNavbar />
      <PlorBuild />
      <PlorTools />
      <PlorExplorers />
      <div class="columns is-gapless">
        <main class="column is-half">
          <section class="hero is-halfheight">
            <div class="hero-body">
              <div class="container">
                <div class="content">
                  <div class="title">Get early access</div>
                  <p>We are currently building Plor to be totally rad. Sign up and we'll let you know when we are ready for your greatness. We promise absolutely no spam.</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import PlorNavbar from '@/components/shared/PlorNavbar';

import PlorBuild from '@/components/landing/PlorBuild';
import PlorExplorers from '@/components/landing/PlorExplorers';
import PlorTools from '@/components/landing/PlorTools';

export default {
  name: 'Home',
  layout: 'default',
  components: {
    PlorNavbar,
    PlorBuild,
    PlorExplorers,
    PlorTools
  }
};
</script>

<style lang="scss">
@import '~bulma/sass/utilities/mixins';
.hero-body {
  @include desktop() {
    padding: 3rem 6rem;
  }
}

.landing {
  p {
    color: $blue-light;
    font-size: $size-5;
    margin-bottom: 1em;
  }
}
</style>
