<template>
  <div class="post card" :class="{ 'on-deck': onDeck }">
    <div class="card-content">
      <div class="field">
        <div class="control">
          <p class="post-text" v-html="localPost.text" />
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <div class="field is-grouped">
        <div class="control">
          <PlorAccounts disabled :selected="localPost.connections" />
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <flat-pickr
            disabled
            name="scheduled"
            class="input"
            v-model="localPost.scheduled"
            :config="flatpickrConfig"
          />
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import PlorPost from '~/components/app/PlorPost';

export default {
  name: 'PlorPostHistory',
  mixins: [PlorPost]
};
</script>
