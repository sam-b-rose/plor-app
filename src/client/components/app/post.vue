<template>
  <form @submit.prevent @key.enter="submit">
    <textarea
      v-model="message"
      class="post"
      placeholder="Type it loud and clear!">
    </textarea>
    <button @click="submit">Schedule</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      hasMedia: false,
      hasGIF: false,
      hasPoll: false
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('posts/addPost', {
        message: this.message,
        username: this.$store.state.user.username
      }).then(() => {
        if (this.$store.state.notification.success) {
          console.log('Post added!')
          this.message = ''
        }
      })
    }
  }
}
</script>

<style lang="scss">
.post {
  font-size: 1.5rem;
  border: none;
  resize: none;
}
</style>
