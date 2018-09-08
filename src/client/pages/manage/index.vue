<template>
  <section class="section">
    <div class="container is-fluid">
      <h3 class="subtitle is-3">Accounts</h3>
      <div class="level">
        <div class="level-left">
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Search accounts">
              <span class="icon is-small is-left">
                <font-awesome-icon
                  :icon="['fas', 'search']" />
              </span>
            </p>
          </div>
        </div>
        <div class="level-right">
          <button
            class="button"
            @click="addAccount">
            <span class="icon">
              <font-awesome-icon icon="plus" />
            </span>
            <span>Add Account</span>
          </button>
          <portal to="plor-modal">
            Twitter or Facebook
          </portal>
        </div>
      </div>
      <PlorTable
        :rows="connections"
        :order="order"
        :labels="labels" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import PlorList from '@/components/shared/PlorList';
import PlorTable from '@/components/shared/PlorTable';

export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    PlorList,
    PlorTable
  },
  async fetch({ store }) {
    await store.dispatch('connections/fetchConnections');
  },
  data() {
    return {
      labels: ['Handle', 'Network'],
      order: ['handle', 'type']
    };
  },
  computed: {
    ...mapState('connections', ['connections'])
  },
  methods: {
    addAccount() {
      window.location.href = '/api/connections/twitter';
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
