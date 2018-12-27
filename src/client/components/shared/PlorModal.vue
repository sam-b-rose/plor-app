<template>
  <transition
    name="fade"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <div v-if="active" class="modal is-active">
      <div v-if="active" class="modal-background" @click.self="close" />
      <transition
        appear
        name="fadeDown"
        enter-active-class="animated fadeInUp"
        @after-enter="$emit('appear')"
      >
        <div class="modal-card">
          <header class="modal-card-head">
            <button class="delete" aria-label="close" @click="close" />
          </header>
          <section class="modal-card-body"><slot name="content" /></section>
          <footer class="modal-card-foot" />
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PlorModal',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close(data) {
      this.$emit('close', data);
    }
  }
};
</script>

<style lang="scss" scoped>
$close-size: 30px;

.modal {
  animation-duration: 0.5s;
}

.modal-background {
  background-color: rgba($purple-2, 0.5);
}

.modal-card {
  width: $desktop;
  transition: all 0.25s;
  animation-duration: 0.5s;
  animation-delay: 0.5s;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(25, 5, 32, 0.32);
}

.modal--500 {
  width: 500px;
  height: 500px;
}

.delete {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: $close-size;
  max-width: $close-size;
  height: $close-size;
  max-height: $close-size;
  transition: background-color 0.15s;
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &::before,
  &::after {
    background-color: $primary;
  }
}

.modal-card-head,
.modal-card-foot {
  border: none;
  background-color: $white;
}

.modal-card-body {
  padding: 2rem 4rem;
}
</style>
