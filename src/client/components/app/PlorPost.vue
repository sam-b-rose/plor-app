<template>
  <form
    class="card new-post"
    :class="{'active': addingPost}"
    @submit.prevent
    @key.enter="submit">

    <transition
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <div
        v-if="addingPost"
        class="card-focus" />
    </transition>

    <div class="card-content">
      <div class="field">
        <div class="control">
          <textarea
            rows="1"
            class="textarea is-borderless"
            @focus="addingPost = true"
            @keydown.enter.prevent="submit"
            placeholder="Type it loud and clear!"
            v-model="message"/>
        </div>
      </div>
    </div>

    <component
      :is="addingPost ? 'div' : 'footer'"
      class="card-footer media-options">
      <div class="field is-grouped">
        <button
          class="button is-text"
          @click="addMedia">
          <span class="icon">
            <font-awesome-icon icon="camera" />
          </span>
          <span>Photo / Video</span>
        </button>
      </div>
    </component>

    <footer
      v-if="addingPost"
      class="card-footer">
      <div class="field is-grouped">
        <div class="control">
          <button
            class="button"
            @click="cancel">
            Cancel
          </button>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div
          v-if="selectedAction === 'Schedule'"
          class="control">
          <flat-pickr
            class="input"
            v-model="scheduled"
            :config="config"
            name="scheduled" />
        </div>
        <div class="control">
          <div class="buttons has-addons is-right">
            <div
              class="button is-fancy"
              @click="submit">
              {{ selectedAction }}
            </div>
            <PlorDropdown
              v-model="selectedAction"
              right
              class="button has-text-left is-fancy"
              trigger-class="icon">
              <span slot="trigger">
                <font-awesome-icon icon="chevron-down" />
              </span>

              <PlorDropdownItem
                v-for="(action, i) in actionItems"
                :key="i"
                :value="action">
                {{ action }}
              </PlorDropdownItem>
            </PlorDropdown>
          </div>
        </div>
      </div>
    </footer>

    <transition
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <div
        v-if="confirmDiscard"
        class="discard">
        <div class="discard-container">
          <div class="title discard-message">Discard this post?</div>
          <div class="field is-grouped is-grouped-centered">
            <div class="control">
              <button
                class="button"
                @click="confirmDiscard = false">
                Nevermind
              </button>
            </div>
            <div class="control">
              <button
                class="button is-primary"
                @click="discard">
                Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

  </form>
</template>

<script>
import addHours from 'date-fns/add_hours';
import startOfTomorrow from 'date-fns/start_of_tomorrow';

import FlatPickr from 'vue-flatpickr-component';
import PlorDropdown from '@/components/shared/PlorDropdown';
import PlorDropdownItem from '@/components/shared/PlorDropdownItem';

export default {
  components: {
    FlatPickr,
    PlorDropdown,
    PlorDropdownItem
  },
  data() {
    return {
      message: '',
      scheduled: addHours(startOfTomorrow(), 12),
      hasMedia: false,
      hasGIF: false,
      addingPost: false,
      confirmDiscard: false,
      selectedAction: null,
      actionItems: {
        queuePost: 'Add to queue',
        schedulePost: 'Schedule',
        sendPost: 'Post now',
        savePost: 'Save to draft'
      },
      config: {
        static: true,
        enableTime: true,
        altInput: true,
        altFormat: 'M j, Y | h:i | K',
        minDate: Date.now()
      }
    };
  },
  created() {
    this.selectedAction = this.actionItems.schedulePost;
  },
  methods: {
    addMedia() {},
    submit() {
      const { connections } = this.$store.state.connections;
      const action = Object.keys(this.actionItems)
        .filter(k => this.actionItems[k] === this.selectedAction)
        .pop();
      this.$store
        .dispatch(`posts/${action}`, {
          connections,
          draft: false,
          text: this.message,
          scheduled: new Date(this.scheduled)
        })
        .then(() => {
          if (this.$store.state.notification.success) {
            console.log('Post added!');
            this.message = '';
            this.addingPost = false;
          }
        });
    },
    cancel() {
      if (!this.message) return (this.addingPost = false);
      this.confirmDiscard = true;
    },
    discard() {
      this.confirmDiscard = false;
      this.message = '';
      this.cancel();
    }
  }
};
</script>

<style lang="scss">
.new-post {
  z-index: 1;
}

.card-focus {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation-duration: 0.3s;
  background-color: rgba($purple-4, 0.7);
}

.card-content {
  min-height: 0;
  transition: min-height 0.3s ease;
}

.media-options {
  padding: 0.5rem;
  background-color: $light-gray-2;
}

.card {
  &.active {
    .card-content {
      min-height: 200px;
    }
  }
}

.card-footer {
  &:not(:last-child) {
    border-radius: 0;
  }
}

.field {
  &.is-grouped {
    flex: 1 1 auto;
    align-items: center;
  }

  &:not(:last-child) {
    margin-bottom: 0;
  }
}

.discard {
  display: flex;
  position: fixed;
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

.discard-message {
  color: $white;
}
</style>
