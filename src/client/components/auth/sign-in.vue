<template>
  <form @submit.prevent @keyup.enter="signIn">
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="email">
      </div>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          class="input"
          v-model="password"
          type="password">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button
          class="button is-link"
          @click="signIn">
          Login
        </button>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <p>
          New to us?
          <nuxt-link :to="{ name: 'users-auth-sign-up' }">Sign in</nuxt-link>
        </p>
      </div>
    </div>
  </form>
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
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    signIn() {
      this.$store
        .dispatch('user/signIn', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          if (this.$store.state.notification.success)
            this.$router.replace(this.redirect);
          else {
            this.email = '';
            this.password = '';
          }
        });
    }
  }
};
</script>
