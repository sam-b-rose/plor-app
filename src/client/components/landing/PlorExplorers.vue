<template>
  <div class="mountains columns is-centered">
    <div class="column is-half explorers">
      <div
        class="explorer show"
        :style="`background-image: ${linGrad}, url('/images/mitchellbernstein.jpg');`">
        Mitchell Bernstein
      </div>
      <div
        class="explorer show"
        :style="`background-image: ${linGrad}, url('/images/samrose.jpg');`">
        Sam Rose
      </div>
      <div
        class="explorer show"
        :style="`background-image: ${linGrad}, url('/images/franklin.jpg');`">
        Franklin Rose
      </div>
    </div>
    <main class="column is-half-desktop is-two-thirds-tablet">
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="content">
              <div class="title">Built by ex(plor)ers</div>
              <p>Our team is composed of two friends (and an awesome dog) working day and night until this service is plorfect.</p>
              <p>We believe services in this space aren't quite there yet. We felt there was an opportunity to build the best tool to help small and large buisinesses share their gifts with the world.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'PlorExplorers',
  data() {
    return {
      linGrad:
        'linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 50%, rgba(0, 0, 0, 0.5) 100%)'
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.mountains {
  position: relative;
  background-image: url('/images/mountains.png');
  background-position: bottom center;
  background-size: contain;
  background-repeat: no-repeat;

  @include desktop() {
    min-height: 800px;
    margin: 0 -6rem;
  }

  .hero-body {
    align-items: flex-start;
  }
}

.explorers {
  height: 100vh;

  @include mobile() {
    height: calc(400px + 2rem);
  }
}

.explorer {
  display: flex;
  position: absolute;
  align-items: flex-end;
  background-color: #fff;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 250px;
  height: 300px;
  padding: 1.2rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: white;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  cursor: pointer;
  transform: translateY(0);
  transition-timing-function: ease-out;
  transition-duration: 0.15s;
  transform-origin: top;
  // transition: 0.3s;
  // transform: perspective(1000px) rotateX(-40deg) translateY(25%);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 32px 0 rgba(0, 0, 0, 0.3);
  }

  &.show {
    opacity: 1;
    // transform: rotate(0) translateY(0);
  }

  &:nth-child(1) {
    top: 18%;
    left: 12%;
  }

  &:nth-child(2) {
    top: 47%;
    left: calc(18% + 250px);
  }

  &:nth-child(3) {
    top: calc(40% + 150px);
    left: 12%;
  }

  @include mobile() {
    width: 40%;
    height: 200px;

    &:nth-child(1) {
      top: 0;
      left: 10%;
    }

    &:nth-child(2) {
      top: 100px;
      left: calc(50% + 15px);
    }

    &:nth-child(3) {
      top: 215px;
      left: 10%;
    }
  }
}
</style>
