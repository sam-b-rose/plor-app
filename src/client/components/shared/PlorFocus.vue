<template>
  <transition
    name="fade"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    @before-enter="inTransition = true"
    @after-leave="inTransition = false">
    <div
      v-if="focus"
      class="plor-focus" />
  </transition>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PlorFocus',
  computed: {
    ...mapState(['focus'])
  }
};
</script>

<style lang="scss">
.plor-focus {
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation-duration: 400ms;
  animation-timing-function: ease;
  background-color: rgba($purple-4, 0.7);
}
</style>
