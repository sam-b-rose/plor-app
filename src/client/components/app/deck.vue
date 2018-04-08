<template>
  <div>
    <h2>Saturday 17th February</h2>
    <p>11:00 AM</p>
    <div
      v-for="post in $store.state.posts.posts"
      :key="post.id">
      {{ post.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'deck'
}
</script>

<style>

</style>
