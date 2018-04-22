<template>
  <ul class="list">
    <li
      class="list-item"
      v-for="(item, i) in items"
      :key="i">
      <span
        v-if="isObject && item.icon"
        class="icon"
        :style="{ color: item.color }">
        <font-awesome-icon :icon="item.icon" />
      </span>
      <span>{{ isObject ? item[textKey] : item }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PlorList',
  props: {
    textKey: {
      type: String,
      default: 'text'
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isObject() {
      return this.items.length && typeof this.items[0] === 'object';
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  padding-left: 2rem;
}

.list-item {
  display: flex;
  border-top: 1px solid $gray;
  padding: 0.75rem 0;

  &:last-child {
    border-bottom: 1px solid $gray;
  }

  &:hover {
    color: $blue;
    cursor: pointer;
  }

  .icon {
    margin-left: -2rem;
    margin-right: 1rem;
  }
}
</style>
