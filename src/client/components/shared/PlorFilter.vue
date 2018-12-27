<template>
  <ul class="filter">
    <li class="filter-item" v-for="(item, i) in items" :key="i">
      <span>{{ item.text }}</span>
      <span class="icon"> <font-awesome-icon icon="chevron-down" /> </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PlorFilter',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-item {
  @include app-button;

  display: flex;
  align-items: center;
  margin: 0.5rem 0;

  font: {
    size: 0.875rem;
    weight: 500;
  }

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  span:not(.icon) {
    flex: 1 1 auto;
  }
}
</style>
