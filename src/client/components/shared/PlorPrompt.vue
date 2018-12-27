<template>
  <transition
    name="fade"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div v-if="active" class="prompt">
      <div class="prompt-container">
        <div class="title prompt-message">Discard this post?</div>
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button class="button" @click="$emit('cancel')">Nevermind</button>
          </div>
          <div class="control">
            <button class="button is-primary" @click="$emit('confirm')">
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PlorPrompt',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.prompt {
  display: flex;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  animation-duration: 0.3s;
  background-color: rgba($purple-4, 0.9);
  text-align: center;
}

.prompt-message {
  color: $white;
}
</style>
