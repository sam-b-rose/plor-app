<template>
  <aside class="menu">
    <div class="plor-brand" />
    <ul class="menu-list">
      <p class="menu-label">
        Posts
      </p>
      <li>
        <nuxt-link to="/app/queue">
          Queue
        </nuxt-link>
        <nuxt-link to="/app/drafts">
          Drafts
        </nuxt-link>
        <nuxt-link to="/app/history">
          History
        </nuxt-link>
      </li>
      <p class="menu-label">
        Manage
      </p>
      <li>
        <nuxt-link to="/manage">
          Accounts
        </nuxt-link>
      </li>
      <li>
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
      </li>
    </ul>
    <ul class="menu-list bottom">
      <li>
        <nuxt-link
          class="profile-link"
          :to="`/users/account`">
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
export default {
  name: 'PlorSidenav',
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
  width: 35px;
  height: 35px;
  margin: 3rem 2rem 2rem;
  background-color: $border;
}

.menu {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  overflow: auto;
  background-color: $light-gray;
}

.menu-list {
  flex: 1 1 auto;

  svg {
    margin-right: 10px;
  }

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

a {
  margin: 0;
  padding: 0.75rem 2rem;
  border-left: 3px solid transparent;
  font-weight: 400;

  &:hover {
    color: $blue-dark;
  }
}

a.nuxt-link-active {
  border-left-color: $purple-2;
  color: $purple-2;
  background-color: $purple-0;
}

.profile-link {
  display: flex;
  align-items: center;
}

.profile {
  display: inline-block;
  width: 35px;
  height: 35px;
  margin-right: 1rem;
  border-radius: 50%;
  background-color: $gray;
  background-size: cover;
}
</style>
