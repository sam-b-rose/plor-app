<template>
  <aside class="menu">
    <nuxt-link
      class="plor-brand"
      to="/app/queue" />
    <ul class="menu-list">
      <p class="menu-label">
        Posts
      </p>
      <li>
        <nuxt-link to="/app/queue">
          <IconBase
            :width="20"
            :height="20"
            class="sidenav-icon">
            <IconPosts />
          </IconBase> Queue
        </nuxt-link>
        <nuxt-link to="/app/drafts">
          <IconBase
            :width="20"
            :height="20"
            class="sidenav-icon">
            <IconDrafts />
          </IconBase> Drafts
        </nuxt-link>
        <nuxt-link to="/app/history">
          <IconBase
            :width="20"
            :height="20"
            class="sidenav-icon">
            <IconHistory />
          </IconBase> History
        </nuxt-link>
      </li>
      <p class="menu-label">
        Manage
      </p>
      <li>
        <nuxt-link to="/manage">
          <IconBase
            :width="20"
            :height="20"
            class="sidenav-icon">
            <IconAccounts />
          </IconBase> Accounts
        </nuxt-link>
      </li>
      <!-- <li>
        <nuxt-link
          class="strike"
          to="/manage/members">
          Members
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          class="strike"
          to="/manage/schedule">
          Schedule
        </nuxt-link>
      </li> -->
    </ul>
    <ul class="menu-list bottom">
      <li>
        <nuxt-link
          class="profile-link"
          :to="`/profile`">
          <div
            class="profile"
            :style="{ backgroundImage: `url('${gravatar}')` }"/>
          {{ name }}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import IconBase from '@/components/svg/IconBase';
import IconPosts from '@/components/svg/IconPosts';
import IconDrafts from '@/components/svg/IconDrafts';
import IconHistory from '@/components/svg/IconHistory';
import IconAccounts from '@/components/svg/IconAccounts';

export default {
  name: 'PlorSidenav',
  components: {
    IconBase,
    IconPosts,
    IconDrafts,
    IconHistory,
    IconAccounts
  },
  data() {
    return {
      name: this.$store.state.user.name,
      email: this.$store.state.user.email,
      gravatar: this.$store.state.user.gravatar
    };
  }
};
</script>

<style lang="scss" scoped>
.strike {
  &:hover {
    color: $gray;
    text-decoration: line-through;
    cursor: not-allowed;
  }
}

.plor-brand {
  flex: 0 0 auto;
  width: 35px;
  height: 35px;
  margin: 3rem 2rem 2rem;
  border-radius: $default-radius - 2px;
  background-color: $purple-2;
}

.menu {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  overflow: auto;
  border-right: 1px solid $border-blue;
  background-color: $light-gray;
}

.menu-list {
  flex: 1 1 auto;

  &.bottom {
    flex: 0 0 auto;
    margin-bottom: 2rem;
  }
}

.menu-label {
  margin: 1.75rem 2rem 0.75rem;
  color: $text-light;
  font-weight: bold;
}

a:not(.plor-brand) {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0.75rem 2rem;
  border-left: 3px solid transparent;
  font-weight: 400;

  &:hover {
    background-color: rgba($border-blue, 0.5);
    color: $blue-dark;
  }
}

a.nuxt-link-active:not(.plor-brand) {
  border-left-color: $purple-2;
  background-color: $purple-0;
  color: $purple-2;
}

.sidenav-icon {
  margin-right: 0.5rem;
}

.profile-link {
  display: flex;
  align-items: center;
}

.profile {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 1rem;
  border-radius: 50%;
  background-color: $gray;
  background-size: cover;
}
</style>
