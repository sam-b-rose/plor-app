<template>
  <PlorModal
    :active="active"
    @close="close">
    <div
      slot="conent"
      class="columns is-variable is-8">
      <div class="column">
        <img
          src="/images/bucket.jpg"
          alt="paint bucket">
        <h1 class="title">Get early access</h1>
        <p>
          We’re currently building Plor to be totally <a>fetch</a>.
          Signup and we’ll let you know when we’re ready for you.
          We promise absolutely no spam.
        </p>
      </div>
      <div class="column">
        <PlorEarlyAccessForm />
      </div>
    </div>
  </PlorModal>
</template>

<script>
import PlorModal from '@/components/shared/PlorModal';
import PlorEarlyAccessForm from '@/components/landing/PlorEarlyAccessForm';

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
  methods: {
    close(data) {
      this.$emit('close', data);
    }
  }
};
</script>
