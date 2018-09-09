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
        :class="{'is-editing': editingId === `${day}_${j}`}"
        v-for="(post, j) in posts"
        :key="j">

        <div class="content">
          <div class="field">
            <div class="control">
              <textarea
                rows="1"
                :readonly="editingId !== `${day}_${j}`"
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
                <button
                  v-if="editingId === `${day}_${j}`"
                  class="button"
                  @click="resetPost(day, j)">
                  Cancel
                </button>
              </div>
              <div class="control">
                <button
                  v-if="editingId != `${day}_${j}`"
                  class="button"
                  @click="editPost(day, j)">
                  Edit
                </button>
                <button
                  v-else
                  class="button is-primary"
                  @click="savePost(post, day, j)">
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

import PlorDropdown from '@/components/shared/PlorDropdown';
import PlorDropdownItem from '@/components/shared/PlorDropdownItem';

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
    PlorDropdownItem
  },
  props: {
    deck: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
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
        grouped[day].push(post);
        return grouped;
      }, {});
      return groupedByDay;
    }
  },
  methods: {
    editPost(day, j) {
      const newId = `${day}_${j}`;
      this.editingId = newId !== this.editingId ? newId : null;
      this.draft = this.editingId ? this.localDeck[day][j].text : null;
      if (this.editingId) {
        setTimeout(() => document.querySelector(`.post_${newId}`).focus());
      }
    },
    savePost(post, day, j) {
      const { _id } = post;
      this.draft = this.localDeck[day][j].text;
      console.log('saving ', _id, this.draft);
      this.editingId = null;

      this.$store.dispatch(`posts/updatePost`, post).then(() => {
        if (this.$store.state.notification.success) {
          console.log('Post updated!');
        }
      });
    },
    resetPost(day, j) {
      this.localDeck[day][j].text = this.draft;
      this.editingId = null;
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
