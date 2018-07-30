<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">Profile</h3>
      <form
        @submit.prevent
        @keyup.enter="save">
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
              class="button is-text"
              @click="reset">
              Reset password
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
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
      const { email } = this;
      this.$store.dispatch('user/forgotPassword', { email }).then(() => {
        console.log(`Password reset has been sent to ${this.email}`);
      });
    }
  }
};
</script>
