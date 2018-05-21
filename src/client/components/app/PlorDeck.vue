<template>
  <div>
    <h2>Saturday 17th February</h2>
    <p>11:00 AM</p>
    <div
      v-for="post in deck"
      :key="post._id">
      {{ post.text }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PlorDeck',
  computed: {
    ...mapState('posts', ['deck'])
  }
};
</script>
