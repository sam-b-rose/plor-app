<template>
  <svg
    :viewBox="`0 0 ${width} ${height}`"
    :width="width * scale"
    :height="height * scale"
    xmlns="http://www.w3.org/2000/svg"
  >
    <slot />
  </svg>
</template>

<script>
const sizes = ['sm', 'md', 'lg'];
const sizeMap = [0.625, 1, 2];

export default {
  name: 'IconBase',
  props: {
    width: {
      type: Number,
      default: 16
    },
    height: {
      type: Number,
      default: 16
    },
    size: {
      type: String,
      default: 'md',
      validate(value) {
        return sizes.indexOf(value) !== -1;
      }
    },
    fill: {
      type: String,
      default: '#ffffff'
    }
  },
  computed: {
    scale() {
      return sizeMap[sizes.indexOf(this.size)];
    }
  }
};
</script>
