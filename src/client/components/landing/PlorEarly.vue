<template>
  <div class="columns is-gapless">
    <div
      class="doodle animated fadeIn"
      @click="updateDoodle">
      <css-doodle ref="doodle">
        :doodle {
        @grid: 10 / 150vmax;
        }

        will-change: transform;
        transition: 5s ease @rand(0.5s);

        border: 1px solid;
        border-color: @pick(
        #FCAF44, #AB06EA, #FB8585,
        rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0),
        rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0)
        );

        @even {
        border-radius: 50%;
        }

        transform:
        scale(@rand(.1, 0.8))
        rotate(@rand(360deg))
        translate(
        @rand(-50%, 50%), @rand(-20%, 20%)
        );
      </css-doodle>
    </div>
    <div class="column is-half">
      <section class="hero is-halfheight">
        <div class="hero-body">
          <div class="container">
            <div class="content">
              <div class="section-title">Get early access</div>
              <p>We are currently building Plor to be totally rad. Sign up and we'll let you know when we are ready for your greatness. We promise absolutely no spam.</p>
              <button
                class="button button--long is-link is-outlined is-hidden-desktop"
                @click="$emit('open')">
                Get early access
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="column is-half is-hidden-touch">
      <section class="hero is-halfheight">
        <div class="hero-body">
          <div class="container">
            <button
              class="button button--long is-link is-outlined"
              @click="$emit('open')">
              Get early access
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlorEarly',
  methods: {
    updateDoodle() {
      this.$refs.doodle.update();
    }
  },
  mounted() {
    this.tick = setInterval(this.updateDoodle, 10 * 1000);
  },
  destroyed() {
    clearInterval(this.tick);
  }
};
</script>

<style lang="scss" scoped>
.columns {
  position: relative;
}

.doodle {
  position: absolute;
  z-index: 0;
  top: -33px;
  left: -25vw;
  width: 150vw;
  max-height: 633px;
  overflow: hidden;
  animation-duration: 6s;
  animation-delay: 3s;
  cursor: pointer;
}
</style>
