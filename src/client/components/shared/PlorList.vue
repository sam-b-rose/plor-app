<template>
  <ul class="list">
    <li class="list-item" v-for="(item, i) in items" :key="i">
      <span
        v-if="isObject && item.icon"
        class="icon"
        :style="{ color: item.color }"
      >
        <font-awesome-icon :icon="item.icon" />
      </span>
      <span>
        <a class="list-link" :href="isObject && item.url">
          {{ isObject ? item[textKey] : item }}
        </a>
        <nuxt-link v-if="isObject && item.link" :to="item.link">
          {{ isObject ? item[textKey] : item }}
        </nuxt-link>
      </span>
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
  color: $dark;
  border-top: 1px solid $gray;
  padding: 0.75rem 0;

  a {
    color: $dark;
  }

  &:last-child {
    border-bottom: 1px solid $gray;
  }

  &:hover {
    color: $link;
    cursor: pointer;

    a {
      color: $link;
    }
  }

  .icon {
    margin-left: -2rem;
    margin-right: 1rem;
  }
}
</style>
