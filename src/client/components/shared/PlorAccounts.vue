<template>
  <PlorDropdown
    right
    trigger-class="button has-text-left"
    v-model="localSelected">
    <template slot="trigger">
      <span class="tag is-primary is-rounded">
        {{ selected.length }}
      </span>
      <span>Account{{ selected.length > 1 ? 's' : '' }}</span>
      <span class="icon">
        <font-awesome-icon icon="chevron-down" />
      </span>
    </template>

    <PlorDropdownItem
      class="dropdown-account"
      v-for="(account, i) in connections"
      :key="i"
      :value="account.handle">
      <figure class="image is-32x32">
        <img
          class="is-rounded"
          :src="account.profileImageUrl"
          :alt="account.handle">
      </figure>
      {{ account.handle }}
    </PlorDropdownItem>
  </PlorDropdown>
</template>

<script>
import { mapState } from 'vuex';

import PlorDropdown from '@/components/shared/PlorDropdown';
import PlorDropdownItem from '@/components/shared/PlorDropdownItem';

export default {
  name: 'PlorAccounts',
  components: {
    PlorDropdown,
    PlorDropdownItem
  },
  props: {
    selected: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      localSelected: []
    };
  },
  computed: {
    ...mapState('connections', ['connections'])
  },
  created() {
    this.localSelected = this.selected.map(s => ({ ...s }));
  }
};
</script>

<style lang="scss" scoped>
.dropdown-item {
  &.dropdown-account {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
  }

  .image {
    margin-right: 0.5rem;
  }
}
</style>
