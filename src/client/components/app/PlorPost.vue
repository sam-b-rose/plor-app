<template>
  <form
    class="card post"
    :class="{
      'active': addingPost,
      'z-to-top': inTransition,
      'on-deck': onDeck
    }"
    @submit.prevent
    @key.enter="submit">

    <transition
      name="fade"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
      @before-enter="inTransition = true"
      @after-leave="inTransition = false">
      <div
        v-if="addingPost"
        class="card-focus" />
    </transition>

    <div class="card-content">
      <div class="field">
        <div class="control">
          <textarea
            ref="textarea"
            class="textarea is-borderless"
            placeholder="Type it loud and clear!"
            rows="1"
            :readonly="isSent"
            @focus="onFocus"
            @input="autoExpand"
            @keydown.enter.prevent="submit"
            v-model="localPost.text"/>
        </div>
      </div>
    </div>

    <!-- FOOTER: Media -->
    <footer
      v-if="!onDeck || addingPost"
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
    </footer>

    <!-- FOOTER: Adding post -->
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
      <div
        key="submit-post"
        class="field is-grouped is-grouped-right">
        <div
          v-if="selectedAction === 'Schedule'"
          class="control">
          <flat-pickr
            class="input"
            key="schedule-post"
            v-model="localPost.scheduled"
            :config="flatpickrConfig"
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

    <footer
      v-else-if="onDeck"
      class="card-footer">
      <div class="field is-grouped">
        <div class="control">
          <PlorAccounts :selected="localPost.connections"/>
        </div>
      </div>
      <div
        key="edit-post"
        v-if="!isSent"
        class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button"
            @click="edit">
            Edit
          </button>
        </div>
      </div>
    </footer>

    <PlorPrompt
      :active="confirmDiscard"
      @cancel="confirmDiscard = false"
      @confirm="discard" />

  </form>
</template>

<script>
import { mapState } from 'vuex';
import addHours from 'date-fns/add_hours';
import startOfTomorrow from 'date-fns/start_of_tomorrow';

import FlatPickr from 'vue-flatpickr-component';
import PlorAccounts from '@/components/shared/PlorAccounts';
import PlorDropdown from '@/components/shared/PlorDropdown';
import PlorDropdownItem from '@/components/shared/PlorDropdownItem';
import PlorPrompt from '@/components/shared/PlorPrompt';

import flatpickrConfig from '@/config/flatpickr';

export default {
  components: {
    FlatPickr,
    PlorAccounts,
    PlorDropdown,
    PlorDropdownItem,
    PlorPrompt
  },
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      flatpickrConfig,
      inTransition: false,
      addingPost: false,
      confirmDiscard: false,
      selectedAction: null,
      actionItems: {
        queuePost: 'Add to queue',
        schedulePost: 'Schedule',
        sendPost: 'Post now',
        savePost: 'Save to draft'
      },
      localPost: {
        text: '',
        scheduled: addHours(startOfTomorrow(), 12),
        connections: this.$store.state.connections.connections
      }
    };
  },
  computed: {
    onDeck() {
      return this.post !== null;
    },
    isSent() {
      return this.post && this.post.sent;
    }
  },
  created() {
    this.selectedAction = this.actionItems.schedulePost;
    if (this.post) this.localPost = Object.assign({}, this.post);
  },
  mounted() {
    const textarea = this.$refs.textarea;
    textarea.baseScrollHeight = textarea.scrollHeight;
  },
  methods: {
    // TODO: Improve to shrink as well
    autoExpand() {
      const textarea = this.$refs.textarea;
      if (!textarea) return 1;
      const rows = Math.ceil(
        (textarea.scrollHeight - textarea.baseScrollHeight) / 24
      );
      console.log(textarea.scrollHeight, textarea.baseScrollHeight);
      textarea.rows = 1 + rows;
    },
    onFocus() {
      if (this.isSent) return;
      this.addingPost = true;
    },
    addMedia() {},
    edit() {
      setTimeout(() => this.$refs.textarea.focus());
    },
    update() {
      this.post.scheduled = this.post.newScheduled;
      this.$store.dispatch(`posts/updatePost`, post).then(() => {
        if (this.$store.state.notification.success) {
          console.log('Post updated!');
        }
      });
    },
    submit() {
      const { connections } = this;
      const action = Object.keys(this.actionItems)
        .filter(k => this.actionItems[k] === this.selectedAction)
        .pop();
      this.$store
        .dispatch(`posts/${action}`, {
          draft: false,
          text: this.localPost.text,
          scheduled: new Date(this.scheduled),
          connections: this.localPost.connections
        })
        .then(() => {
          if (this.$store.state.notification.success) {
            console.log('Post added!');
            this.localPost.text = '';
            this.addingPost = false;
          }
        });
    },
    cancel() {
      if (
        (!this.post && this.localPost.text === '') ||
        (this.post && this.localPost.text === this.post.text)
      )
        return (this.addingPost = false);
      this.confirmDiscard = true;
    },
    discard() {
      this.confirmDiscard = false;
      this.localPost.text = this.post ? this.post.text : '';
      this.localPost.scheduled = this.post
        ? this.post.scheduled
        : this.localPost.schedulePost;
      this.cancel();
    }
  }
};
</script>

<style lang="scss" scoped>
.post {
  &.z-to-top {
    z-index: 1;
  }

  &.on-deck {
    margin: 0.5rem 0 1rem 2rem;
  }
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
  padding: 0.5rem 1rem;
  transition: min-height 0.3s ease;

  &:last-child {
    border-radius: $default-radius;
  }
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
  &:not(:last-of-type) {
    border-radius: 0;
  }
}

.on-deck:not(.active) {
  .card-footer {
    padding: 0.5rem 1.5rem 1.5rem;
    border-top: none;
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
</style>
