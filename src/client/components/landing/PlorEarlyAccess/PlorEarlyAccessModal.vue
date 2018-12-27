<template>
  <PlorModal :active="active" @close="close">
    <div slot="content" :class="{ submitted }">
      <div class="submitted-success">
        <img class="submitted-image" src="/images/check.gif" alt="success" />
        <h3 class="submitted-text title is-3">Successfully submitted</h3>
      </div>
      <div class="signup columns is-variable is-8">
        <div class="column">
          <img src="/images/bucket.jpg" alt="paint bucket" />
          <h1 class="title">Get early access</h1>
          <p>
            We’re currently building Plor to be totally
            <a
              href="https://youtu.be/Pubd-spHN-0"
              taget="_blank"
              rel="noopener"
            >
              fetch</a
            >. Signup and we’ll let you know when we’re ready for you. We
            promise absolutely no spam.
          </p>
        </div>
        <div key="access-form" class="column">
          <PlorEarlyAccessForm @submitted="onSubmit" />
        </div>
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
.signup {
  transition: opacity 0.5s ease;
  opacity: 1;
}

.submitted-success {
  display: flex;
  position: absolute;
  z-index: 0;
  top: 50%;
  left: 50%;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  transition: opacity 0.5s ease 0.5s;
  opacity: 0;
  background-color: $white;
}

.submitted-image {
  max-width: 250px;
  margin-bottom: 4rem;
}

.submitted-text {
  color: $green;
}

.submitted {
  & .submitted-success {
    opacity: 1;
  }

  & .signup {
    opacity: 0;
  }
}
</style>
