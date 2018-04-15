<template>
  <aside class="menu">
    <div class="profile" />
    <ul class="menu-list">
      <li>
        <nuxt-link to="/app">
          <i class="far fa-square-full" /> Posts
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/analytics">
          <i class="far fa-square-full" /> Analytics
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/manage">
          <i class="far fa-square-full" /> Manage
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/settings">
          <i class="far fa-square-full" /> Settings
        </nuxt-link>
      </li>
    </ul>
    <ul class="menu-list bottom">
      <li>
        <nuxt-link :to="`/users/${email}`">
          {{ fullName }}
        </nuxt-link>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      fullName: this.$store.state.user.fullName,
      email: this.$store.state.user.email
    };
  }
};
</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  background-color: $light;
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
}

a.nuxt-link-active {
  color: white;
  background-color: $blue-dark;
}

.profile {
  width: 65px;
  height: 65px;
  margin: 6rem auto;
  border-radius: 50%;
  background-color: $gray;
}
</style>
