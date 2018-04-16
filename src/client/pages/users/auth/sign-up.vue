<template>
  <div>
    <h1 class="title">Sign up</h1>
    <h2 class="subtitle">Create an account</h2>
    <sign-up :redirect="redirect"/>
  </div>
</template>

<script>
import signUp from '~/components/auth/sign-up';

export default {
  layout: 'auth',
  data() {
    return {
      redirect: { name: 'app' }
    };
  },
  components: {
    signUp
  }
};
</script>
