<template>
  <div class="landing">
    <div class="container">
      <PlorNavbar />
      <PlorBuild />
      <PlorTools />
      <PlorExplorers />
      <PlorEarly />
    </div>
  </div>
</template>

<script>
import PlorNavbar from '@/components/shared/PlorNavbar';

import PlorBuild from '@/components/landing/PlorBuild';
import PlorExplorers from '@/components/landing/PlorExplorers';
import PlorTools from '@/components/landing/PlorTools';
import PlorEarly from '@/components/landing/PlorEarly';

export default {
  name: 'Home',
  layout: 'default',
  components: {
    PlorNavbar,
    PlorBuild,
    PlorExplorers,
    PlorTools,
    PlorEarly
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
