<template>
  <div class="field">
    <div class="control">
      <button
        class="button is-link"
        @click="signOut">
        Sign out
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['redirect'],
  methods: {
    signOut () {
      this.$store.dispatch('user/signOut').then(() => {
        if (this.$store.state.notification.success) this.$router.replace(this.redirect)
      })
    }
  }
}
</script>
