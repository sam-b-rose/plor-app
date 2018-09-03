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
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
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
    mutiselect: {
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
      if (this.selected !== value) {
        this.$emit('change', value);
        this.selected = value;
      }
      this.$emit('input', value);
      this.isActive = false;
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
  z-index: 0;
  top: calc(100% + 17px);
  right: -18px;
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
</style>
