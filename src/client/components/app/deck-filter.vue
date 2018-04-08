<template>
  <ul>
    <li
      v-for="(item, i) in items"
      :key="i">
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      items: [
        'Tags',
        'Social Accounts',
        'Users',
        'Content'
      ]
    }
  }
}
</script>

<style scoped>
.list {
  font-size: 1.2rem;
}
</style>
