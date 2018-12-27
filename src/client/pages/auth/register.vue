<template>
  <div>
    <h1 class="title">Sign up</h1>
    <h2 class="subtitle">Create an account</h2>
    <PlorRegister :redirect="redirect" />
  </div>
</template>

<script>
import PlorRegister from '~/components/auth/PlorRegister';

export default {
  layout: 'auth',
  data() {
    return {
      redirect: { name: 'app' }
    };
  },
  components: {
    PlorRegister
  }
};
</script>
