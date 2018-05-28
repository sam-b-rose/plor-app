<template>
  <div :class="{'wrapper': clip }">
    <div
      ref="scroller"
      class="scroller"
      :class="{'is-clipped': clip }">
      <nuxt />
    </div>
    <portal-target
      name="plor-modal"
      slim />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['clip'])
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      if (!this.clip) this.$store.commit('SET_POS', window.scrollY);
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.scroller {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>

