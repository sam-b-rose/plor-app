<template>
  <div>
    <h1>
      {{ error.statusCode }}
    </h1>
    <h2>
      {{ error.message }}
    </h2>
    <button router to="/app" v-if="error.statusCode === 404">Home</button>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
