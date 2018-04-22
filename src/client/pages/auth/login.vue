<template>
  <div>
    <h1 class="title">Sign in</h1>
    <h1 class="subtitle">Login to your account</h1>
    <plor-login :redirect="redirect" />
  </div>
</template>

<script>
import PlorLogin from '~/components/auth/PlorLogin';

export default {
  layout: 'auth',
  components: { PlorLogin },
  data() {
    return {
      redirect: { name: 'app' }
    };
  }
};
</script>
