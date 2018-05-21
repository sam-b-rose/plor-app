<template>
  <h3>Authentication</h3>
</template>

<script>
export default {
  middleware: ['authenticated', 'go-home']
};
</script>
