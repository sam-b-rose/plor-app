<template>
  <span
    class="dropdown"
    :class="rootClasses">
    <div
      v-if="!inline"
      role="button"
      ref="trigger"
      class="dropdown-trigger"
      :class="triggerClass"
      @click="toggle">
      <slot name="trigger"/>
    </div>

    <transition name="fade">
      <div
        v-if="isMobileModal"
        v-show="isActive"
        class="background"/>
    </transition>

    <transition name="fade">
      <div
        v-show="(!disabled && (isActive || hoverable)) || inline"
        ref="dropdownMenu"
        class="dropdown-menu">
        <div class="dropdown-content">
          <slot/>
        </div>
      </div>
    </transition>
  </span>
</template>

<script>
export default {
  name: 'PlorDropdown',
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Set, Symbol, Function],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hoverable: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    mobileModal: {
      type: Boolean,
      default: true
    },
    multiselect: {
      type: Boolean,
      default: false
    },
    triggerClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isActive: false,
      selected: this.value,
      isDropdown: true
    };
  },
  computed: {
    rootClasses() {
      return [
        this.position,
        {
          'is-disabled': this.disabled,
          'is-hoverable': this.hoverable,
          'is-multiselect': this.mutiselect,
          'is-inline': this.inline,
          'is-right': this.right,
          'is-active': this.isActive || this.inline,
          'is-mobile-modal': this.isMobileModal
        }
      ];
    },
    isMobileModal() {
      return this.mobileModal && !this.inline && !this.hoverable;
    }
  },
  watch: {
    value(value) {
      this.selected = value;
    },
    isActive(value) {
      this.$emit('active-change', value);
    }
  },
  created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.clickedOutside);
    }
  },
  beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('click', this.clickedOutside);
    }
  },
  methods: {
    selectItem(value) {
      // multiselect
      if (this.multiselect && !this.selected.includes(value)) {
        this.$emit('change', value);
        const tempSet = new Set([...this.selected, value]);
        this.selected = Array.from(tempSet);
      } else if (!this.multiselect && this.selected !== value) {
        this.$emit('change', value);
        this.selected = value;
      }

      this.update();
    },
    removeItem(value) {
      const itemIndex = this.selected.indexOf(value);
      this.selected = this.selected.filter(item => item._id != value._id);
      this.update();
    },
    update() {
      this.$emit('input', this.selected);
      if (!this.multiselect) this.isActive = false;
    },
    clickedOutside(event) {
      if (this.inline) return;
      this.isActive = false;
    },
    toggle() {
      if (this.disabled || this.hoverable) return;
      if (!this.isActive) {
        // if not active, toggle after clickOutside event
        // this fixes toggling programmatic
        this.$nextTick(() => {
          this.isActive = !this.isActive;
        });
      } else {
        this.isActive = !this.isActive;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.button > .dropdown-trigger.icon {
  margin: 0 -1rem;
}

.dropdown-menu {
  z-index: 1;
  top: calc(100% + 17px);
  right: -16px;
  padding: 0;
  border-radius: $default-radius;
  box-shadow: 0 2px 12px rgba($black, 0.4);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    right: 24px;
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    border-top-left-radius: 2px;
  }

  &::before {
    z-index: -1;
    box-shadow: 0 2px 12px rgba($black, 0.4);
  }

  &::after {
    z-index: 0;
    background-color: $white;
  }
}

.dropdown-content {
  border-radius: $default-radius;
}

.dropdown {
  &.is-right .dropdown-menu {
    right: -16px;
  }

  &.is-left .dropdown-menu {
    left: -16px;
  }
}
</style>
