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
