<template>
  <div>
    <h1 class="title">Sign in</h1>
    <h1 class="subtitle">Login to your account</h1>
    <sign-in :redirect="redirect" />
  </div>
</template>

<script>
import signIn from '~/components/auth/sign-in';
export default {
  layout: 'auth',
  components: { signIn },
  data() {
    return {
      redirect: { name: 'app' }
    };
  }
};
</script>
