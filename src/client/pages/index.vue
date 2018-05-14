<template>
  <div>
    <div class="columns is-centered is-gapless">
      <aside class="column is-half is-hidden-touch artwork"/>
      <main class="column is-half-desktop is-two-thirds-tablet">
        <section class="hero is-fullheight">
          <div class="hero-body">
            <div class="container">
              <div class="title">Build your audience by socializing smarter</div>
              <p>Spread the word without a hassle so you and your team can get back to business.</p>
              <p>Plor takes the stress of managing all those social media accounts off your shoulders. Less time posting or tweeting and more time relaxing.</p>
              <button class="button is-link is-outlined">Get early access</button>
            </div>
          </div>
        </section>
      </main>
    </div>
    <div class="columns is-centered is-gapless">
      <main class="column is-half-desktop is-two-thirds-tablet">
        <section class="hero is-fullheight">
          <div class="hero-body">
            <div class="container">
              <div class="title">Tools designed for you</div>
              <div class="features">
                <div class="feature">
                  <CalendarIcon class="feature-icon" />
                  <div class="feature-content">
                    <h5 class="title is-5">Schedule Posts</h5>
                    <p>Post whatever you'd like, whenever you'd like, as many times as you'd like.</p>
                  </div>
                </div>
                <div class="feature">
                  <PencilIcon class="feature-icon" />
                  <div class="feature-content">
                    <h5 class="title is-5">Create Drafts</h5>
                    <p>Draft posts to store for later so you can review them with your team.</p>
                  </div>
                </div>
                <div class="feature">
                  <PeopleIcon class="feature-icon" />
                  <div class="feature-content">
                    <h5 class="title is-5">Manage Accounts</h5>
                    <p>People management can get messy. Like eatting chicken wings! Use tools to easily govern all your memebers.</p>
                  </div>
                </div>
                <div class="feature">
                  <PlatformsIcon class="feature-icon" />
                  <div class="feature-content">
                    <h5 class="title is-5">Integrate Platforms</h5>
                    <p>Are you a social butterfly? We support Twitter and Facebook, and we're adding more platforms soon!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <aside class="column is-half is-hidden-touch has-artwork">
        <img
          class="art"
          src="/images/for-you.png"
          alt="Tools designed for you">
      </aside>
    </div>
    <div class="columns is-centered is-gapless is-light">
      <aside class="column is-half is-hidden-touch"/>
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
    <div class="columns is-gapless">
      <main class="column is-half">
        <section class="hero is-halfheight">
          <div class="hero-body">
            <div class="container">
              <div class="content">
                <div class="title">Get early access</div>
                <p>We are currently building Plor to be totally rad. Sign up and we'll let you know when we are ready for your greatness. We promise absolutely no spam.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
import CalendarIcon from '@/components/svg/CalendarIcon';
import PencilIcon from '@/components/svg/PencilIcon';
import PeopleIcon from '@/components/svg/PeopleIcon';
import PlatformsIcon from '@/components/svg/PlatformsIcon';

export default {
  name: 'Home',
  layout: 'default',
  components: {
    CalendarIcon,
    PencilIcon,
    PeopleIcon,
    PlatformsIcon
  }
};
</script>

<style lang="scss" scoped>
.hero-body {
  padding: 3rem 6rem;
}

.artwork {
  background-color: $grey-lighter;
}

.columns {
  &.is-light {
    background-color: $light;
  }
}

p {
  color: $blue-light;
  font-size: $size-5;
  margin-bottom: 1em;
}

.features {
  margin-top: 5rem;
}

.feature {
  display: flex;
  margin-bottom: 1rem;
}

.feature-icon {
  flex: 0 0 auto;
  margin-right: 1.5rem;
}

.feature-content {
  flex: 1 1 auto;
}

.has-artwork {
  display: flex;
  align-items: center;
  position: relative;
}

.art {
  position: absolute;
  width: 80%;
}
</style>
