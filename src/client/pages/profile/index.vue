<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">Profile</h3>
      <div class="columns">
        <div class="column column--fixed">
          <form @submit.prevent @keyup.enter="save">
            <div class="field">
              <img
                class="profile"
                :src="gravatar"
                :alt="`${name}'s gravatar'`"
              />
            </div>
            <div class="field">
              <label class="label">Full Name</label>
              <div class="control">
                <input
                  class="input"
                  v-model="name"
                  :readonly="!isEditing"
                  type="text"
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  :readonly="!isEditing"
                  v-model="email"
                />
              </div>
            </div>
            <div v-if="isEditing" class="field is-grouped">
              <div class="control">
                <button class="button is-link" @click="updateUser">Save</button>
              </div>
              <div class="control">
                <button class="button is-text" @click="cancel">Cancel</button>
              </div>
            </div>
            <div v-else class="field is-grouped">
              <div class="control">
                <button class="button" @click="isEditing = true">Edit</button>
              </div>
              <div class="control">
                <button class="button is-text" @click="reset">
                  Reset password
                </button>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <nuxt-link to="auth/logout" class="button">
                  Sign out
                </nuxt-link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Profile',
  transition: 'rise-up',
  middleware: 'authenticated',
  layout: 'app',
  data() {
    return {
      isEditing: false,
      name: this.$store.state.user.name,
      email: this.$store.state.user.email,
      gravatar: this.$store.state.user.gravatar
    };
  },
  methods: {
    updateUser() {
      const { email, name } = this;
      this.$store.dispatch('user/updateAccount', { email, name }).then(() => {
        this.isEditing = false;
      });
    },
    cancel() {
      this.isEditing = false;
      this.name = this.$store.state.user.name;
      this.email = this.$store.state.user.email;
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

<style lang="scss">
input:read-only {
  background: $light-gray-2;

  &,
  &:focus,
  &:hover {
    border-color: $border-blue;
  }
}

.profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: $gray;
}
</style>
