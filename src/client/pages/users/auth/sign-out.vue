<template>
  <div>
    <h1 class="title">Sign out</h1>
    <h2 class="subtitle">Are you sure you would like to sign out?</h2>
    <sign-out :redirect="redirect"></sign-out>
  </div>
</template>

<script>
import signOut from '~/components/auth/sign-out'
export default {
  layout: 'auth',
  data () {
    return {
      redirect: { name: 'index' }
    }
  },
  components: {
    signOut
  }
}
</script>
