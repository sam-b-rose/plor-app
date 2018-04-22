<template>
  <div>
    <h1 class="title">Sign out</h1>
    <h2 class="subtitle">Are you sure you would like to sign out?</h2>
    <PlorLogout :redirect="redirect" />
  </div>
</template>

<script>
import PlorLogout from '~/components/auth/PlorLogout';
export default {
  layout: 'auth',
  components: { PlorLogout },
  data() {
    return {
      redirect: { name: 'index' }
    };
  }
};
</script>
