<template>
  <div class="plor-toaster">
    <transition-group
      name="fade"
      enter-active-class="animated fadeIn faster"
      leave-active-class="animated fadeOut faster"
    >
      <div v-for="{ id, status, text } in toaster" :key="id" class="plor-toast">
        <FontAwesomeIcon
          :class="['plor-toast__status', `plor-toast__status--${status}`]"
          :icon="iconMap[status]"
        />
        <div class="plor-toast__content">
          <p class="plor-toast__content-title is-size-6">
            {{ status | startCase }}
          </p>
          <p class="plor-toast__content-message">{{ text }}</p>
        </div>
        <FontAwesomeIcon
          class="plor-toast__close"
          icon="times"
          @click="dismiss(id)"
        />
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import startCase from 'lodash/startCase';

export default {
  name: 'PlorToaster',
  filters: {
    startCase
  },
  data() {
    return {
      iconMap: {
        success: 'check-circle',
        error: 'exclamation-circle'
      },
      timers: {}
    };
  },
  computed: {
    ...mapState('notification', ['toaster'])
  },
  watch: {
    toaster: {
      handler() {
        this.toaster.forEach(toast => {
          if (!this.timers[toast.id])
            this.timers[toast.id] = setTimeout(() => {
              this.dismiss(toast.id);
              delete this.timers[toast.id];
            }, 3000);
        });
      },
      initalize: true
    }
  },
  methods: {
    dismiss(id) {
      this.$store.commit('notification/UPDATE_TOASTER', id);
    }
  }
};
</script>

<style lang="scss">
.plor-toaster {
  position: fixed;
  top: 3rem;
  right: 3rem;
}

.plor-toast {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 1fr auto;
  width: 340px;
  min-height: 90px;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: $default-radius;
  background-color: $purple-3;
  color: $white;
}

.plor-toast__status {
  --status: #{$success};

  color: var(--status, white);

  &--error {
    --status: #{$error};
  }
}

.plor-toast__close {
  cursor: pointer;
}

.plor-toast__status,
.plor-toast__close {
  height: 1.25rem;
  font-size: 1rem;
}

.plor-toast__content-title {
  font-weight: 500;
}

.plor-toast__content-message {
  color: rgba($white, 0.8);
}
</style>
