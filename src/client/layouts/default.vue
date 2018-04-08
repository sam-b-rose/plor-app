<template>
  <div>
    <navbar />
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
import navbar from '~/components/shared/navbar';

export default {
  components: {
    navbar
  }
};
</script>

