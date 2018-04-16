<template>
  <section class="section">
    <nav
      class="navbar"
      role="navigation"
      ria-label="secondary navigation">
      <div class="navbar-start">
        <h3 class="title is-4">Profile</h3>
      </div>
      <div class="navbar-end" />
    </nav>
    <div class="columns">
      <div class="column is-half">
        <form @submit.prevent @keyup.enter="save">
          <div class="field">
            <label class="label">Full Name</label>
            <div class="control">
              <input
                v-if="isEditing"
                class="input"
                v-model="name"
                type="text">
              <p v-else>{{ name }}</p>
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-if="isEditing"
                class="input"
                type="text"
                v-model="email">
              <p v-else>{{ email }}</p>
            </div>
          </div>
          <div
            v-if="isEditing"
            class="field is-grouped">
            <div class="control">
              <button
                class="button is-link"
                @click="updateUser">
                Save
              </button>
            </div>
            <div class="control">
              <button
                class="button is-text"
                @click="isEditing = false">
                Cancel
              </button>
            </div>
          </div>
          <div
            v-else
            class="field is-grouped">
            <div class="control">
              <button
                class="button"
                @click="isEditing = true">
                Edit
              </button>
            </div>
            <div class="control">
              <button
                class="button"
                @click="reset">
                Reset password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import Cookies from 'js-cookie';
export default {
  name: 'Profile',
  middleware: 'authenticated',
  layout: 'app',
  data() {
    return {
      isEditing: false,
      name: this.$store.state.user.name,
      email: this.$store.state.user.email
    };
  },
  methods: {
    updateUser() {
      const { email, name } = this;
      this.$store.dispatch('user/updateAccount', { email, name }).then(() => {
        this.isEditing = false;
      });
    },
    reset() {
      this.$store.dispatch('user/forgotPassword').then(() => {
        console.log(`Password reset has been sent to ${this.email}`);
      });
    }
  }
};
</script>
