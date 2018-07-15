<template>
  <form
    class="card"
    @submit.prevent
    @key.enter="submit">
    <div class="card-content">
      <div class="field">
        <div class="control">
          <textarea
            rows="1"
            class="textarea"
            @keydown.enter.prevent="submit"
            placeholder="Type it loud and clear!"
            v-model="message"/>
        </div>
      </div>
    </div>

    <footer class="card-footer">
      <div class="field is-grouped">
        <div class="control">
          <!-- <button class="button">
            <span class="icon">
              <font-awesome-icon :icon="['far', 'image']" />
            </span>
            <span>Image / Video</span>
          </button> -->
          <flat-pickr
            class="input"
            v-model="scheduled"
            :config="config"
            name="scheduled" />
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-link"
            @click="submit">
            Schedule
          </button>
        </div>
      </div>
    </footer>
  </form>
</template>

<script>
import addHours from 'date-fns/add_hours'
import startOfTomorrow from 'date-fns/start_of_tomorrow'

import FlatPickr from 'vue-flatpickr-component'

export default {
  components: {
    FlatPickr
  },
  data() {
    return {
      message: '',
      scheduled: addHours(startOfTomorrow(), 12),
      hasMedia: false,
      hasGIF: false,
      hasPoll: false,
      config: {
        enableTime: true,
        altInput: true,
        altFormat: 'F j, Y h:i K',
        minDate: Date.now()
      }
    }
  },
  methods: {
    submit() {
      const { connections } = this.$store.state.connections
      this.$store
        .dispatch('posts/addPost', {
          connections,
          text: this.message,
          scheduled: new Date(this.scheduled)
        })
        .then(() => {
          if (this.$store.state.notification.success) {
            console.log('Post added!')
            this.message = ''
            this.scheduled = new Date()
          }
        })
    }
  }
}
</script>

<style lang="scss">
@import '~flatpickr/dist/flatpickr.css';

.card {
  overflow: hidden;
}

.card-footer {
  padding: 0.5rem;
  background: $light;
}

.field {
  &.is-grouped {
    flex: 1 1 auto;
    align-items: center;
  }

  &:not(:last-child) {
    margin-bottom: 0;
  }
}

.textarea {
  &,
  &:focus,
  &:active {
    overflow: auto;
    border: none;
    outline: none;
    box-shadow: none;
    resize: none;
  }
}
</style>
