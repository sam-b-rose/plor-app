<template>
  <PlorModal
    :active="active"
    @close="close">
    <div
      slot="content"
      ref="modalContent">
      <transition-group
        name="fadeInUp"
        tag="div"
        mode="out-in"
        class="columns is-variable is-8"
        enter-active-class="animated fadeIn">
        <div
          v-if="submitted"
          key="access-submitted"
          class="column has-text-centered">
          <img
            class="submitted-image"
            src="/images/check.gif"
            alt="success">
          <h3 class="submitted-text title is-3">
            Successfully submitted
          </h3>
        </div>
        <template v-else>
          <div
            key="access-info"
            class="column">
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
          <div
            key="access-form"
            class="column">
            <PlorEarlyAccessForm @submitted="onSubmit"/>
          </div>
        </template>
      </transition-group>
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
      setTimeout(() => (this.submitted = false), 1000);
      this.$emit('close', data);
    },
    onSubmit() {
      this.submitted = true;
      setTimeout(this.close, 3500);
    }
  }
};
</script>

<style lang="scss" scoped>
$top-height: 25px;

.submitted {
  display: flex;
  // position: absolute;
  z-index: 1;
  // top: $top-height;
  // left: 0;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  // width: 100%;
  // height: calc(100% - $top-height);
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
