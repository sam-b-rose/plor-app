<template>
  <PlorModal
    :active="active"
    @close="close">
    <div
      slot="content"
      class="columns is-variable is-8">
      <transition
        name="fadeInUp"
        enter-active-class="animated fadeIn">
        <div
          v-if="submitted"
          class="submitted">
          <img
            class="submitted-image"
            src="/images/check.gif"
            alt="success">
          <h3 class="submitted-text title is-3">
            Successfully submitted
          </h3>
        </div>
      </transition>
      <div class="column">
        <img
          src="/images/bucket.jpg"
          alt="paint bucket">
        <h1 class="title">Get early access</h1>
        <p>
          We’re currently building Plor to be totally
          <a
            href="https://youtu.be/Pubd-spHN-0"
            taget="_blank"
            rel="noopener">
          fetch</a>.
          Signup and we’ll let you know when we’re ready for you.
          We promise absolutely no spam.
        </p>
      </div>
      <div class="column">
        <PlorEarlyAccessForm @submitted="submitted = true"/>
      </div>
    </div>
  </PlorModal>
</template>

<script>
import PlorModal from '@/components/shared/PlorModal';
import PlorEarlyAccessForm from '@/components/landing/PlorEarlyAccess/PlorEarlyAccessForm';

export default {
  name: 'PlorEarlyAccessModal',
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PlorModal,
    PlorEarlyAccessForm
  },
  data() {
    return {
      submitted: false
    };
  },
  methods: {
    close(data) {
      this.submitted = false;
      this.$emit('close', data);
    }
  }
};
</script>

<style lang="scss" scoped>
.submitted {
  display: flex;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  animation-duration: 0.25s;
  animation-delay: 0.25s;
  background-color: $white;
}

.submitted-image {
  max-width: 250px;
  margin-bottom: 4rem;
}

.submitted-text {
  color: $green;
}
</style>
