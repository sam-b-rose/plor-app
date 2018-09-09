<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th
          v-for="(key, i) in order"
          :key="i"
          :title="key | upperCase">
          {{ key | upperCase }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, i) in flatRows"
        :key="i">
        <td
          v-for="([key, value], j) in row"
          :key="j">
          <div class="flex-center">
            <!-- HANDLE -->
            <img
              v-if="key === 'handle'"
              class="handle"
              :src="rows[i].profileImageUrl || 'https://gravatar.com/avatar/s=200'">
            <!-- TYPE -->
            <font-awesome-layers
              v-if="key === 'type'"
              class="type">
              <font-awesome-icon
                :class="value"
                transform="grow-6"
                :icon="['fas', 'circle']" />
              <font-awesome-icon
                class="icon"
                transform="shrink-4"
                :icon="['fab', iconMap[value]]" />
            </font-awesome-layers>
            <span>{{ value | startCase }}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import upperCase from 'lodash/upperCase';
import startCase from 'lodash/startCase';

export default {
  name: 'PlorTable',
  filters: { upperCase, startCase },
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
.flex-center {
  display: flex;
  align-items: center;
  height: 40px;
}

.handle {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 0.75rem;
  border-radius: $default-radius;
  background-color: $purple-text;
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
