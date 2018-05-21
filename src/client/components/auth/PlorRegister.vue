<template>
  <form
    @submit.prevent
    @keyup.enter="submit">
    <div class="field">
      <label class="label">Full name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          name="name"
          v-model="name">
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          v-model="email"
          :rules="[isEmail]"
          type="email"
          required>
      </div>
      <p
        v-if="isEmail"
        class="help">{{ isEmail }}
      </p>
    </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input
          class="input"
          v-model="password"
          type="password"
          required>
      </div>
      <p class="help">At least 8 characters. Mix it up!</p>
    </div>
    <div class="field">
      <label class="label">Confirm password</label>
      <div class="control">
        <input
          class="input"
          v-model="passwordConfirm"
          :rules="[passwordsMatch]"
          type="password"
          required>
      </div>
      <p class="help">Type the exact same thing as last time.</p>
    </div>
    <div class="field">
      <div class="control">
        <button
          class="button is-link"
          @click="submit">
          Sign up
        </button>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <p>
          Already have an account?
          <nuxt-link
            :to="{ name: 'auth-login' }">
            Sign in
          </nuxt-link>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import isEmail from 'validator/lib/isEmail';

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
      name: '',
      password: '',
      passwordConfirm: '',
      pw1: true,
      pw2: true,
      emailExistsData: false
    };
  },
  computed: {
    passwordsMatch() {
      return this.password === this.passwordConfirm
        ? ''
        : "Passwords don't match";
    },
    isEmail() {
      return !isEmail(this.email) && this.email.length
        ? 'Must be a valid email'
        : '';
    }
  },
  methods: {
    async submit() {
      this.$store.dispatch('user/register', {
        email: this.email,
        name: this.name,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      });

      if (this.$store.state.notification.success) {
        this.$router.replace(this.redirect);
      }
    }
  }
};
</script>
