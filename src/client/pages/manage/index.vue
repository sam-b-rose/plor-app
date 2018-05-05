<template>
  <section class="section">
    <nav
      class="navbar"
      role="navigation"
      ria-label="secondary navigation">
      <div class="navbar-start">
        <h3 class="title is-4">Manage</h3>
      </div>
      <div class="navbar-end">
        <nuxt-link
          class="navbar-item is-tab is-active"
          to="/">
          Socail Accounts
        </nuxt-link>
        <nuxt-link
          class="navbar-item is-tab"
          to="/">
          Members
        </nuxt-link>
        <nuxt-link
          class="navbar-item is-tab"
          to="/">
          Schedule
        </nuxt-link>
      </div>
    </nav>
    <div class="tile is-ancestor">
      <div class="tile is-parent is-vertical is-3">
        <PlorList
          class="tile is-child"
          :items="connectionItems" />
      </div>
      <div class="connections tile is-parent is-vertical is-9">
        <div
          class="level"
          slot="header">
          <div class="level-left">Social Accounts</div>
          <div class="level-right">
            <button class="button is-link is-small">+ Add Account</button>
          </div>
        </div>
        <PlorTable
          :rows="connections"
          :order="order"
          :labels="labels" />
      </div>
    </div>
  </section>
</template>

<script>
import PlorList from '@/components/shared/PlorList';
import PlorTable from '@/components/shared/PlorTable';

export default {
  layout: 'app',
  middleware: 'authenticated',
  components: {
    PlorList,
    PlorTable
  },
  data() {
    return {
      connectionItems: [
        {
          text: 'Connect to Facebook',
          icon: ['fab', 'facebook'],
          color: '#3B5998'
        },
        {
          text: 'Connect to Twitter',
          icon: ['fab', 'twitter'],
          color: '#1DA1F2'
        }
      ],
      labels: ['Handle', 'Network'],
      order: ['handle', 'type'],
      connections: [
        {
          type: 'twitter',
          handle: '_samrose3_'
        },
        {
          type: 'facebook',
          handle: 'samrose3'
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 3rem;
}

.navbar {
  margin-bottom: 2rem;
  border-bottom: 1px solid $light;
}

.connections {
  border: 1px solid $light;
  border-radius: 6px;
}
</style>

