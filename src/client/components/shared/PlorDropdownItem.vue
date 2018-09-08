<template>
  <hr
    v-if="separator"
    class="dropdown-divider">
  <a
    v-else-if="!custom && !hasLink"
    class="dropdown-item"
    :class="anchorClasses"
    @click="selectItem">
    <slot/>
  </a>
  <div
    v-else
    :class="itemClasses"
    @click="selectItem">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'PlorDropdownItem',
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
      default: null
    },
    separator: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    custom: {
      type: Boolean,
      default: false
    },
    paddingless: {
      type: Boolean,
      default: false
    },
    hasLink: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    anchorClasses() {
      return {
        'is-disabled': this.$parent.disabled || this.disabled,
        'is-paddingless': this.paddingless,
        'is-active': this.value !== null && this.value === this.$parent.selected
      };
    },
    itemClasses() {
      return {
        'dropdown-item': !this.hasLink,
        'is-disabled': this.disabled,
        'is-paddingless': this.paddingless,
        'is-active':
          this.value !== null && this.value === this.$parent.selected,
        'has-link': this.hasLink
      };
    },
    /**
     * Check if item can be clickable.
     */
    isClickable() {
      return (
        !this.$parent.disabled &&
        !this.separator &&
        !this.disabled &&
        !this.custom
      );
    }
  },
  methods: {
    /**
     * Click listener, select the item.
     */
    selectItem() {
      if (!this.isClickable) return;
      this.$parent.selectItem(this.value);
      this.$emit('click');
    }
  },
  created() {
    if (!this.$parent.$data.isDropdown) {
      this.$destroy();
      throw new Error('You should wrap PlorDropdownItem on a PlorDropdown');
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown-item {
  z-index: 1;
  padding: 0.825rem 2.75rem;

  &.is-active,
  &:hover.is-active {
    background-color: $purple-0;
    color: $purple-2;
  }

  &:hover {
    background-color: $light;
    color: $blue-dark;
  }
}
</style>
