<template>
  <form
    class="card post"
    :class="{
      active: addingPost,
      'on-deck': onDeck
    }"
    @submit.prevent
    @key.enter="submit"
  >
    <div class="card-content">
      <div class="field">
        <div class="control">
          <textarea
            ref="textarea"
            class="textarea is-borderless"
            placeholder="Type it loud and clear!"
            rows="1"
            @focus="onFocus"
            @input="autoExpand"
            @keydown.enter.prevent="submit"
            v-model="localPost.text"
          />
        </div>
      </div>
    </div>

    <!-- FOOTER: Media -->
    <footer v-if="!onDeck || addingPost" class="card-footer light">
      <div class="field is-grouped">
        <button class="button is-text" @click="addMedia">
          <span class="icon"> <FontAwesomeIcon icon="camera" /> </span>
          <span>Photo</span>
        </button>
      </div>
    </footer>

    <!-- FOOTER: Adding post -->
    <footer v-if="addingPost" class="card-footer">
      <div class="field is-grouped">
        <div class="control">
          <button class="button" @click="cancel">Cancel</button>
        </div>
      </div>
      <div key="submit-post" class="field is-grouped is-grouped-right">
        <div v-if="selectedAction === 'Schedule'" class="control">
          <flat-pickr
            class="input"
            key="schedule-post"
            v-model="localPost.scheduled"
            :config="flatpickrConfig"
            name="scheduled"
          />
        </div>
        <div class="control">
          <div class="buttons has-addons is-right">
            <div class="button is-fancy" @click="submit">
              {{ selectedAction }}
            </div>
            <PlorDropdown
              v-model="selectedAction"
              right
              class="button has-text-left is-fancy"
              trigger-class="icon"
            >
              <span slot="trigger">
                <font-awesome-icon icon="chevron-down" />
              </span>

              <PlorDropdownItem
                v-for="(action, i) in actionItems"
                :key="i"
                :value="action"
              >
                {{ action }}
              </PlorDropdownItem>
            </PlorDropdown>
          </div>
        </div>
      </div>
    </footer>

    <footer v-else-if="onDeck" class="card-footer">
      <div class="field is-grouped">
        <div class="control">
          <PlorAccounts
            :selected="localPost.connections"
            @selected="updateConnections"
            @active-change="updateOnChange"
          />
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <flat-pickr
            disabled
            class="input"
            key="schedule-post"
            v-model="localPost.scheduled"
            :config="flatpickrConfig"
            name="scheduled"
          />
        </div>
        <div class="control">
          <button class="button" @click="edit">Edit</button>
        </div>
      </div>
    </footer>

    <PlorPrompt
      :active="confirmDiscard"
      @cancel="confirmDiscard = false"
      @confirm="discard"
    />
  </form>
</template>

<script>
import { mapState } from 'vuex';
import isEqual from 'lodash/isEqual';
import addHours from 'date-fns/add_hours';
import startOfTomorrow from 'date-fns/start_of_tomorrow';
import differenceInDays from 'date-fns/difference_in_days';

import FlatPickr from 'vue-flatpickr-component';
import PlorAccounts from '@/components/shared/PlorAccounts';
import PlorDropdown from '@/components/shared/PlorDropdown';
import PlorDropdownItem from '@/components/shared/PlorDropdownItem';
import PlorPrompt from '@/components/shared/PlorPrompt';

import flatpickrConfig from '@/config/flatpickr';

export default {
  filters: {
    diffDays(date) {
      const days = differenceInDays(new Date(), date);
      if (days === 0) return 'Today';
      if (days === 1) return 'Yesterday';
      return `${days} days ago`;
    }
  },
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
      addingPost: false,
      confirmDiscard: false,
      selectedAction: null,
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
    },
    actionItems() {
      const actions = {
        schedulePost: 'Schedule',
        sendPost: 'Post now'
      };

      if (!this.onDeck) {
        actions.queuePost = 'Add to queue';
        actions.savePost = 'Save to draft';
      } else {
        actions.updatePost = 'Update post';
      }

      if (this.onDeck && !this.isSent) {
        actions.deletePost = 'Delete post';
      }

      return actions;
    }
  },
  watch: {
    addingPost(val) {
      this.$store.commit('SET_FOCUS', val);
    }
  },
  created() {
    this.selectedAction = this.onDeck
      ? this.actionItems.updatePost
      : this.actionItems.schedulePost;
    if (this.post) this.localPost = Object.assign(this.localPost, this.post);
    if (this.localPost.draft)
      this.localPost.scheduled = addHours(startOfTomorrow(), 12);
  },
  mounted() {
    const textarea = this.$refs.textarea;
    if (textarea) textarea.baseScrollHeight = textarea.scrollHeight;
  },
  methods: {
    // TODO: Improve to shrink as well
    autoExpand() {
      const textarea = this.$refs.textarea;
      if (!textarea) return 1;
      const rows = Math.ceil(
        (textarea.scrollHeight - textarea.baseScrollHeight) / 24
      );
      textarea.rows = 1 + rows;
    },

    onFocus() {
      if (this.isSent) return;
      this.addingPost = true;
    },

    addMedia() {},

    edit() {
      this.$nextTick(() => this.$refs.textarea.focus());
    },

    update() {
      this.localPost.updated = new Date();
      this.$store.dispatch('posts/updatePost', this.localPost).then(() => {
        if (this.$store.state.notification.success) {
          console.log('Post updated!');
        }
      });
    },

    submit() {
      const [action] = Object.keys(this.actionItems).filter(
        k => this.actionItems[k] === this.selectedAction
      );
      this.localPost.updated = new Date();
      this.$store.dispatch(`posts/${action}`, this.localPost).then(() => {
        if (this.$store.state.notification.success) {
          console.log(`${action} action success`);
          if (!this.onDeck) this.localPost.text = '';
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
        : this.localPost.scheduled;
      setTimeout(this.cancel, 300);
    },

    updateConnections(selected) {
      this.localPost.connections = selected;
    },

    updateOnChange(isActive) {
      if (isActive) return;
      const sameSelected = isEqual(
        this.localPost.connections,
        this.post.connections
      );
      if (!sameSelected) this.update();
    }
  }
};
</script>

<style lang="scss">
.post {
  .post-text {
    padding: 0.625rem;
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

  .card-content {
    min-height: 0;
    padding: 0.5rem 1rem;
    transition: min-height 0.3s ease;

    &:last-child {
      border-radius: $default-radius;
    }
  }

  .card-footer {
    &.light {
      padding: 0.5rem;
      background-color: $light-gray-2;
    }

    &:not(:last-of-type) {
      border-radius: 0;
    }
  }
}

.post.active {
  z-index: 1;

  .card-content {
    min-height: 200px;
  }
}

.post.on-deck:not(.active) {
  .card-footer {
    border-top: none;
  }
}
</style>
