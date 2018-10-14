<template>
  <div class="plor-empty">
    <div
      class="plor-empty__title"
      v-html="title" />
    <div
      class="plor-empty__message"
      v-html="message" />
  </div>
</template>

<script>
export default {
  name: 'PlorEmpty',
  props: {
    title: {
      type: String,
      default: 'Empty'
    },
    message: {
      type: String,
      default: 'You have no data.'
    }
  }
};
</script>

<style lang="scss">
.plor-empty {
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 1.5rem 0;
  padding: 3.25rem 8rem;
  border: 1px solid $border-blue;
  border-radius: $default-radius;
  background-color: $light-gray-2;
  text-align: center;
}

.plor-empty__title {
  margin-bottom: 0.5rem;
  color: $purple-text;
  font-size: 1.25rem;
}

.plor-empty__message {
  color: $text-light;
  font-size: 0.825rem;
}
</style>
