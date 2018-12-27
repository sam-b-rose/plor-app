<template>
  <form
    class="card post"
    :class="{
      active: addingPost,
      'on-deck': onDeck
    }"
    @submit.prevent
    @key.enter="submit"
  >
    <div class="card-content">
      <div class="field">
        <div class="control">
          <textarea
            ref="textarea"
            class="textarea is-borderless"
            placeholder="Type it loud and clear!"
            rows="1"
            @focus="onFocus"
            @input="autoExpand"
            @keydown.enter.prevent="submit"
            v-model="localPost.text"
          />
        </div>
      </div>
    </div>

    <!-- Adding Post -->
    <template v-if="addingPost">
      <footer class="card-footer light">
        <div class="field is-grouped">
          <button class="button is-text" @click="addMedia">
            <span class="icon"> <FontAwesomeIcon icon="camera" /> </span>
            <span>Photo</span>
          </button>
        </div>
      </footer>

      <!-- FOOTER: Adding post -->
      <footer class="card-footer">
        <div class="field is-grouped">
          <div class="control">
            <button class="button" @click="cancel">Cancel</button>
          </div>
        </div>
        <div key="submit-post" class="field is-grouped is-grouped-right">
          <div v-if="selectedAction === 'Schedule'" class="control">
            <flat-pickr
              class="input"
              key="schedule-post"
              v-model="localPost.scheduled"
              :config="flatpickrConfig"
              name="scheduled"
            />
          </div>
          <div class="control">
            <div class="buttons has-addons is-right">
              <div class="button is-fancy" @click="submit">
                {{ selectedAction }}
              </div>
              <PlorDropdown
                right
                v-model="selectedAction"
                class="button has-text-left is-fancy"
                trigger-class="icon"
              >
                <span slot="trigger">
                  <font-awesome-icon icon="chevron-down" />
                </span>

                <PlorDropdownItem
                  v-for="(action, i) in actionItems"
                  :key="i"
                  :value="action"
                >
                  {{ action }}
                </PlorDropdownItem>
              </PlorDropdown>
            </div>
          </div>
        </div>
      </footer>
    </template>

    <template v-else>
      <footer class="card-footer">
        <div class="field is-grouped">
          <div class="control updated">
            <img
              class="profile"
              :src="localPost.author.gravatar"
              :alt="localPost.author.name"
            />
            <strong class="user">{{ localPost.author.email }}</strong>
            <span> updated a draft </span>
            <span class="diff-days">{{ localPost.updated | diffDays }}</span>
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
          <div class="control">
            <button class="button" @click="edit">Edit</button>
          </div>
        </div>
      </footer>
    </template>

    <PlorPrompt
      :active="confirmDiscard"
      @cancel="confirmDiscard = false"
      @confirm="discard"
    />
  </form>
</template>

<script>
import PlorPost from '~/components/app/PlorPost';

export default {
  name: 'PlorPostDraft',
  mixins: [PlorPost]
};
</script>

<style lang="scss">
.updated {
  display: flex;
  align-items: center;
}

.profile {
  display: inline-block;
  width: 36px;
  height: 36px;
  margin-right: 0.5rem;
  border-radius: 50%;
  background-color: $gray;
  background-size: cover;
}

.user {
  margin-right: 0.25rem;
  color: $purple-text;
}

.diff-days {
  margin-left: 0.75rem;
  font-size: 0.825rem;
}
</style>
