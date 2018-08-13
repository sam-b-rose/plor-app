<template>
  <ul class="filter">
    <li
      class="filter-item"
      v-for="(item, i) in items"
      :key="i">
      <span>{{ item.text }}</span>
      <span class="icon">
        <font-awesome-icon icon="chevron-down" />
      </span>
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
.filter {
}

.filter-item {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  padding: 0.5rem 0.625rem;
  border: 1px solid $border-blue;
  border-radius: $default-radius;
  background-color: $light-gray-2;
  color: $purple-3;
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
