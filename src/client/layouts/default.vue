<template>
  <div>
    <PlorNavbar />
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import PlorNavbar from '~/components/shared/PlorNavbar';

export default {
  components: {
    PlorNavbar
  }
};
</script>

