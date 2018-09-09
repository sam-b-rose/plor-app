<template>
  <div class="deck">
    <div
      class="group"
      v-for="(posts, day, i) in localDeck"
      :key="i">
      <h2 class="date">
        {{ day | getMonthDay }}
        <span class="day">{{ day | getDayOfWeek }}</span>
      </h2>
      <div
        class="post card"
        :class="{'is-editing': editingId === post.postId}"
        v-for="(post, j) in posts"
        :key="j">

        <div class="content">
          <div class="field">
            <div class="control">
              <textarea
                rows="1"
                :readonly="editingId !== post.postId"
                :class="[
                  'textarea is-borderless',
                  `post_${day}_${j}`,
                ]"
                @keydown.enter.prevent="savePost(post, day, j)"
                v-model="post.text"/>
            </div>
          </div>
        </div>

        <div class="level">

          <div class="level-left">
            <div class="field is-grouped">
              <div class="control">
                <PlorDropdown
                  right
                  trigger-class="button has-text-left"
                  v-model="post.connections">
                  <template slot="trigger">
                    <span class="icon tag is-primary is-rounded">
                      {{ post.connections.length }}
                    </span>
                    <span>Account{{ post.connections.length > 1 ? 's' : '' }}</span>
                    <span class="icon">
                      <font-awesome-icon icon="chevron-down" />
                    </span>
                  </template>

                  <PlorDropdownItem
                    v-for="(account, i) in post.connections"
                    :key="i"
                    :value="account.handle">
                    {{ account.handle }}
                  </PlorDropdownItem>
                </PlorDropdown>
              </div>
            </div>
          </div>

          <div class="level-right">
            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <flat-pickr
                  class="input"
                  v-model="post.newScheduled"
                  :config="flatpickrConfig"
                  @on-close="onScheduleClose(post)"
                  name="scheduled" />
              </div>
              <div class="control">
                <button
                  v-if="editingId === post.postId"
                  class="button"
                  @click="resetPost(post)">
                  Cancel
                </button>
              </div>
              <div class="control">
                <button
                  v-if="editingId != post.postId"
                  class="button"
                  @click="editPost(post)">
                  Edit
                </button>
                <button
                  v-else
                  class="button is-primary"
                  @click="savePost(post)">
                  Save
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import find from 'lodash/find';
import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';
import isEqual from 'date-fns/is_equal';

import FlatPickr from 'vue-flatpickr-component';
import PlorDropdown from '@/components/shared/PlorDropdown';
import PlorDropdownItem from '@/components/shared/PlorDropdownItem';

import flatpickrConfig from '@/config/flatpickr';

export default {
  name: 'PlorDeck',
  filters: {
    getMonthDay(date) {
      return format(date, 'MMM D');
    },
    getDayOfWeek(date) {
      return format(date, 'dddd');
    }
  },
  components: {
    PlorDropdown,
    PlorDropdownItem,
    FlatPickr
  },
  props: {
    deck: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      flatpickrConfig,
      editingId: null,
      draft: null
    };
  },
  computed: {
    localDeck() {
      const deck = this.deck.map(o => ({ ...o }));
      const sorted = deck.sort((p1, p2) => isAfter(p1.scheduled, p2.scheduled));
      const groupedByDay = sorted.reduce((grouped, post) => {
        const day = format(post.scheduled, 'YYYY-MM-DD');
        if (!grouped[day]) grouped[day] = [];
        post.day = day;
        post.index = grouped[day].length;
        post.postId = `${post.day}_${post.index}`;
        post.newScheduled = post.scheduled;
        grouped[day].push(post);
        return grouped;
      }, {});
      return groupedByDay;
    }
  },
  methods: {
    onScheduleClose(post) {
      if (isEqual(post.scheduled, post.newScheduled)) return;
      this.editPost(post);
    },
    editPost(post) {
      this.editingId = post.postId;
      this.draft = this.editingId ? post.text : null;
      if (this.editingId) {
        setTimeout(() =>
          document.querySelector(`.post_${post.postId}`).focus()
        );
      }
    },
    savePost(post) {
      post.scheduled = post.newScheduled;
      this.$store.dispatch(`posts/updatePost`, post).then(() => {
        if (this.$store.state.notification.success) {
          this.editingId = null;
          this.draft = null;
          console.log('Post updated!');
        }
      });
    },
    resetPost(post) {
      post.text = this.draft;
      post.newScheduled = post.scheduled;
      this.editingId = null;
      this.draft = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.group {
  position: relative;
  margin: 1rem 0 2rem;

  &::after {
    content: '';
    position: absolute;
    top: 36px;
    left: 1rem;
    width: 1px;
    height: calc(100% - 36px);
    background-color: $border-blue;
  }
}

.date {
  margin: 1rem 0;
  border-bottom: 1px solid $border-blue;
  font-size: 1.5rem;
}

.day {
  font: {
    size: 1rem;
    weight: 600;
  }
}

.post {
  margin: 0.5rem 0 1rem 2rem;
  padding: 1rem;
  transition: box-shadow 0.3s ease;

  &.is-editing {
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.3), 0 0 0 1px rgba(10, 10, 10, 0.1);
  }
}
</style>
