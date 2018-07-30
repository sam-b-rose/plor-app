<template>
  <div class="deck">
    <div
      class="group"
      v-for="(posts, day, i) in localDeck"
      :key="i">
      <h2 class="date">
        {{ day | getDate }}
        <span class="day">{{ day | getDayOfWeek }}</span>
      </h2>
      <div
        class="post card"
        v-for="(post, j) in posts"
        :key="j">
        {{ post.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import format from 'date-fns/format';
import getDate from 'date-fns/get_date';
import isAfter from 'date-fns/is_after';

export default {
  name: 'PlorDeck',
  filters: {
    getDate,
    getDayOfWeek(date) {
      return format(date, 'dddd');
    }
  },
  computed: {
    ...mapState('posts', ['deck']),
    localDeck() {
      const deck = [...this.deck];
      const sorted = deck.sort((p1, p2) => isAfter(p1.scheduled, p2.scheduled));
      const groupedByDay = sorted.reduce((grouped, post) => {
        const day = format(post.scheduled, 'YYYY-MM-DD');
        if (!grouped[day]) grouped[day] = [];
        grouped[day].push(post);
        return grouped;
      }, {});
      return groupedByDay;
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
    background-color: $border;
  }
}

.date {
  margin: 1rem 0;
  border-bottom: 1px solid $border;
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
}
</style>
