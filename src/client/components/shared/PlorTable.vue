<template>
  <div class="plor-table">
    <div class="header columns">
      <div
        class="column"
        v-for="(key, i) in order"
        :key="i">
        {{ key | upperCase }}
      </div>
    </div>
    <div
      class="columns"
      v-for="(row, i) in flatRows"
      :key="i">
      <div
        class="column"
        v-for="([key, value], j) in row"
        :key="j">
        <span
          v-if="key === 'handle'"
          class="handle" />
        <font-awesome-layers
          v-if="key === 'type'"
          class="type">
          <!-- HANDLE -->
          <!-- TODO: Replace with account profile picture -->
          <font-awesome-icon
            :class="value"
            transform="grow-6"
            :icon="['fas', 'circle']" />
          <!-- TYPE -->
          <font-awesome-icon
            class="icon"
            transform="shrink-4"
            :icon="['fab', iconMap[value]]" />
        </font-awesome-layers>
        <span v-html="value" />
      </div>
    </div>
  </div>
</template>

<script>
import upperCase from 'lodash/upperCase';

export default {
  name: 'PlorTable',
  filters: { upperCase },
  props: {
    title: {
      type: String,
      default: ''
    },
    labels: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
    order: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      iconMap: {
        facebook: 'facebook-f',
        twitter: 'twitter'
      }
    };
  },
  computed: {
    flatRows() {
      return this.rows.map(row => this.order.map(key => [key, row[key]]));
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  color: #0b265b;
  font-size: 0.75rem;
  background-color: #edf0f6;
}

.columns {
  &:not(:last-child) {
    border-bottom: 1px solid $light;
  }
}

.column {
  display: flex;
  align-items: center;
}

.handle {
  display: inline-block;
  margin-right: 0.75rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: $white-ter;
}

.type {
  margin-right: 0.75rem;

  .twitter {
    color: $twitter;
  }

  .facebook {
    color: $blue;
  }

  .icon {
    color: $white;
  }
}
</style>
