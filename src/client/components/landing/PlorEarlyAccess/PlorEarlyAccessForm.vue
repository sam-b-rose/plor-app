<template>
  <form @submit.prevent @keyup.enter="submit">
    <div class="field">
      <label class="label">Full Name</label>
      <div class="control">
        <input class="input" type="text" v-model="name" />
      </div>
    </div>
    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="text" v-model="email" />
      </div>
    </div>
    <div class="field">
      <label class="label">Job Title</label>
      <div class="control">
        <input class="input" type="text" v-model="title" />
      </div>
    </div>
    <div class="field">
      <label class="label">Organization</label>
      <div class="control">
        <input class="input" type="text" v-model="org" />
      </div>
    </div>
    <div class="field is-grouped is-grouped-right">
      <div class="control">
        <button class="button is-link is-outlined" @click="submit">
          Sign up
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'PlorEarlyAccessForm',
  data() {
    return {
      name: '',
      email: '',
      title: '',
      org: ''
    };
  },
  methods: {
    async submit() {
      const { name, email, title, org } = this;
      await this.$store.dispatch('joingMailing', { name, email, title, org });
      if (this.$store.state.notification.success) this.$emit('submitted');
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  padding: 1rem;
}
</style>
