<template>
  <form @submit.prevent @keyup.enter="submit">
    <div class="field">
      <label class="label">Full name</label>
      <div class="control">
        <input
          class="input"
          type="text"
          name="fullName"
          v-model="fullName">
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          class="input"
          v-model="email"
          :rules="[isEmail, emailExists]"
          @keyup="checkEmail"
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
          v-model="password1"
          label="Password"
          min="8"
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
          v-model="password2"
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
            :to="{ name: 'users-auth-sign-in' }">
            Sign in
          </nuxt-link>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import axios from '~/plugins/axios';
import isEmail from 'validator/lib/isEmail';
let emailTimeout = null;

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
      fullName: '',
      password1: '',
      password2: '',
      pw1: true,
      pw2: true,
      emailExistsData: false
    };
  },
  computed: {
    passwordsMatch() {
      return this.password1 === this.password2 ? '' : "Passwords don't match";
    },
    emailExists() {
      return this.emailExistsData ? 'User with that email already exists.' : '';
    },
    isEmail() {
      return !isEmail(this.email) && this.email.length
        ? 'Must be a valid email'
        : '';
    }
  },
  methods: {
    checkEmail(e) {
      clearTimeout(emailTimeout);
      emailTimeout = setTimeout(() => {
        let email = e.target.value;
        axios
          .get(`/users/check`, {
            params: {
              check: 'email',
              data: email
            }
          })
          .then(data => {
            this.emailExistsData = data.data.exists;
          })
          .catch(error => {
            console.error(error);
          });
      }, 500);
    },
    submit() {
      this.$store
        .dispatch('user/signUp', {
          email: this.email,
          fullName: this.fullName,
          password1: this.password1,
          password2: this.password2
        })
        .then(() => {
          if (this.$store.state.notification.success) {
            this.$router.replace(this.redirect);
          }
        });
    }
  }
};
</script>
