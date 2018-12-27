<template>
  <div class="mountains columns is-centered  is-fullheight">
    <div class="explorers column is-one-third">
      <a
        v-for="(explorer, i) in explorers"
        :key="i"
        class="explorer show"
        :href="explorer.link"
        target="_blank"
        :style="
          `background-image: ${linGrad}, url('/images/${explorer.image}');`
        "
        :data-aos="`fade-${explorer.direction}`"
        data-aos-anchor-placement="bottom-bottom"
      >
        <div>{{ explorer.name }}</div>
        <div>{{ explorer.role }}</div>
      </a>
    </div>
    <main class="column is-two-thirds">
      <section class="hero">
        <div class="hero-body">
          <div class="content">
            <div class="section-title">Built by ex(plor)ers</div>
            <p>
              Our team is composed of two friends (and an awesome dog) working
              day and night until this service is plorfect.
            </p>
            <p>
              We believe services in this space aren't quite there yet. We felt
              there was an opportunity to build the best tool to help small and
              large buisinesses share their gifts with the world.
            </p>
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
        'linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 50%, rgba(0, 0, 0, 0.6) 100%)',
      explorers: [
        {
          name: 'Mitchell Bernstein',
          image: 'mitchellbernstein.jpg',
          direction: 'right',
          role: 'Designer',
          link: 'https://twitter.com/MitchBernstein'
        },
        {
          name: 'Sam Rose',
          image: 'samrose.jpg',
          direction: 'left',
          role: 'Developer',
          link: 'https://twitter.com/_SamRose3_'
        },
        {
          name: 'Franklin',
          image: 'franklin.jpg',
          direction: 'up',
          role: 'Chief Dog Officer',
          link: 'https://instagram.com/franklindacorgi'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.mountains {
  position: relative;
  background-image: url('/images/mountains.png');
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: contain;

  @include desktop() {
    min-height: 1000px;
  }

  @include mobile() {
    background-image: none;
  }

  .hero-body {
    align-items: flex-start;
  }
}

.explorers {
  height: 100vh;

  @include mobile() {
    height: 600px;
  }
}

.explorer {
  display: flex;
  position: absolute;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-end;
  width: 300px;
  height: 400px;
  padding: 1.2rem;
  transition: all 0.3s;
  border-radius: 4px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 1.25rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 32px 0 rgba(0, 0, 0, 0.3);
  }

  div:nth-child(2) {
    font-size: 1rem;
    font-weight: 500;
  }

  &:nth-child(1) {
    top: 100px;
    left: 2rem;
  }

  &:nth-child(2) {
    top: calc(100px + 250px + 50px);
    left: calc(2rem + 300px + 50px);
  }

  &:nth-child(3) {
    top: calc(100px + 400px + 50px);
    left: 2rem;
  }

  @include touch() {
    width: 250px;
    height: 350px;

    &:nth-child(1) {
      top: 0;
    }

    &:nth-child(2) {
      top: calc(350px + 25px);
      left: calc(2rem + 250px + 50px);
    }

    &:nth-child(3) {
      top: calc(350px + 50px);
    }
  }

  @include mobile() {
    width: 30%;
    height: 250px;

    &:nth-child(1) {
      left: 10%;
    }

    &:nth-child(2) {
      top: calc(150px + 25px);
      left: 50%;
    }

    &:nth-child(3) {
      top: calc(250px + 25px);
      left: 15%;
    }
  }
}
</style>
