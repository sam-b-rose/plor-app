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
  props: {
    redirect: {
      type: Object,
      default: () => {
        name: 'index';
      }
    }
  },
  methods: {
    signOut() {
      this.$store.dispatch('user/logout').then(() => {
        if (this.$store.state.notification.success)
          this.$router.replace(this.redirect);
      });
    }
  }
};
</script>
