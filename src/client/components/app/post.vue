<template>
  <form
    class="card"
    @submit.prevent
    @key.enter="submit">
    <div class="card-content">
      <div class="field">
        <div class="control">
          <textarea
            rows="1"
            class="textarea"
            @keydown.enter.prevent="submit"
            placeholder="Type it loud and clear!"
            v-model="message"/>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <div class="field is-grouped">
        <div class="control">
          <button class="button">
            <span class="icon">
              <font-awesome-icon :icon="['far', 'image']" />
            </span>
            <span>Image / Video</span>
          </button>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-link"
            @click="submit">
            Schedule
          </button>
        </div>
      </div>
    </footer>
  </form>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      hasMedia: false,
      hasGIF: false,
      hasPoll: false
    };
  },
  methods: {
    submit() {
      this.$store
        .dispatch('posts/addPost', {
          message: this.message,
          email: this.$store.state.user.email
        })
        .then(() => {
          if (this.$store.state.notification.success) {
            console.log('Post added!');
            this.message = '';
          }
        });
    }
  }
};
</script>

<style lang="scss">
.card {
  overflow: hidden;
}

.card-footer {
  background: $light;
  padding: 0.5rem;
}

.field {
  &.is-grouped {
    flex: 1 1 auto;
  }
  &:not(:last-child) {
    margin-bottom: 0;
  }
}

.textarea {
  &,
  &:focus,
  &:active {
    border: none;
    overflow: auto;
    outline: none;
    box-shadow: none;
    resize: none;
  }
}
</style>
