<template>
  <div class="deck">
    <div
      class="group"
      v-for="(posts, day) in localDeck"
      :key="day">
      <h2 class="date">
        {{ day | getMonthDay }}
        <span class="day">{{ day | getDayOfWeek }}</span>
      </h2>

      <PlorPost
        v-for="post in posts"
        :key="post._id"
        :post="post" />

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
import PlorPost from '@/components/app/PlorPost';

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
    PlorPost,
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
</style>
