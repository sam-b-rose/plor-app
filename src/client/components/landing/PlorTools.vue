<template>
  <div class="columns is-centered">
    <main class="column is-half-desktop is-two-thirds-tablet">
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div class="container">
            <div class="section-title">Tools designed for you</div>
            <div class="features">
              <div
                class="feature"
                data-aos="fade-right"
                data-aos-anchor-placement="bottom-bottom">
                <IconBase
                  size="lg"
                  class="feature-icon">
                  <IconCalendar />
                </IconBase>
                <div class="feature-content">
                  <h5 class="title is-5">Schedule Posts</h5>
                  <p>Post whatever you'd like, whenever you'd like, as many times as you'd like.</p>
                </div>
              </div>
              <div
                class="feature"
                data-aos="fade-right"
                data-aos-anchor-placement="bottom-bottom">
                <IconBase
                  size="lg"
                  class="feature-icon">
                  <IconPencil />
                </IconBase>
                <div class="feature-content">
                  <h5 class="title is-5">Create Drafts</h5>
                  <p>Draft posts to store for later so you can review them with your team.</p>
                </div>
              </div>
              <div
                class="feature"
                data-aos="fade-right"
                data-aos-anchor-placement="bottom-bottom">
                <IconBase
                  size="lg"
                  class="feature-icon">
                  <IconPeople />
                </IconBase>
                <div class="feature-content">
                  <h5 class="title is-5">Manage Accounts</h5>
                  <p>People management can get messy. Like eatting chicken wings! Use tools to easily govern all your memebers.</p>
                </div>
              </div>
              <div
                class="feature"
                data-aos="fade-right"
                data-aos-anchor-placement="bottom-bottom">
                <IconBase
                  size="lg"
                  class="feature-icon">
                  <IconPlatforms />
                </IconBase>
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
    <aside class="column is-half is-hidden-touch v-center">
      <img
        class="artwork"
        src="/images/tools.jpg"
        alt="Tools designed for you">
    </aside>
  </div>
</template>

<script>
import IconBase from '@/components/svg/IconBase';
import IconCalendar from '@/components/svg/IconCalendar';
import IconPencil from '@/components/svg/IconPencil';
import IconPeople from '@/components/svg/IconPeople';
import IconPlatforms from '@/components/svg/IconPlatforms';

export default {
  name: 'PlorTools',
  components: {
    IconBase,
    IconCalendar,
    IconPencil,
    IconPeople,
    IconPlatforms
  }
};
</script>

<style lang="scss" scoped>
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

.v-center {
  display: flex;
  align-items: center;
}

.artwork {
  width: 100%;
  margin: 0 auto;
}
</style>
