<template>
  <PlorDropdown
    right
    multiselect
    trigger-class="button has-text-left"
    v-model="localSelected"
    @active-change="passActiveChange"
  >
    <template slot="trigger">
      <span class="tag is-primary is-rounded"> {{ selected.length }} </span>
      <span>Account{{ selected.length > 1 ? 's' : '' }}</span>
      <span class="icon"> <font-awesome-icon icon="chevron-down" /> </span>
    </template>

    <PlorDropdownItem
      multiselect
      class="dropdown-account"
      v-for="(account, i) in connections"
      :key="i"
      :value="account"
      :disabled="disabled"
    >
      <figure class="image is-32x32">
        <img
          class="is-rounded"
          :src="account.profileImageUrl"
          :alt="account.handle"
        />
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
  props: {
    selected: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PlorDropdown,
    PlorDropdownItem
  },
  data() {
    return {
      localSelected: []
    };
  },
  computed: {
    ...mapState('connections', ['connections'])
  },
  watch: {
    localSelected() {
      this.$emit('selected', this.localSelected);
    }
  },
  created() {
    this.localSelected = this.selected;
  },
  methods: {
    passActiveChange(value) {
      this.$emit('active-change', value);
    }
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
