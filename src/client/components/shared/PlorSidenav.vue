<template>
  <aside class="menu">
    <div
      class="profile"
      :style="{ backgroundImage: `url('${gravatar}')` }"/>
    <ul class="menu-list">
      <li>
        <nuxt-link to="/app">
          <i class="far fa-square-full" /> Posts
        </nuxt-link>
      </li>
      <!-- <li>
        <nuxt-link to="/analytics">
          <i class="far fa-square-full" /> Analytics
        </nuxt-link>
      </li> -->
      <li>
        <nuxt-link to="/manage">
          <i class="far fa-square-full" /> Manage
        </nuxt-link>
      </li>
      <!-- <li>
        <nuxt-link to="/settings">
          <i class="far fa-square-full" /> Settings
        </nuxt-link>
      </li> -->
    </ul>
    <ul class="menu-list bottom">
      <li>
        <nuxt-link :to="`/users/account`">
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
.menu {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  background-color: $primary;
}

.menu-list {
  flex: 1 1 auto;
  margin: 1rem;

  svg {
    margin-right: 10px;
  }

  &.bottom {
    flex: 0 0 auto;
  }
}

a {
  margin: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  color: white;
  font-weight: 500;

  &:hover {
    color: $blue-dark;
  }
}

a.nuxt-link-active {
  background-color: $purple-2;

  &:hover {
    background-color: white;
    color: $blue-dark;
  }
}

.profile {
  flex: 0 0 auto;
  width: 65px;
  height: 65px;
  margin: 6rem auto;
  border-radius: 50%;
  background-color: $gray;
  background-size: cover;
}
</style>
