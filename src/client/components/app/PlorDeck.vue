<template>
  <div class="deck">
    <div
      class="group"
      v-for="[day, posts] in localDeck"
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
import toPairs from 'lodash/toPairs';
import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
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
    },
    mostRecent: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flatpickrConfig
    };
  },
  computed: {
    localDeck() {
      const deck = this.deck.map(o => ({ ...o }));
      const groupedByDay = deck.reduce((grouped, post) => {
        const day = format(post.scheduled, 'YYYY-MM-DD');
        if (!grouped[day]) grouped[day] = [];
        post.day = day;
        post.index = grouped[day].length;
        post.postId = `${post.day}_${post.index}`;
        post.newScheduled = post.scheduled;
        grouped[day].push(post);
        return grouped;
      }, {});
      const sortFn = this.mostRecent ? isBefore : isAfter;
      const pairedByDay = toPairs(groupedByDay);
      return pairedByDay.sort(([d1], [d2]) => (sortFn(d1, d2) ? 1 : -1));
    }
  }
};
</script>

<style lang="scss" scoped>
.group {
  position: relative;
  margin: 0 0 2rem;

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
  margin: 1.5rem 0;
  border-bottom: 1px solid $border-blue;
  font-size: 1.5rem;
}

.day {
  font: {
    size: 1rem;
    weight: 600;
  }
}

.deck {
  padding-bottom: 4rem;

  .post.on-deck {
    position: relative;
    margin: 0.5rem 0 1rem 2rem;

    &::before {
      content: '';
      position: absolute;
      top: 21px;
      left: 0;
      width: 11px;
      height: 11px;
      transform: translateX(calc(-50% + 1px)) rotate(45deg);
      transition: box-shadow 200ms ease;
      border-radius: 2px;
      background-color: $white;
      box-shadow: -1px 1px 0 $border-blue;
    }

    &::after {
      content: '';
      position: absolute;
      top: 21.5px;
      left: -20.5px;
      width: 10px;
      height: 10px;
      transition: background-color 200ms ease;
      border-radius: 50%;
      background-color: $border-blue;
    }

    &.active::before {
      box-shadow: -1px 1px transparent;
    }

    &.active::after {
      background-color: #52406d;
    }
  }
}
</style>
