<template>
  <div class="landing">
    <div class="container">
      <PlorNavbar @open="modalActive = true" />
      <PlorBuild @open="modalActive = true" />
      <PlorTools />
      <PlorExplorers />
      <PlorEarly @open="modalActive = true" />
      <PlorFooter @open="modalActive = true" />
    </div>
    <portal to="plor-modal">
      <PlorEarlyAccessModal
        :active="modalActive"
        @close="modalActive = false" />
    </portal>
  </div>
</template>

<script>
import PlorNavbar from '@/components/shared/PlorNavbar';
import PlorFooter from '@/components/shared/PlorFooter';

import PlorBuild from '@/components/landing/PlorBuild';
import PlorExplorers from '@/components/landing/PlorExplorers';
import PlorTools from '@/components/landing/PlorTools';
import PlorEarly from '@/components/landing/PlorEarly';

import PlorEarlyAccessModal from '@/components/landing/PlorEarlyAccess/PlorEarlyAccessModal';

export default {
  name: 'Home',
  layout: 'default',
  components: {
    PlorNavbar,
    PlorBuild,
    PlorExplorers,
    PlorTools,
    PlorEarly,
    PlorFooter,
    PlorEarlyAccessModal
  },
  data() {
    return {
      modalActive: false
    };
  },
  async mounted() {
    const AOS = await import('aos');
    AOS.init();
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

.section-title {
  margin-bottom: 2rem;
  font-size: 2.75rem;
  font-weight: 400;
  line-height: 1.15;
}

.landing {
  .title {
    margin-bottom: 1rem;
    font-weight: 500;
  }

  p {
    margin-bottom: 2em;
    color: $blue-light;
    font-size: $size-5;
  }
}
</style>
