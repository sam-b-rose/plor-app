<template>
  <hr v-if="separator" class="dropdown-divider" />
  <a
    v-else-if="!custom && !hasLink"
    class="dropdown-item"
    :class="anchorClasses"
    @click.stop="selectItem"
  >
    <span v-if="multiselect" class="dropdown-item-checkbox">
      <font-awesome-icon v-if="isActive" icon="check" />
    </span>
    <slot />
  </a>
  <div v-else :class="itemClasses" @click="selectItem"><slot /></div>
</template>

<script>
import find from 'lodash/find';

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
    },
    multiselect: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    anchorClasses() {
      return {
        'is-disabled': this.$parent.disabled || this.disabled,
        'is-paddingless': this.paddingless,
        'is-active': this.isActive,
        'is-multiselect': this.multiselect
      };
    },
    itemClasses() {
      return {
        'dropdown-item': !this.hasLink,
        'is-disabled': this.disabled,
        'is-paddingless': this.paddingless,
        'is-active': this.isActive,
        'has-link': this.hasLink
      };
    },
    isActive() {
      return (
        this.value !== null &&
        (this.value === this.$parent.selected ||
          find(this.$parent.selected, { _id: this.value._id }))
      );
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

      if (this.multiselect && this.isActive) {
        this.$parent.removeItem(this.value);
      } else {
        this.$parent.selectItem(this.value);
      }
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
a.dropdown-item {
  z-index: 1;
  padding: 0.825rem 2.75rem;

  &.is-active,
  &:hover.is-active {
    background-color: $purple-0;
    color: $blue-dark;
  }

  &.is-multiselect {
    background-color: transparent;
  }

  &:hover:not(.is-disabled),
  &:hover.is-multiselect.is-active {
    background-color: $light;
    color: $blue-dark;
  }

  &.is-disabled,
  &is-active.is-disabled,
  &:hover.is-active.is-disabled {
    background-color: transparent;
    cursor: default;
  }
}

.dropdown-item-checkbox {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 1rem;
  margin-left: 0.5rem;
  border: 1px solid $border-blue;
  border-radius: 4px;
}

.dropdown-item.is-active .dropdown-item-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: $purple-2;
  background-color: $purple-2;
  color: $white;
  font-size: 0.625rem;
}
</style>
